-- A Star Number Plates — Phase 1 schema for /admin.
--
-- Run this in Supabase Studio → SQL Editor. Safe to re-run (idempotent).
-- Bucket creation at the bottom is optional — create via Studio UI if
-- preferred (more control over public/private).
--
-- After running:
--   1. Create a private Storage bucket named `order-documents`.
--   2. Set ADMIN_EMAILS in your .env.local.
--   3. Sign in via /auth/login with one of those emails.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type order_status as enum (
      'pending_payment',
      'paid_awaiting_verification',
      'verified',
      'in_production',
      'qc',
      'dispatched',
      'delivered',
      'cancelled',
      'refunded',
      'rejected'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'order_mode') then
    create type order_mode as enum ('road-legal', 'show');
  end if;

  if not exists (select 1 from pg_type where typname = 'document_kind') then
    create type document_kind as enum ('id', 'entitlement');
  end if;

  if not exists (select 1 from pg_type where typname = 'document_review_status') then
    create type document_review_status as enum ('pending', 'approved', 'rejected');
  end if;
end$$;

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------

create table if not exists public.orders (
  id                        uuid primary key default gen_random_uuid(),
  status                    order_status not null default 'pending_payment',
  mode                      order_mode not null,

  -- Stripe references (populated by Phase 2 webhook).
  stripe_session_id         text unique,
  stripe_payment_intent_id  text unique,

  -- Customer snapshot.
  customer_email            text not null,
  customer_name             text,
  customer_phone            text,

  -- Delivery address snapshot.
  address_line1             text,
  address_line2             text,
  address_city              text,
  address_postcode          text,

  -- Money (pence, integers). Calculated server-side at order time.
  subtotal_pence            integer not null default 0,
  plate_subtotal_pence      integer not null default 0,
  flag_subtotal_pence       integer not null default 0,
  accessory_subtotal_pence  integer not null default 0,
  total_pence               integer not null default 0,
  currency                  text not null default 'GBP',

  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists orders_status_idx        on public.orders (status);
create index if not exists orders_created_at_idx    on public.orders (created_at desc);
create index if not exists orders_customer_email_idx on public.orders (customer_email);

-- ---------------------------------------------------------------------------
-- Order items (one row per plate line).
-- ---------------------------------------------------------------------------

create table if not exists public.order_items (
  id                  uuid primary key default gen_random_uuid(),
  order_id            uuid not null references public.orders(id) on delete cascade,
  product_id          text not null,       -- 'standard-2d', '3d-gel', '4d', '4d-gel', '4d-retro'
  qty                 text not null,       -- 'single-front' | 'single-rear' | 'pair'
  plate_type          text not null,       -- 'pair' | 'front-only' | 'rear-only'
  reg                 text not null,
  size_id             text not null,       -- e.g. 'STANDARD_520x111'
  style_id            text not null,
  mode                order_mode not null,
  flag                text,                -- 'none' | 'UK' | 'GB' | 'ENG' | 'SCO' | 'CYM'
  show_country_code   text,                -- ISO α-2 when mode = 'show'
  unit_price_pence    integer not null,
  line_total_pence    integer not null,
  created_at          timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- ---------------------------------------------------------------------------
-- Order accessories.
-- ---------------------------------------------------------------------------

create table if not exists public.order_accessories (
  id                  uuid primary key default gen_random_uuid(),
  order_id            uuid not null references public.orders(id) on delete cascade,
  accessory_id        text not null,       -- e.g. 'fixing-kit', 'adhesive-strips'
  quantity            integer not null,
  unit_price_pence    integer not null,
  line_total_pence    integer not null,
  created_at          timestamptz not null default now()
);

create index if not exists order_accessories_order_id_idx on public.order_accessories (order_id);

-- ---------------------------------------------------------------------------
-- Order documents.
-- Files live in Storage bucket `order-documents`. We store the storage_path.
-- ---------------------------------------------------------------------------

create table if not exists public.order_documents (
  id                  uuid primary key default gen_random_uuid(),
  order_id            uuid not null references public.orders(id) on delete cascade,
  kind                document_kind not null,
  storage_path        text not null,       -- relative path inside the bucket
  mime_type           text,
  size_bytes          bigint,
  uploaded_at         timestamptz not null default now(),

  review_status       document_review_status not null default 'pending',
  review_note         text,
  reviewed_at         timestamptz,
  reviewer_email      text
);

create index if not exists order_documents_order_id_idx     on public.order_documents (order_id);
create index if not exists order_documents_review_status_idx on public.order_documents (review_status);

-- ---------------------------------------------------------------------------
-- Status timeline (audit log).
-- ---------------------------------------------------------------------------

create table if not exists public.order_status_events (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references public.orders(id) on delete cascade,
  from_status   order_status,
  to_status     order_status not null,
  note          text,
  actor_email   text,
  created_at    timestamptz not null default now()
);

create index if not exists order_status_events_order_id_idx   on public.order_status_events (order_id);
create index if not exists order_status_events_created_at_idx on public.order_status_events (created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at trigger for orders.
-- ---------------------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
before update on public.orders
for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security.
-- Default: deny all. Admin reads/writes happen via the service-role key
-- from server-only code (src/lib/supabase/admin.ts).
-- ---------------------------------------------------------------------------

alter table public.orders               enable row level security;
alter table public.order_items          enable row level security;
alter table public.order_accessories    enable row level security;
alter table public.order_documents      enable row level security;
alter table public.order_status_events  enable row level security;

-- No policies are created intentionally. With RLS on and no policies, the
-- anon and authenticated roles cannot see any rows. The service_role key
-- bypasses RLS, which is what the admin server actions use.

-- ---------------------------------------------------------------------------
-- Storage bucket (optional via SQL — usually created in Studio UI).
-- Uncomment to create programmatically. The bucket should remain private.
-- ---------------------------------------------------------------------------

-- insert into storage.buckets (id, name, public)
-- values ('order-documents', 'order-documents', false)
-- on conflict (id) do nothing;

import Link from "next/link";
import { checkAdmin } from "@/lib/auth/admin";
import { getAdminClient } from "@/lib/supabase/admin";
import OrderList from "@/components/admin/OrderList";
import SupabaseNotConfiguredBanner from "@/components/admin/SupabaseNotConfiguredBanner";
import type { Order, OrderStatus } from "@/types/orders";
import { ORDER_STATUS_META, ORDER_STATUS_FLOW } from "@/types/orders";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ status?: string; q?: string }>;
}

const PAGE_SIZE = 50;

async function loadOrders(
  status: OrderStatus | null,
  query: string | null,
): Promise<{ orders: Order[]; error: string | null }> {
  const supabase = getAdminClient();
  if (!supabase) {
    return { orders: [], error: "service-role-missing" };
  }

  let req = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(PAGE_SIZE);

  if (status) req = req.eq("status", status);
  if (query)
    req = req.or(
      `customer_email.ilike.%${query}%,customer_name.ilike.%${query}%`,
    );

  const { data, error } = await req;
  if (error) return { orders: [], error: error.message };
  return { orders: (data as Order[]) ?? [], error: null };
}

function asStatus(raw: string | undefined): OrderStatus | null {
  if (!raw) return null;
  return (Object.keys(ORDER_STATUS_META) as OrderStatus[]).includes(
    raw as OrderStatus,
  )
    ? (raw as OrderStatus)
    : null;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const gate = await checkAdmin();
  if (!gate.ok) {
    return <SupabaseNotConfiguredBanner reason={gate.reason} />;
  }

  const { status: rawStatus, q: rawQuery } = await searchParams;
  const status = asStatus(rawStatus);
  const query = typeof rawQuery === "string" ? rawQuery.trim() : null;

  const { orders, error } = await loadOrders(status, query);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-lime)]/70">
            Orders
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
            All orders
          </h1>
        </div>
        <p className="text-xs text-neutral-500">
          Showing the most recent {PAGE_SIZE}. Filters update the URL.
        </p>
      </header>

      {/* Filter chips — GET form so it's stateless and bookmarkable. */}
      <form
        method="get"
        className="flex flex-wrap items-end gap-3 rounded-2xl border border-neutral-200 bg-white p-4"
      >
        <label className="flex flex-col text-xs font-medium text-neutral-600">
          <span className="uppercase tracking-[0.18em]">Status</span>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="mt-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)]/30"
          >
            <option value="">All</option>
            {ORDER_STATUS_FLOW.map((s) => (
              <option key={s} value={s}>
                {ORDER_STATUS_META[s].label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col text-xs font-medium text-neutral-600">
          <span className="uppercase tracking-[0.18em]">Search</span>
          <input
            type="search"
            name="q"
            defaultValue={query ?? ""}
            placeholder="Email or name"
            className="mt-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)]/30"
          />
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            className="touch-target rounded-md bg-[var(--brand-lime)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-lime-hover)]"
          >
            Apply
          </button>
          <Link
            href="/admin/orders"
            className="touch-target inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-[var(--brand-gold)]"
          >
            Reset
          </Link>
        </div>
      </form>

      {error && error !== "service-role-missing" && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Couldn&apos;t load orders: {error}
        </p>
      )}
      {error === "service-role-missing" && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          Service-role key not set — list disabled. Add{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>.
        </p>
      )}

      <OrderList orders={orders} />
    </div>
  );
}

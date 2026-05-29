import Link from "next/link";
import { notFound } from "next/navigation";
import { checkAdmin } from "@/lib/auth/admin";
import { getAdminClient } from "@/lib/supabase/admin";
import SupabaseNotConfiguredBanner from "@/components/admin/SupabaseNotConfiguredBanner";
import OrderStatusBadge from "@/components/admin/OrderStatusBadge";
import StatusDropdown from "@/components/admin/StatusDropdown";
import DocumentReviewPanel from "@/components/admin/DocumentReviewPanel";
import { formatGBP } from "@/lib/utils";
import {
  ORDER_STATUS_META,
  type Order,
  type OrderAccessory,
  type OrderDocument,
  type OrderItem,
  type OrderStatusEvent,
} from "@/types/orders";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function loadDetail(id: string): Promise<{
  order: Order | null;
  items: OrderItem[];
  accessories: OrderAccessory[];
  documents: OrderDocument[];
  timeline: OrderStatusEvent[];
  error: string | null;
}> {
  const supabase = getAdminClient();
  if (!supabase) {
    return {
      order: null,
      items: [],
      accessories: [],
      documents: [],
      timeline: [],
      error: "service-role-missing",
    };
  }

  const [orderRes, itemsRes, accRes, docsRes, timelineRes] = await Promise.all([
    supabase.from("orders").select("*").eq("id", id).maybeSingle(),
    supabase.from("order_items").select("*").eq("order_id", id),
    supabase.from("order_accessories").select("*").eq("order_id", id),
    supabase
      .from("order_documents")
      .select("*")
      .eq("order_id", id)
      .order("uploaded_at", { ascending: false }),
    supabase
      .from("order_status_events")
      .select("*")
      .eq("order_id", id)
      .order("created_at", { ascending: false }),
  ]);

  return {
    order: (orderRes.data as Order | null) ?? null,
    items: (itemsRes.data as OrderItem[] | null) ?? [],
    accessories: (accRes.data as OrderAccessory[] | null) ?? [],
    documents: (docsRes.data as OrderDocument[] | null) ?? [],
    timeline: (timelineRes.data as OrderStatusEvent[] | null) ?? [],
    error: orderRes.error?.message ?? null,
  };
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function AdminOrderDetail({ params }: PageProps) {
  const gate = await checkAdmin();
  if (!gate.ok) {
    return <SupabaseNotConfiguredBanner reason={gate.reason} />;
  }

  const { id } = await params;
  const detail = await loadDetail(id);

  if (detail.error === "service-role-missing") {
    return (
      <div className="space-y-4">
        <BackLink />
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          Service-role key not set — order detail disabled. Add{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>.
        </p>
      </div>
    );
  }
  if (!detail.order) {
    notFound();
  }

  const { order, items, accessories, documents, timeline } = detail;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <BackLink />
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-lime)]/70">
              Order {order.id.slice(0, 8)}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
              {order.customer_name ?? order.customer_email}
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              {formatDate(order.created_at)} ·{" "}
              {order.mode === "show" ? "Show plates" : "Road legal"} ·{" "}
              {order.currency} {formatGBP(order.total_pence)}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </header>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Section title="Items">
            {items.length === 0 ? (
              <Empty body="No items recorded against this order." />
            ) : (
              <ul className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
                {items.map((it) => (
                  <li key={it.id} className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {it.style_id} · {it.plate_type}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Reg <span className="font-plate">{it.reg}</span> ·{" "}
                        size {it.size_id}
                        {it.flag && it.flag !== "none" ? ` · flag ${it.flag}` : ""}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-neutral-900">
                      {formatGBP(it.line_total_pence)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Accessories">
            {accessories.length === 0 ? (
              <Empty body="No accessories on this order." />
            ) : (
              <ul className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
                {accessories.map((a) => (
                  <li key={a.id} className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        {a.accessory_id}
                      </p>
                      <p className="text-xs text-neutral-500">Qty {a.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-neutral-900">
                      {formatGBP(a.line_total_pence)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Documents">
            <DocumentReviewPanel documents={documents} />
          </Section>

          <Section title="Timeline">
            {timeline.length === 0 ? (
              <Empty body="No status events yet. The first event is logged when an order moves out of pending_payment." />
            ) : (
              <ol className="space-y-3">
                {timeline.map((ev) => (
                  <li
                    key={ev.id}
                    className="rounded-xl border border-neutral-200 bg-white p-3"
                  >
                    <p className="text-xs text-neutral-500">
                      {formatDate(ev.created_at)}
                      {ev.actor_email ? ` · ${ev.actor_email}` : ""}
                    </p>
                    <p className="mt-1 text-sm text-neutral-900">
                      {ev.from_status
                        ? `${ORDER_STATUS_META[ev.from_status].label} → ${ORDER_STATUS_META[ev.to_status].label}`
                        : ORDER_STATUS_META[ev.to_status].label}
                    </p>
                    {ev.note && (
                      <p className="mt-1 text-xs text-neutral-600">{ev.note}</p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </Section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Customer
            </p>
            <p className="mt-2 text-sm font-semibold text-neutral-900">
              {order.customer_name ?? "—"}
            </p>
            <p className="text-xs text-neutral-600">{order.customer_email}</p>
            {order.customer_phone && (
              <p className="text-xs text-neutral-600">{order.customer_phone}</p>
            )}

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Delivery
            </p>
            <address className="mt-2 not-italic text-xs leading-relaxed text-neutral-700">
              {order.address_line1 ?? "—"}
              {order.address_line2 && (
                <>
                  <br />
                  {order.address_line2}
                </>
              )}
              {order.address_city && (
                <>
                  <br />
                  {order.address_city}
                </>
              )}
              {order.address_postcode && (
                <>
                  <br />
                  {order.address_postcode}
                </>
              )}
            </address>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <StatusDropdown current={order.status} />
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Totals
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <Row label="Plates" value={formatGBP(order.plate_subtotal_pence)} />
              <Row label="Flag" value={formatGBP(order.flag_subtotal_pence)} />
              <Row label="Accessories" value={formatGBP(order.accessory_subtotal_pence)} />
              <Row label="Total" value={formatGBP(order.total_pence)} bold />
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Empty({ body }: { body: string }) {
  return (
    <p className="rounded-xl border border-dashed border-neutral-300 bg-[var(--brand-cream)] px-4 py-4 text-xs text-neutral-600">
      {body}
    </p>
  );
}

function Row({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${bold ? "border-t border-neutral-200 pt-2 text-base font-semibold text-[var(--brand-lime)]" : "text-neutral-700"}`}
    >
      <dt>{label}</dt>
      <dd className={bold ? "font-semibold" : "font-medium text-neutral-900"}>
        {value}
      </dd>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      href="/admin/orders"
      className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-lime)]/70 underline-offset-4 hover:underline"
    >
      ← All orders
    </Link>
  );
}

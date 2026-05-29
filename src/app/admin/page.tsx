import Link from "next/link";
import { checkAdmin } from "@/lib/auth/admin";
import SupabaseNotConfiguredBanner from "@/components/admin/SupabaseNotConfiguredBanner";
import { getAdminClient } from "@/lib/supabase/admin";
import type { OrderStatus } from "@/types/orders";

export const dynamic = "force-dynamic";

interface Counts {
  total: number;
  byStatus: Partial<Record<OrderStatus, number>>;
}

async function loadCounts(): Promise<Counts | null> {
  const supabase = getAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("orders")
    .select("status", { count: "exact" });

  if (error || !data) return { total: 0, byStatus: {} };

  const byStatus: Partial<Record<OrderStatus, number>> = {};
  for (const row of data) {
    const s = row.status as OrderStatus;
    byStatus[s] = (byStatus[s] ?? 0) + 1;
  }
  return { total: data.length, byStatus };
}

export default async function AdminHome() {
  const gate = await checkAdmin();
  if (!gate.ok) {
    return <SupabaseNotConfiguredBanner reason={gate.reason} />;
  }

  const counts = await loadCounts();
  const total = counts?.total ?? 0;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-lime)]/70">
          Admin
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Overview of orders, verifications and production.
        </p>
      </header>

      {!counts && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          Service-role key not set — counts unavailable. Add{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env.local</code>.
        </p>
      )}

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-600">
          Snapshot
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total orders" value={total} />
          <StatCard
            label="Pending payment"
            value={counts?.byStatus.pending_payment ?? 0}
          />
          <StatCard
            label="Awaiting verification"
            value={counts?.byStatus.paid_awaiting_verification ?? 0}
          />
          <StatCard
            label="In production"
            value={counts?.byStatus.in_production ?? 0}
          />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-600">
          Phase 1 scope
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li className="flex items-start gap-2">
            <Dot />
            Read-only views — orders + detail pages render from the
            <code className="mx-1 rounded bg-neutral-100 px-1">orders</code>
            table.
          </li>
          <li className="flex items-start gap-2">
            <Dot />
            Status updates, document review and emails ship in Phase 2.
          </li>
          <li className="flex items-start gap-2">
            <Dot />
            Stripe checkout + webhook also ship in Phase 2; orders only land
            here once that pipeline is wired.
          </li>
        </ul>
      </section>

      <section>
        <Link
          href="/admin/orders"
          className="touch-target inline-flex items-center justify-center rounded-lg bg-[var(--brand-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
        >
          Open orders →
        </Link>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-[var(--brand-lime)]">
        {value}
      </p>
    </div>
  );
}

function Dot() {
  return (
    <span
      aria-hidden
      className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-gold)]"
    />
  );
}


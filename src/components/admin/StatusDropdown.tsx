"use client";

import { ORDER_STATUS_META, ORDER_STATUS_FLOW, type OrderStatus } from "@/types/orders";

interface StatusDropdownProps {
  current: OrderStatus;
  disabled?: boolean;
  disabledReason?: string;
}

/**
 * Phase 1: read-only display + a select wired to no-op until Phase 2 lands.
 * The actual mutation will be a server action that also inserts an
 * `order_status_events` row and re-checks `requireAdmin()`.
 */
export default function StatusDropdown({
  current,
  disabled = true,
  disabledReason = "Status updates ship in Phase 2 with the Stripe webhook.",
}: StatusDropdownProps) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
        Order status
      </label>
      <select
        defaultValue={current}
        disabled={disabled}
        className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)]/30 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500"
      >
        {ORDER_STATUS_FLOW.map((status) => (
          <option key={status} value={status}>
            {ORDER_STATUS_META[status].label}
          </option>
        ))}
        <option disabled>──────────</option>
        <option value="cancelled">Cancelled</option>
        <option value="refunded">Refunded</option>
        <option value="rejected">Rejected</option>
      </select>
      {disabled && (
        <p className="mt-2 text-[11px] text-neutral-500">{disabledReason}</p>
      )}
    </div>
  );
}

import { ORDER_STATUS_META, type OrderStatus } from "@/types/orders";

const TONE_CLASSES = {
  info: "bg-blue-50 text-blue-800 ring-blue-200",
  warn: "bg-[var(--brand-gold)]/15 text-[var(--brand-lime)] ring-[var(--brand-gold)]/40",
  good: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  danger: "bg-red-50 text-red-800 ring-red-200",
  neutral: "bg-neutral-100 text-neutral-700 ring-neutral-200",
} as const;

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const meta = ORDER_STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ring-1 ${TONE_CLASSES[meta.tone]}`}
    >
      {meta.label}
    </span>
  );
}

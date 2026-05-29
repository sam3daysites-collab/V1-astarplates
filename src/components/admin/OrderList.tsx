import type { Order } from "@/types/orders";
import OrderRow from "./OrderRow";

interface OrderListProps {
  orders: Order[];
  emptyMessage?: string;
}

export default function OrderList({ orders, emptyMessage }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-[var(--brand-cream)] px-6 py-12 text-center">
        <p className="text-sm font-semibold text-neutral-900">No orders yet</p>
        <p className="mt-1 text-xs text-neutral-600">
          {emptyMessage ??
            "Orders will appear here once the Stripe webhook is wired up (Phase 2)."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-neutral-200 bg-[var(--brand-cream)] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-600 sm:grid">
        <span>Customer</span>
        <span>Mode</span>
        <span>Status</span>
        <span className="text-right">Total</span>
      </div>
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}

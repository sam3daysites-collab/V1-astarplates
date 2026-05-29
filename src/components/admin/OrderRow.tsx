import Link from "next/link";
import { formatGBP } from "@/lib/utils";
import type { Order } from "@/types/orders";
import OrderStatusBadge from "./OrderStatusBadge";

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

export default function OrderRow({ order }: { order: Order }) {
  return (
    <Link
      href={`/admin/orders/${order.id}`}
      className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-neutral-200 px-4 py-3 transition hover:bg-[var(--brand-cream)] sm:px-6"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-neutral-900">
          {order.customer_name ?? order.customer_email}
        </p>
        <p className="truncate text-xs text-neutral-500">
          {order.id.slice(0, 8)} · {formatDate(order.created_at)}
        </p>
      </div>
      <span className="hidden text-xs text-neutral-500 sm:inline">
        {order.mode === "show" ? "Show" : "Road legal"}
      </span>
      <OrderStatusBadge status={order.status} />
      <span className="text-sm font-semibold text-neutral-900">
        {formatGBP(order.total_pence)}
      </span>
    </Link>
  );
}

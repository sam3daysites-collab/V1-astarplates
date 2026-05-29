/**
 * TypeScript shapes mirroring supabase/migrations/0001_orders.sql.
 *
 * These are the "wire" types used by the admin UI. The actual Supabase
 * client returns broader rows; we type the projected columns explicitly
 * to keep the surface small and stable.
 */

export type OrderStatus =
  | "pending_payment"
  | "paid_awaiting_verification"
  | "verified"
  | "in_production"
  | "qc"
  | "dispatched"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "rejected";

export type OrderMode = "road-legal" | "show";

export type DocumentKind = "id" | "entitlement";

export type DocumentReviewStatus = "pending" | "approved" | "rejected";

export interface Order {
  id: string;
  status: OrderStatus;
  mode: OrderMode;

  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;

  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;

  address_line1: string | null;
  address_line2: string | null;
  address_city: string | null;
  address_postcode: string | null;

  subtotal_pence: number;
  plate_subtotal_pence: number;
  flag_subtotal_pence: number;
  accessory_subtotal_pence: number;
  total_pence: number;
  currency: string;

  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  qty: "single-front" | "single-rear" | "pair";
  plate_type: "pair" | "front-only" | "rear-only";
  reg: string;
  size_id: string;
  style_id: string;
  mode: OrderMode;
  flag: string | null;
  show_country_code: string | null;
  unit_price_pence: number;
  line_total_pence: number;
  created_at: string;
}

export interface OrderAccessory {
  id: string;
  order_id: string;
  accessory_id: string;
  quantity: number;
  unit_price_pence: number;
  line_total_pence: number;
  created_at: string;
}

export interface OrderDocument {
  id: string;
  order_id: string;
  kind: DocumentKind;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_at: string;

  review_status: DocumentReviewStatus;
  review_note: string | null;
  reviewed_at: string | null;
  reviewer_email: string | null;
}

export interface OrderStatusEvent {
  id: string;
  order_id: string;
  from_status: OrderStatus | null;
  to_status: OrderStatus;
  note: string | null;
  actor_email: string | null;
  created_at: string;
}

/** Aggregated detail returned by the order detail page. */
export interface OrderDetail {
  order: Order;
  items: OrderItem[];
  accessories: OrderAccessory[];
  documents: OrderDocument[];
  timeline: OrderStatusEvent[];
}

/** Human label + colour intent for each status. */
export const ORDER_STATUS_META: Record<
  OrderStatus,
  { label: string; tone: "info" | "warn" | "good" | "danger" | "neutral" }
> = {
  pending_payment: { label: "Pending payment", tone: "warn" },
  paid_awaiting_verification: {
    label: "Awaiting verification",
    tone: "warn",
  },
  verified: { label: "Verified", tone: "info" },
  in_production: { label: "In production", tone: "info" },
  qc: { label: "QC", tone: "info" },
  dispatched: { label: "Dispatched", tone: "good" },
  delivered: { label: "Delivered", tone: "good" },
  cancelled: { label: "Cancelled", tone: "neutral" },
  refunded: { label: "Refunded", tone: "neutral" },
  rejected: { label: "Rejected", tone: "danger" },
};

/** Status workflow order — used by the timeline + status dropdown UI. */
export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "pending_payment",
  "paid_awaiting_verification",
  "verified",
  "in_production",
  "qc",
  "dispatched",
  "delivered",
];

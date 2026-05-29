"use server";

import { requireAdmin } from "@/lib/auth/admin";
import type { DocumentReviewStatus, OrderStatus } from "@/types/orders";

/**
 * Phase 2 stubs.
 *
 * Each action below already enforces admin status, so wiring them in a
 * later pass means filling in the Supabase mutation only. They throw
 * "not-implemented" today so calling them from the UI is a loud, obvious
 * failure rather than a silent no-op.
 */

export async function updateOrderStatus(
  orderId: string,
  to: OrderStatus,
): Promise<void> {
  await requireAdmin();
  void orderId;
  void to;
  throw new Error("not-implemented: updateOrderStatus ships in Phase 2");
}

export async function setDocumentReview(
  documentId: string,
  status: DocumentReviewStatus,
  note?: string,
): Promise<void> {
  await requireAdmin();
  void documentId;
  void status;
  void note;
  throw new Error("not-implemented: setDocumentReview ships in Phase 2");
}

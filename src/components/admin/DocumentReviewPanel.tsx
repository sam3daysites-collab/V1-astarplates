"use client";

import type { OrderDocument } from "@/types/orders";

interface DocumentReviewPanelProps {
  documents: OrderDocument[];
  disabledReason?: string;
}

/**
 * Phase 1 placeholder.
 *
 * - When `documents` is empty, shows an honest "no documents yet" empty
 *   state (this is the default until Phase 2 wires the upload pipeline).
 * - When `documents` has rows (e.g. seeded for testing), renders the list
 *   with disabled approve/reject buttons + a Phase 2 note.
 *
 * In Phase 2 the buttons call a server action that:
 *   - calls `requireAdmin()`
 *   - flips `review_status` and writes `reviewer_email` + `reviewed_at`
 *   - logs to `order_status_events` when the order moves to `verified`
 */
export default function DocumentReviewPanel({
  documents,
  disabledReason = "Document review ships in Phase 2 with the upload pipeline.",
}: DocumentReviewPanelProps) {
  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 bg-[var(--brand-cream)] px-5 py-6 text-center">
        <p className="text-sm font-semibold text-neutral-900">
          No documents uploaded yet
        </p>
        <p className="mt-1 text-xs text-neutral-600">
          The customer hasn&apos;t supplied entitlement documents. Uploads
          will appear here once the Phase 2 upload pipeline is live.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {documents.map((doc) => (
        <li
          key={doc.id}
          className="rounded-xl border border-neutral-200 bg-white p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-neutral-900">
                {doc.kind === "id"
                  ? "Proof of ID"
                  : "Proof of entitlement"}
              </p>
              <p className="mt-0.5 truncate text-xs text-neutral-500">
                {doc.storage_path}
              </p>
            </div>
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${
                doc.review_status === "approved"
                  ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                  : doc.review_status === "rejected"
                    ? "bg-red-50 text-red-800 ring-red-200"
                    : "bg-[var(--brand-gold)]/15 text-[var(--brand-lime)] ring-[var(--brand-gold)]/40"
              }`}
            >
              {doc.review_status}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-500"
            >
              Approve
            </button>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-md border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-500"
            >
              Reject
            </button>
          </div>
          <p className="mt-2 text-[11px] text-neutral-500">{disabledReason}</p>
        </li>
      ))}
    </ul>
  );
}

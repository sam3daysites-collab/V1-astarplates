import Link from "next/link";
import PlatePreview from "@/components/PlatePreview";
import { buildMetadata } from "@/lib/seo";
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
  calculateCartTotal,
} from "@/lib/pricing";
import { formatGBP } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Your Cart",
  description: "Review the plates and accessories in your cart before checkout.",
  path: "/cart",
  noIndex: true,
});

// Placeholder cart — real cart state will live in Supabase + cookie.
const sampleLines = [
  {
    productId: "3d-gel" as const,
    qty: "pair" as const,
    name: "3D Gel — Pair",
    reg: "A* 1",
  },
];

export default function CartPage() {
  const summary = calculateCartTotal(
    sampleLines.map((l) => ({ productId: l.productId, qty: l.qty })),
  );
  const remainingForFreeShip = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - summary.subtotal,
  );

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Step 1 of 3
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
            Your cart
          </h1>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {sampleLines.map((line, idx) => (
              <article
                key={idx}
                className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center"
              >
                <PlatePreview
                  registration={line.reg}
                  style={line.productId}
                  size="sm"
                />
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-neutral-900">
                    {line.name}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Registration: <span className="font-mono">{line.reg}</span>
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    Document verification required before production.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatGBP(3199)}
                  </p>
                  <button
                    type="button"
                    className="mt-1 text-xs text-neutral-500 underline-offset-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <Link
              href="/builder"
              className="inline-flex items-center text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
            >
              ← Continue building
            </Link>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="text-base font-semibold text-neutral-900">
                Order summary
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Subtotal</dt>
                  <dd className="font-medium text-neutral-900">
                    {formatGBP(summary.subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Delivery</dt>
                  <dd className="font-medium text-neutral-900">
                    {summary.shipping === 0
                      ? "Free"
                      : formatGBP(summary.shipping)}
                  </dd>
                </div>
                <div className="mt-2 flex justify-between border-t border-neutral-200 pt-3 text-base">
                  <dt className="font-semibold text-neutral-900">Total</dt>
                  <dd className="font-semibold text-neutral-900">
                    {formatGBP(summary.total)}
                  </dd>
                </div>
              </dl>
              {remainingForFreeShip > 0 && (
                <p className="mt-3 rounded-lg bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                  Add {formatGBP(remainingForFreeShip)} more to unlock free
                  delivery.
                </p>
              )}
              <Link
                href="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
              >
                Continue to checkout
              </Link>
              <p className="mt-3 text-center text-xs text-neutral-500">
                Standard delivery {formatGBP(STANDARD_SHIPPING)}, free over{" "}
                {formatGBP(FREE_SHIPPING_THRESHOLD)}.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

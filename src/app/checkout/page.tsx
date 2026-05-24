import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { calculateCartTotal } from "@/lib/pricing";
import { formatGBP } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Checkout",
  description:
    "Verify your details, upload entitlement documents and pay securely via Stripe.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  // Server-authoritative totals only — never trust client values.
  const summary = calculateCartTotal([{ productId: "3d-gel", qty: "pair" }]);

  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Step 2 of 3
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
            Secure checkout
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            Payments are processed by Stripe. Road legal plates are only pressed
            once your entitlement documents have been verified by our team.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <form className="space-y-8 rounded-2xl border border-neutral-200 bg-white p-8">
            <section>
              <h2 className="text-base font-semibold text-neutral-900">
                Contact details
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Phone" name="phone" type="tel" />
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-neutral-900">
                Delivery address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Address line 1" name="line1" />
                <Field label="Address line 2" name="line2" required={false} />
                <Field label="Town / City" name="city" />
                <Field label="Postcode" name="postcode" />
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-neutral-900">
                Document verification
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Required for all road legal plates. Upload one ID document and
                one entitlement document.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Proof of ID (driving licence / passport)"
                  name="doc-id"
                  type="file"
                />
                <Field
                  label="Proof of entitlement (V5C / V778 / lease)"
                  name="doc-entitlement"
                  type="file"
                />
              </div>
              <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
                We hold your documents securely and only use them for
                verification. Stored in line with UK GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-neutral-900">
                Payment
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                You&apos;ll be redirected to Stripe to complete payment securely.
              </p>
            </section>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Pay {formatGBP(summary.total)} via Stripe
            </button>
            <p className="text-center text-xs text-neutral-500">
              By paying you confirm the details above are correct and that
              you&apos;re entitled to the registration submitted.
            </p>
          </form>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h2 className="text-base font-semibold text-neutral-900">
                Order summary
              </h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-600">3D Gel — Pair</dt>
                  <dd className="font-medium text-neutral-900">
                    {formatGBP(3199)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Delivery</dt>
                  <dd className="font-medium text-neutral-900">Free</dd>
                </div>
                <div className="mt-2 flex justify-between border-t border-neutral-200 pt-3 text-base">
                  <dt className="font-semibold text-neutral-900">Total</dt>
                  <dd className="font-semibold text-neutral-900">
                    {formatGBP(summary.total)}
                  </dd>
                </div>
              </dl>
              <Link
                href="/cart"
                className="mt-6 inline-block text-sm text-neutral-500 underline-offset-4 hover:underline"
              >
                ← Back to cart
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10"
      />
    </label>
  );
}

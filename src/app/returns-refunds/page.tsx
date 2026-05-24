import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Returns & Refunds",
  description:
    "How returns and refunds work at A* Number Plates. Personalised plates, accessories, faulty items and transit damage — all explained in plain English.",
  path: "/returns-refunds",
});

export default function ReturnsPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Customer support
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Returns &amp; refunds
          </h1>
          <p className="mt-4 text-neutral-700">
            Number plates are made to your specification, so the standard 14-day
            change-of-mind right does not apply. Here&apos;s how returns and
            refunds actually work — and when we&apos;ll put it right.
          </p>
        </header>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-neutral-800">
          <Block title="Personalised plates">
            <p>
              Under UK consumer regulations, cancellation rights do not apply
              to goods that are made to your specification or clearly
              personalised. Every number plate we press carries your
              registration, so personalised plates cannot be returned for
              change-of-mind.
            </p>
            <p className="mt-3">
              We will replace or refund plates that are <strong>faulty</strong>{" "}
              (manufacturing defect), <strong>misdescribed</strong> (different
              from what you ordered), or <strong>damaged in transit</strong>.
            </p>
          </Block>

          <Block title="Accessories">
            <p>
              Non-personalised accessories — fixing kits and sticky strips —
              may be returned within <strong>14 days</strong> of delivery if
              they are unused and in original condition. We&apos;ll refund the
              accessory price once we&apos;ve received and inspected the return.
              Return postage is the customer&apos;s responsibility.
            </p>
          </Block>

          <Block title="Damaged in transit">
            <p>
              If a plate arrives damaged, tell us within <strong>48 hours</strong>{" "}
              of delivery. Include:
            </p>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                Clear photos of the damage
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                Photos of the packaging it arrived in
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
                Your order number
              </li>
            </ul>
            <p className="mt-3">
              DPD may want to inspect the packaging before we send out a
              replacement. Once they&apos;re satisfied — or right away if the
              damage is obvious — we&apos;ll press and dispatch a free
              replacement.
            </p>
          </Block>

          <Block title="Faulty plates">
            <p>
              If a plate develops a manufacturing fault (peeling characters,
              fading colour, separating gel, etc.) within 12 months of
              delivery in normal road use, we&apos;ll replace it free of charge.
              Send us a photo and your order number to get the process started.
            </p>
            <p className="mt-3">
              This warranty covers manufacturing defects only. It does not
              cover accidental damage, abrasion, vandalism, modification or
              show plates fitted to a road-going vehicle.
            </p>
          </Block>

          <Block title="Cancellation before dispatch">
            <p>
              You can cancel any order before we&apos;ve started pressing —
              normally within a few hours of placing it. We&apos;ll refund the
              full amount minus any non-refundable Stripe payment processing
              fees. Once a road legal plate has gone into production, the
              order can no longer be cancelled.
            </p>
          </Block>

          <Block title="If we can't verify your documents">
            <p>
              If we can&apos;t verify your ID or entitlement document within a
              reasonable timeframe, we&apos;ll cancel the order and refund
              your payment, minus any non-refundable Stripe payment processing
              fees.
            </p>
          </Block>

          <Block title="How to start a return">
            <p>
              Email{" "}
              <a
                href="mailto:admin@astarnumberplates.uk"
                className="font-medium text-neutral-900 underline underline-offset-2"
              >
                admin@astarnumberplates.uk
              </a>{" "}
              with your order number and a short description. We&apos;ll come
              back to you with next steps within one working hour during
              support hours.
            </p>
          </Block>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-8">
          <Link
            href="/terms-and-conditions"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Full terms &amp; conditions →
          </Link>
          <Link
            href="/delivery"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Delivery →
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

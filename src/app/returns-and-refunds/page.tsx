import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/policies";

export const metadata = buildMetadata({
  title: "Returns & Refunds",
  description:
    "Made-to-order exemption, 48-hour delivery-damage window, 3-year manufacturing-defect warranty and how to request help. Plain English.",
  path: "/returns-and-refunds",
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
            Every number plate we press is made to your specification, so the
            standard 14-day change-of-mind right does not apply. Here&apos;s
            exactly how returns and refunds work — and when we&apos;ll put it
            right.
          </p>
        </header>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-neutral-800">
          <Block title="1. Overview">
            <p>
              We want every order to arrive perfect. If something is wrong on
              our side, we&apos;ll fix it free of charge. Personalised plates
              ordered by mistake are not eligible for change-of-mind refunds —
              see section 5.
            </p>
          </Block>

          <Block title="2. Made-to-order exemption from the 14-day cooling-off">
            <p>
              Under UK consumer regulations, cancellation rights do not apply
              to goods that are made to your specification or clearly
              personalised. Every number plate we press carries your
              registration, so personalised plates cannot be returned for
              change-of-mind.
            </p>
            <p className="mt-3">
              Non-personalised accessories (fixing kits, sticky strips) may be
              returned within 14 days of delivery if they are unused and in
              original condition.
            </p>
          </Block>

          <Block title="3. Faulty, damaged or incorrect items">
            <p>
              We will replace or refund plates that are:
            </p>
            <ul className="mt-3 space-y-1.5">
              <Li>Faulty — a manufacturing defect</Li>
              <Li>Damaged in transit (see section 4 for the reporting window)</Li>
              <Li>Misdescribed — different to what you ordered</Li>
            </ul>
            <p className="mt-3">
              We do not cover damage from misuse, accidents, vandalism or
              modification after delivery.
            </p>
          </Block>

          <Block title="4. 48-hour delivery damage reporting window">
            <p>
              If a plate arrives damaged you must tell us within{" "}
              <strong>48 hours</strong> of delivery. Include:
            </p>
            <ul className="mt-3 space-y-1.5">
              <Li>Clear photos of the damage</Li>
              <Li>Photos of the packaging it arrived in</Li>
              <Li>Your order number</Li>
            </ul>
            <p className="mt-3">
              DPD may require an inspection before we dispatch a replacement.
              Once they&apos;re satisfied — or right away if the damage is
              obvious — we&apos;ll press and dispatch a free replacement.
            </p>
            <p className="mt-3">
              Reports raised after 48 hours may not be eligible for free
              replacement.
            </p>
          </Block>

          <Block title="5. Customer input errors">
            <p>
              If a plate is pressed incorrectly because of an error in your
              registration entry, finish choice or address, the plate is not
              eligible for a refund — we pressed exactly what was ordered.
            </p>
            <p className="mt-3">
              As a goodwill gesture we may offer a discounted remake. Email us
              with your order number and we&apos;ll do what we can.
            </p>
          </Block>

          <Block title="6. 3-year manufacturing-defect warranty">
            <p>
              Every road legal plate carries a <strong>3-year warranty</strong>{" "}
              against manufacturing defects in normal road use — peeling
              characters, fading colour, separating gel, retroreflective
              failure.
            </p>
            <p className="mt-3">
              The warranty does not cover accidental damage, abrasion (e.g.
              jet-wash damage at point-blank range), vandalism, modification or
              show plates fitted to a road-going vehicle.
            </p>
          </Block>

          <Block title="7. How to request help">
            <p>
              Email{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="font-medium text-neutral-900 underline underline-offset-2"
              >
                {COMPANY.email}
              </a>{" "}
              with your order number and a short description of the issue
              (plus photos for damage / faults). We&apos;ll come back to you
              with next steps within one working hour during support hours.
            </p>
          </Block>

          <Block title="8. Refund method">
            <p>
              Refunds are issued to the original payment method via Stripe and
              typically reach your account within{" "}
              <strong>5–10 working days</strong>, depending on your bank.
            </p>
            <p className="mt-3">
              Where an order is cancelled before dispatch, we refund the full
              amount minus any non-refundable Stripe payment processing fees.
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

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
      <span>{children}</span>
    </li>
  );
}

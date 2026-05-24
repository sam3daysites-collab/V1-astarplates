import Link from "next/link";
import PlatePreview from "@/components/PlatePreview";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import { PLATE_PRODUCTS, ROAD_LEGAL_PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Premium UK Number Plates — Pressed Same Day",
  description:
    "Road legal 2D, 3D Gel, 4D and 4D Gel number plates pressed to BS AU 145e. Same-day dispatch, document verified, free UK delivery on orders over £30.",
  path: "/",
});

const trustPoints = [
  {
    title: "BS AU 145e compliant",
    body: "Every road legal plate meets the latest 2021 British Standard for road use, MOT and DVLA acceptance.",
  },
  {
    title: "Document verified",
    body: "We verify your V5C, driving licence or lease document before pressing — keeping you on the right side of the law.",
  },
  {
    title: "Pressed same day",
    body: "Order before 2pm on a working day and your plates are pressed, printed and dispatched the same day.",
  },
  {
    title: "Free UK delivery",
    body: "Free tracked delivery on every UK order over £30. Next-day options available at checkout.",
  },
];

const faqs = [
  {
    q: "Are your plates road legal?",
    a: "Our Standard 2D, 3D Gel, 4D and 4D Gel plates are all manufactured to BS AU 145e and are fully road legal in the UK. Show plates are display-only and must not be fitted to a vehicle driven on a public road.",
  },
  {
    q: "What documents do I need to buy road legal plates?",
    a: "UK law requires us to verify your name, address and entitlement to the registration before pressing road legal plates. You'll need proof of identity (driving licence, passport) and proof of entitlement (V5C, V778, lease or hire agreement).",
  },
  {
    q: "How fast will my plates arrive?",
    a: "Order before 2pm Monday to Friday and we press and dispatch the same working day. Standard tracked UK delivery typically arrives within 1–2 working days. Next-day delivery is available at checkout.",
  },
  {
    q: "Can I use show plates on the road?",
    a: "No. Show plates are for off-road use, car shows and private property only. Displaying non-compliant plates on a public road can result in a £1,000 fine and a failed MOT.",
  },
  {
    q: "Do you offer fitting kits?",
    a: "Yes — pick up a fixing kit (£4.99) or adhesive sticky strips (£3.99) at checkout. Both are designed to fit standard UK plate mounting points.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ProductGrid />
      <BuilderCallout />
      <ComplianceStrip />
      <FinalCTA />
      <FAQSection items={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbSchema([{ name: "Home", path: "/" }]),
          ),
        }}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            UK Made · BS AU 145e
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Premium number plates,
            <span className="block bg-gradient-to-r from-white via-[#f4e4a1] to-[#d4af37] bg-clip-text text-transparent">
              pressed the same day.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            Road legal 2D, 3D Gel, 4D and 4D Gel plates — built in-house to the
            2021 British Standard. Show plates too, for off-road only. Built
            properly, built fast.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black shadow-[0_18px_40px_-18px_rgba(212,175,55,0.7)] transition hover:bg-[#e6c14d]"
            >
              Build my plate →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              View pricing
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="text-white/50">Pressed</dt>
              <dd className="mt-1 text-base font-semibold text-white">
                Same day
              </dd>
            </div>
            <div>
              <dt className="text-white/50">Compliance</dt>
              <dd className="mt-1 text-base font-semibold text-white">
                BS AU 145e
              </dd>
            </div>
            <div>
              <dt className="text-white/50">Delivery</dt>
              <dd className="mt-1 text-base font-semibold text-white">
                Tracked UK
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-[#d4af37]/20 via-transparent to-transparent blur-2xl" />
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black p-8 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Live Preview
            </p>
            <div className="mt-6 flex flex-col items-center gap-5">
              <PlatePreview
                registration="A* 1"
                style="4d-gel"
                size="lg"
                position="front"
              />
              <PlatePreview
                registration="A* 1"
                style="4d-gel"
                size="lg"
                position="rear"
              />
            </div>
            <div className="mt-8 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm">
              <span className="text-white/60">4D Gel pair, road legal</span>
              <span className="font-semibold text-[#d4af37]">£37.99</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="border-y border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point) => (
          <div key={point.title}>
            <p className="text-sm font-semibold tracking-tight text-neutral-900">
              {point.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {point.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductGrid() {
  return (
    <section className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Our plates
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Pick a finish. We&apos;ll press it today.
            </h2>
            <p className="mt-3 text-neutral-600">
              From a clean Standard 2D to a flagship 4D Gel, every road legal
              plate is BS AU 145e and DVLA approved.
            </p>
          </div>
          <Link
            href="/road-legal-number-plates"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            See all road legal plates →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLATE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong className="font-semibold">Show plates are display-only.</strong>{" "}
          They are not road legal and must not be fitted to a vehicle driven on
          a public road.
        </p>
      </div>
    </section>
  );
}

function BuilderCallout() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Plate Builder
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Type your reg. Preview live. Order in seconds.
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            Choose your finish, badge, border and size. Our builder previews
            the exact plate you&apos;ll receive — pixel-accurate to the inch.
          </p>
          <Link
            href="/builder"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c14d]"
          >
            Open the builder
          </Link>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black p-8">
          <div className="flex flex-col gap-4">
            {ROAD_LEGAL_PRODUCTS.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
              >
                <PlatePreview registration="A* 1" style={p.id} size="sm" />
                <div className="text-right">
                  <p className="text-sm font-semibold">{p.shortName}</p>
                  <p className="text-xs text-white/50">
                    from £{(p.singlePence / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplianceStrip() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Step 1
          </p>
          <h3 className="mt-3 text-lg font-semibold text-neutral-900">
            Build & verify
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            Design your plate in the builder and upload the documents required
            to confirm you&apos;re entitled to the registration.
          </p>
          <Link
            href="/documents-required"
            className="mt-4 inline-block text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            Documents required →
          </Link>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Step 2
          </p>
          <h3 className="mt-3 text-lg font-semibold text-neutral-900">
            We press & QC
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            Plates are pressed and printed in-house on premium reflective
            acrylic, then hand-checked against your order before dispatch.
          </p>
          <Link
            href="/compliance"
            className="mt-4 inline-block text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            Compliance & law →
          </Link>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Step 3
          </p>
          <h3 className="mt-3 text-lg font-semibold text-neutral-900">
            Tracked delivery
          </h3>
          <p className="mt-2 text-sm text-neutral-600">
            Free tracked UK delivery on orders over £30, with next-day options
            at checkout. Most orders arrive within 1–2 working days.
          </p>
          <Link
            href="/delivery"
            className="mt-4 inline-block text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            Delivery options →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_50%,rgba(212,175,55,0.16),transparent_70%)]"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
          Ready when you are
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Built today. On your car this week.
        </h2>
        <p className="mt-4 max-w-xl text-white/70">
          Design your plate in under a minute, upload your documents and
          we&apos;ll press, QC and dispatch the same working day.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c14d]"
          >
            Build my plate
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}

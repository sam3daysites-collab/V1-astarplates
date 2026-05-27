import Link from "next/link";
import PlatePreview from "@/components/PlatePreview";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import ImageSlot from "@/components/ImageSlot";
import { PLATE_PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";
import { getRecentFits, type RecentFit } from "@/data/siteImages";

export const metadata = buildMetadata({
  title: "Premium UK Number Plates — Pressed Same Day",
  description:
    "Road legal 2D, 3D Gel, 4D and 4D Gel number plates pressed to BS AU 145e. Free next-day delivery on orders before 11am Mon–Sat, document verified.",
  path: "/",
});

const trustChips = [
  { label: "BS AU 145e", note: "2021 standard" },
  { label: "DVLA Verified", note: "Document checked" },
  { label: "Same-Day Press", note: "Order by 11am" },
  { label: "Free DPD", note: "Tracked next-day" },
];

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
    title: "Free next-day delivery",
    body: "Free DPD tracked next-day on every order placed before 11am Mon–Sat. No minimum spend, no extras.",
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
    a: "Order before 11am Monday to Saturday and we press and dispatch your plates on the next working day's DPD run. Tracked, signed-for and free — no minimum spend.",
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
      <Eyebrow />
      <Hero />
      <TrustChips />
      <StyleGrid />
      <RecentFits />
      <BuilderCta />
      <ComplianceStrip />
      <TrustBand />
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

/* ------------------------------------------------------------------ */
/* Eyebrow — slim trust line above the hero on every page.            */
/* ------------------------------------------------------------------ */
function Eyebrow() {
  const points = [
    "BS AU 145e",
    "DVLA Registered Supplier",
    "Free Next-Day DPD",
    "Pressed Same Day",
  ];
  return (
    <section
      aria-label="Trust"
      className="border-b border-neutral-200 bg-[var(--brand-cream)]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-600">
        {points.map((p) => (
          <span key={p} className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — cream base, dark-green headline, gold CTA, large live plate. */
/* No image placeholder inside the preview card; clean & finished.    */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_70%_at_20%_10%,rgba(212,175,55,0.10),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)]/40 to-transparent"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/40 bg-[var(--brand-cream-warm)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
            UK Made · BS AU 145e
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
            Premium number plates,
            <span className="block text-[var(--brand-lime)]">
              pressed the same day.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600">
            Road legal 2D, 3D Gel, 4D and 4D Gel plates — built in-house to the
            2021 British Standard. Show plates too, for off-road only. Built
            properly, built fast.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/builder"
              className="touch-target inline-flex items-center justify-center rounded-md bg-[var(--brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--brand-lime)] shadow-[0_18px_40px_-18px_rgba(212,175,55,0.55)] transition hover:bg-[#e6c14d]"
            >
              Build my plate →
            </Link>
            <Link
              href="/pricing"
              className="touch-target inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-[var(--brand-gold)]"
            >
              View pricing
            </Link>
          </div>
        </div>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-[var(--brand-gold)]/15 via-transparent to-[var(--brand-lime)]/5 blur-2xl"
          />
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(26,46,5,0.4)] sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/60">
                Live Preview
              </p>
              <span className="rounded-full border border-[var(--brand-gold)]/50 bg-[var(--brand-cream)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-lime)]">
                4D Gel · pair
              </span>
            </div>
            <div className="mt-6 flex flex-col items-center gap-5">
              <PlatePreview
                registration="A★ 1"
                style="4d-gel"
                size="lg"
                position="front"
              />
              <PlatePreview
                registration="A★ 1"
                style="4d-gel"
                size="lg"
                position="rear"
              />
            </div>
            <div className="mt-8 flex items-center justify-between rounded-xl border border-neutral-200 bg-[var(--brand-cream)] px-4 py-3 text-sm">
              <span className="text-neutral-600">4D Gel pair, road legal</span>
              <span className="font-semibold text-[var(--brand-lime)]">
                £37.99
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust chips — pill row beneath the hero, above the style cards.    */
/* ------------------------------------------------------------------ */
function TrustChips() {
  return (
    <section className="border-y border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {trustChips.map((chip) => (
            <li
              key={chip.label}
              className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-[var(--brand-cream)] px-4 py-3"
            >
              <span
                aria-hidden
                className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[var(--brand-gold)]/20 ring-1 ring-[var(--brand-gold)]/40"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[var(--brand-lime)]">
                  {chip.label}
                </p>
                <p className="truncate text-xs text-neutral-600">{chip.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Style grid — 5 plate styles. Snap-scroll on mobile, 5-col on xl.   */
/* Compare-prices link sits inline with the header.                   */
/* ------------------------------------------------------------------ */
function StyleGrid() {
  return (
    <section className="bg-[var(--brand-cream)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
              Our plates
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Pick a finish. We&apos;ll press it today.
            </h2>
            <p className="mt-3 text-neutral-600">
              Five premium finishes — Standard 2D, 3D Gel, 4D, 4D Gel and
              4D Retro. Every road legal plate is BS AU 145e and DVLA approved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/pricing"
              className="text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
            >
              Compare prices →
            </Link>
            <Link
              href="/choose-style"
              className="text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
            >
              Compare styles →
            </Link>
          </div>
        </div>

        {/* Mobile: snap scroller */}
        <div className="mt-10 -mx-6 px-6 lg:hidden">
          <div className="snap-row flex gap-4 overflow-x-auto pb-4">
            {PLATE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="min-w-[78vw] max-w-[82vw] flex-shrink-0 sm:min-w-[44vw] sm:max-w-[46vw]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 5-col row at xl, 3-col at lg */}
        <div className="mt-10 hidden gap-6 lg:grid lg:grid-cols-3 xl:grid-cols-5">
          {PLATE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-10 rounded-xl border border-[var(--brand-gold)]/40 bg-[var(--brand-cream-warm)] px-5 py-4 text-sm text-neutral-800">
          <strong className="font-semibold text-[var(--brand-lime)]">
            Need a show plate?
          </strong>{" "}
          Show is a{" "}
          <Link
            href="/show-plates"
            className="underline underline-offset-2 hover:text-[var(--brand-lime)]"
          >
            mode
          </Link>{" "}
          applied to any of these finishes — display-only and not road legal.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Recent fits — manifest-driven, placeholders until real photos land. */
/* ------------------------------------------------------------------ */
function RecentFits() {
  const fits = getRecentFits(4);
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
              Recent fits
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Pressed last week. Fitted yesterday.
            </h2>
            <p className="mt-3 text-neutral-600">
              A handful of plates from recent orders. Real customer fits — final
              photos coming soon.
            </p>
          </div>
          <Link
            href="/builder"
            className="text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
          >
            Build yours →
          </Link>
        </div>

        {/* Mobile: snap row */}
        <div className="mt-10 -mx-6 px-6 sm:hidden">
          <div className="snap-row flex gap-4 overflow-x-auto pb-4">
            {fits.map((fit) => (
              <RecentFitCard key={fit.reg} fit={fit} />
            ))}
          </div>
        </div>

        {/* sm+: grid */}
        <div className="mt-10 hidden grid-cols-2 gap-4 sm:grid sm:gap-6 lg:grid-cols-4">
          {fits.map((fit) => (
            <RecentFitCard key={fit.reg} fit={fit} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentFitCard({ fit }: { fit: RecentFit }) {
  return (
    <figure className="group min-w-[70vw] flex-shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-[var(--brand-gold)] sm:min-w-0">
      {fit.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fit.image.src}
          alt={fit.image.alt}
          width={fit.image.width}
          height={fit.image.height}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <ImageSlot
          kind="recent-fit"
          alt={`${fit.vehicle} fitted with ${fit.styleId} plate ${fit.reg}`}
          label={fit.vehicle}
          rounded="md"
          className="rounded-none border-0"
        />
      )}
      <figcaption className="flex items-center justify-between gap-2 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            {fit.vehicle}
          </p>
          <p className="font-plate text-base font-bold tracking-wider text-neutral-900">
            {fit.reg}
          </p>
        </div>
        <span className="rounded-full border border-[var(--brand-gold)]/40 bg-[var(--brand-cream)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-lime)]">
          {fit.styleId.replace("-", " ")}
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Builder CTA — single dark-green band, gold buttons. Premium accent. */
/* ------------------------------------------------------------------ */
function BuilderCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_70%_at_80%_30%,rgba(212,175,55,0.18),transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:py-20 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">
            Plate Builder
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Type your reg. Preview live. Order in seconds.
          </h2>
          <p className="mt-4 max-w-lg text-white/80">
            Choose your finish, badge, border and size. Our builder previews
            the exact plate you&apos;ll receive — pixel-accurate to the inch.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/builder"
              className="touch-target inline-flex items-center justify-center rounded-md bg-[var(--brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
            >
              Build Your Plate →
            </Link>
            <Link
              href="/choose-style"
              className="touch-target inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-gold)]"
            >
              Compare styles
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-3">
            {PLATE_PRODUCTS.map((p) => (
              <Link
                key={p.id}
                href={`/builder?style=${p.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white px-3 py-3 text-neutral-900 transition hover:border-[var(--brand-gold)] hover:shadow-[0_10px_30px_-18px_rgba(212,175,55,0.6)] sm:px-4"
              >
                <PlatePreview registration="A★ 1" style={p.id} size="sm" />
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-900">
                    {p.shortName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    from £{(p.singlePence / 100).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Compliance — white, three step cards.                              */
/* ------------------------------------------------------------------ */
function ComplianceStrip() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Three steps, one working day.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ProcessCard
            n={1}
            title="Build & verify"
            body="Design your plate in the builder and upload the documents required to confirm you're entitled to the registration."
            href="/documents-required"
            cta="Documents required"
          />
          <ProcessCard
            n={2}
            title="We press & QC"
            body="Plates are pressed and printed in-house on premium reflective acrylic, then hand-checked against your order before dispatch."
            href="/compliance"
            cta="Compliance & law"
          />
          <ProcessCard
            n={3}
            title="Free next-day delivery"
            body="DPD tracked next-day on every order placed before 11am Monday to Saturday. No minimum spend."
            href="/delivery"
            cta="Delivery options"
          />
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  n,
  title,
  body,
  href,
  cta,
}: {
  n: number;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-[var(--brand-cream)] p-6 transition hover:border-[var(--brand-gold)]">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--brand-gold)] text-xs font-bold text-[var(--brand-lime)]">
          {n}
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          Step {n}
        </p>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{body}</p>
      <Link
        href={href}
        className="mt-4 inline-block text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
      >
        {cta} →
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trust band — full-width cream, four neutral trust points.           */
/* ------------------------------------------------------------------ */
function TrustBand() {
  return (
    <section className="border-t border-neutral-200 bg-[var(--brand-cream)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point) => (
          <div key={point.title}>
            <p className="text-sm font-semibold tracking-tight text-[var(--brand-lime)]">
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

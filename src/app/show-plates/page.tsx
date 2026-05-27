import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import PlatePreview from "@/components/PlatePreview";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";
import { SHOW_FLAG_FEE_PENCE } from "@/lib/pricing";
import { formatGBP } from "@/lib/utils";

const SLUG = "show-plates";

export const metadata = buildMetadata({
  title: "Show Plates — Custom Off-Road Display Plates",
  description:
    "Custom show plates for car shows, photography, off-road and private property. NOT road legal. Pick any of our 5 finishes in Show mode in the builder.",
  path: `/${SLUG}`,
});

const faqs = [
  {
    q: "Can I drive on the road with show plates?",
    a: "No. Show plates are not road legal. Displaying them on a vehicle driven on a public road can result in a £1,000 fine, an MOT failure, ANPR flagging and may invalidate your insurance.",
  },
  {
    q: "Do show plates need documents?",
    a: "No. Because show plates are not road legal and not for use on a public road, we do not require ID or entitlement documents.",
  },
  {
    q: "What customisations are available?",
    a: "Custom fonts, colours, borders, country flags, custom spacing, oversized formats. Anything goes — provided you're not putting them on a road-going vehicle.",
  },
  {
    q: "How is a show plate priced?",
    a: `Show plates use the same base price as the chosen finish. A country flag on the left strip is an optional ${formatGBP(SHOW_FLAG_FEE_PENCE)} per plate.`,
  },
];

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <span className="inline-flex rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-red-200 ring-1 ring-red-400/40">
            Not road legal
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Show plates — pick any finish, add custom flair, off-road only.
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Show plates are a <strong>mode</strong>, not a separate product.
            Choose any of our five finishes in the builder, toggle to Show
            mode, and configure custom spacing, country flags and layout. They
            are display-only and must not be fitted to a vehicle driven on a
            public road.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="touch-target inline-flex items-center justify-center rounded-lg bg-[var(--brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
            >
              Build a show plate →
            </Link>
            <Link
              href="/road-legal-number-plates"
              className="touch-target inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-gold)]"
            >
              Need road legal?
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-cream)]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_30px_80px_-40px_rgba(26,46,5,0.4)]">
              <div className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-[var(--brand-cream)] px-6 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
                  Show plate preview
                </p>
                <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-700 ring-1 ring-red-200">
                  Show
                </span>
              </div>
              <div
                className="flex flex-col items-center gap-6 px-6 py-10"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 70% at 50% 0%, rgba(212,175,55,0.10), transparent 60%)",
                }}
              >
                <PlatePreview
                  registration="AB12 CDE"
                  style="4d-gel"
                  mode="show"
                  size="lg"
                  position="front"
                  showCountryCode="GB"
                  showCountryName="United Kingdom"
                />
                <PlatePreview
                  registration="AB12 CDE"
                  style="4d-gel"
                  mode="show"
                  size="lg"
                  position="rear"
                  showCountryCode="GB"
                  showCountryName="United Kingdom"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                What you can change
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <Bullet>Any of our 5 finishes (2D, 3D Gel, 4D, 4D Gel, 4D Retro)</Bullet>
                <Bullet>Custom registration text and spacing</Bullet>
                <Bullet>Optional country flag (+£2.99 per plate)</Bullet>
                <Bullet>Oversized, square or motorbike formats</Bullet>
                <Bullet>Front white, rear yellow (same as road legal)</Bullet>
              </ul>
              <h2 className="mt-10 text-2xl font-semibold tracking-tight text-neutral-900">
                What you can&apos;t do
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <Bullet>Fit them to a vehicle driven on a public road</Bullet>
                <Bullet>Use them at MOT</Bullet>
                <Bullet>Use them as a replacement for your road legal plates</Bullet>
              </ul>
              <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                <strong>Penalty for misuse:</strong> £1,000 fine, MOT failure,
                ANPR flagging and possible plate confiscation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Show plate FAQ" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Show Plates", path: `/${SLUG}` },
            ]),
          ),
        }}
      />
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
      {children}
    </li>
  );
}

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PlatePreview, { type PlateStyle } from "@/components/PlatePreview";
import { PLATE_PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { formatGBP } from "@/lib/utils";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Choose Your Number Plate Style",
  description:
    "Select the perfect plate style for your vehicle. Each style offers unique character and premium quality. All BS AU 145e compliant and road legal.",
  path: "/choose-style",
});

// Quick at-a-glance attributes — derived from the existing PLATE_PRODUCTS data.
const STYLE_ATTRS: Record<
  string,
  { depth: string; shine: string; vibe: string }
> = {
  "standard-2d": { depth: "Flat", shine: "Matte", vibe: "Classic" },
  "3d-gel": { depth: "Domed", shine: "Glossy", vibe: "Popular" },
  "4d": { depth: "Raised 3mm", shine: "Satin", vibe: "Bold" },
  "4d-gel": { depth: "Raised + dome", shine: "High gloss", vibe: "Flagship" },
  "4d-retro": { depth: "Chamfered", shine: "Satin", vibe: "Show-stopper" },
};

export default function ChooseStylePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">
            Choose Style
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Pick the perfect finish for your vehicle.
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Each style offers unique character and premium quality. All five
            finishes are DVLA compliant and road-legal capable — you can also
            order any of them as a show plate in the builder.
          </p>
        </div>
      </section>

      <section className="bg-[var(--brand-cream)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLATE_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* Comparison row — same data, compact glance. */}
          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
                  At a glance
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                  Compare every finish
                </h2>
              </div>
              <Link
                href="/pricing"
                className="hidden text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline sm:inline"
              >
                Full pricing →
              </Link>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-[var(--brand-cream)] text-[var(--brand-lime)]">
                  <tr>
                    <th
                      scope="col"
                      className="sticky left-0 z-10 bg-[var(--brand-cream)] px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    >
                      Finish
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    >
                      Preview
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    >
                      Depth
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    >
                      Shine
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    >
                      Best for
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                    />
                  </tr>
                </thead>
                <tbody>
                  {PLATE_PRODUCTS.map((p, idx) => {
                    const attrs = STYLE_ATTRS[p.id] ?? {
                      depth: "—",
                      shine: "—",
                      vibe: "—",
                    };
                    const isRecommended = p.id === "4d-gel";
                    return (
                      <tr
                        key={p.id}
                        className={
                          idx % 2 === 0
                            ? "bg-white"
                            : "bg-[var(--brand-cream)]/40"
                        }
                      >
                        <th
                          scope="row"
                          className="sticky left-0 z-10 whitespace-nowrap bg-inherit px-4 py-3 align-middle font-semibold text-neutral-900"
                        >
                          <span className="inline-flex items-center gap-2">
                            {p.shortName}
                            {isRecommended && (
                              <span className="rounded-full bg-[var(--brand-gold)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-lime)]">
                                Recommended
                              </span>
                            )}
                          </span>
                        </th>
                        <td className="px-4 py-3 align-middle">
                          <PlatePreview
                            registration="A★ 1"
                            style={p.id as PlateStyle}
                            size="sm"
                            compact
                          />
                        </td>
                        <td className="px-4 py-3 align-middle text-neutral-700">
                          {attrs.depth}
                        </td>
                        <td className="px-4 py-3 align-middle text-neutral-700">
                          {attrs.shine}
                        </td>
                        <td className="px-4 py-3 align-middle text-neutral-700">
                          {attrs.vibe}
                        </td>
                        <td className="px-4 py-3 align-middle font-semibold text-neutral-900">
                          {formatGBP(p.singlePence)}
                        </td>
                        <td className="px-4 py-3 align-middle text-right">
                          <Link
                            href={`/builder?style=${p.id}`}
                            className="inline-flex items-center justify-center rounded-md bg-[var(--brand-gold)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
                          >
                            Build
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-neutral-500 sm:hidden">
              Swipe to compare →
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-[var(--brand-gold)]/30 bg-white p-6 text-sm text-neutral-700">
            <p>
              <strong className="text-[var(--brand-lime)]">
                Not sure which to choose?
              </strong>{" "}
              All styles are BS AU 145e compliant and road legal — the
              difference is finish, not legality. 3D Gel is our most popular,
              4D Gel is our flagship.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="touch-target inline-flex items-center justify-center rounded-lg bg-[var(--brand-lime)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-lime-hover)]"
            >
              Build my plate →
            </Link>
            <Link
              href="/pricing"
              className="touch-target inline-flex items-center text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Choose Style", path: "/choose-style" },
            ]),
          ),
        }}
      />
    </>
  );
}

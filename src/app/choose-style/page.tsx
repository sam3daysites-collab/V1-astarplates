import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PLATE_PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Choose Your Number Plate Style",
  description:
    "Select the perfect plate style for your vehicle. Each style offers unique character and premium quality. All BS AU 145e compliant and road legal.",
  path: "/choose-style",
});

export default function ChooseStylePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
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

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLATE_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700">
            <p>
              <strong className="text-neutral-900">Not sure which to choose?</strong>{" "}
              All styles are BS AU 145e compliant and road legal — the
              difference is finish, not legality. 3D Gel is our most popular,
              4D Gel is our flagship.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-lime)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-lime-hover)]"
            >
              Build my plate
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
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

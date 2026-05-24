import Link from "next/link";
import PlatePreview, { type PlateStyle } from "./PlatePreview";
import type { PlateProduct } from "@/lib/products";
import { formatGBP } from "@/lib/utils";

interface ProductPageBodyProps {
  product: PlateProduct;
}

export default function ProductPageBody({ product }: ProductPageBodyProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <Link
              href={product.roadLegal ? "/road-legal-number-plates" : "/show-plates"}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]"
            >
              ← {product.roadLegal ? "Road legal plates" : "Show plates"}
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-lg text-white/70">{product.description}</p>

            <ul className="mt-8 space-y-2 text-sm text-white/80">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-end gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Single
                </p>
                <p className="mt-1 text-3xl font-semibold">
                  {formatGBP(product.singlePence)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Pair
                </p>
                <p className="mt-1 text-3xl font-semibold">
                  {formatGBP(product.pairPence)}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/builder?style=${product.id}`}
                className="inline-flex items-center justify-center rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c14d]"
              >
                Build this plate
              </Link>
              <Link
                href={product.roadLegal ? "/compliance" : "/road-legal-number-plates"}
                className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                {product.roadLegal ? "Compliance details" : "Need road legal?"}
              </Link>
            </div>

            {!product.roadLegal && (
              <p className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
                <strong className="font-semibold">Not road legal.</strong> Show
                plates are display-only. They must not be fitted to a vehicle
                driven on a public road.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Front
            </p>
            <div className="mt-3 flex justify-center">
              <PlatePreview
                registration="A* 1"
                style={product.id as PlateStyle}
                size="lg"
                position="front"
              />
            </div>
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-white/40">
              Rear
            </p>
            <div className="mt-3 flex justify-center">
              <PlatePreview
                registration="A* 1"
                style={product.id as PlateStyle}
                size="lg"
                position="rear"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h3 className="text-base font-semibold text-neutral-900">
              {product.roadLegal ? "Road legal" : "Display only"}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {product.roadLegal
                ? "Pressed to BS AU 145e. MOT-ready, DVLA accepted."
                : "For shows, photography and private property only."}
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h3 className="text-base font-semibold text-neutral-900">
              Same-day press
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Order before 2pm Mon–Fri and we&apos;ll press and dispatch your
              plates the same day.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h3 className="text-base font-semibold text-neutral-900">
              Tracked UK delivery
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Free over £30, next-day options available at checkout.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

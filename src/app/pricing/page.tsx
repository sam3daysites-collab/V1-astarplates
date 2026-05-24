import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PLATE_PRODUCTS } from "@/lib/products";
import { ACCESSORY_PRICES } from "@/lib/pricing";
import { formatGBP } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing — Number Plates & Accessories",
  description:
    "Simple, fixed pricing for road legal and show plates. Standard 2D from £16.99. Pairs from £26.99. Free UK delivery over £30.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Pricing
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Honest, fixed pricing.
          </h1>
          <p className="mt-4 text-neutral-600">
            No hidden fees. Every road legal plate is pressed to BS AU 145e.
            Free tracked UK delivery on orders over £30.
          </p>
        </header>

        <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] divide-y divide-neutral-200 text-sm">
              <thead className="bg-neutral-50 text-left">
                <tr>
                  <th className="px-4 py-4 font-semibold text-neutral-900 sm:px-6">
                    Plate
                  </th>
                  <th className="px-4 py-4 font-semibold text-neutral-900 sm:px-6">
                    Single
                  </th>
                  <th className="px-4 py-4 font-semibold text-neutral-900 sm:px-6">
                    Pair
                  </th>
                  <th className="px-4 py-4 font-semibold text-neutral-900 sm:px-6">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {PLATE_PRODUCTS.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-4 sm:px-6">
                      <Link
                        href={`/${p.slug}`}
                        className="font-medium text-neutral-900 hover:underline"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-neutral-700 sm:px-6">
                      {formatGBP(p.singlePence)}
                    </td>
                    <td className="px-4 py-4 text-neutral-700 sm:px-6">
                      {formatGBP(p.pairPence)}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      {p.roadLegal ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          Road legal
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                          Show only
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
          >
            Build my plate
          </Link>
          <Link
            href="/road-legal-number-plates"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Browse road legal plates →
          </Link>
        </div>

        <h2 className="mt-16 text-xl font-semibold tracking-tight text-neutral-900">
          Accessories
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-semibold text-neutral-900">Fixing kit</p>
            <p className="mt-1 text-sm text-neutral-600">
              Screws, caps and rawl plugs — everything to fit a standard pair.
            </p>
            <p className="mt-3 text-lg font-semibold">
              {formatGBP(ACCESSORY_PRICES["fixing-kit"].price)}
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-semibold text-neutral-900">
              Adhesive sticky strips
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              Heavy-duty foam adhesive pads for stick-on fitting.
            </p>
            <p className="mt-3 text-lg font-semibold">
              {formatGBP(ACCESSORY_PRICES["adhesive-strips"].price)}
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-900 p-8 text-white">
          <h2 className="text-xl font-semibold">Delivery</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <li>Standard tracked UK delivery — £3.99</li>
            <li>Free tracked delivery on orders over £30</li>
            <li>Next-day delivery available at checkout</li>
            <li>Same-day dispatch on orders before 2pm Mon–Fri</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

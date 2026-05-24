import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PLATE_PRODUCTS } from "@/lib/products";
import { ACCESSORIES } from "@/lib/accessories";
import { DELIVERY } from "@/lib/policies";
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
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Road legal · Show mode
                      </span>
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
          {Object.values(ACCESSORIES).map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
            >
              <p className="text-sm font-semibold text-neutral-900">{a.name}</p>
              <p className="mt-1 text-sm text-neutral-600">{a.description}</p>
              <p className="mt-3 text-lg font-semibold">
                {formatGBP(a.pricePence)}
                {a.positionPriced ? (
                  <span className="ml-1 text-sm font-normal text-neutral-500">
                    per plate
                  </span>
                ) : (
                  <span className="ml-1 text-sm font-normal text-neutral-500">
                    per pack of 4
                  </span>
                )}
              </p>
              <p className="mt-2 text-xs italic text-neutral-500">
                {a.tooltip}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-[var(--brand-lime)]/30 bg-[var(--brand-lime)]/[0.04] px-4 py-3 text-sm text-[var(--brand-lime)]">
          <strong className="font-semibold">DVLA recommends</strong> adhesive
          strips over fixing kits for a cleaner finish.
        </p>

        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-900 p-8 text-white">
          <h2 className="text-xl font-semibold">Delivery</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            <li>
              {DELIVERY.serviceName} — <strong>free</strong>
            </li>
            <li>
              Order by {DELIVERY.cutoffTime} {DELIVERY.cutoffDays} for next-day
            </li>
            <li>Tracked and signed-for as standard</li>
            <li>{DELIVERY.destinations} — extras may apply to NI / Highlands</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

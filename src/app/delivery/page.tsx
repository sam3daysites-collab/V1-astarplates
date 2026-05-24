import { buildMetadata } from "@/lib/seo";
import { formatGBP } from "@/lib/utils";
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING,
} from "@/lib/pricing";

export const metadata = buildMetadata({
  title: "Delivery — Same-Day Dispatch, Tracked UK",
  description:
    "Order before 2pm Monday to Friday for same-day dispatch. Tracked UK delivery from £3.99, free over £30.",
  path: "/delivery",
});

const options = [
  {
    name: "Standard tracked",
    eta: "1–2 working days",
    price: formatGBP(STANDARD_SHIPPING),
    note: "Royal Mail Tracked 48 or equivalent.",
  },
  {
    name: "Express next-day",
    eta: "Next working day",
    price: "From £6.99",
    note: "DPD or Royal Mail Tracked 24, order by 2pm.",
  },
  {
    name: "Saturday delivery",
    eta: "Saturday",
    price: "From £9.99",
    note: "Order by Friday 12pm. Mainland UK only.",
  },
];

export default function DeliveryPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Delivery
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Same-day dispatch. Tracked UK.
          </h1>
          <p className="mt-4 text-neutral-600">
            Plates ordered before 2pm Monday to Friday are pressed and shipped
            the same working day. Free standard delivery on orders over{" "}
            {formatGBP(FREE_SHIPPING_THRESHOLD)}.
          </p>
        </header>

        <div className="mt-12 grid gap-4">
          {options.map((opt) => (
            <div
              key={opt.name}
              className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-base font-semibold text-neutral-900">
                  {opt.name}
                </p>
                <p className="text-sm text-neutral-600">{opt.note}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500">{opt.eta}</p>
                <p className="text-lg font-semibold text-neutral-900">
                  {opt.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-base font-semibold text-neutral-900">
              Verification time
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              For road legal plates, dispatch happens after we verify your
              documents — usually within an hour during working hours.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-base font-semibold text-neutral-900">
              Tracking
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              You&apos;ll receive a tracking link by email as soon as your
              plates leave us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

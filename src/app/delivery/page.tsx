import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { DELIVERY, PRODUCTION } from "@/lib/policies";

export const metadata = buildMetadata({
  title: "Delivery — Free DPD Next-Day, Order Before 11am Mon–Sat",
  description:
    "Free next-day delivery on every plate order placed before 11am Monday to Saturday. Tracked, signed-for DPD service across UK mainland.",
  path: "/delivery",
});

export default function DeliveryPage() {
  return (
    <>
      <section className="bg-[var(--brand-lime)] text-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Delivery
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {DELIVERY.headline}.
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            {DELIVERY.subheadline}. Tracked, signed-for {DELIVERY.serviceName} —
            no extra cost, no minimum spend.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-lg bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0d1929] transition hover:bg-[#e6c14d]"
            >
              Build Your Plate
            </Link>
            <Link
              href="/documents-required"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Documents required
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-2">
            <Card title="Next-day delivery" price="Free">
              {DELIVERY.serviceNote} Order by{" "}
              <strong>{DELIVERY.cutoffTime}</strong> {DELIVERY.cutoffDays} and
              your plates are on the next working day&apos;s run.
            </Card>
            <Card title="Cut-off" price={DELIVERY.cutoffTime}>
              We start pressing the moment your order (and, for road legal
              plates, your documents) is verified.
            </Card>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Note title="Road legal plates">{PRODUCTION.roadLegal.body}</Note>
            <Note title="Show plates">{PRODUCTION.showPlates.body}</Note>
          </div>

          <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-700">
            <p className="font-semibold text-neutral-900">Where we deliver</p>
            <p className="mt-2">
              {DELIVERY.destinations} via DPD tracked next-day. Northern
              Ireland, Scottish Highlands and islands may have an extra working
              day in transit; we&apos;ll flag any exceptions at checkout.
            </p>
            <p className="mt-3">
              Risk transfers on delivery. Tracking confirmation from DPD is
              prima facie evidence of delivery.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({
  title,
  price,
  children,
}: {
  title: string;
  price: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {price}
        </span>
      </div>
      <p className="mt-3 text-sm text-neutral-700">{children}</p>
    </div>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6">
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-700">{children}</p>
    </div>
  );
}

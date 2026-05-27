import Link from "next/link";
import PlatePreview, { type PlateStyle } from "./PlatePreview";
import ImageSlot from "./ImageSlot";
import ProductCard from "./ProductCard";
import { PLATE_PRODUCTS, type PlateProduct } from "@/lib/products";
import { formatGBP } from "@/lib/utils";

interface ProductPageBodyProps {
  product: PlateProduct;
}

const GALLERY_LABELS = [
  "Front + rear pair",
  "Macro detail",
  "Fitted to vehicle",
  "Pressed in-house",
] as const;

export default function ProductPageBody({ product }: ProductPageBodyProps) {
  const images = product.images ?? [];
  const relatedStyles = PLATE_PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-20 md:grid-cols-2">
          <div>
            <Link
              href="/choose-style"
              className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]"
            >
              ← All styles
            </Link>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-lg text-white/80">{product.description}</p>

            <ul className="mt-8 space-y-2 text-sm text-white/85">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-gold)]" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-end gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Single
                </p>
                <p className="mt-1 text-3xl font-semibold">
                  {formatGBP(product.singlePence)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
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
                className="touch-target inline-flex items-center justify-center rounded-lg bg-[var(--brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
              >
                Build this plate →
              </Link>
              <Link
                href="/compliance"
                className="touch-target inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-gold)]"
              >
                Compliance details
              </Link>
            </div>

            <p className="mt-6 rounded-xl border border-[var(--brand-gold)]/40 bg-[var(--brand-gold)]/10 p-4 text-sm text-[#f4e4a1]">
              <strong className="font-semibold text-white">
                Document verification required.
              </strong>{" "}
              Road legal plates only enter production after we verify your ID
              and entitlement.{" "}
              <Link
                href="/documents-required"
                className="underline underline-offset-2"
              >
                What you&apos;ll need →
              </Link>
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white p-6 text-neutral-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/60">
                Preview
              </p>
              <span className="rounded-full border border-[var(--brand-gold)]/50 bg-[var(--brand-cream)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-lime)]">
                {product.shortName} · pair
              </span>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Front
            </p>
            <div className="mt-2 flex justify-center">
              <PlatePreview
                registration="AB12 CDE"
                style={product.id as PlateStyle}
                size="lg"
                position="front"
              />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Rear
            </p>
            <div className="mt-2 flex justify-center">
              <PlatePreview
                registration="AB12 CDE"
                style={product.id as PlateStyle}
                size="lg"
                position="rear"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Showcase gallery — 4 slots. Lazy. Becomes real images later. */}
      <section className="bg-[var(--brand-cream)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
                Showcase
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                {product.shortName} in detail
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Macro shots, real fits and finish detail. Final photography
                coming soon.
              </p>
            </div>
            <Link
              href={`/builder?style=${product.id}`}
              className="text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
            >
              Build {product.shortName} →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_LABELS.map((label, i) => {
              const src = images[i];
              if (src) {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={label}
                    src={src}
                    alt={`${product.name} — ${label}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-2xl border border-neutral-200 object-cover"
                  />
                );
              }
              return (
                <ImageSlot
                  key={label}
                  kind="style"
                  ratio="4/3"
                  alt={`${product.name} — ${label}`}
                  label={label}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust strip — 4 brand cues, no new copy. */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <TrustItem
            title="Road legal"
            body="Pressed to BS AU 145e. MOT-ready, DVLA accepted, supplier-marked."
          />
          <TrustItem
            title="Same-day press"
            body="Order before 11am Mon–Sat and your plates go on the next working day's DPD run."
          />
          <TrustItem
            title="Free next-day"
            body="DPD tracked next-day, free on every order. No minimum spend."
          />
          <TrustItem
            title="Document verified"
            body="We verify your V5C, licence or lease before pressing — keeping you legal."
          />
        </div>
      </section>

      {/* Related styles — cross-link to other finishes. */}
      <section className="border-t border-neutral-200 bg-[var(--brand-cream)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
                Compare finishes
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                Other plate styles
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Every finish is road-legal capable, BS AU 145e and same-day
                pressed.
              </p>
            </div>
            <Link
              href="/choose-style"
              className="text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
            >
              Compare all styles →
            </Link>
          </div>

          {/* Mobile: snap scroll. Desktop: 4-col row. */}
          <div className="mt-8 -mx-6 px-6 md:hidden">
            <div className="snap-row flex gap-4 overflow-x-auto pb-4">
              {relatedStyles.map((p) => (
                <div
                  key={p.id}
                  className="min-w-[78vw] max-w-[82vw] flex-shrink-0"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
            {relatedStyles.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TrustItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-neutral-200 bg-[var(--brand-cream)] p-4">
      <span
        aria-hidden
        className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-[var(--brand-gold)]/20 ring-1 ring-[var(--brand-gold)]/40"
      >
        <span className="h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
      </span>
      <div>
        <p className="text-sm font-semibold text-[var(--brand-lime)]">
          {title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-600">{body}</p>
      </div>
    </div>
  );
}

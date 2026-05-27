import Link from "next/link";
import PlatePreview, { type PlateStyle } from "./PlatePreview";
import ImageSlot from "./ImageSlot";
import type { PlateProduct } from "@/lib/products";
import { formatGBP } from "@/lib/utils";

interface ProductCardProps {
  product: PlateProduct;
  previewReg?: string;
}

/**
 * Premium plate card.
 *
 * Media area: a single image slot now (lazy placeholder) with a small
 * PlatePreview chip overlaid bottom-left for instant style recognition.
 * When `product.images` is populated, the first image becomes the primary
 * photo and a future gallery can be wired up without a layout shift.
 */
export default function ProductCard({
  product,
  previewReg = "AB12 CDE",
}: ProductCardProps) {
  const hasImages = !!product.images && product.images.length > 0;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand-gold)] hover:shadow-[0_24px_60px_-32px_rgba(26,46,5,0.35)]">
      {product.badge && (
        <span className="absolute right-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-lime)] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-lime)]" />
          {product.badge}
        </span>
      )}

      {/* Media: image slot (or first image when available) + plate chip */}
      <div className="relative border-b border-neutral-200">
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images![0]}
            alt={`${product.name} showcase`}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <ImageSlot
            kind="style"
            ratio="4/3"
            alt={`${product.name} showcase image`}
            label={product.shortName}
            rounded="md"
            className="rounded-none border-0"
          />
        )}
        <span className="pointer-events-none absolute bottom-3 left-3 inline-flex rounded-md bg-white/95 px-2 py-1.5 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
          <PlatePreview
            registration={previewReg}
            style={product.id as PlateStyle}
            size="sm"
            compact
          />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-neutral-600">{product.tagline}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-neutral-700">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-gold)]" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between border-t border-neutral-100 pt-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              From
            </p>
            <p className="text-2xl font-semibold text-neutral-900">
              {formatGBP(product.singlePence)}
              <span className="ml-1 text-sm font-normal text-neutral-500">
                single
              </span>
            </p>
            <p className="text-xs text-neutral-500">
              Pair {formatGBP(product.pairPence)}
            </p>
          </div>
          <Link
            href={`/${product.slug}`}
            className="touch-target inline-flex items-center justify-center rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-lime)]"
          >
            Details
          </Link>
        </div>

        <Link
          href={`/builder?style=${product.id}`}
          className="touch-target mt-3 inline-flex items-center justify-center rounded-lg bg-[var(--brand-gold)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
        >
          Build this plate →
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link";
import PlatePreview, { type PlateStyle } from "./PlatePreview";
import type { PlateProduct } from "@/lib/products";
import { formatGBP } from "@/lib/utils";

interface ProductCardProps {
  product: PlateProduct;
  previewReg?: string;
}

export default function ProductCard({
  product,
  previewReg = "AB12 CDE",
}: ProductCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900 to-black text-white shadow-[0_30px_80px_-40px_rgba(212,175,55,0.25)] transition hover:border-[#d4af37]/40">
      {product.badge && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-[#d4af37] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
          {product.badge}
        </span>
      )}

      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
        <PlatePreview
          registration={previewReg}
          style={product.id as PlateStyle}
          size="md"
          compact
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
        <p className="mt-1 text-sm text-white/60">{product.tagline}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-white/70">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40">From</p>
            <p className="text-2xl font-semibold text-white">
              {formatGBP(product.singlePence)}
              <span className="ml-1 text-sm font-normal text-white/50">
                single
              </span>
            </p>
            <p className="text-xs text-white/50">
              Pair {formatGBP(product.pairPence)}
            </p>
          </div>
          <Link
            href={`/${product.slug}`}
            className="rounded-md border border-white/15 px-3 py-2 text-sm font-medium text-white/90 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]"
          >
            View
          </Link>
        </div>

        <Link
          href={`/builder?style=${product.id}`}
          className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#d4af37] px-4 py-2.5 text-sm font-semibold text-[#0d1929] transition hover:bg-[#e6c14d]"
        >
          Build this plate
        </Link>
      </div>
    </article>
  );
}

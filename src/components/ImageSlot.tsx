import { cn } from "@/lib/utils";

export type ImageSlotKind =
  | "hero"
  | "style"
  | "recent-fit"
  | "size-guide"
  | "accessory"
  | "blog";

interface ImageSlotProps {
  kind: ImageSlotKind;
  alt: string;
  ratio?: string;
  label?: string;
  priority?: boolean;
  className?: string;
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
}

const RATIO_DEFAULTS: Record<ImageSlotKind, string> = {
  hero: "16/10",
  style: "4/3",
  "recent-fit": "4/3",
  "size-guide": "16/9",
  accessory: "1/1",
  blog: "16/9",
};

const KIND_LABEL: Record<ImageSlotKind, string> = {
  hero: "Hero image",
  style: "Style photo",
  "recent-fit": "Recent fit",
  "size-guide": "Size guide",
  accessory: "Accessory",
  blog: "Blog cover",
};

const ROUNDED_CLASS = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

/**
 * Placeholder image slot — render an aspect-ratio box with cream surface and
 * gold corner marks. Swap to `next/image` (same `ratio`) when real images
 * arrive; no layout shift.
 */
export default function ImageSlot({
  kind,
  alt,
  ratio,
  label,
  priority = false,
  className,
  rounded = "2xl",
}: ImageSlotProps) {
  const aspectRatio = ratio ?? RATIO_DEFAULTS[kind];
  return (
    <div
      role="img"
      aria-label={alt}
      data-image-slot={kind}
      data-priority={priority ? "true" : undefined}
      className={cn(
        "relative isolate w-full overflow-hidden border border-[var(--brand-cream-warm)] bg-[var(--brand-cream)]",
        ROUNDED_CLASS[rounded],
        className,
      )}
      style={{ aspectRatio }}
    >
      {/* Subtle cream gradient + gold tint corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_30%_20%,rgba(212,175,55,0.10),transparent_70%)]"
      />
      {/* Gold corner marks */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-[var(--brand-gold)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-[var(--brand-gold)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 bottom-3 h-3 w-3 border-b-2 border-l-2 border-[var(--brand-gold)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 bottom-3 h-3 w-3 border-b-2 border-r-2 border-[var(--brand-gold)]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/60">
          {label ?? KIND_LABEL[kind]}
        </span>
        <span className="text-xs text-neutral-500">image coming soon</span>
      </div>
    </div>
  );
}

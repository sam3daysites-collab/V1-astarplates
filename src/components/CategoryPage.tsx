import Link from "next/link";
import ImageSlot from "./ImageSlot";
import { getCategoryImages } from "@/data/siteImages";

interface CategoryPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
  body?: React.ReactNode;
  /**
   * URL slug used to look up real images from the central manifest. When
   * the manifest has no entry the page still renders two placeholder slots.
   */
  slug?: string;
  /**
   * Optional captions for the 2-slot gallery. Falls back to eyebrow-derived
   * labels so the strip never looks like a broken image grid.
   */
  galleryLabels?: [string, string];
}

export default function CategoryPage({
  eyebrow,
  title,
  intro,
  bullets,
  primaryCtaHref = "/builder",
  primaryCtaLabel = "Build my plate",
  secondaryCtaHref = "/contact",
  secondaryCtaLabel = "Contact us",
  body,
  slug,
  galleryLabels,
}: CategoryPageProps) {
  const labels: [string, string] = galleryLabels ?? [
    `${eyebrow} — overview`,
    `${eyebrow} — detail`,
  ];
  const real = slug ? getCategoryImages(slug) : [];

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryCtaHref}
              className="touch-target inline-flex items-center justify-center rounded-lg bg-[var(--brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              href={secondaryCtaHref}
              className="touch-target inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-gold)]"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          {/* Image strip — 2 slots. Real images render when the manifest has
              entries for `slug`; otherwise placeholders. Both are lazy. */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {labels.map((label, i) => {
              const img = real[i];
              if (img) {
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={label}
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-xl border border-neutral-200 object-cover"
                  />
                );
              }
              return (
                <ImageSlot
                  key={label}
                  kind="style"
                  ratio="4/3"
                  alt={label}
                  label={label}
                  rounded="xl"
                />
              );
            })}
          </div>

          <ul className="mt-10 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 rounded-xl border border-neutral-200 bg-[var(--brand-cream)] p-4"
              >
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-gold)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {body && (
            <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-neutral-800">
              {body}
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-8">
            <Link
              href="/builder"
              className="touch-target inline-flex items-center justify-center rounded-lg bg-[var(--brand-lime)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-lime-hover)]"
            >
              Build my plate →
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
            >
              See pricing →
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
            >
              Talk to us →
            </Link>
          </div>
        </div>
      </section>

      {/* Related links strip — keeps every page connected to the funnel. */}
      <section className="border-t border-neutral-200 bg-[var(--brand-cream)]">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
            Keep exploring
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RelatedLink
              href="/choose-style"
              title="All plate styles"
              body="Standard 2D, 3D Gel, 4D, 4D Gel, 4D Retro."
            />
            <RelatedLink
              href="/pricing"
              title="Pricing"
              body="Singles, pairs and accessory pricing."
            />
            <RelatedLink
              href="/compliance"
              title="Compliance & law"
              body="BS AU 145e and UK road-legal rules."
            />
            <RelatedLink
              href="/number-plate-accessories"
              title="Accessories"
              body="Fixing kits, sticky strips, fittings."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function RelatedLink({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="touch-target group flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-[var(--brand-gold)] hover:shadow-sm"
    >
      <span
        aria-hidden
        className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-[var(--brand-gold)]/15 ring-1 ring-[var(--brand-gold)]/40 text-xs font-bold text-[var(--brand-lime)] transition group-hover:bg-[var(--brand-gold)]"
      >
        →
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-[var(--brand-lime)]">
          {title}
        </span>
        <span className="text-xs text-neutral-600">{body}</span>
      </span>
    </Link>
  );
}

import Link from "next/link";

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
}: CategoryPageProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryCtaHref}
              className="inline-flex items-center justify-center rounded-lg bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0d1929] transition hover:bg-[#e6c14d]"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <ul className="grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
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
              className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-lime)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-lime-hover)]"
            >
              Build my plate
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              See pricing →
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              Talk to us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — A★ Number Plates",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-[var(--brand-lime)] text-white">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-white/80">
          The page you&apos;re looking for has moved or never existed. Try one
          of these instead.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-[#d4af37] px-6 py-3 text-sm font-semibold text-[#0d1929] transition hover:bg-[#e6c14d]"
          >
            Home
          </Link>
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
          >
            Build a plate
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-white/80 underline-offset-4 hover:underline"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </section>
  );
}

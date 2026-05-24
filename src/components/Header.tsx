import Link from "next/link";
import { cn } from "@/lib/utils";
import { DELIVERY } from "@/lib/policies";

const navLinks: { href: string; label: string }[] = [
  { href: "/choose-style", label: "Choose Style" },
  { href: "/builder", label: "Build" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compliance", label: "Compliance" },
  { href: "/blog", label: "Guides" },
];

const secondaryLinks: { href: string; label: string }[] = [
  { href: "/documents-required", label: "Documents" },
  { href: "/delivery", label: "Delivery" },
  { href: "/returns-and-refunds", label: "Returns" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/5 text-white shadow-sm backdrop-blur",
        "bg-[var(--brand-lime)]/95 supports-[backdrop-filter]:bg-[var(--brand-lime)]/85",
        className,
      )}
    >
      <div className="border-b border-white/10 bg-black/20 text-center text-xs font-medium text-white sm:text-sm">
        <p className="mx-auto max-w-7xl px-6 py-2">
          <span className="text-[#d4af37]">Free Next Day Delivery</span>
          <span className="mx-2 hidden text-white/40 sm:inline">|</span>
          <span className="hidden sm:inline">
            On orders placed before {DELIVERY.cutoffTime} {DELIVERY.cutoffDays} via DPD tracked
          </span>
        </p>
      </div>

      <details className="group" name="primary-nav">
        <summary className="mx-auto flex max-w-7xl cursor-pointer list-none items-center justify-between gap-4 px-6 py-3 [&::-webkit-details-marker]:hidden lg:cursor-default lg:py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#d4af37] font-bold text-[#0d1929] shadow-inner">
              A★
            </span>
            <span className="text-lg font-semibold tracking-tight">
              A<span className="text-[#d4af37]">★</span> Number Plates
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 text-sm font-medium text-white/90 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/builder"
              className="hidden items-center justify-center rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-[#0d1929] shadow-[0_8px_24px_-12px_rgba(212,175,55,0.7)] transition hover:bg-[#e6c14d] sm:inline-flex"
            >
              Build Your Plate
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="hidden h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/85 transition hover:border-white/40 lg:inline-flex"
            >
              🛒
            </Link>
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white/85 lg:hidden"
            >
              <span className="block h-0.5 w-4 bg-current shadow-[0_-5px_0_currentColor,0_5px_0_currentColor] group-open:hidden" />
              <span className="hidden text-lg leading-none group-open:block">×</span>
            </span>
          </div>
        </summary>

        <div className="border-t border-white/10 px-6 py-4 lg:hidden">
          <nav aria-label="Mobile navigation">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
              Shop
            </p>
            <ul className="mt-3 grid gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
              Info
            </p>
            <ul className="mt-3 grid gap-1">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/builder"
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#d4af37] px-4 py-3 text-sm font-semibold text-[#0d1929] transition hover:bg-[#e6c14d] sm:hidden"
            >
              Build Your Plate
            </Link>
          </nav>
        </div>
      </details>
    </header>
  );
}

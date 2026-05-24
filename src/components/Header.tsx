import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks: { href: string; label: string }[] = [
  { href: "/standard-number-plates", label: "Standard 2D" },
  { href: "/3d-gel-number-plates", label: "3D Gel" },
  { href: "/4d-number-plates", label: "4D" },
  { href: "/4d-gel-number-plates", label: "4D Gel" },
  { href: "/show-plates", label: "Show Plates" },
];

const secondaryLinks: { href: string; label: string }[] = [
  { href: "/pricing", label: "Pricing" },
  { href: "/compliance", label: "Compliance" },
  { href: "/documents-required", label: "Documents" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-white/5 bg-black/95 text-white backdrop-blur supports-[backdrop-filter]:bg-black/80",
        className,
      )}
    >
      <div className="hidden border-b border-white/5 bg-black/40 text-xs text-white/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <p>
            <span className="text-[#d4af37]">Same-day dispatch</span>
            <span className="mx-2 text-white/30">|</span>
            BS AU 145e road legal plates
            <span className="mx-2 text-white/30">|</span>
            Free UK delivery on orders over £30
          </p>
          <div className="flex items-center gap-4">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <details className="group" name="primary-nav">
        <summary className="mx-auto flex max-w-7xl cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 [&::-webkit-details-marker]:hidden lg:cursor-default">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[#d4af37] to-[#8a6c1a] font-bold text-black shadow-inner">
              A*
            </span>
            <span className="text-lg font-semibold tracking-tight">
              A<span className="text-[#d4af37]">*</span> Number Plates
            </span>
          </Link>

          <nav
            aria-label="Product navigation"
            className="hidden items-center gap-6 text-sm font-medium text-white/80 lg:flex"
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
              className="hidden items-center justify-center rounded-md bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_24px_-12px_rgba(212,175,55,0.7)] transition hover:bg-[#e6c14d] sm:inline-flex"
            >
              Build my plate
            </Link>
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-white/80 lg:hidden"
            >
              <span className="block h-0.5 w-4 bg-current shadow-[0_-5px_0_currentColor,0_5px_0_currentColor] group-open:hidden" />
              <span className="hidden text-lg leading-none group-open:block">×</span>
            </span>
          </div>
        </summary>

        <div className="border-t border-white/10 bg-black/95 px-6 py-4 lg:hidden">
          <nav aria-label="Mobile navigation">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              Plates
            </p>
            <ul className="mt-3 grid gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              Info
            </p>
            <ul className="mt-3 grid gap-1">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/builder"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#d4af37] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c14d] sm:hidden"
            >
              Build my plate
            </Link>
          </nav>
        </div>
      </details>
    </header>
  );
}

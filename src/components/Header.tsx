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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
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
            href="/cart"
            className="hidden rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-white/90 transition hover:border-white/40 hover:text-white sm:inline-flex"
          >
            Cart
          </Link>
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-md bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_24px_-12px_rgba(212,175,55,0.7)] transition hover:bg-[#e6c14d]"
          >
            Build my plate
          </Link>
        </div>
      </div>
    </header>
  );
}

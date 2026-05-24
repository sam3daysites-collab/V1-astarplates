import Link from "next/link";

const shopLinks = [
  { href: "/standard-number-plates", label: "Standard 2D Plates" },
  { href: "/3d-gel-number-plates", label: "3D Gel Plates" },
  { href: "/4d-number-plates", label: "4D Plates" },
  { href: "/4d-gel-number-plates", label: "4D Gel Plates" },
  { href: "/show-plates", label: "Show Plates" },
];

const helpLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/compliance", label: "Compliance & Law" },
  { href: "/documents-required", label: "Documents Required" },
  { href: "/delivery", label: "Delivery" },
  { href: "/blog", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/returns-refunds", label: "Returns & Refunds" },
  { href: "/compliance", label: "Compliance" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-white/10 bg-black text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[#d4af37] to-[#8a6c1a] font-bold text-black">
              A*
            </span>
            <span className="text-lg font-semibold">
              A<span className="text-[#d4af37]">*</span> Number Plates
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Premium UK number plates, pressed in-house to BS AU 145e. Road
            legal plates, show plates and accessories — built fast, built right.
          </p>
          <p className="mt-4 text-xs text-white/40">
            UK number plate supplier. Document verification required for all
            road legal plates.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Help</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-white/40">
            Show plates are for off-road and display use only. It is illegal to
            display them on a vehicle driven on a public road.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/50 md:flex-row">
          <p>© {year} ASTARNUMBERPLATES LIMITED. All rights reserved.</p>
          <p>Made in the UK · BS AU 145e compliant</p>
        </div>
      </div>
    </footer>
  );
}

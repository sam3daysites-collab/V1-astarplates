import Link from "next/link";

const shopLinks = [
  { href: "/standard-2d-number-plates", label: "Standard 2D Plates" },
  { href: "/3d-gel-number-plates", label: "3D Gel Plates" },
  { href: "/4d-number-plates", label: "4D Plates" },
  { href: "/4d-gel-number-plates", label: "4D Gel Plates" },
  { href: "/4d-retro-number-plates", label: "4D Retro Plates" },
  { href: "/show-plates", label: "Show Plates" },
];

const categoryLinks = [
  { href: "/oversize-number-plates", label: "Oversize Plates" },
  { href: "/hex-number-plates", label: "Hex Plates" },
  { href: "/import-number-plates", label: "Import Plates" },
  { href: "/motorbike-number-plates", label: "Motorbike Plates" },
  { href: "/number-plate-accessories", label: "Accessories" },
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
  { href: "/returns-and-refunds", label: "Returns & Refunds" },
  { href: "/compliance", label: "Compliance" },
];

const trust = [
  {
    title: "DVLA Registered Supplier",
    body: "Every road legal plate is pressed by a registered number plate supplier.",
    icon: "🛡️",
  },
  {
    title: "Secure Payments — Stripe",
    body: "Card payments are processed by Stripe with 3D Secure authentication.",
    icon: "💳",
  },
  {
    title: "Free Next Day Delivery",
    body: "Order before 11am Mon–Sat, dispatched same day via DPD tracked.",
    icon: "🚚",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-[var(--brand-lime)] text-white">
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
          {trust.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span
                aria-hidden
                className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-white/10 text-xl"
              >
                {t.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{t.title}</p>
                <p className="mt-1 text-xs text-white/70">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Link grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#d4af37] font-bold text-[#0d1929]">
              A★
            </span>
            <span className="text-lg font-semibold">
              A<span className="text-[#d4af37]">★</span> Number Plates
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            DVLA Registered Number Plate Supplier. Premium UK plates pressed
            in-house to BS AU 145e, dispatched same day via DPD.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/60">
            Proudly sponsoring <span className="text-[#d4af37]">A Child&apos;s Wish</span> charity.
          </p>
        </div>

        <FooterCol heading="Shop" links={shopLinks} />
        <FooterCol heading="Categories" links={categoryLinks} />
        <FooterCol heading="Help" links={helpLinks} />
        <div>
          <h3 className="text-sm font-semibold text-white">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-white/50">
            Show plates are for off-road / display use only. It is illegal to
            display them on a vehicle driven on a public road.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-6 text-xs text-white/60 md:flex-row md:items-center">
          <div>
            <p>© {year} ASTARNUMBERPLATES LIMITED. All rights reserved.</p>
            <p className="mt-1">
              Company No. 16624540 · 1 Rosslyn Avenue, East Barnet, EN4 8DH
            </p>
          </div>
          <p>
            DVLA Registered Number Plate Supplier · BS AU 145e ·{" "}
            <a
              href="mailto:admin@astarnumberplates.uk"
              className="text-[#d4af37] hover:underline"
            >
              admin@astarnumberplates.uk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{heading}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-white/70 transition hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

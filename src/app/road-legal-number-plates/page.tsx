import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import { PLATE_PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Road Legal Number Plates — BS AU 145e, From £16.99",
  description:
    "All our road legal UK number plates pressed to BS AU 145e — Standard 2D, 3D Gel, 4D, 4D Gel and 4D Retro. Document verified, free DPD next-day delivery.",
  path: "/road-legal-number-plates",
});

const faqs = [
  {
    q: "What counts as a road legal number plate?",
    a: "A road legal UK number plate must use the mandatory Charles Wright font, meet BS AU 145e for materials and reflectivity, display the correct registration, and carry a supplier mark. Stylised fonts, tinted backgrounds and non-standard layouts are not road legal.",
  },
  {
    q: "Why do you ask for documents?",
    a: "UK law requires plate suppliers to verify the buyer's name and entitlement to the registration before pressing road legal plates. This prevents plate cloning.",
  },
  {
    q: "Can I order a road legal plate for a vehicle that isn't mine?",
    a: "Only if you can prove entitlement — for example, a leased or hired vehicle in your name. The name on the entitlement document must match the buyer.",
  },
];

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--brand-lime)] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-gold)]">
            Road legal
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Road legal number plates, pressed to BS AU 145e.
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Every plate on this page is fully road legal in the UK — MOT-ready,
            DVLA accepted, supplier-marked and document verified before we
            press.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="touch-target inline-flex items-center justify-center rounded-lg bg-[var(--brand-gold)] px-6 py-3 text-sm font-semibold text-[var(--brand-lime)] transition hover:bg-[#e6c14d]"
            >
              Build my plate →
            </Link>
            <Link
              href="/documents-required"
              className="touch-target inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-gold)]"
            >
              Documents required
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-cream)] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLATE_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-[var(--brand-gold)]/40 bg-white p-6 text-sm text-neutral-700">
            <p>
              <strong className="text-[var(--brand-lime)]">
                Looking for show plates?
              </strong>{" "}
              Show is a mode you can apply to any finish in the builder — not a
              separate product.{" "}
              <Link
                href="/show-plates"
                className="font-semibold text-[var(--brand-lime)] underline-offset-4 hover:underline"
              >
                Show plate details →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Road legal plates FAQ" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Road Legal", path: "/road-legal-number-plates" },
            ]),
          ),
        }}
      />
    </>
  );
}

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FAQSection from "@/components/FAQSection";
import { ROAD_LEGAL_PRODUCTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Road Legal Number Plates — BS AU 145e, From £16.99",
  description:
    "All our road legal UK number plates pressed to BS AU 145e — Standard 2D, 3D Gel, 4D and 4D Gel. Document verified, same-day dispatch.",
  path: "/road-legal-number-plates",
});

const faqs = [
  {
    q: "What counts as a road legal number plate?",
    a: "A road legal number plate must use the mandatory Charles Wright font, meet BS AU 145e for materials and reflectivity, and display the correct registration. Stylised fonts, tinted backgrounds and non-standard layouts are not road legal.",
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
      <section className="relative overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Road legal
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Road legal number plates, pressed to BS AU 145e.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Every plate on this page is fully road legal in the UK — MOT-ready,
            DVLA accepted and document verified before we press.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-md bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c14d]"
            >
              Build my plate
            </Link>
            <Link
              href="/documents-required"
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Documents required
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROAD_LEGAL_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700">
            <p>
              <strong className="text-neutral-900">Looking for show plates?</strong>{" "}
              They&apos;re not road legal and are kept on a separate page.{" "}
              <Link
                href="/show-plates"
                className="font-medium text-neutral-900 underline-offset-4 hover:underline"
              >
                See show plates →
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

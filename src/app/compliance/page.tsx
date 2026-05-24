import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compliance & UK Number Plate Law",
  description:
    "How A* Number Plates complies with BS AU 145e, the 2021 number plate standard and DVLA rules — and what that means for road legal plates.",
  path: "/compliance",
});

const faqs = [
  {
    q: "What is BS AU 145e?",
    a: "BS AU 145e is the British Standard introduced in 2021 that all new UK road legal number plates must meet. It covers the materials, fonts, character spacing, retroreflectivity and durability of the plate.",
  },
  {
    q: "What fonts and characters are allowed?",
    a: "Only the mandatory Charles Wright font is permitted. 3D, 4D and gel finishes that follow Charles Wright shapes and dimensions are allowed; stylised, italic, slanted or non-standard fonts are not road legal.",
  },
  {
    q: "Are tinted or smoked plates legal?",
    a: "No. Backgrounds must be reflective white (front) or reflective yellow (rear). Any tinting or smoking makes the plate non-compliant.",
  },
  {
    q: "What about Union Jack or country identifiers?",
    a: "Optional national flags and identifiers (UK, GB, ENG, SCO, CYM, WLS) are permitted on the left of the plate. EU identifiers are no longer permitted.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Compliance
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built to the British Standard.
          </h1>
          <p className="mt-4 text-white/70">
            Every road legal plate we press meets BS AU 145e — the 2021 British
            Standard for vehicle registration plates. We follow DVLA rules to
            the letter so your plate passes MOT and stays legal on the road.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              What we comply with
            </h2>
            <ul className="mt-4 space-y-3 text-neutral-700">
              <li>
                <strong>BS AU 145e</strong> — the 2021 standard for material
                durability, reflectivity and abrasion resistance.
              </li>
              <li>
                <strong>The Vehicle Excise and Registration Act 1994</strong> —
                governs the display of valid registration marks.
              </li>
              <li>
                <strong>DVLA registered supplier rules</strong> — we verify ID
                and entitlement before pressing any road legal plate.
              </li>
              <li>
                <strong>Charles Wright font</strong> — the only character set
                allowed on a road legal plate.
              </li>
            </ul>

            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-neutral-900">
              Road legal vs. show plates
            </h2>
            <p className="mt-3 text-neutral-700">
              We keep these two clearly separated.{" "}
              <Link
                href="/road-legal-number-plates"
                className="font-medium text-neutral-900 underline-offset-4 hover:underline"
              >
                Road legal plates
              </Link>{" "}
              are pressed to BS AU 145e and require document verification.{" "}
              <Link
                href="/show-plates"
                className="font-medium text-neutral-900 underline-offset-4 hover:underline"
              >
                Show plates
              </Link>{" "}
              are for off-road, display and private property use only — they
              are not road legal and must not be fitted to a vehicle driven on a
              public road.
            </p>

            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
              <p className="font-semibold">Penalties for non-compliant plates</p>
              <p className="mt-2">
                Displaying a non-compliant number plate is a £1,000 fine, a
                failed MOT and can invalidate your insurance. We will never
                press a road legal plate that doesn&apos;t meet BS AU 145e.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Compliance FAQ" />
    </>
  );
}

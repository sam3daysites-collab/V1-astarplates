import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Documents Required for Road Legal Number Plates",
  description:
    "What documents you need to buy road legal number plates in the UK. Proof of ID and proof of entitlement — verified before we press your plates.",
  path: "/documents-required",
});

const idDocs = [
  "UK driving licence (full or provisional)",
  "Valid passport",
  "Armed forces ID card",
  "Police warrant card",
];

const entitlementDocs = [
  "V5C — vehicle log book",
  "V5C/2 — new keeper supplement",
  "V778 — retention document",
  "V750 — certificate of entitlement",
  "Hire or lease agreement with your name on it",
  "Trade insurance certificate with your name on it",
];

export default function DocumentsRequiredPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Documents required
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            What you need to buy road legal plates.
          </h1>
          <p className="mt-4 text-neutral-600">
            UK law requires every plate maker to verify your name, address and
            entitlement to the registration before pressing a road legal plate.
            Upload these at checkout — we&apos;ll review and start work within
            an hour during working hours.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              1. Proof of identity
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              One of the following, in your name and clearly legible.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-800">
              {idDocs.map((doc) => (
                <li key={doc} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              2. Proof of entitlement
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              One of the following showing you&apos;re entitled to the
              registration.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-800">
              {entitlementDocs.map((doc) => (
                <li key={doc} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <p className="font-semibold">Show plates are different.</p>
          <p className="mt-2">
            Show plates do not require document verification because they are
            not road legal and must not be fitted to a vehicle used on a public
            road.{" "}
            <Link
              href="/show-plates"
              className="underline underline-offset-2"
            >
              See show plates →
            </Link>
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
            How we handle your documents
          </h2>
          <p className="mt-3 text-neutral-700">
            We store your documents securely, encrypted at rest, only for as
            long as needed to verify your order and meet our legal obligations
            as a plate supplier. We never share them with third parties. Full
            details are in our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
}

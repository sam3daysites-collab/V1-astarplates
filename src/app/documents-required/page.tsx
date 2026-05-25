import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Documents Required for Road Legal Number Plates",
  description:
    "What we accept as Proof of Identity and Proof of Entitlement to manufacture road legal UK number plates. Verified by a DVLA Registered Number Plate Supplier.",
  path: "/documents-required",
});

const idDocs = [
  { name: "Driving licence", note: "Full or provisional. Both sides if a paper licence." },
  { name: "Passport", note: "Photo page, in date." },
  { name: "National ID card", note: "Issued by an EU/EEA country, in date." },
  { name: "Utility bill", note: "Issued within the last 6 months." },
  { name: "Bank or building society statement", note: "Issued within the last 6 months." },
  { name: "Council tax bill", note: "Issued within the last 12 months." },
];

const entitlementDocs = [
  {
    name: "V5C — vehicle log book",
    note: "Most common. Page 1 showing the registration and your name and address.",
  },
  {
    name: "V5C/2 — new keeper supplement",
    note: "Use this if you've just bought the vehicle and the V5C hasn't arrived yet.",
  },
  {
    name: "V750 — certificate of entitlement",
    note: "For a newly bought private registration not yet assigned to a vehicle.",
  },
  {
    name: "V778 — retention document",
    note: "For a registration you hold on retention.",
  },
  {
    name: "V11 — reminder",
    note: "DVLA tax reminder showing the registration and your name and address.",
  },
  {
    name: "V379 — duplicate certificate",
    note: "DVLA-issued duplicate where the V5C has been lost or replaced.",
  },
  {
    name: "Lease or finance authorisation letter",
    note: "Showing your name and the vehicle registration.",
  },
];

const acceptedFormats = [
  "Clear smartphone photo, no flash glare",
  "Scanned PDF, JPG, PNG or HEIC",
  "All four corners visible",
  "Text fully readable",
  "File size up to 10MB",
];

const rejected = [
  "Cropped or partially covered documents",
  "Digitally edited or retouched images",
  "Expired documents",
  "Names that don't match the order",
];

export default function DocumentsRequiredPage() {
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Documents required
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            What you need for road legal plates.
          </h1>
          <p className="mt-4 text-neutral-700">
            UK law requires every plate supplier to verify your identity and
            entitlement to the registration before pressing a road legal plate.
            Upload one ID document and one entitlement document at checkout.
            Verification usually within an hour in business hours.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <DocCard
            step="1"
            title="Proof of Identity"
            intro="One document, in your name, in date."
            items={idDocs}
          />
          <DocCard
            step="2"
            title="Proof of Entitlement"
            intro="One document showing you can use the registration."
            items={entitlementDocs}
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="text-base font-semibold text-emerald-900">
              Accepted formats
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-emerald-900">
              {acceptedFormats.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-base font-semibold text-red-900">
              We&apos;ll reject
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-red-900">
              {rejected.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-700" />
                  {item}
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

        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700">
          <h2 className="text-base font-semibold text-neutral-900">
            How we handle your documents
          </h2>
          <p className="mt-2">
            Stored encrypted at rest in Supabase. Registered number plate
            suppliers must retain verification records for a minimum of three
            years — we hold them for that period and no longer than is
            necessary. We never share your documents with third parties. All
            processing is under UK GDPR.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/builder"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-lime)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-lime-hover)]"
          >
            Start building
          </Link>
          <Link
            href="/compliance"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Read our compliance →
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Terms &amp; conditions →
          </Link>
        </div>
      </div>
    </section>
  );
}

function DocCard({
  step,
  title,
  intro,
  items,
}: {
  step: string;
  title: string;
  intro: string;
  items: { name: string; note: string }[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
        Step {step}
      </p>
      <h2 className="mt-2 text-lg font-semibold text-neutral-900">{title}</h2>
      <p className="mt-1 text-sm text-neutral-600">{intro}</p>
      <ul className="mt-4 space-y-3 text-sm text-neutral-800">
        {items.map((item) => (
          <li key={item.name}>
            <span className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
              <span>
                <strong className="font-semibold">{item.name}</strong>
                <span className="block text-xs text-neutral-500">
                  {item.note}
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

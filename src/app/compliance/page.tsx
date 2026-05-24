import Link from "next/link";
import FAQSection from "@/components/FAQSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Compliance — BS AU 145e, DVLA & Document Verification",
  description:
    "How A* Number Plates complies with UK number plate law: BS AU 145e materials, Charles Wright font, document verification, accepted ID and entitlement documents.",
  path: "/compliance",
});

const faqs = [
  {
    q: "Why do you ask for documents before pressing road legal plates?",
    a: "Because UK law requires us to. Registered number plate suppliers must verify the buyer's identity and entitlement to the registration before manufacturing a road legal plate. This is what stops casual plate cloning.",
  },
  {
    q: "What is BS AU 145e?",
    a: "It's the British Standard, introduced in 2021, that every new UK road legal number plate must meet. It defines materials, abrasion resistance, retroreflectivity, character font, spacing and durability.",
  },
  {
    q: "Are 3D, 4D and gel plates road legal?",
    a: "Yes — provided the characters follow the mandatory Charles Wright font shape, the dimensions are correct and the plate meets BS AU 145e. Our 3D Gel, 4D and 4D Gel plates are all built to this standard.",
  },
  {
    q: "What makes a plate not road legal?",
    a: "Stylised, italic or non-standard fonts; tinted, smoked or coloured backgrounds; misaligned characters; non-compliant spacing; and any layout that doesn't match the Charles Wright spec. These are show-only plates.",
  },
  {
    q: "What happens if I display a non-compliant plate?",
    a: "You risk a fine of up to £1,000, an automatic MOT failure, and your insurance may be invalidated if the registration is unreadable.",
  },
  {
    q: "How long do you keep my documents?",
    a: "We retain ID and entitlement records for a minimum of three years, as required of registered number plate suppliers. They're stored encrypted, never shared with third parties, and processed in line with UK GDPR.",
  },
  {
    q: "Do show plates need documents?",
    a: "No. Show plates are not road legal and cannot legally be fitted to a vehicle driven on a public road, so no entitlement check is required.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(212,175,55,0.18),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Compliance
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built to the British Standard. Verified before we press.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Every road legal plate we press meets BS AU 145e — the 2021 British
            Standard for vehicle registration plates — and is only pressed
            after we verify your right to display the registration.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Road legal plates">
              Manufactured to BS AU 145e using the mandatory Charles Wright
              font on reflective acrylic. Accepted at MOT and meet the latest
              DVLA rules. We verify your documents before pressing.
            </Card>
            <Card title="Show plates" tone="warning">
              For display, exhibitions, photography and private property only.
              Show plates are <strong>not road legal</strong> and must not be
              fitted to a vehicle driven on a public road.
            </Card>
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-neutral-900">
            BS AU 145e — what it covers
          </h2>
          <ul className="mt-4 space-y-3 text-neutral-700">
            <li>
              <strong>Materials &amp; durability</strong> — abrasion, impact and
              weather resistance over the life of the plate.
            </li>
            <li>
              <strong>Retroreflectivity</strong> — the front must be reflective
              white, the rear reflective yellow.
            </li>
            <li>
              <strong>Font &amp; characters</strong> — Charles Wright only.
              Character dimensions and spacing are tightly specified.
            </li>
            <li>
              <strong>Layout</strong> — group spacing, margins and optional
              flag / country identifiers on the left.
            </li>
            <li>
              <strong>Supplier mark</strong> — every road legal plate carries
              the supplier postcode and BS AU 145e reference.
            </li>
          </ul>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight text-neutral-900">
            Document verification
          </h2>
          <p className="mt-3 text-neutral-700">
            We are required to verify two things before we press a road legal
            plate: <strong>who you are</strong> (proof of identity) and{" "}
            <strong>whether you&apos;re entitled to the registration</strong>{" "}
            (proof of entitlement). One document from each list, both clear,
            valid and unaltered.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <DocList
              heading="1. Accepted ID"
              items={[
                "UK driving licence (full or provisional)",
                "Valid passport",
                "Armed forces ID card",
                "Police warrant card",
              ]}
            />
            <DocList
              heading="2. Accepted entitlement"
              items={[
                "V5C — vehicle log book",
                "V5C/2 — new keeper supplement",
                "V778 — retention document",
                "V750 — certificate of entitlement",
                "Hire or lease agreement in your name",
                "Trade insurance certificate in your name",
              ]}
            />
          </div>

          <p className="mt-6 text-sm text-neutral-600">
            Digitally edited or unclear documents will be rejected. If we
            can&apos;t verify within a reasonable timeframe we&apos;ll refund
            the order, minus any non-refundable payment processing fees.
          </p>

          <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">
            <p className="font-semibold">Penalties for non-compliant plates</p>
            <p className="mt-2">
              Displaying a non-compliant number plate is a fine of up to £1,000,
              an automatic MOT failure and can invalidate your insurance. We
              will never press a road legal plate that doesn&apos;t meet BS AU
              145e.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Start a road legal order
            </Link>
            <Link
              href="/documents-required"
              className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              Full documents guide →
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

      <FAQSection items={faqs} title="Compliance FAQ" />
    </>
  );
}

function Card({
  title,
  tone = "default",
  children,
}: {
  title: string;
  tone?: "default" | "warning";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        tone === "warning"
          ? "border-red-200 bg-red-50 text-red-900"
          : "border-neutral-200 bg-neutral-50 text-neutral-800"
      }`}
    >
      <h3
        className={`text-base font-semibold ${
          tone === "warning" ? "text-red-900" : "text-neutral-900"
        }`}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function DocList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <h3 className="text-base font-semibold text-neutral-900">{heading}</h3>
      <ul className="mt-3 space-y-2 text-sm text-neutral-800">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

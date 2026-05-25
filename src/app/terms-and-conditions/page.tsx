import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing your use of astarnumberplates.uk and any purchase from ASTARNUMBERPLATES LIMITED.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Last updated: 12 January 2026
          </p>
        </header>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-neutral-800">
          <Section n="1" title="About These Terms">
            <p>
              These Terms govern your use of astarnumberplates.uk
              (&ldquo;Website&rdquo;) and any purchase you make from
              ASTARNUMBERPLATES LIMITED (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;).
            </p>
            <p className="mt-3">
              By using the Website or placing an order, you agree to these
              Terms.
            </p>
          </Section>

          <Section n="2" title="Who We Are">
            <p>ASTARNUMBERPLATES LIMITED</p>
            <p>Company No. 16624540</p>
            <p>
              Registered office: 1 Rosslyn Avenue, East Barnet, Barnet,
              England, EN4 8DH
            </p>
            <p className="mt-3">
              We supply number plates in accordance with UK legal requirements
              applicable to registered number plate suppliers.
            </p>
          </Section>

          <Section n="3" title="Eligibility">
            <p>You must be at least 16 years old to place an order.</p>
            <p className="mt-3">By ordering, you confirm:</p>
            <List
              items={[
                "You are authorised to purchase plates for the registration number entered",
                "All information provided is accurate",
                "You are legally entitled to use the registration mark",
              ]}
            />
          </Section>

          <Section
            n="4"
            title="DVLA Compliance & Document Verification (IMPORTANT)"
          >
            <p>
              For road-legal plates, we are legally required to verify:
            </p>
            <List
              items={[
                "Your identity",
                "Your entitlement to display the registration number",
              ]}
            />
            <p className="mt-3">We manually verify all submitted documents.</p>

            <SubHeading>4.1 Document Standards</SubHeading>
            <List
              items={[
                "Documents must be clear, unaltered, valid and legible",
                "Digitally edited or tampered documents will be rejected",
                "We reserve the right to request additional proof",
              ]}
            />

            <SubHeading>4.2 Record Retention</SubHeading>
            <p>
              In accordance with DVLA requirements for registered number plate
              suppliers, we retain required sales and verification records for
              a minimum of 3 years.
            </p>

            <SubHeading>4.3 Failure to Provide Documents</SubHeading>
            <p>
              If required documents are not provided within a reasonable
              timeframe, we may:
            </p>
            <List
              items={[
                "Cancel the order",
                "Refund the payment minus any non-refundable Stripe payment processing fees incurred",
              ]}
            />
          </Section>

          <Section n="5" title="Road-Legal vs Show Plates">
            <SubHeading>5.1 Road-Legal Plates</SubHeading>
            <p>
              Manufactured to comply with applicable UK standards (including
              BS AU 145e where required). You are responsible for lawful
              display after delivery.
            </p>
            <p className="mt-3">We are not responsible for:</p>
            <List
              items={[
                "Illegal spacing",
                "Post-delivery modification",
                "Improper fitting",
                "Misuse on public roads",
              ]}
            />

            <SubHeading>5.2 Show Plates – Buyer Acknowledgement</SubHeading>
            <p className="font-semibold text-red-700">
              Show plates are NOT ROAD LEGAL.
            </p>
            <p className="mt-3">By purchasing show plates, you explicitly acknowledge:</p>
            <List
              items={[
                "They are for display, exhibition, off-road or private use only",
                "They may not comply with DVLA specifications",
                "Using them on a public road may result in fines (up to £1,000) and MOT failure",
                "We are not responsible for misuse after delivery",
              ]}
            />
            <p className="mt-3">
              Responsibility for lawful use rests entirely with the purchaser.
            </p>
          </Section>

          <Section n="6" title="Orders & Acceptance">
            <p>
              Your order is an offer to buy. We accept when we send dispatch
              confirmation.
            </p>
            <p className="mt-3">
              We may refuse or cancel orders where we reasonably suspect:
            </p>
            <List
              items={[
                "Fraud",
                "Chargeback risk",
                "False documentation",
                "Illegal intended use",
                "Abuse of our services",
              ]}
            />
          </Section>

          <Section n="7" title="Personalisation & Cooling-Off Rights">
            <p>Most plates are custom-made to your specification.</p>
            <p className="mt-3">
              Under UK consumer regulations, cancellation rights do not apply to
              goods that are:
            </p>
            <List
              items={[
                "Made to your specifications",
                "Clearly personalised",
              ]}
            />
            <p className="mt-3">
              Therefore, personalised plates cannot be returned for
              change-of-mind unless faulty or misdescribed.
            </p>
            <p className="mt-3">
              Non-personalised accessories may be eligible for return within 14
              days if unused.
            </p>
          </Section>

          <Section n="8" title="Payment & Fraud Prevention">
            <p>
              We use Stripe and may apply Strong Customer Authentication (3D
              Secure).
            </p>
            <p className="mt-3">
              By placing an order, you acknowledge that we may record:
            </p>
            <List
              items={[
                "IP address",
                "Device data",
                "Billing and shipping details",
                "Transaction authentication data",
              ]}
            />
            <p className="mt-3">
              We reserve the right to cancel orders where fraud indicators are
              present.
            </p>
          </Section>

          <Section n="9" title="Delivery & Risk">
            <p>We ship via DPD tracked services.</p>
            <p className="mt-3">
              Risk transfers once delivery is completed to the address provided.
            </p>
            <p className="mt-3">
              Tracking confirmation from the carrier constitutes prima facie
              evidence of delivery.
            </p>

            <SubHeading>9.1 Delivered but Claimed Not Received</SubHeading>
            <p>
              If tracking confirms delivery but you claim non-receipt, you
              agree to:
            </p>
            <List
              items={[
                "Cooperate with any carrier investigation",
                "Provide a signed declaration if required",
                "File a police report for suspected theft (if requested)",
              ]}
            />
            <p className="mt-3">
              Failure to cooperate may result in denial of replacement or
              refund.
            </p>
          </Section>

          <Section n="10" title="Transit Damage">
            <p>Notify us promptly with:</p>
            <List
              items={[
                "Clear photos of damage",
                "Photos of packaging",
                "Order number",
              ]}
            />
            <p className="mt-3">
              We may require carrier inspection before resolution.
            </p>
          </Section>

          <Section n="11" title="Chargeback Protection & Disputes">
            <p>
              Where a payment dispute or chargeback is raised, we may provide
              evidence including:
            </p>
            <List
              items={[
                "Proof of delivery",
                "Transaction authentication data",
                "IP/device data",
                "Customer communications",
                "Verification records (where legally permitted)",
              ]}
            />
            <p className="mt-3">
              Fraudulent chargebacks may be reported to relevant authorities.
            </p>
          </Section>

          <Section n="12" title="Limitation of Liability">
            <p>Nothing excludes liability for:</p>
            <List
              items={[
                "Death or personal injury caused by negligence",
                "Fraud or fraudulent misrepresentation",
                "Any liability that cannot legally be excluded",
              ]}
            />
            <p className="mt-3">Subject to that, we are not liable for:</p>
            <List
              items={[
                "Indirect losses",
                "Loss of profit or business",
                "Consequential damages",
              ]}
            />
            <p className="mt-3">
              Total liability relating to any order will not exceed the amount
              paid for that order.
            </p>
          </Section>

          <Section n="13" title="Events Outside Our Control">
            <p>We are not responsible for delays caused by:</p>
            <List
              items={[
                "Carrier disruptions",
                "Weather",
                "Industrial action",
                "Supply chain issues",
                "Technical outages",
              ]}
            />
          </Section>

          <Section n="14" title="Privacy">
            <p>
              Personal data is processed in accordance with UK GDPR and our
              Privacy Policy.
            </p>
          </Section>

          <Section n="15" title="Governing Law">
            <p>
              These Terms are governed by the laws of England and Wales.
            </p>
          </Section>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-8">
          <Link
            href="/returns-and-refunds"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Returns &amp; refunds →
          </Link>
          <Link
            href="/compliance"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Compliance →
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
        {n}. {title}
      </h2>
      <div className="mt-3 space-y-1">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-5 text-base font-semibold text-neutral-900">{children}</h3>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[15px]">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

import { faqSchema, serializeJsonLd } from "@/lib/schema";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  includeSchema?: boolean;
}

export default function FAQSection({
  items,
  title = "Frequently asked questions",
  subtitle,
  includeSchema = true,
}: FAQSectionProps) {
  return (
    <section className="border-t border-neutral-200 bg-[var(--brand-cream)] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-lime)]/70">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-neutral-600">{subtitle}</p>
          )}
        </div>
        <div className="mt-10 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white shadow-sm">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group px-5 py-5 sm:px-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="touch-target flex cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold text-neutral-900 sm:text-base">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-[var(--brand-gold)]/40 bg-[var(--brand-cream)] text-base font-semibold text-[var(--brand-lime)] transition group-open:rotate-45 group-open:border-[var(--brand-gold)] group-open:bg-[var(--brand-gold)] group-open:text-[var(--brand-lime)]"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema(items)) }}
        />
      )}
    </section>
  );
}

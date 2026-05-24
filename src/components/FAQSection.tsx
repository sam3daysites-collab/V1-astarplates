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
    <section className="border-t border-white/10 bg-black py-20 text-white">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-white/60">{subtitle}</p>
          )}
        </div>
        <div className="mt-12 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium">
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-white/20 text-[#d4af37] transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
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

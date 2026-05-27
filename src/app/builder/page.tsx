import BuilderForm from "./BuilderForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plate Builder — Design Your Number Plate",
  description:
    "Design your plate live. Choose finish, position and accessories — preview the exact number plate you'll receive before you order.",
  path: "/builder",
});

interface PageProps {
  searchParams: Promise<{ style?: string }>;
}

export default async function BuilderPage({ searchParams }: PageProps) {
  const { style } = await searchParams;

  return (
    <section className="bg-[var(--brand-cream)]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <header className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-gold)]/40 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--brand-lime)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-gold)]" />
            Plate Builder
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Design your plate
          </h1>
          <p className="mt-4 text-neutral-600">
            Type your registration, pick a finish and preview the exact plate
            we&apos;ll press. Road legal plates require document verification
            before production.
          </p>
        </header>

        <BuilderForm initialStyleId={style} />
      </div>
    </section>
  );
}

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
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            Plate Builder
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
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

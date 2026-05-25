import Link from "next/link";
import { ARTICLES } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Number Plate Guides, Compliance & How-Tos",
  description:
    "Plain English guides on UK number plates: BS AU 145e, road legal vs show, document verification, fitting, sizing and finish comparisons.",
  path: "/blog",
});

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogIndexPage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Guides
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need to know before you order plates.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Compliance, finish comparisons, document help, fitting how-tos and
            delivery — no fluff, no SEO filler, written by people who press
            plates.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <ul className="grid gap-6 sm:grid-cols-2">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-900/40 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="rounded-full bg-neutral-900/[0.04] px-2.5 py-1 font-semibold uppercase tracking-wider text-neutral-700">
                      {article.category}
                    </span>
                    <span>{article.readingMinutes} min read</span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-neutral-900 group-hover:underline">
                    {article.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">
                    {article.description}
                  </p>
                  <p className="mt-4 text-xs text-neutral-500">
                    {dateFmt.format(new Date(article.publishedISO))}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ),
        }}
      />
    </>
  );
}

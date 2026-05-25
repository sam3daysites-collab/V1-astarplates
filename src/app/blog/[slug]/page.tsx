import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, ARTICLE_SLUGS, getArticle } from "@/content/blog";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return buildMetadata({ title: "Article not found", path: `/blog/${slug}`, noIndex: true });
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${slug}`,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedISO,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
  };

  return (
    <>
      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900"
          >
            ← All guides
          </Link>
          <header className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              {article.category} · {article.readingMinutes} min read
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-neutral-700">
              {article.description}
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Published {dateFmt.format(new Date(article.publishedISO))}
            </p>
          </header>

          <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-neutral-800">
            {article.body.map((block, idx) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2
                      key={idx}
                      className="mt-10 text-2xl font-semibold tracking-tight text-neutral-900"
                    >
                      {block.text}
                    </h2>
                  );
                case "p":
                  return <p key={idx}>{block.text}</p>;
                case "ul":
                  return (
                    <ul key={idx} className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d4af37]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case "callout":
                  return (
                    <aside
                      key={idx}
                      className={`rounded-2xl border p-5 text-[15px] ${
                        block.tone === "warn"
                          ? "border-red-200 bg-red-50 text-red-900"
                          : "border-amber-200 bg-amber-50 text-amber-900"
                      }`}
                    >
                      {block.text}
                    </aside>
                  );
                case "cta":
                  return (
                    <Link
                      key={idx}
                      href={block.href}
                      className="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:border-neutral-900"
                    >
                      <span className="text-base font-semibold text-neutral-900">
                        {block.label} →
                      </span>
                      <span className="text-sm text-neutral-600">
                        {block.description}
                      </span>
                    </Link>
                  );
                default:
                  return null;
              }
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-neutral-200 pt-8">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
            >
              Build my plate
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-neutral-900 underline-offset-4 hover:underline"
            >
              See pricing →
            </Link>
          </div>
        </div>
      </article>

      <section className="border-t border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
            More guides
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="block h-full rounded-2xl border border-neutral-200 bg-white p-5 transition hover:border-neutral-900/40"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                    {r.category}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-neutral-900">
                    {r.title}
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
          __html: serializeJsonLd([
            articleSchema,
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: article.title, path: `/blog/${article.slug}` },
            ]),
          ]),
        }}
      />
    </>
  );
}

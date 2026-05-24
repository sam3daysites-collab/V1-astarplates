import { notFound } from "next/navigation";
import ProductPageBody from "@/components/ProductPageBody";
import FAQSection from "@/components/FAQSection";
import { getProductBySlug } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  productSchema,
  serializeJsonLd,
} from "@/lib/schema";

const SLUG = "4d-gel-number-plates";

export const metadata = buildMetadata({
  title: "4D Gel Number Plates — Premium Finish, From £27.99",
  description:
    "Our flagship 4D gel number plates combine laser-cut acrylic letters with a hand-poured gel dome. Road legal, BS AU 145e. Single £27.99, pair £37.99.",
  path: `/${SLUG}`,
});

const faqs = [
  {
    q: "What makes 4D gel different?",
    a: "We start with a laser-cut 4D acrylic base for crisp, raised characters, then hand-pour a UV-stable polyurethane resin dome on top for an unmatched depth and shine.",
  },
  {
    q: "Are they road legal?",
    a: "Yes. Provided every character follows the mandatory Charles Wright shape and the plate meets BS AU 145e — and ours do — 4D gel plates are road legal in the UK.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — every road legal plate carries our 12-month workmanship warranty against fading, peeling and character separation in normal road use.",
  },
];

export default function Page() {
  const product = getProductBySlug(SLUG);
  if (!product) notFound();
  return (
    <>
      <ProductPageBody product={product} />
      <FAQSection items={faqs} title="4D Gel plate FAQ" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            productSchema(SLUG) ?? {},
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Road Legal", path: "/road-legal-number-plates" },
              { name: product.shortName, path: `/${SLUG}` },
            ]),
          ]),
        }}
      />
    </>
  );
}

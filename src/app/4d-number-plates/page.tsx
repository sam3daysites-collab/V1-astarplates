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

const SLUG = "4d-number-plates";

export const metadata = buildMetadata({
  title: "4D Number Plates — Laser-Cut Acrylic, From £23.99",
  description:
    "Road legal 4D number plates with laser-cut 3mm acrylic characters. BS AU 145e and MOT approved. Single £23.99, pair £33.99.",
  path: `/${SLUG}`,
});

const faqs = [
  {
    q: "Are 4D plates legal in the UK?",
    a: "Yes — under the BS AU 145e 2021 standard, raised characters are permitted provided the font, dimensions and reflectivity comply. We follow these rules on every 4D plate we press.",
  },
  {
    q: "How thick are the letters?",
    a: "We laser-cut from 3mm premium black acrylic, then precision-bond each character to a reflective British acrylic base.",
  },
  {
    q: "Will a 4D plate pass MOT?",
    a: "Yes, providing it meets BS AU 145e — which ours do. Note that any plate, including 4D, must be clean and unobstructed to pass MOT.",
  },
];

export default function Page() {
  const product = getProductBySlug(SLUG);
  if (!product) notFound();
  return (
    <>
      <ProductPageBody product={product} />
      <FAQSection items={faqs} title="4D plate FAQ" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            productSchema(SLUG) ?? {},
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Choose Style", path: "/choose-style" },
              { name: product.shortName, path: `/${SLUG}` },
            ]),
          ]),
        }}
      />
    </>
  );
}

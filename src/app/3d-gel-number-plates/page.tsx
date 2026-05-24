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

const SLUG = "3d-gel-number-plates";

export const metadata = buildMetadata({
  title: "3D Gel Number Plates — Road Legal, From £21.99",
  description:
    "Road legal 3D gel number plates with raised, domed resin characters. BS AU 145e, MOT compliant. Single £21.99, pair £31.99.",
  path: `/${SLUG}`,
});

const faqs = [
  {
    q: "Are 3D gel plates road legal?",
    a: "Yes. As long as the characters follow the Charles Wright font shape and the plate meets BS AU 145e, raised resin domed gel characters are permitted on UK roads.",
  },
  {
    q: "What's the difference between 3D gel and 4D?",
    a: "3D gel uses a domed, glossy poured resin character on a printed base. 4D uses laser-cut acrylic letters bonded flat to the surface for a sharper, raised look.",
  },
  {
    q: "How durable is the gel finish?",
    a: "Our gel is UV-stable polyurethane resin — it doesn't yellow, crack or peel in normal road use. Treat it like a paint finish and it will last the life of the plate.",
  },
];

export default function Page() {
  const product = getProductBySlug(SLUG);
  if (!product) notFound();
  return (
    <>
      <ProductPageBody product={product} />
      <FAQSection items={faqs} title="3D Gel plate FAQ" />
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

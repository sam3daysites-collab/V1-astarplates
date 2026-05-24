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

const SLUG = "4d-retro-number-plates";

export const metadata = buildMetadata({
  title: "4D Retro Number Plates — Distinctive Finish, From £31.99",
  description:
    "Premium retro-style raised characters with a distinctive chamfer profile. Road legal, BS AU 145e. Single £31.99, pair £47.49.",
  path: `/${SLUG}`,
});

const faqs = [
  {
    q: "Are 4D Retro plates road legal?",
    a: "Yes. Provided the characters follow the mandatory Charles Wright shape, the dimensions are correct and the plate meets BS AU 145e, raised 4D Retro plates are fully road legal in the UK.",
  },
  {
    q: "What makes 4D Retro different from 4D?",
    a: "4D Retro uses a chamfered character profile for a distinctive, vintage look. The base material and standards are identical to our standard 4D — it's a finish difference, not a compliance difference.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes — every road legal plate carries our 3-year manufacturing-defect warranty against fading, peeling and character separation in normal road use.",
  },
];

export default function Page() {
  const product = getProductBySlug(SLUG);
  if (!product) notFound();
  return (
    <>
      <ProductPageBody product={product} />
      <FAQSection items={faqs} title="4D Retro plate FAQ" />
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

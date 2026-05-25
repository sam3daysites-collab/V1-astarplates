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

const SLUG = "standard-2d-number-plates";

export const metadata = buildMetadata({
  title: "Standard 2D Number Plates — BS AU 145e, From £16.99",
  description:
    "Road legal standard 2D number plates pressed to BS AU 145e. MOT and DVLA approved. Single £16.99, pair £26.99. Free DPD next-day delivery.",
  path: `/${SLUG}`,
});

const faqs = [
  {
    q: "Are these plates MOT compliant?",
    a: "Yes. Our Standard 2D plates are manufactured to BS AU 145e using the mandatory Charles Wright font, the correct character dimensions and the supplier mark. Accepted at every MOT centre.",
  },
  {
    q: "What size will I receive?",
    a: "By default we press the UK standard 520mm × 111mm oblong plate. Smaller, square, motorbike and import sizes are available in the builder.",
  },
  {
    q: "Do I need to send documents?",
    a: "Yes — UK law requires us to verify your ID and entitlement before pressing any road legal plate. You'll upload these at checkout.",
  },
];

export default function Page() {
  const product = getProductBySlug(SLUG);
  if (!product) notFound();
  return (
    <>
      <ProductPageBody product={product} />
      <FAQSection items={faqs} title="Standard 2D plate FAQ" />
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

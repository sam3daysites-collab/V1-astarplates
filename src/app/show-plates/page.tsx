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

const SLUG = "show-plates";

export const metadata = buildMetadata({
  title: "Show Plates — Off-Road Display Plates, From £16.99",
  description:
    "Custom show plates for car shows, photography and private property. Not road legal. Single £16.99, pair £24.99.",
  path: `/${SLUG}`,
});

const faqs = [
  {
    q: "Can I drive on the road with show plates?",
    a: "No. Show plates are not road legal. Displaying them on a vehicle driven on a public road can result in a £1,000 fine, a failed MOT and may invalidate your insurance.",
  },
  {
    q: "Do show plates need documents?",
    a: "No. Because show plates are not road legal and not for use on a public road, we do not require ID or entitlement documents.",
  },
  {
    q: "What customisations are available?",
    a: "Custom fonts, colours, borders, badges, slim/square/oversized sizes, and stylised text. Anything goes — provided you're not putting them on a road-going vehicle.",
  },
];

export default function Page() {
  const product = getProductBySlug(SLUG);
  if (!product) notFound();
  return (
    <>
      <ProductPageBody product={product} />
      <FAQSection items={faqs} title="Show plate FAQ" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            productSchema(SLUG) ?? {},
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Show Plates", path: `/${SLUG}` },
            ]),
          ]),
        }}
      />
    </>
  );
}

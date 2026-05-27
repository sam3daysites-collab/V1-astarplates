import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hex Oversize Number Plates — Distinctive 533 × 152mm Rear",
  description:
    "Hex oversize rear number plates with a distinctive finish detail. 533 × 152mm, BS AU 145e road legal, free DPD next-day delivery.",
  path: "/hex-number-plates",
});

export default function Page() {
  return (
    <CategoryPage
      slug="hex-number-plates"
      eyebrow="Hex plates"
      title="Hex oversize rear number plates"
      intro="Our oversize 533 × 152mm rear plate with a hex finish detail — a distinctive variant for customers who want the bigger panel and a sharper edge."
      bullets={[
        "533 × 152mm hex variant rear",
        "Up to 7 road-legal characters",
        "BS AU 145e and Charles Wright font",
        "Pair with any of our 5 finishes",
        "Free DPD tracked next-day delivery",
        "Document verification required",
      ]}
    />
  );
}

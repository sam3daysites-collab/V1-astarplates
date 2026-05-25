import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Motorbike Number Plates — 237 × 178mm Stacked Rear",
  description:
    "Mandatory stacked 237 × 178mm rear motorbike number plate. BS AU 145e road legal, free DPD next-day delivery.",
  path: "/motorbike-number-plates",
});

export default function Page() {
  return (
    <CategoryPage
      eyebrow="Motorbike plates"
      title="Motorbike number plates — 237 × 178mm stacked rear"
      intro="The mandatory rear motorbike plate for any UK bike registered after 1 September 2001. Two-row Charles Wright font, BS AU 145e."
      bullets={[
        "237 × 178mm stacked rear (post-2001 standard)",
        "Two-row Charles Wright font",
        "Available in 2D, 3D Gel, 4D, 4D Gel and 4D Retro",
        "BS AU 145e road legal",
        "Free DPD tracked next-day delivery",
        "Document verification required",
      ]}
    />
  );
}

import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Number Plate Accessories — Fixing Kits & Sticky Strips",
  description:
    "Fitting accessories for UK number plates. Fixing kit £1.99 per plate, adhesive sticky strips £1.99 per pack of 4. DVLA recommends sticky strips.",
  path: "/number-plate-accessories",
});

export default function Page() {
  return (
    <CategoryPage
      eyebrow="Accessories"
      title="Number plate fitting accessories"
      intro="Everything you need to fit your plates cleanly. We ship accessories with your plate order at no extra delivery cost. DVLA recommends adhesive strips over fixing kits for the cleanest finish."
      bullets={[
        "Fixing kit — £1.99 per plate (£3.98 for a pair)",
        "Adhesive sticky strips — £1.99 per pack of 4",
        "DVLA-recommended adhesive option",
        "Heavy-duty foam strips, weatherproof",
        "Fit between 5°C and 35°C for best results",
        "Free DPD tracked next-day delivery with plates",
      ]}
    />
  );
}

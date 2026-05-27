import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Import Number Plates — JDM, USDM and Classic Imports",
  description:
    "Two-row import number plates in 280 × 203mm and 330 × 178mm. BS AU 145e road legal, free DPD next-day delivery.",
  path: "/import-number-plates",
});

export default function Page() {
  return (
    <CategoryPage
      slug="import-number-plates"
      eyebrow="Import plates"
      title="Import number plates — for JDM, USDM and classic imports"
      intro="Two-row import plates designed for the smaller plate recesses on JDM, USDM and European imports. Choose 280 × 203mm or 330 × 178mm in the builder."
      bullets={[
        "Two-row layout with Charles Wright font",
        "280 × 203mm — classic import rear",
        "330 × 178mm — alternative import rear",
        "Front 280 × 203mm — currently out of stock",
        "BS AU 145e road legal where stocked",
        "Free DPD tracked next-day delivery",
      ]}
    />
  );
}

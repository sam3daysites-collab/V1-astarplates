import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Oversize Number Plates — 533 × 152mm UK Rear Plates",
  description:
    "Oversize 533 × 152mm rear number plates for vehicles with a taller recess. BS AU 145e road legal, free DPD next-day delivery.",
  path: "/oversize-number-plates",
});

export default function Page() {
  return (
    <CategoryPage
      slug="oversize-number-plates"
      eyebrow="Oversize plates"
      title="Oversize rear number plates — 533 × 152mm"
      intro="A larger rear plate for vehicles that have a taller plate recess. Same Charles Wright font, same BS AU 145e standard, just a bigger panel."
      bullets={[
        "533 × 152mm — taller rear panel",
        "Up to 7 road-legal characters",
        "BS AU 145e and Charles Wright font",
        "Available in 2D, 3D Gel, 4D, 4D Gel and 4D Retro",
        "Free DPD tracked next-day delivery",
        "Document verification required",
      ]}
    />
  );
}

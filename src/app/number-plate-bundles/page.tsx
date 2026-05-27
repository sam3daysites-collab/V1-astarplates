import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Number Plate Bundles — Pair + Fitting Kit Combinations",
  description:
    "Pair-and-fit bundle pricing across our 5 plate finishes. Plates + fixing kit or sticky strips in one order.",
  path: "/number-plate-bundles",
});

export default function Page() {
  return (
    <CategoryPage
      slug="number-plate-bundles"
      eyebrow="Bundles"
      title="Plate + fitting bundles"
      intro="Most customers order a pair of plates plus the fittings to mount them. Build a pair in any of our 5 finishes and tick the fitting kit you want at the Extras step — everything ships together free, next day."
      bullets={[
        "Pair of plates in any of our 5 finishes",
        "Fixing kit (£3.98 for a pair) or sticky strips (£1.99 per plate)",
        "Single delivery, single tracked parcel",
        "DVLA recommends sticky strips for a cleaner finish",
        "Free DPD tracked next-day delivery",
      ]}
    />
  );
}

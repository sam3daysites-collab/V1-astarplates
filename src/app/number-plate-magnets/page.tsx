import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Number Plate Magnets — Magnetic Mounting for UK Plates",
  description:
    "Magnetic mounting accessory for UK number plates. Speak to us before ordering — fit varies by vehicle.",
  path: "/number-plate-magnets",
});

export default function Page() {
  return (
    <CategoryPage
      eyebrow="Magnets"
      title="Number plate magnets"
      intro="Magnetic mounting is a clean, hole-free way to attach plates to compatible vehicles — provided the bumper recess and any internal trim are ferrous. We don't list magnets in the standard accessory mix because fit varies; contact us with your vehicle details and we'll confirm compatibility."
      bullets={[
        "Hole-free mounting alternative",
        "Best for show plates and short-term display",
        "Compatibility depends on bumper construction",
        "Not all UK cars have ferrous bumper backings",
        "Speak to us first — we'll confirm fit before ordering",
      ]}
      primaryCtaLabel="Talk to us about magnets"
      primaryCtaHref="/contact"
      secondaryCtaLabel="Browse accessories"
      secondaryCtaHref="/number-plate-accessories"
    />
  );
}

import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Number Plate Clips — Bracket-Mount Fittings",
  description:
    "Plate-clip fittings for cars with bracket-style number plate recesses. Speak to us before ordering for fit confirmation.",
  path: "/number-plate-clips",
});

export default function Page() {
  return (
    <CategoryPage
      eyebrow="Plate clips"
      title="Number plate clips & brackets"
      intro="Clip-mount fittings are an alternative to screws or adhesive on certain vehicles with a bracket-style plate recess. Fit varies by car — get in touch first and we'll confirm what works."
      bullets={[
        "Bracket-style alternative to screws",
        "Common on vans and some commercial vehicles",
        "Compatibility depends on bumper bracket type",
        "We supply plates to fit standard fixings",
        "Speak to us first — we'll confirm fit before ordering",
      ]}
      primaryCtaLabel="Talk to us about clips"
      primaryCtaHref="/contact"
      secondaryCtaLabel="Browse accessories"
      secondaryCtaHref="/number-plate-accessories"
    />
  );
}

import CategoryPage from "@/components/CategoryPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Anti-Theft Number Plate Screws — One-Way Tamper-Resistant",
  description:
    "Anti-theft, tamper-resistant one-way screws for UK number plates. Speak to us to add to your order.",
  path: "/anti-theft-number-plate-screws",
});

export default function Page() {
  return (
    <CategoryPage
      slug="anti-theft-number-plate-screws"
      eyebrow="Anti-theft"
      title="Anti-theft number plate screws"
      intro="Tamper-resistant one-way screws make it much harder to remove your plates without specialist tools — a useful deterrent against plate theft for cloning. Add them to your order on request."
      bullets={[
        "One-way head — installs with a driver, won't unscrew",
        "Pairs with our standard fixing kit",
        "Deters plate theft / cloning attempts",
        "Black or chrome caps to match the plate",
        "Talk to us to add to your order",
      ]}
      primaryCtaLabel="Talk to us"
      primaryCtaHref="/contact"
      secondaryCtaLabel="Browse accessories"
      secondaryCtaHref="/number-plate-accessories"
    />
  );
}

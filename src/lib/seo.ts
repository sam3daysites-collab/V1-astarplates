import type { Metadata } from "next";

export const SITE_NAME = "A* Number Plates";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://astarplates.co.uk";
export const SITE_DESCRIPTION =
  "Premium UK number plates — road legal 2D, 3D Gel, 4D and 4D Gel plates pressed to BS AU 145e. Same-day dispatch, document-verified.";
export const SITE_KEYWORDS = [
  "number plates",
  "uk number plates",
  "road legal number plates",
  "3d gel plates",
  "4d plates",
  "4d gel plates",
  "show plates",
  "replacement number plates",
  "dvla compliant plates",
  "BS AU 145e",
];

interface BuildMetadataInput {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  noIndex = false,
  ogImage = "/og.png",
}: BuildMetadataInput): Metadata {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const url = new URL(path, SITE_URL).toString();
  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: SITE_KEYWORDS,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

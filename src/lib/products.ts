import type { PlateProductId } from "./pricing";
import { PLATE_PRICES } from "./pricing";

export interface PlateProduct {
  id: PlateProductId;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  features: string[];
  roadLegal: boolean;
  category: "road-legal" | "show";
  badge?: string;
  singlePence: number;
  pairPence: number;
}

export const PLATE_PRODUCTS: PlateProduct[] = [
  {
    id: "standard-2d",
    slug: "standard-number-plates",
    name: "Standard 2D Number Plates",
    shortName: "Standard 2D",
    tagline: "MOT-ready, BS AU 145e certified, made the same day.",
    description:
      "Our standard 2D plates are pressed and printed in the UK on premium reflective acrylic. Fully road legal, MOT compliant and built to BS AU 145e — the everyday plate done properly.",
    features: [
      "BS AU 145e compliant",
      "MOT and DVLA approved",
      "Reflective British acrylic",
      "Sharp digital print",
      "Made same working day",
    ],
    roadLegal: true,
    category: "road-legal",
    singlePence: PLATE_PRICES["standard-2d"].single,
    pairPence: PLATE_PRICES["standard-2d"].pair,
  },
  {
    id: "3d-gel",
    slug: "3d-gel-number-plates",
    name: "3D Gel Number Plates",
    shortName: "3D Gel",
    tagline: "Raised resin domed digits with a deep gloss finish.",
    description:
      "Hand-finished polyurethane resin domes give every character a deep, glossy 3D look while keeping the plate fully road legal under the latest DVLA rules.",
    features: [
      "Raised resin gel characters",
      "Glossy domed finish",
      "BS AU 145e compliant",
      "Road legal in the UK",
      "Hand finished in the UK",
    ],
    roadLegal: true,
    category: "road-legal",
    badge: "Most Popular",
    singlePence: PLATE_PRICES["3d-gel"].single,
    pairPence: PLATE_PRICES["3d-gel"].pair,
  },
  {
    id: "4d",
    slug: "4d-number-plates",
    name: "4D Number Plates",
    shortName: "4D",
    tagline: "Laser-cut acrylic letters with a sharp, flat-top edge.",
    description:
      "Precision laser-cut 3mm acrylic letters bonded to a reflective base. A bold, modern look that stays fully road legal under the 2021 DVLA standard.",
    features: [
      "Laser-cut 3mm acrylic characters",
      "Sharp flat-top finish",
      "BS AU 145e compliant",
      "Road legal in the UK",
      "Premium reflective backing",
    ],
    roadLegal: true,
    category: "road-legal",
    singlePence: PLATE_PRICES["4d"].single,
    pairPence: PLATE_PRICES["4d"].pair,
  },
  {
    id: "4d-gel",
    slug: "4d-gel-number-plates",
    name: "4D Gel Number Plates",
    shortName: "4D Gel",
    tagline: "Laser-cut acrylic with a glossy domed gel top.",
    description:
      "The flagship finish — 4D laser-cut acrylic characters topped with a hand-poured gel dome for unmatched depth and shine. Road legal and built to BS AU 145e.",
    features: [
      "4D acrylic base + gel dome",
      "Maximum depth and shine",
      "BS AU 145e compliant",
      "Road legal in the UK",
      "Premium hand finish",
    ],
    roadLegal: true,
    category: "road-legal",
    badge: "Premium",
    singlePence: PLATE_PRICES["4d-gel"].single,
    pairPence: PLATE_PRICES["4d-gel"].pair,
  },
  {
    id: "show",
    slug: "show-plates",
    name: "Show Plates",
    shortName: "Show Plates",
    tagline: "Custom show plates for off-road display only.",
    description:
      "Custom fonts, colours and layouts for shows, car meets and private property. Show plates are not road legal and must not be used on a vehicle driven on a public road.",
    features: [
      "Custom fonts and colours",
      "Slim, square or oversized sizes",
      "Show, display and photography use",
      "Off-road / private land only",
      "Not road legal — not for public roads",
    ],
    roadLegal: false,
    category: "show",
    singlePence: PLATE_PRICES.show.single,
    pairPence: PLATE_PRICES.show.pair,
  },
];

export function getProductBySlug(slug: string): PlateProduct | undefined {
  return PLATE_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: PlateProductId): PlateProduct | undefined {
  return PLATE_PRODUCTS.find((p) => p.id === id);
}

export const ROAD_LEGAL_PRODUCTS = PLATE_PRODUCTS.filter(
  (p) => p.category === "road-legal",
);

export const SHOW_PRODUCTS = PLATE_PRODUCTS.filter(
  (p) => p.category === "show",
);

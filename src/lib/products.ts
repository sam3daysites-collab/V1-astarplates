// Plate finishes. Show is a MODE applied to any of these, not a separate product.

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
  badge?: string;
  singlePence: number;
  pairPence: number;
  /**
   * Optional gallery of showcase photos for the style. Forward-compatible
   * field — when populated (later) ProductCard / ProductPageBody will swap
   * placeholders for real images. Keep ordered: first item is the primary.
   */
  images?: string[];
}

export const PLATE_PRODUCTS: PlateProduct[] = [
  {
    id: "standard-2d",
    slug: "standard-2d-number-plates",
    name: "Standard 2D Number Plates",
    shortName: "Standard 2D",
    tagline: "Clean, classic flat-printed characters.",
    description:
      "The timeless, affordable choice for any vehicle. Pressed to BS AU 145e on reflective British acrylic with the mandatory Charles Wright font. Pressed in-house, dispatched same-day via DPD.",
    features: [
      "BS AU 145e compliant",
      "MOT and DVLA accepted",
      "Charles Wright font",
      "Reflective British acrylic",
      "Free next-day DPD delivery",
    ],
    singlePence: PLATE_PRICES["standard-2d"].single,
    pairPence: PLATE_PRICES["standard-2d"].pair,
  },
  {
    id: "3d-gel",
    slug: "3d-gel-number-plates",
    name: "3D Gel Number Plates",
    shortName: "3D Gel",
    tagline: "Raised gel resin characters with a glossy, domed finish.",
    description:
      "Premium look at a great price. Hand-finished UV-stable polyurethane domes give every character a deep, glossy 3D look while staying fully road legal under the BS AU 145e standard.",
    features: [
      "Domed gel resin characters",
      "Glossy hand-finished surface",
      "BS AU 145e compliant",
      "Road legal in the UK",
      "Free next-day DPD delivery",
    ],
    badge: "Most Popular",
    singlePence: PLATE_PRICES["3d-gel"].single,
    pairPence: PLATE_PRICES["3d-gel"].pair,
  },
  {
    id: "4d",
    slug: "4d-number-plates",
    name: "4D Number Plates",
    shortName: "4D",
    tagline: "Sharp-edged laser-cut acrylic letters. Bold and modern.",
    description:
      "Each character is laser-cut from 3mm black acrylic and bonded to a reflective base for a sharp, raised, factory-precise look. Fully road legal under BS AU 145e.",
    features: [
      "Laser-cut 3mm acrylic characters",
      "Sharp flat-top finish",
      "BS AU 145e compliant",
      "Road legal in the UK",
      "Free next-day DPD delivery",
    ],
    singlePence: PLATE_PRICES["4d"].single,
    pairPence: PLATE_PRICES["4d"].pair,
  },
  {
    id: "4d-gel",
    slug: "4d-gel-number-plates",
    name: "4D Gel Number Plates",
    shortName: "4D Gel",
    tagline: "Raised acrylic with a glossy gel overlay. Depth and shine.",
    description:
      "Our most-loved finish. Laser-cut 4D acrylic characters topped with a hand-poured gel dome for unmatched depth and gloss. Road legal and built to BS AU 145e.",
    features: [
      "4D acrylic base + gel dome",
      "Maximum depth and shine",
      "BS AU 145e compliant",
      "Road legal in the UK",
      "Free next-day DPD delivery",
    ],
    badge: "Premium",
    singlePence: PLATE_PRICES["4d-gel"].single,
    pairPence: PLATE_PRICES["4d-gel"].pair,
  },
  {
    id: "4d-retro",
    slug: "4d-retro-number-plates",
    name: "4D Retro Number Plates",
    shortName: "4D Retro",
    tagline: "Premium retro-style raised characters. Show-stopping finish.",
    description:
      "Distinctive raised characters with a retro chamfer finish — a tribute to classic British plates that still passes BS AU 145e on a modern car.",
    features: [
      "Retro chamfer profile",
      "Raised acrylic characters",
      "BS AU 145e compliant",
      "Road legal in the UK",
      "Free next-day DPD delivery",
    ],
    badge: "New",
    singlePence: PLATE_PRICES["4d-retro"].single,
    pairPence: PLATE_PRICES["4d-retro"].pair,
  },
];

export function getProductBySlug(slug: string): PlateProduct | undefined {
  return PLATE_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: PlateProductId): PlateProduct | undefined {
  return PLATE_PRODUCTS.find((p) => p.id === id);
}

// Every finish is road-legal capable. "Show mode" is configured at order time.
export const ROAD_LEGAL_PRODUCTS = PLATE_PRODUCTS;

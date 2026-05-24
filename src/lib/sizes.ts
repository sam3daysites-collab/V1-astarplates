// Single source of truth for plate sizes. Sourced from the live-site audit.
// Stock status is mirrored from production; out-of-stock sizes render disabled.

export type SizeStock = "in_stock" | "out_of_stock";
export type SizePosition = "front" | "rear" | "both";

export interface PlateSize {
  id: string;
  label: string;
  dimensions: string; // human-readable, e.g. "520 × 111mm"
  widthMm: number;
  heightMm: number;
  roadLegalMaxChars: number;
  allowedPositions: SizePosition[];
  stock: SizeStock;
  note?: string;
}

export const PLATE_SIZES: PlateSize[] = [
  {
    id: "STANDARD_520x111",
    label: "Standard",
    dimensions: "520 × 111mm",
    widthMm: 520,
    heightMm: 111,
    roadLegalMaxChars: 7,
    allowedPositions: ["front", "rear", "both"],
    stock: "in_stock",
    note: "The UK default plate. Fits almost every road car.",
  },
  {
    id: "HURACAN_425x111",
    label: "Huracan 425",
    dimensions: "425 × 111mm",
    widthMm: 425,
    heightMm: 111,
    roadLegalMaxChars: 6,
    allowedPositions: ["front", "rear", "both"],
    stock: "in_stock",
    note: "Shorter plate, e.g. some Italian supercars. Max 6 road-legal chars.",
  },
  {
    id: "HURACAN_303x111",
    label: "Huracan 303",
    dimensions: "303 × 111mm",
    widthMm: 303,
    heightMm: 111,
    roadLegalMaxChars: 4,
    allowedPositions: ["front", "rear", "both"],
    stock: "in_stock",
    note: "Compact plate for short registrations. Max 4 road-legal chars.",
  },
  {
    id: "OVERSIZE_REAR_533x152",
    label: "Oversize Rear",
    dimensions: "533 × 152mm",
    widthMm: 533,
    heightMm: 152,
    roadLegalMaxChars: 7,
    allowedPositions: ["rear"],
    stock: "in_stock",
    note: "Larger rear plate for vehicles with a taller recess.",
  },
  {
    id: "HEX_OVERSIZE_REAR_533x152",
    label: "Hex Oversize Rear",
    dimensions: "533 × 152mm",
    widthMm: 533,
    heightMm: 152,
    roadLegalMaxChars: 7,
    allowedPositions: ["rear"],
    stock: "in_stock",
    note: "Oversize rear with hex finish detail.",
  },
  {
    id: "IMPORT_FRONT_280x203",
    label: "Import Front",
    dimensions: "280 × 203mm",
    widthMm: 280,
    heightMm: 203,
    roadLegalMaxChars: 7,
    allowedPositions: ["front"],
    stock: "out_of_stock",
    note: "Two-row front import plate. Currently out of stock.",
  },
  {
    id: "IMPORT_REAR_280x203",
    label: "Import Rear",
    dimensions: "280 × 203mm",
    widthMm: 280,
    heightMm: 203,
    roadLegalMaxChars: 7,
    allowedPositions: ["rear"],
    stock: "in_stock",
    note: "Two-row rear plate for imports and JDM cars.",
  },
  {
    id: "IMPORT_REAR_330x178",
    label: "Import Rear",
    dimensions: "330 × 178mm",
    widthMm: 330,
    heightMm: 178,
    roadLegalMaxChars: 7,
    allowedPositions: ["rear"],
    stock: "in_stock",
    note: "Alternative import rear size.",
  },
  {
    id: "MOTORBIKE_REAR_237x178",
    label: "Motorbike Rear",
    dimensions: "237 × 178mm",
    widthMm: 237,
    heightMm: 178,
    roadLegalMaxChars: 7,
    allowedPositions: ["rear"],
    stock: "in_stock",
    note: "Mandatory stacked motorbike rear plate (post-2001).",
  },
];

export type PlatePosition = "front-only" | "rear-only" | "pair";

export function positionAllowsSize(
  position: PlatePosition,
  size: PlateSize,
): boolean {
  if (size.stock === "out_of_stock") return false;
  if (position === "front-only") return size.allowedPositions.includes("front");
  if (position === "rear-only") return size.allowedPositions.includes("rear");
  return size.allowedPositions.includes("both");
}

export function getSize(id: string): PlateSize | undefined {
  return PLATE_SIZES.find((s) => s.id === id);
}

export const DEFAULT_SIZE_ID = "STANDARD_520x111";

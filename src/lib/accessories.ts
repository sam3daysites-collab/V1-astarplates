// Accessory products. Prices are authoritative (audit production values).
// Fixing kit is per-plate: £1.99 front, £1.99 rear, £3.98 if both.
// Adhesive sticky strips are £1.99 per pack of 4, default 2 packs for a pair.

export type AccessoryId = "fixing-kit" | "adhesive-strips";

export interface Accessory {
  id: AccessoryId;
  name: string;
  shortName: string;
  pricePence: number;
  description: string;
  helpText: string;
  tooltip: string;
  maxQuantity: number;
  defaultQuantity: number;
  positionPriced: boolean;
}

export const ACCESSORIES: Record<AccessoryId, Accessory> = {
  "fixing-kit": {
    id: "fixing-kit",
    name: "Number plate fixing kit",
    shortName: "Fixing kit",
    pricePence: 199, // per plate
    description:
      "Screws and matching coloured caps. £1.99 per plate — £3.98 for a pair.",
    helpText:
      "Recommended when your car already has screw holes in the front and rear bumpers.",
    tooltip:
      "We advise you pre-drill the plates before using the screws to prevent cracking.",
    maxQuantity: 1,
    defaultQuantity: 1,
    positionPriced: true,
  },
  "adhesive-strips": {
    id: "adhesive-strips",
    name: "Adhesive sticky strips",
    shortName: "Sticky strips",
    pricePence: 199, // per pack of 4
    description:
      "Heavy-duty foam adhesive strips. £1.99 per pack of 4 — one pack fits one plate.",
    helpText:
      "DVLA recommends adhesive strips over fixing kits for a cleaner finish.",
    tooltip:
      "We advise fitting the sticky strips between 5°C and 35°C to ensure maximum performance.",
    maxQuantity: 10,
    defaultQuantity: 1,
    positionPriced: false,
  },
};

export const ACCESSORY_LIST: Accessory[] = Object.values(ACCESSORIES);

export function getAccessory(id: AccessoryId): Accessory {
  return ACCESSORIES[id];
}

export type PlatePositionSelection = "front-only" | "rear-only" | "pair";

export interface SelectedAccessory {
  id: AccessoryId;
  // Quantity meaning depends on accessory:
  //  - fixing-kit: 1 = "include for selected plates" (price scales by position).
  //  - adhesive-strips: number of packs.
  quantity: number;
}

export function fixingKitPenceFor(position: PlatePositionSelection): number {
  // Front + rear = 2 plates worth of fittings.
  return position === "pair"
    ? ACCESSORIES["fixing-kit"].pricePence * 2
    : ACCESSORIES["fixing-kit"].pricePence;
}

export function defaultStripPacks(position: PlatePositionSelection): number {
  return position === "pair" ? 2 : 1;
}

export function calculateAccessoriesTotal(
  selected: SelectedAccessory[],
  position: PlatePositionSelection,
): number {
  return selected.reduce((sum, line) => {
    const accessory = ACCESSORIES[line.id];
    if (line.quantity <= 0) return sum;
    if (accessory.positionPriced) {
      // 1 = include; price varies by position.
      return sum + fixingKitPenceFor(position);
    }
    const clamped = Math.max(0, Math.min(line.quantity, accessory.maxQuantity));
    return sum + accessory.pricePence * clamped;
  }, 0);
}

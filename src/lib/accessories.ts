// Single source of truth for accessory products.
// Prices are in pence (GBP). Never trust client values — recompute server-side.

export type AccessoryId = "fixing-kit" | "adhesive-strips";

export interface Accessory {
  id: AccessoryId;
  name: string;
  shortName: string;
  pricePence: number;
  description: string;
  helpText: string;
  maxQuantity: number;
  defaultQuantity: number;
  recommendedFor: "screws" | "stickOn" | "both";
}

export const ACCESSORIES: Record<AccessoryId, Accessory> = {
  "fixing-kit": {
    id: "fixing-kit",
    name: "Number plate fixing kit",
    shortName: "Fixing kit",
    pricePence: 499,
    description:
      "Screws, plastic caps and rawl plugs — everything to bolt a standard pair of plates to your vehicle.",
    helpText:
      "Recommended when your car already has screw holes in the front and rear bumpers.",
    maxQuantity: 5,
    defaultQuantity: 1,
    recommendedFor: "screws",
  },
  "adhesive-strips": {
    id: "adhesive-strips",
    name: "Adhesive sticky strips",
    shortName: "Sticky strips",
    pricePence: 399,
    description:
      "Heavy-duty foam adhesive pads, pre-cut to size. The cleanest fit on cars without screw holes.",
    helpText:
      "Recommended when your bumpers have no screw holes or you want a flush, hole-free finish.",
    maxQuantity: 5,
    defaultQuantity: 1,
    recommendedFor: "stickOn",
  },
};

export const ACCESSORY_LIST: Accessory[] = Object.values(ACCESSORIES);

export function getAccessory(id: AccessoryId): Accessory {
  return ACCESSORIES[id];
}

export function getAccessoryPrice(id: AccessoryId): number {
  return ACCESSORIES[id].pricePence;
}

export interface SelectedAccessory {
  id: AccessoryId;
  quantity: number;
}

export function calculateAccessoriesTotal(
  selected: SelectedAccessory[],
): number {
  return selected.reduce((sum, line) => {
    const unit = ACCESSORIES[line.id].pricePence;
    const qty = Math.max(0, Math.min(line.quantity, ACCESSORIES[line.id].maxQuantity));
    return sum + unit * qty;
  }, 0);
}

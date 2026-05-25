// Server-authoritative plate price catalogue. Pence (GBP).
// Show is a MODE applied to any of the 5 finishes — same plate price either
// way; show mode optionally adds a £2.99 flag fee.
//
// Never trust prices submitted by the client; recompute totals here.

import {
  type AccessoryId,
  type SelectedAccessory,
  type PlatePositionSelection,
  calculateAccessoriesTotal,
} from "./accessories";
import { SHIPPING_PENCE } from "./policies";

export type PlateProductId =
  | "standard-2d"
  | "3d-gel"
  | "4d"
  | "4d-gel"
  | "4d-retro";

export type PlateQuantity = "single-front" | "single-rear" | "pair";

export type PlateMode = "road-legal" | "show";

export interface PlatePrice {
  id: PlateProductId;
  single: number;
  pair: number;
}

export const PLATE_PRICES: Record<PlateProductId, PlatePrice> = {
  "standard-2d": { id: "standard-2d", single: 1699, pair: 2699 },
  "3d-gel": { id: "3d-gel", single: 2199, pair: 3199 },
  "4d": { id: "4d", single: 2399, pair: 3399 },
  "4d-gel": { id: "4d-gel", single: 2799, pair: 3799 },
  "4d-retro": { id: "4d-retro", single: 3199, pair: 4749 },
};

// Show plates with a country flag on the left strip add this fee per item.
export const SHOW_FLAG_FEE_PENCE = 299;

export function getPlatePrice(
  product: PlateProductId,
  qty: PlateQuantity,
): number {
  const entry = PLATE_PRICES[product];
  return qty === "pair" ? entry.pair : entry.single;
}

export interface CartLine {
  productId: PlateProductId;
  qty: PlateQuantity;
  mode: PlateMode;
  flagCountryCode?: string; // only meaningful when mode === "show"
}

export interface CartSummary {
  plateSubtotal: number;
  flagSubtotal: number;
  accessorySubtotal: number;
  subtotal: number;
  shipping: number;
  total: number;
}

function quantityToPosition(qty: PlateQuantity): PlatePositionSelection {
  if (qty === "pair") return "pair";
  if (qty === "single-front") return "front-only";
  return "rear-only";
}

export function calculateCartTotal(
  lines: CartLine[],
  accessories: SelectedAccessory[] = [],
): CartSummary {
  const plateSubtotal = lines.reduce(
    (sum, line) => sum + getPlatePrice(line.productId, line.qty),
    0,
  );
  const flagSubtotal = lines.reduce((sum, line) => {
    if (line.mode === "show" && line.flagCountryCode) {
      const count = line.qty === "pair" ? 2 : 1;
      return sum + SHOW_FLAG_FEE_PENCE * count;
    }
    return sum;
  }, 0);

  // Use the first plate's position for accessory pricing — V1 only ships one
  // configured plate at a time. Multi-line carts will need rework.
  const position: PlatePositionSelection = lines[0]
    ? quantityToPosition(lines[0].qty)
    : "pair";
  const accessorySubtotal = calculateAccessoriesTotal(accessories, position);

  const subtotal = plateSubtotal + flagSubtotal + accessorySubtotal;
  return {
    plateSubtotal,
    flagSubtotal,
    accessorySubtotal,
    subtotal,
    shipping: SHIPPING_PENCE,
    total: subtotal + SHIPPING_PENCE,
  };
}

// Re-export so older import paths still work.
export type { AccessoryId, SelectedAccessory };

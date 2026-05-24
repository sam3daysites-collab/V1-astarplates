// Server-authoritative plate price catalogue. Values are in pence (GBP).
// Accessory prices live in @/lib/accessories. Delivery lives in @/lib/policies.
// Never trust prices submitted by the client; always recompute totals here.

import {
  ACCESSORIES,
  type AccessoryId,
  type SelectedAccessory,
  calculateAccessoriesTotal,
} from "./accessories";
import { SHIPPING_PENCE } from "./policies";

export type PlateProductId =
  | "standard-2d"
  | "3d-gel"
  | "4d"
  | "4d-gel"
  | "show";

export type PlateQuantity = "single-front" | "single-rear" | "pair";

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
  show: { id: "show", single: 1699, pair: 2499 },
};

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
}

export interface CartSummary {
  plateSubtotal: number;
  accessorySubtotal: number;
  subtotal: number;
  shipping: number;
  total: number;
}

export function calculateCartTotal(
  lines: CartLine[],
  accessories: SelectedAccessory[] = [],
): CartSummary {
  const plateSubtotal = lines.reduce(
    (sum, line) => sum + getPlatePrice(line.productId, line.qty),
    0,
  );
  const accessorySubtotal = calculateAccessoriesTotal(accessories);
  const subtotal = plateSubtotal + accessorySubtotal;
  return {
    plateSubtotal,
    accessorySubtotal,
    subtotal,
    shipping: SHIPPING_PENCE,
    total: subtotal + SHIPPING_PENCE,
  };
}

// Re-export for any older imports still pointing at @/lib/pricing.
export type { AccessoryId, SelectedAccessory };
export { ACCESSORIES };

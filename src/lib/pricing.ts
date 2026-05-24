// Server-authoritative price catalogue. Values are in pence (GBP).
// Never trust prices submitted by the client; recompute totals here at checkout.

export type PlateProductId =
  | "standard-2d"
  | "3d-gel"
  | "4d"
  | "4d-gel"
  | "show";

export type AccessoryId = "fixing-kit" | "adhesive-strips";

export type PlateQuantity = "single" | "pair";

export interface PlatePrice {
  id: PlateProductId;
  single: number;
  pair: number;
}

export interface AccessoryPrice {
  id: AccessoryId;
  price: number;
}

export const PLATE_PRICES: Record<PlateProductId, PlatePrice> = {
  "standard-2d": { id: "standard-2d", single: 1699, pair: 2699 },
  "3d-gel": { id: "3d-gel", single: 2199, pair: 3199 },
  "4d": { id: "4d", single: 2399, pair: 3399 },
  "4d-gel": { id: "4d-gel", single: 2799, pair: 3799 },
  show: { id: "show", single: 1699, pair: 2499 },
};

export const ACCESSORY_PRICES: Record<AccessoryId, AccessoryPrice> = {
  "fixing-kit": { id: "fixing-kit", price: 499 },
  "adhesive-strips": { id: "adhesive-strips", price: 399 },
};

export function getPlatePrice(
  product: PlateProductId,
  qty: PlateQuantity,
): number {
  const entry = PLATE_PRICES[product];
  return qty === "pair" ? entry.pair : entry.single;
}

export function getAccessoryPrice(id: AccessoryId): number {
  return ACCESSORY_PRICES[id].price;
}

export interface CartLine {
  productId: PlateProductId;
  qty: PlateQuantity;
}

export interface AccessoryLine {
  accessoryId: AccessoryId;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

export const FREE_SHIPPING_THRESHOLD = 3000; // £30
export const STANDARD_SHIPPING = 399; // £3.99

export function calculateCartTotal(
  lines: CartLine[],
  accessories: AccessoryLine[] = [],
): CartSummary {
  const plateSubtotal = lines.reduce(
    (sum, line) => sum + getPlatePrice(line.productId, line.qty),
    0,
  );
  const accessorySubtotal = accessories.reduce(
    (sum, line) => sum + getAccessoryPrice(line.accessoryId) * line.quantity,
    0,
  );
  const subtotal = plateSubtotal + accessorySubtotal;
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  return { subtotal, shipping, total: subtotal + shipping };
}

// Single source of truth for delivery and production policy.
// Update this file only — all pages, components and price calcs read from here.

export const DELIVERY = {
  headline: "Free next-day delivery",
  subheadline: "On orders placed before 11am Mon–Sat",
  cutoffTime: "11am",
  cutoffDays: "Mon–Sat",
  serviceName: "DPD tracked next-day",
  serviceNote:
    "Tracked, signed-for next-day delivery via DPD. Working day cut-off is 11am Mon–Sat.",
  cost: 0, // pence — free with any plate
  fallbackAccessoryOnlyCost: 499, // £4.99 if the cart is accessories only
  freeBadge: "Free",
  destinations: "UK mainland",
} as const;

export const PRODUCTION = {
  roadLegal: {
    headline: "Verified, pressed, dispatched same day",
    body:
      "Once we verify your documents, road legal plates are pressed in-house and handed to DPD the same working day. Verification usually takes under an hour during working hours.",
  },
  showPlates: {
    headline: "Pressed same working day",
    body:
      "Show plates skip verification and go straight into production. Order before 11am Mon–Sat to be on the next day's DPD run.",
  },
} as const;

export const COMPANY = {
  legalName: "ASTARNUMBERPLATES LIMITED",
  tradingName: "A★ Number Plates",
  companyNumber: "16624540",
  addressLine1: "1 Rosslyn Avenue",
  addressLine2: "East Barnet",
  city: "Barnet",
  region: "England",
  postcode: "EN4 8DH",
  email: "admin@astarnumberplates.uk",
  phones: ["07399 415464", "07464 936633"],
  hours: "Open 24/7 online · Support Mon–Sat",
  charity: "A Child's Wish",
} as const;

export const SHIPPING_PENCE = DELIVERY.cost;

export interface DeliveryPolicy {
  headline: string;
  subheadline: string;
  cutoffTime: string;
  cutoffDays: string;
  serviceName: string;
  serviceNote: string;
  cost: number;
  freeBadge: string;
  destinations: string;
}

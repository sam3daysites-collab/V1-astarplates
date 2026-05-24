// Single source of truth for delivery and production policy.
// Update this file only — all pages, components and price calcs read from here.

export const DELIVERY = {
  headline: "Free next-day delivery",
  subheadline: "On orders placed before 11am Mon–Sat",
  cutoffTime: "11am",
  cutoffDays: "Monday to Saturday",
  serviceName: "DPD tracked next-day",
  serviceNote:
    "Tracked, signed-for next-day delivery via DPD. Working day cut-off is 11am Mon–Sat.",
  cost: 0, // pence — free
  freeBadge: "Free",
  destinations: "UK mainland",
} as const;

export const PRODUCTION = {
  roadLegal: {
    headline: "Verified, pressed, dispatched same day",
    body:
      "Once we verify your documents, road legal plates are pressed in-house and handed to DPD the same working day where possible. Verification usually takes under an hour during working hours.",
  },
  showPlates: {
    headline: "Pressed same working day",
    body:
      "Show plates skip verification and go straight into production. Order before 11am Mon–Sat to get them on the next day's DPD run.",
  },
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

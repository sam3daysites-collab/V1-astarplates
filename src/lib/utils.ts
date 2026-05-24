import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGBP(pence: number): string {
  const pounds = pence / 100;
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(pounds);
}

const PLATE_REGEX = /^[A-Z0-9 ]{1,8}$/;

export function normalisePlateInput(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

export function isPlausibleUKPlate(input: string): boolean {
  const normalised = normalisePlateInput(input);
  if (!normalised) return false;
  if (normalised.length < 2 || normalised.length > 8) return false;
  return PLATE_REGEX.test(normalised);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

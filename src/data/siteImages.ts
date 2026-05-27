/**
 * Central image manifest for A★ Number Plates.
 *
 * All real photography is registered here. Consumers (ProductCard,
 * ProductPageBody, CategoryPage, homepage Recent Fits) read through the
 * helpers below and fall back to ImageSlot placeholders when entries are
 * empty — so the site stays consistent before real assets exist.
 *
 * To add a real image:
 *   1. Drop the file under /public/images/<category>/...
 *   2. Add an entry to the corresponding collection here.
 *   3. Run `npm run build` to verify.
 *
 * See /public/images/README.md for naming, sizing and performance rules.
 */

import type { PlateProductId } from "@/lib/pricing";

export type ImageCategory =
  | "hero"
  | "style"
  | "recent-fit"
  | "size"
  | "category"
  | "accessory"
  | "blog"
  | "video-poster";

export interface SiteImage {
  /** Absolute path beginning with "/" — served from /public. */
  src: string;
  /** Required for accessibility + SEO. Describe the image, not the page. */
  alt: string;
  /** Optional human caption to display under the image. */
  caption?: string;
  /** What kind of slot this image fills. Drives default loading behaviour. */
  category: ImageCategory;
  /**
   * Set true ONLY for the homepage above-the-fold hero. Every other image
   * should remain lazy.
   */
  priority?: boolean;
  /** Pixel width — optional but recommended for layout-stable rendering. */
  width?: number;
  /** Pixel height — optional but recommended for layout-stable rendering. */
  height?: number;
  /** Pages this image is intended for. Documentation only. */
  usage?: string[];
}

export interface RecentFit {
  reg: string;
  vehicle: string;
  styleId: PlateProductId;
  image?: SiteImage;
  caption?: string;
}

/* ------------------------------------------------------------------ */
/* Hero — one above-the-fold hero per page, keyed by route path.       */
/* Only the homepage entry should ever set `priority: true`.           */
/* ------------------------------------------------------------------ */
export const HERO_IMAGES: Record<string, SiteImage> = {
  // "/": { src: "/images/hero/home.webp", alt: "...", category: "hero", priority: true, width: 1600, height: 900 },
};

/* ------------------------------------------------------------------ */
/* Plate-style galleries — 2-4 images per finish.                      */
/* First entry is the primary card photo + first showcase slot.        */
/* ------------------------------------------------------------------ */
export const STYLE_GALLERIES: Record<PlateProductId, SiteImage[]> = {
  "standard-2d": [],
  "3d-gel": [],
  "4d": [],
  "4d-gel": [],
  "4d-retro": [],
};

/* ------------------------------------------------------------------ */
/* Category galleries — 2 images per category, keyed by URL slug.       */
/* ------------------------------------------------------------------ */
export const CATEGORY_GALLERIES: Record<string, SiteImage[]> = {
  "oversize-number-plates": [
    {
      src: "/images/categories/oversize-number-plates/oversize-number-plate-yellow.png",
      alt: "Oversize yellow number plate example by A Star Number Plates",
      caption: "Oversize rear plate example",
      category: "category",
    },
  ],
  "hex-number-plates": [],
  "import-number-plates": [
    {
      src: "/images/categories/import-number-plates/import-number-plate-square-yellow.png",
      alt: "Square import number plate example by A Star Number Plates",
      caption: "Import-size plate example",
      category: "category",
    },
  ],
  "motorbike-number-plates": [
    {
      src: "/images/categories/motorbike-number-plates/motorbike-number-plate-yellow.png",
      alt: "Motorbike number plate example by A Star Number Plates",
      caption: "Motorbike plate example",
      category: "category",
    },
  ],
  "number-plate-magnets": [],
  "number-plate-clips": [],
  "anti-theft-number-plate-screws": [],
  "number-plate-accessories": [],
  "number-plate-bundles": [],
};

/* ------------------------------------------------------------------ */
/* Recent fits — homepage surfaces the first 4; gallery uses all.      */
/* Add real fits at the top of the array.                              */
/* ------------------------------------------------------------------ */
export const RECENT_FITS: RecentFit[] = [
  { reg: "GT24 RBO", vehicle: "Audi RS3", styleId: "4d-gel" },
  { reg: "MX22 EVO", vehicle: "Lamborghini Huracán", styleId: "4d" },
  { reg: "AB73 XYZ", vehicle: "BMW M3", styleId: "3d-gel" },
  { reg: "RR21 SVR", vehicle: "Range Rover Sport", styleId: "4d-retro" },
];

/* ------------------------------------------------------------------ */
/* Accessories — keyed by accessory id from src/lib/accessories.ts.    */
/* ------------------------------------------------------------------ */
export const ACCESSORY_IMAGES: Record<string, SiteImage> = {
  // "fixing-kit": { src: "/images/accessories/fixing-kit.webp", alt: "...", category: "accessory", width: 800, height: 800 },
};

/* ------------------------------------------------------------------ */
/* Blog post header images — keyed by blog slug.                       */
/* ------------------------------------------------------------------ */
export const BLOG_HEADERS: Record<string, SiteImage> = {
  // "3d-gel-vs-4d-number-plates": { src: "/images/blog/3d-gel-vs-4d-number-plates.webp", alt: "...", category: "blog", width: 1600, height: 900 },
};

/* ------------------------------------------------------------------ */
/* Plate-size diagram images — keyed by size id from src/lib/sizes.ts. */
/* ------------------------------------------------------------------ */
export const SIZE_IMAGES: Record<string, SiteImage> = {
  // "STANDARD_520x111": { src: "/images/sizes/standard-520x111.webp", alt: "...", category: "size", width: 800, height: 200 },
};

/* ------------------------------------------------------------------ */
/* Helpers — components consume these. Always return a stable type so   */
/* callers don't need to null-check the manifest shape.                 */
/* ------------------------------------------------------------------ */

export function getHero(pagePath: string): SiteImage | null {
  return HERO_IMAGES[pagePath] ?? null;
}

export function getStyleImages(id: PlateProductId): SiteImage[] {
  return STYLE_GALLERIES[id] ?? [];
}

export function getCategoryImages(slug: string): SiteImage[] {
  return CATEGORY_GALLERIES[slug] ?? [];
}

export function getRecentFits(limit = 4): RecentFit[] {
  return RECENT_FITS.slice(0, limit);
}

export function getAccessoryImage(id: string): SiteImage | null {
  return ACCESSORY_IMAGES[id] ?? null;
}

export function getBlogHeader(slug: string): SiteImage | null {
  return BLOG_HEADERS[slug] ?? null;
}

export function getSizeImage(id: string): SiteImage | null {
  return SIZE_IMAGES[id] ?? null;
}

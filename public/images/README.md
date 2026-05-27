# A★ Number Plates — Image Pipeline

This folder is the single home for every site image. Real photography drops
in here; the components read through the central manifest at
`src/data/siteImages.ts` and fall back to `ImageSlot` placeholders when a
manifest entry is empty.

## Add a real image (the 3-step flow)

1. **Drop the optimised file** under `/public/images/<category>/<slug>/...`
   using a short, lowercase, hyphenated filename. See the folder layout
   below.
2. **Register it** in `src/data/siteImages.ts` against the right collection
   (`STYLE_GALLERIES["4d-gel"]`, `CATEGORY_GALLERIES["oversize-number-plates"]`,
   `RECENT_FITS[0].image`, etc.). Always set `alt` and `category`.
3. **Verify** with `npm run build && npm run lint` — the page should render
   the real image with no layout shift.

Never reference an image path from a component directly; always go through
`siteImages.ts` so we have one place to manage the catalogue.

## Folder layout

```
public/images/
├── hero/              Homepage above-the-fold hero (1 image)
├── styles/
│   ├── standard-2d/   2–4 showcase images per finish
│   ├── 3d-gel/
│   ├── 4d/
│   ├── 4d-gel/
│   └── 4d-retro/
├── recent-fits/       Customer-vehicle photos for the homepage strip
├── sizes/             Plate-size diagrams (520×111, 533×152, motorbike …)
├── categories/
│   ├── oversize-number-plates/      2 images per category
│   ├── hex-number-plates/
│   ├── import-number-plates/
│   ├── motorbike-number-plates/
│   ├── number-plate-magnets/
│   ├── number-plate-clips/
│   ├── anti-theft-number-plate-screws/
│   ├── number-plate-accessories/
│   └── number-plate-bundles/
├── accessories/       Product shots for fixing kits, strips, etc.
├── blog/              One header image per blog post (slug-named)
├── raw/               Drop-zone for un-optimised originals (do NOT
│                      reference these directly — only ship optimised
│                      copies from the folders above)
└── video-posters/     Poster frames for any future video embed
```

## Naming examples

```
public/images/hero/home-rs3-front-fit.webp
public/images/styles/4d-gel/audi-rs3-front.webp
public/images/styles/4d-gel/macro-edge.webp
public/images/recent-fits/2025-05-rs3-4dgel.webp
public/images/categories/oversize-number-plates/range-rover.webp
public/images/categories/oversize-number-plates/dimensions.webp
public/images/blog/road-legal-vs-show-plates.webp
public/images/accessories/fixing-kit-black.webp
```

Rules: lowercase, hyphenated, no spaces, no underscores, no caps. Use the
canonical slug for category subfolders (matches the URL slug).

## Target sizes (after optimisation)

| Slot                  | Format        | Pixel target          | Aspect | Max KB |
| --------------------- | ------------- | --------------------- | ------ | ------ |
| Homepage hero         | `webp` + `avif` | 1600×900             | 16/9   |  120   |
| Style showcase        | `webp`        | 1200×900              | 4/3    |   80   |
| Plate-card primary    | `webp`        | 800×600               | 4/3    |   50   |
| Recent fit            | `webp`        | 800×600               | 4/3    |   50   |
| Category strip        | `webp`        | 1000×750              | 4/3    |   60   |
| Accessory             | `webp`        | 800×800               | 1/1    |   50   |
| Size diagram          | `webp`        | 1200×600              | 2/1    |   30   |
| Blog header           | `webp`        | 1600×900              | 16/9   |   90   |

Bigger is wasted on phones; smaller pixelates on retina. WebP at ~80 % quality
hits the sweet spot for photography. SVG is fine for diagrams.

## Performance rules

The manifest + consuming components enforce these for you:

- **Lazy by default** — every image renders with `loading="lazy"` and
  `decoding="async"`. The wrapper supplies a CSS aspect ratio so the layout
  is stable before the byte arrives.
- **`priority` is opt-in** — set `priority: true` only on the homepage hero
  (`HERO_IMAGES["/"]`). Nothing else should be eager-loaded.
- **No carousel libraries** — mobile galleries use CSS scroll-snap on
  `.snap-row`. Desktop uses grids. Don't add Swiper, Splide, etc.
- **No CLS** — always set `width` and `height` on the manifest entry. The
  aspect ratio is reserved even if these are omitted, but providing them
  removes the last pixel of jitter and helps Lighthouse.
- **Single source per slot** — don't load four hero variants. Pick one
  optimised file per slot. Browsers handle DPR via `srcset`; we'll add that
  per-file when there's a real need.

## How many images per section (target)

- Homepage hero ........... 1
- Plate style galleries .... 2–4 each (5 styles × 3 average ≈ 15 total)
- Recent fits ............... 4–6 on the homepage; ~20 if a `/gallery` route
                              is built later
- Category strips ........... 2 each (9 categories × 2 = 18)
- Accessories ............... 1 per product id
- Size diagrams ............. 1 per size id (only the popular ones)
- Blog headers .............. 1 per article (14 articles)

## What this folder is NOT

- A CMS — we don't hot-reload; you must edit `siteImages.ts` and redeploy.
- A backup of originals — keep RAW originals in your asset library, not in
  the repo. `raw/` is for short-term staging only.
- A CDN — assets are served from Vercel's CDN automatically because they
  live under `/public`. Don't reference an external image host in the
  manifest unless absolutely necessary.

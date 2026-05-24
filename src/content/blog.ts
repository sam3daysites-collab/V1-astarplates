// Blog content for V1. Each article is structured as paragraphs and headings so
// it renders consistently in /blog/[slug]/page.tsx without an MDX pipeline.
//
// Add new articles here, then they automatically appear in /blog, /sitemap.xml
// and are statically rendered.

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; tone: "info" | "warn"; text: string }
  | { type: "cta"; href: string; label: string; description: string };

export interface Article {
  slug: string;
  title: string;
  description: string;
  category:
    | "Buying guide"
    | "Compliance"
    | "Comparison"
    | "Documents"
    | "Fitting"
    | "Delivery";
  readingMinutes: number;
  publishedISO: string; // YYYY-MM-DD
  body: ArticleBlock[];
}

export const ARTICLES: Article[] = [
  {
    slug: "uk-number-plate-sizes-standard-short-import",
    title: "UK Number Plate Sizes Explained",
    description:
      "Standard, square, motorbike and import sizes — which plate fits your car and what the law actually requires.",
    category: "Buying guide",
    readingMinutes: 5,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "When people search for number plate sizes they usually want one answer: \"what fits my car?\" In practice the UK has a small set of standard sizes and a few special-case ones for imports, motorbikes and 4x4s.",
      },
      { type: "h2", text: "The UK standard plate — 520 × 111mm" },
      {
        type: "p",
        text: "The default for almost every car on UK roads is the oblong 520 × 111mm plate. It's the size your car was almost certainly designed around, fits the moulded plate recess on most modern bumpers, and is the size we press by default in the builder.",
      },
      { type: "h2", text: "Square / import plates — 286 × 215mm" },
      {
        type: "p",
        text: "Imports, classic cars and some American models have a smaller rear plate recess. The square 286 × 215mm format fits the gap. It uses the same Charles Wright font, just on two lines instead of one.",
      },
      { type: "h2", text: "Motorbike plates — 228 × 178mm" },
      {
        type: "p",
        text: "Motorbikes must use a stacked, two-row plate on the rear only. Since 1 September 2001, only the smaller 228 × 178mm format is road legal on a motorbike — the older single-line plate is no longer permitted.",
      },
      { type: "h2", text: "4x4 and short plates" },
      {
        type: "p",
        text: "Some 4x4s and older Land Rovers have a tight rear recess. We can press a 533 × 152mm short plate to fit. Always measure the recess, including any moulded frame, before ordering.",
      },
      {
        type: "callout",
        tone: "info",
        text: "If you're not sure what fits, send us a photo of your car's front and rear plate recesses with a tape measure across them — we'll confirm the size.",
      },
      {
        type: "cta",
        href: "/builder",
        label: "Build a standard plate",
        description: "Start with the 520 × 111mm UK standard.",
      },
    ],
  },
  {
    slug: "3d-gel-vs-4d-number-plates",
    title: "3D Gel vs 4D Number Plates",
    description:
      "Two premium finishes, two different processes. Which one suits your car?",
    category: "Comparison",
    readingMinutes: 6,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "3D Gel and 4D plates are the two most-asked-for premium finishes. They look similar at a glance — both give raised characters and a much sharper look than a flat 2D plate — but the manufacturing process and the final feel are genuinely different.",
      },
      { type: "h2", text: "3D Gel — domed resin" },
      {
        type: "p",
        text: "We pour a UV-stable polyurethane gel onto a printed plate base. The gel domes over each character, giving a glossy, three-dimensional, slightly rounded look. It's a forgiving finish that catches the light and doesn't yellow.",
      },
      { type: "h2", text: "4D — laser-cut acrylic" },
      {
        type: "p",
        text: "We laser-cut each character from 3mm black acrylic and bond it to a reflective base. The result is a sharp, flat-topped, factory-precise raised character with crisp edges. Bolder than 3D Gel; more architectural.",
      },
      { type: "h2", text: "Which one is road legal?" },
      {
        type: "p",
        text: "Both — provided they follow the mandatory Charles Wright font and the plate meets BS AU 145e. We press both to that standard.",
      },
      { type: "h2", text: "Which one should you pick?" },
      {
        type: "ul",
        items: [
          "Choose 3D Gel if you want depth, gloss and a slightly rounded look — popular on modern hot hatches and family cars.",
          "Choose 4D if you want a sharper, more aggressive, flat-topped raised character — popular on performance cars and matte-finish vehicles.",
          "Want both depth and shine? Step up to 4D Gel — laser-cut characters with a poured gel dome.",
        ],
      },
      {
        type: "cta",
        href: "/builder",
        label: "Build a 3D Gel or 4D plate",
        description: "Try both styles live in the builder preview.",
      },
    ],
  },
  {
    slug: "road-legal-vs-show-plates",
    title: "Road Legal vs Show Plates — What's the Difference?",
    description:
      "Why a show plate must never be fitted to a road-going car, and what makes a plate road legal in the UK.",
    category: "Compliance",
    readingMinutes: 5,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "It's the most common confusion in our inbox: someone orders a show plate and intends to fit it to their car. Don't do this. Here's why these are two completely different products.",
      },
      { type: "h2", text: "What makes a plate road legal" },
      {
        type: "p",
        text: "A road legal UK number plate must meet BS AU 145e — the 2021 British Standard. That means reflective white on the front, reflective yellow on the rear, the mandatory Charles Wright font, correct character dimensions and spacing, and a supplier marking on the plate itself.",
      },
      { type: "h2", text: "What show plates are for" },
      {
        type: "p",
        text: "Show plates are display items — for car shows, photography, exhibitions and private property. They can use custom fonts, colours, layouts and sizes. They are not built to BS AU 145e and they will not pass MOT.",
      },
      {
        type: "callout",
        tone: "warn",
        text: "Fitting a non-compliant plate to a vehicle on a public road is a fine of up to £1,000, an automatic MOT failure, and can invalidate your insurance.",
      },
      { type: "h2", text: "How we keep them separate" },
      {
        type: "p",
        text: "Our road legal plates and show plates live on different routes, with different checkout flows. Road legal plates require document verification. Show plates do not — and every show plate ships with a clear NOT ROAD LEGAL acknowledgement.",
      },
      {
        type: "cta",
        href: "/road-legal-number-plates",
        label: "See road legal plates",
        description: "All BS AU 145e, pressed in-house.",
      },
    ],
  },
  {
    slug: "what-documents-do-you-need-for-road-legal-number-plates",
    title: "What Documents Do You Need for Road Legal Plates?",
    description:
      "The full list of UK ID and entitlement documents we accept — and the ones we'll reject.",
    category: "Documents",
    readingMinutes: 4,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "Every registered UK number plate supplier — including us — is legally required to verify two things before pressing a road legal plate: that you are who you say you are, and that you're entitled to the registration. You'll need one document from each list.",
      },
      { type: "h2", text: "Proof of identity (one of these)" },
      {
        type: "ul",
        items: [
          "UK driving licence — full or provisional, both sides",
          "Valid passport — photo page",
          "Armed forces ID card",
          "Police warrant card",
        ],
      },
      { type: "h2", text: "Proof of entitlement (one of these)" },
      {
        type: "ul",
        items: [
          "V5C — the vehicle log book",
          "V5C/2 — new keeper supplement (if you've just bought the car)",
          "V778 — retention document",
          "V750 — certificate of entitlement for a private reg",
          "Hire or lease agreement in your name, showing the registration",
          "Trade insurance certificate in your name, showing the registration",
        ],
      },
      { type: "h2", text: "What we'll reject" },
      {
        type: "ul",
        items: [
          "Anything cropped or partially covered",
          "Digitally edited or retouched images",
          "Expired documents",
          "Names that don't match the order",
        ],
      },
      {
        type: "cta",
        href: "/documents-required",
        label: "Full documents guide",
        description: "Detailed acceptance criteria and how we handle your files.",
      },
    ],
  },
  {
    slug: "bs-au-145e-explained",
    title: "BS AU 145e Explained",
    description:
      "The 2021 British Standard that every road legal UK number plate must meet — in plain English.",
    category: "Compliance",
    readingMinutes: 6,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "BS AU 145e is the British Standard that defines what a road legal UK number plate is. Introduced in 2021, it replaced BS AU 145d and tightened the requirements for materials, durability and font.",
      },
      { type: "h2", text: "What it covers" },
      {
        type: "ul",
        items: [
          "Materials and durability — abrasion, impact, UV and weather resistance",
          "Retroreflectivity — front must be reflective white, rear reflective yellow",
          "Character set — mandatory Charles Wright font, with strict dimensions",
          "Spacing and margins — group spacing and minimum margins around characters",
          "Supplier marking — every plate carries the supplier postcode and the BS AU 145e reference",
        ],
      },
      { type: "h2", text: "Why it tightened in 2021" },
      {
        type: "p",
        text: "The new standard introduced a single black layer for characters, removed the previous allowance for grey shading, and toughened the abrasion test. The aim: every plate stays clearly readable, by humans and ANPR cameras, for the life of the vehicle.",
      },
      { type: "h2", text: "How we test" },
      {
        type: "p",
        text: "Every plate we press is built on BS AU 145e-certified acrylic, printed with compliant ink, and pressed to the spec — then visually QC'd against the supplier sheet before dispatch.",
      },
      {
        type: "cta",
        href: "/compliance",
        label: "Read our full compliance policy",
        description: "Standards, document verification and supplier marking.",
      },
    ],
  },
  {
    slug: "number-plate-spacing-rules-uk",
    title: "UK Number Plate Spacing Rules",
    description:
      "Group separation, character size, margins — the exact spacing rules every road legal plate must follow.",
    category: "Compliance",
    readingMinutes: 5,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "Number plate spacing isn't decorative — it's specified by BS AU 145e and enforced at MOT. Get it wrong and the plate will fail.",
      },
      { type: "h2", text: "The numbers" },
      {
        type: "ul",
        items: [
          "Character height: 79mm",
          "Character width: 50mm (with a few exceptions)",
          "Character stroke: 14mm",
          "Space between characters: 11mm",
          "Group separator (e.g. between AB12 and CDE): 33mm",
          "Top, bottom and side margins: minimum 11mm",
        ],
      },
      { type: "h2", text: "Why people misspace" },
      {
        type: "p",
        text: "Misspaced plates almost always come from show plates being fitted to a road car, or from someone trying to make a registration spell a word. Both will fail MOT and can mean a £1,000 fine.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Our road legal plates are pre-spaced to the BS AU 145e rules — you can't accidentally produce a misspaced plate from the builder.",
      },
      {
        type: "cta",
        href: "/builder",
        label: "Build a correctly spaced plate",
        description: "Spacing is locked to the BS AU 145e specification.",
      },
    ],
  },
  {
    slug: "2d-vs-3d-vs-4d-number-plates",
    title: "2D vs 3D vs 4D vs 4D Gel — The Full Comparison",
    description:
      "Four finishes, one plate. How they're made, how they look, what they cost and which is right for your car.",
    category: "Comparison",
    readingMinutes: 7,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "All four of our road legal finishes start from the same BS AU 145e reflective acrylic base. The difference is what happens to the characters on top.",
      },
      { type: "h2", text: "Standard 2D" },
      {
        type: "p",
        text: "Flat, printed Charles Wright characters on reflective acrylic. The MOT-spec everyday plate. Sharpest contrast, lowest cost, dealer-fit look.",
      },
      { type: "h2", text: "3D Gel" },
      {
        type: "p",
        text: "A printed character with a domed, glossy polyurethane gel poured on top. Catches the light, slightly rounded — a popular upgrade that still feels factory.",
      },
      { type: "h2", text: "4D" },
      {
        type: "p",
        text: "Each character is laser-cut from 3mm black acrylic and bonded flat to the base. Sharp, raised, architectural look — bold and modern.",
      },
      { type: "h2", text: "4D Gel" },
      {
        type: "p",
        text: "Our flagship. A laser-cut 4D character with a hand-poured gel dome over the top — depth and shine in one plate.",
      },
      { type: "h2", text: "Which should you choose?" },
      {
        type: "ul",
        items: [
          "Budget / fleet / classic look — 2D",
          "Subtle upgrade with shine — 3D Gel",
          "Sharp, modern, raised look — 4D",
          "Maximum depth and gloss — 4D Gel",
        ],
      },
      {
        type: "cta",
        href: "/pricing",
        label: "See all four prices",
        description: "Single or pair, full price list.",
      },
    ],
  },
  {
    slug: "are-4d-number-plates-legal-uk",
    title: "Are 4D Number Plates Legal in the UK?",
    description:
      "Yes — provided they meet BS AU 145e and use the Charles Wright font. Here's the detail.",
    category: "Compliance",
    readingMinutes: 4,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "The short answer: yes, 4D plates are road legal in the UK — as long as they meet BS AU 145e and use the mandatory Charles Wright font.",
      },
      { type: "h2", text: "What \"4D\" actually means" },
      {
        type: "p",
        text: "There's no formal \"4D\" category in the standard. The industry uses the term for plates with laser-cut acrylic characters bonded to a reflective base — a raised, sharp, flat-topped look.",
      },
      { type: "h2", text: "How they stay legal" },
      {
        type: "ul",
        items: [
          "Characters follow the Charles Wright shape and the correct dimensions",
          "Plate background is reflective white (front) or reflective yellow (rear)",
          "Spacing and margins match BS AU 145e",
          "Supplier marking is present on the plate",
        ],
      },
      { type: "h2", text: "What makes them illegal" },
      {
        type: "ul",
        items: [
          "Stylised, italic or non-standard font shapes",
          "Tinted, smoked or coloured backgrounds",
          "Custom spacing to make the reg spell a word",
        ],
      },
      {
        type: "cta",
        href: "/4d-number-plates",
        label: "See our 4D plates",
        description: "Laser-cut 3mm acrylic, BS AU 145e compliant.",
      },
    ],
  },
  {
    slug: "how-to-fit-number-plates-pads-vs-screws",
    title: "How to Fit Your Number Plates",
    description:
      "Screws vs sticky strips, alignment, and a five-minute fitting walkthrough.",
    category: "Fitting",
    readingMinutes: 5,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "Fitting a number plate is a five-minute job. Get it right and the plate looks factory; get it wrong and you'll have a wonky plate or a missing one on the motorway.",
      },
      { type: "h2", text: "Screws or sticky strips?" },
      {
        type: "ul",
        items: [
          "Screws (our fixing kit) — best when your bumpers already have mounting holes. Most modern UK cars do.",
          "Sticky strips — best when there are no holes, or you want a flush, hole-free finish. Tougher to remove later.",
        ],
      },
      { type: "h2", text: "Step by step" },
      {
        type: "ul",
        items: [
          "Clean the bumper recess with isopropyl alcohol so adhesive and screw caps sit flat.",
          "Offer the plate up dry first — check the alignment to the recess.",
          "If using screws, mark through the existing holes lightly with a pencil.",
          "Apply sticky strips along the top and bottom edges, or fit the plate using two screws.",
          "Press firmly for 30 seconds. Don't wash the car for 24 hours.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Not sure which fitting your car needs? Look behind the plate recess — if there are two small screws or threaded inserts, go for our fixing kit. If it's smooth plastic, go for sticky strips.",
      },
      {
        type: "cta",
        href: "/builder",
        label: "Add a fitting kit to your order",
        description: "Fixing kit £4.99, sticky strips £3.99.",
      },
    ],
  },
  {
    slug: "number-plate-delivery-dispatch-times-uk",
    title: "UK Number Plate Delivery & Dispatch Times",
    description:
      "How quickly we press, when we ship and how DPD tracked next-day delivery actually works.",
    category: "Delivery",
    readingMinutes: 4,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "Number plates are a same-day product. Here's exactly how the timeline works on our orders.",
      },
      { type: "h2", text: "Order before 11am Mon–Sat — free next-day delivery" },
      {
        type: "p",
        text: "Every order placed before 11am Monday to Saturday ships on the next working day's DPD run at no extra cost. It's tracked, signed-for and goes to UK mainland addresses by default.",
      },
      { type: "h2", text: "Verification step (road legal only)" },
      {
        type: "p",
        text: "If you've ordered a road legal plate, dispatch starts the moment we verify your documents — usually within an hour during working hours. Show plates skip this and go straight into production.",
      },
      { type: "h2", text: "After 11am" },
      {
        type: "p",
        text: "Orders placed after the cut-off — or over Sunday — are pressed and shipped on the next working day, arriving the day after via DPD.",
      },
      { type: "h2", text: "Tracking" },
      {
        type: "p",
        text: "You'll get a tracking link by email as soon as DPD scans the parcel. They give one-hour delivery windows on the day.",
      },
      {
        type: "cta",
        href: "/delivery",
        label: "Full delivery details",
        description: "Cut-offs, coverage, transit damage.",
      },
    ],
  },
  {
    slug: "private-reg-show-plates-uk",
    title: "Can I Put My Private Reg on a Show Plate?",
    description:
      "Putting a private registration on a custom show plate — what's allowed, what isn't and how to display it legally.",
    category: "Compliance",
    readingMinutes: 4,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "You hold a private registration on retention or assigned to your car. You want a custom show plate with that registration on it. Is that OK?",
      },
      { type: "h2", text: "On the car — only if it's road legal" },
      {
        type: "p",
        text: "If the plate is fitted to a vehicle driven on a public road, it must be road legal — BS AU 145e, Charles Wright, correct spacing and reflective background. A show plate fails on all of those.",
      },
      { type: "h2", text: "On display — go wild" },
      {
        type: "p",
        text: "On your garage wall, at a show, on a static display vehicle, or as a gift — there's no road traffic legislation in play. Custom font, colour, layout, oversized — all fair game on a show plate.",
      },
      {
        type: "callout",
        tone: "warn",
        text: "Don't be tempted to fit a show plate \"just for a photo on the driveway\" then drive off with it. The moment the car is on a public road, the plate becomes illegal.",
      },
      {
        type: "cta",
        href: "/show-plates",
        label: "Order a custom show plate",
        description: "Off-road, display and private property only.",
      },
    ],
  },
  {
    slug: "v750-v778-documents-explained",
    title: "V750 and V778 — Number Plate Entitlement Documents",
    description:
      "The two DVLA documents that prove you own a private registration, and which one to upload when you order plates.",
    category: "Documents",
    readingMinutes: 4,
    publishedISO: "2026-01-12",
    body: [
      {
        type: "p",
        text: "If you own a private (cherished) registration, you'll have one of two DVLA documents proving it: a V750 or a V778. Both are valid entitlement documents when you order road legal plates from us.",
      },
      { type: "h2", text: "V750 — Certificate of Entitlement" },
      {
        type: "p",
        text: "Issued when you buy a private registration from the DVLA that has never been assigned to a vehicle. It confirms you have the right to assign that registration to a car in the future.",
      },
      { type: "h2", text: "V778 — Retention Document" },
      {
        type: "p",
        text: "Issued when you take a registration off a vehicle and place it on retention. It confirms you can re-assign that registration to a different vehicle later.",
      },
      { type: "h2", text: "Which one do I upload?" },
      {
        type: "p",
        text: "Whichever one you have. The grantee name on the certificate must match the name on the order. If you've already assigned the reg to a vehicle, upload the V5C (or V5C/2) instead — that's the cleanest match.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Lost your V750 or V778? Apply for a duplicate from the DVLA. We can't press a road legal plate without a valid entitlement document.",
      },
      {
        type: "cta",
        href: "/documents-required",
        label: "Full documents guide",
        description: "Every accepted ID and entitlement document.",
      },
    ],
  },
];

export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

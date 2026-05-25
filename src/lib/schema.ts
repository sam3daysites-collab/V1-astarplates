import { PLATE_PRODUCTS } from "./products";
import { COMPANY } from "./policies";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "./seo";

type JsonLd = Record<string, unknown>;

export function organisationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    alternateName: COMPANY.tradingName,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/logo.png`,
    email: COMPANY.email,
    telephone: COMPANY.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.addressLine1,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postcode,
      addressCountry: "GB",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: COMPANY.email,
      telephone: COMPANY.phones[0],
      areaServed: "GB",
      availableLanguage: ["en"],
    },
  };
}

export function localBusinessSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#business`,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    telephone: COMPANY.phones[0],
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.addressLine1,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postcode,
      addressCountry: "GB",
    },
    areaServed: "GB",
    priceRange: "££",
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/builder?reg={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function productSchema(slug: string): JsonLd | null {
  const product = PLATE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "Road Legal Number Plates",
    offers: [
      {
        "@type": "Offer",
        name: `${product.shortName} — Single`,
        priceCurrency: "GBP",
        price: (product.singlePence / 100).toFixed(2),
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/${product.slug}`,
      },
      {
        "@type": "Offer",
        name: `${product.shortName} — Pair`,
        priceCurrency: "GBP",
        price: (product.pairPence / 100).toFixed(2),
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/${product.slug}`,
      },
    ],
  };
}

export function faqSchema(items: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PUBLIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/builder", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/compliance", changeFrequency: "monthly", priority: 0.6 },
  { path: "/documents-required", changeFrequency: "monthly", priority: 0.6 },
  { path: "/delivery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/road-legal-number-plates", changeFrequency: "weekly", priority: 0.9 },
  { path: "/standard-number-plates", changeFrequency: "weekly", priority: 0.8 },
  { path: "/3d-gel-number-plates", changeFrequency: "weekly", priority: 0.8 },
  { path: "/4d-number-plates", changeFrequency: "weekly", priority: 0.8 },
  { path: "/4d-gel-number-plates", changeFrequency: "weekly", priority: 0.8 },
  { path: "/show-plates", changeFrequency: "weekly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PUBLIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

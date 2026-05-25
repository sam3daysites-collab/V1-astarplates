import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/cart",
    "/checkout",
    "/order-success",
    "/upload-documents",
    "/track-order",
    "/admin",
    "/admin/",
    "/auth",
    "/api/",
  ];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

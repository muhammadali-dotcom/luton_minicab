import type { MetadataRoute } from "next";
import { isSiteIndexable, siteOrigin } from "@/config/seo";

// Previews and non-production builds block all crawling (pages also carry noindex).
// Production allows everything and points to the sitemap.
export default function robots(): MetadataRoute.Robots {
  if (!isSiteIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
}

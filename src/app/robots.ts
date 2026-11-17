import type { MetadataRoute } from "next";
import { isSiteIndexable, siteOrigin } from "@/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow crawlers to read page-level noindex on previews and short airport pages.
    rules: { userAgent: "*", allow: "/" },
    ...(isSiteIndexable ? { sitemap: `${siteOrigin}/sitemap.xml` } : {}),
  };
}

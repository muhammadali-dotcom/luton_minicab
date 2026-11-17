import type { MetadataRoute } from "next";
import { airports, areas, services } from "@/config/site";
import { isSiteIndexable, siteOrigin } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteIndexable) return [];
  // Short airport pages deliberately remain noindex; additional pickup names have no routes.
  const paths = [
    "", "/about", "/contact", "/fleet", "/services", "/airports", "/areas",
    "/privacy", "/terms", "/cookies",
    ...services.map(({ slug }) => `/services/${slug}`),
    ...airports.map(({ slug }) => `/airports/${slug}`),
    ...areas.map(({ slug }) => `/areas/${slug}`),
  ];
  return paths.map((path) => ({ url: `${siteOrigin}${path}` }));
}

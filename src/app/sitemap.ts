import type { MetadataRoute } from "next";
import { airports, areas, services } from "@/config/site";
import { isSiteIndexable, siteOrigin } from "@/config/seo";
import { routes } from "@/config/routeDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteIndexable) return [];
  // Enquiry-only airport URLs redirect to /airports; additional pickup names have no routes.
  const paths = [
    "", "/about", "/contact", "/fleet", "/services", "/airports", "/areas",
    "/privacy", "/terms", "/cookies",
    ...services.map(({ slug }) => `/services/${slug}`),
    ...airports.map(({ slug }) => `/airports/${slug}`),
    ...areas.map(({ slug }) => `/areas/${slug}`),
    ...routes.map(({ slug }) => `/routes/${slug}`),
    "/luton-airport-guide", "/luton-station-transfers",
  ];
  return paths.map((path) => ({ url: `${siteOrigin}${path}` }));
}

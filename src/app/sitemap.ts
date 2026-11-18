import type { MetadataRoute } from "next";
import { airports, areas, services } from "@/config/site";
import { contentUpdated, isSiteIndexable, siteOrigin } from "@/config/seo";
import { routes } from "@/config/routeDetails";

type Entry = [path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly"];

// Every indexable page. Enquiry-only airports redirect to /airports and have no pages;
// the extra pickup towns on /areas have no pages of their own.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isSiteIndexable) return [];
  const entries: Entry[] = [
    ["/", 1, "weekly"],
    ["/services", 0.9, "weekly"],
    ["/airports", 0.9, "weekly"],
    ["/areas", 0.9, "weekly"],
    ["/fleet", 0.8, "monthly"],
    ["/luton-airport-guide", 0.85, "monthly"],
    ["/luton-station-transfers", 0.85, "monthly"],
    ...services.map(({ slug }): Entry => [`/services/${slug}`, 0.85, "monthly"]),
    ...airports.map(({ slug }): Entry => [`/airports/${slug}`, 0.85, "monthly"]),
    ...routes.map(({ slug }): Entry => [`/routes/${slug}`, 0.85, "monthly"]),
    ...areas.map(({ slug }): Entry => [`/areas/${slug}`, 0.75, "monthly"]),
    ["/about", 0.7, "monthly"],
    ["/contact", 0.7, "monthly"],
    ["/privacy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
    ["/cookies", 0.3, "yearly"],
  ];
  return entries.map(([path, priority, changeFrequency]) => ({
    url: `${siteOrigin}${path === "/" ? "" : path}`,
    lastModified: contentUpdated,
    changeFrequency,
    priority,
  }));
}

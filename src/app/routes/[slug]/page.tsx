import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoutePage } from "@/components/RoutePage";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata, sellTitle } from "@/config/seo";
import { findRoute, routes } from "@/config/routeDetails";

export function generateStaticParams() {
  return routes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/routes/[slug]">): Promise<Metadata> {
  const route = findRoute((await params).slug);
  if (!route) return {};
  return pageMetadata({ title: sellTitle(`${route.name} Taxi`), description: route.metaDescription, path: `/routes/${route.slug}` });
}

// No <Suspense> around the content: React moves a large finished boundary to the end of the
// HTML (after the footer, in a hidden div), which text extractors and AI crawlers skip. The
// slugs are prerendered from generateStaticParams, so the page is complete static HTML.
export default async function Page({ params }: PageProps<"/routes/[slug]">) {
  const route = findRoute((await params).slug);
  if (!route) notFound();
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Airports", path: "/airports" }, { name: `${route.name} taxi`, path: `/routes/${route.slug}` }]} />
      <RoutePage route={route} />
    </>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFallback } from "@/components/PageFallback";
import { RoutePage } from "@/components/RoutePage";
import { findRoute, routes } from "@/config/routeDetails";

export function generateStaticParams() {
  return routes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/routes/[slug]">): Promise<Metadata> {
  const route = findRoute((await params).slug);
  if (!route) return {};
  return {
    title: `${route.name} Taxi`,
    alternates: { canonical: `/routes/${route.slug}` },
    description: route.metaDescription,
  };
}

// params is URL data, so it's read inside Suspense to keep navigation instant.
export default function Page({ params }: PageProps<"/routes/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/routes/[slug]">["params"] }) {
  const route = findRoute((await params).slug);
  if (!route) notFound();
  return <RoutePage route={route} />;
}

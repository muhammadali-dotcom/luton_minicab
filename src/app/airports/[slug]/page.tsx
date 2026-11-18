import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFallback } from "@/components/PageFallback";
import { AirportPage } from "@/components/AirportPage";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/config/seo";
import { airports } from "@/config/site";

const find = (slug: string) => airports.find((a) => a.slug === slug);

export function generateStaticParams() {
  return airports.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/airports/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const airport = find(slug);
  if (airport) {
    return pageMetadata({
      title: `${airport.name} Airport Transfers`,
      description: `Taxis to and from ${airport.name} Airport with flight tracking, meet and greet and fixed fares. Book online or call, day or night.`,
      path: `/airports/${slug}`,
    });
  }
  return {};
}

// params is URL data, so it's read inside Suspense to keep navigation instant.
export default function Page({ params }: PageProps<"/airports/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/airports/[slug]">["params"] }) {
  const { slug } = await params;
  const airport = find(slug);
  if (airport)
    return (
      <>
        <BreadcrumbSchema items={[{ name: "Airports", path: "/airports" }, { name: `${airport.name} Airport`, path: `/airports/${slug}` }]} />
        <AirportPage airport={airport} />
      </>
    );
  notFound();
}

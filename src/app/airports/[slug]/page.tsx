import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFallback } from "@/components/PageFallback";
import { AirportPage } from "@/components/AirportPage";
import { AirportShortPage } from "@/components/AirportShortPage";
import { airports, shortPageAirports } from "@/config/site";

const find = (slug: string) => airports.find((a) => a.slug === slug);
const findShort = (slug: string) => shortPageAirports.find((a) => a.slug === slug);

export function generateStaticParams() {
  return [...airports, ...shortPageAirports].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/airports/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const airport = find(slug);
  if (airport) {
    return {
      title: `${airport.name} Airport Transfers`,
      description: `Taxis to and from ${airport.name} Airport with flight tracking, meet and greet and fixed fares. Book online or call, day or night.`,
    };
  }
  const short = findShort(slug);
  return short
    ? {
        title: `${short.name} Airport Transfers`,
        description: `Taxis to and from ${short.name} Airport with fixed fares. Book online or call, day or night.`,
        robots: { index: false },
      }
    : {};
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
  if (airport) return <AirportPage airport={airport} />;
  const short = findShort(slug);
  if (!short) notFound();
  return <AirportShortPage name={short.name} />;
}

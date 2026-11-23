import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorporateTravelPage } from "@/components/CorporateTravelPage";
import { LocalJourneysPage } from "@/components/LocalJourneysPage";
import { LongDistancePage } from "@/components/LongDistancePage";
import { SchoolRunsPage } from "@/components/SchoolRunsPage";
import { StationHotelPage } from "@/components/StationHotelPage";
import { serviceDetails } from "@/config/serviceDetails";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/config/seo";
import { services } from "@/config/site";

const titleFor = (slug: string) => services.find((s) => s.slug === slug)?.name ?? null;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const title = titleFor((await params).slug);
  const slug = (await params).slug;
  return title
    ? pageMetadata({ title, description: serviceDetails[slug].metaDescription ?? `${serviceDetails[slug].hero.text} Luton Minicab: fixed fares, DBS-checked drivers, available 24/7.`, path: `/services/${slug}` })
    : {};
}

// No <Suspense> around the content: React moves a large finished boundary to the end of the
// HTML (after the footer, in a hidden div), which text extractors and AI crawlers skip. The
// slugs are prerendered from generateStaticParams, so the page ships as complete static HTML.
export default function Page({ params }: PageProps<"/services/[slug]">) {
  return <Content params={params} />;
}

async function Content({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const title = titleFor(slug);
  if (!title) notFound();
  const detail = serviceDetails[slug];
  const pages: Record<string, ReactNode> = {
    "local-journeys": <LocalJourneysPage name={title} detail={detail} />,
    "school-runs": <SchoolRunsPage name={title} detail={detail} />,
    "station-hotel-transfers": <StationHotelPage name={title} detail={detail} />,
    "corporate-travel": <CorporateTravelPage name={title} detail={detail} />,
    "long-distance-travel": <LongDistancePage name={title} detail={detail} />,
  };
  const page = pages[slug];
  if (!page) notFound();
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Services", path: "/services" }, { name: title, path: `/services/${slug}` }]} />
      {page}
    </>
  );
}

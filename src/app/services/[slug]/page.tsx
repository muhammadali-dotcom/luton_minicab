import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFallback } from "@/components/PageFallback";
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
    ? pageMetadata({ title, description: `${serviceDetails[slug].hero.text} Luton Minicab: fixed fares, DBS-checked drivers, available 24/7.`, path: `/services/${slug}` })
    : {};
}

// params is URL data, so it's read inside Suspense to keep navigation instant.
export default function Page({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Content params={params} />
    </Suspense>
  );
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

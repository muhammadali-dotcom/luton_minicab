import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFallback } from "@/components/PageFallback";
import { AreaLocalPage } from "@/components/AreaLocalPage";
import { areaDetails } from "@/config/areaDetails";
import { areas } from "@/config/site";

const find = (slug: string) => areas.find((a) => a.slug === slug);

export function generateStaticParams() {
  return areas.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const area = find((await params).slug);
  if (!area) return {};
  const detail = areaDetails[area.slug];
  return { title: area.heading, description: detail ? `${detail.hero.text} Fixed fares, DBS-checked drivers, available 24/7.` : `${area.intro} Book online or call, day or night.` };
}

// params is URL data, so it's read inside Suspense to keep navigation instant.
export default function Page({ params }: PageProps<"/areas/[slug]">) {
  return (
    <Suspense fallback={<PageFallback />}>
      <AreaContent params={params} />
    </Suspense>
  );
}

async function AreaContent({ params }: { params: PageProps<"/areas/[slug]">["params"] }) {
  const area = find((await params).slug);
  if (!area) notFound();
  const detail = areaDetails[area.slug];
  if (!detail) notFound();
  return <AreaLocalPage area={area} detail={detail} />;
}

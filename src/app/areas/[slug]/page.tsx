import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageFallback } from "@/components/PageFallback";
import { PickupAreaPage } from "@/components/PickupAreaPage";
import { AreaLocalPage } from "@/components/AreaLocalPage";
import { areaDetails } from "@/config/areaDetails";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/config/seo";
import { areas, pickupAreas } from "@/config/site";

const find = (slug: string) => areas.find((a) => a.slug === slug);
const findPickup = (slug: string) => pickupAreas.find((area) => area.slug === slug);

export function generateStaticParams() {
  return [...areas, ...pickupAreas].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pickup = findPickup(slug);
  if (pickup) {
    return pageMetadata({
      title: `Minicabs in ${pickup.name}`,
      path: `/areas/${slug}`,
      description: pickup.journey,
    });
  }
  const area = find(slug);
  if (!area) return {};
  const detail = areaDetails[area.slug];
  return pageMetadata({ title: area.heading, path: `/areas/${area.slug}`, description: detail ? `${detail.hero.text} Fixed fares, DBS-checked drivers, available 24/7.` : `${area.intro} Book online or call, day or night.` });
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
  const { slug } = await params;
  const pickup = findPickup(slug);
  if (pickup) {
    return (
      <>
        <BreadcrumbSchema items={[{ name: "Areas", path: "/areas" }, { name: pickup.name, path: `/areas/${slug}` }]} />
        <PickupAreaPage area={pickup} />
      </>
    );
  }
  const area = find(slug);
  if (!area) notFound();
  const detail = areaDetails[area.slug];
  if (!detail) notFound();
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Areas", path: "/areas" }, { name: area.name, path: `/areas/${area.slug}` }]} />
      <AreaLocalPage area={area} detail={detail} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PickupAreaPage } from "@/components/PickupAreaPage";
import { AreaLocalPage } from "@/components/AreaLocalPage";
import { areaDetails } from "@/config/areaDetails";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { isSiteIndexable, pageMetadata, sellTitle } from "@/config/seo";
import { areas, pickupAreas } from "@/config/site";

const find = (slug: string) => areas.find((a) => a.slug === slug);
const findPickup = (slug: string) => pickupAreas.find((area) => area.slug === slug);

export function generateStaticParams() {
  return [...areas, ...pickupAreas].map(({ slug }) => ({ slug }));
}

// Each area keeps its own hero line (so no two descriptions match), then the selling points,
// shortened when the whole would pass 160 characters.
function areaDescription(text: string) {
  const full = `${text} Fixed fares, DBS-checked drivers, 15 minutes free waiting, 24/7.`;
  return full.length <= 160 ? full : `${text} Fixed fares, DBS-checked drivers, available 24/7.`;
}

export async function generateMetadata({ params }: PageProps<"/areas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pickup = findPickup(slug);
  if (pickup) {
    // Pickup pages share one template and differ by a sentence, so they stay out of search
    // (doorway risk) and out of the sitemap. Links are still followed. Build one out with
    // real local content, like the nine main areas, before making it indexable.
    return {
      ...pageMetadata({
        title: sellTitle(`Taxis in ${pickup.name}`),
        path: `/areas/${slug}`,
        description: pickup.journey,
      }),
      robots: { index: false, follow: isSiteIndexable },
    };
  }
  const area = find(slug);
  if (!area) return {};
  const detail = areaDetails[area.slug];
  return pageMetadata({ title: sellTitle(`${area.name} Taxis`), path: `/areas/${area.slug}`, description: detail ? areaDescription(detail.hero.text) : `${area.intro} Book online or call, day or night.` });
}

// No <Suspense> around the content: React moves a large finished boundary to the end of the
// HTML (after the footer, in a hidden div), which text extractors and AI crawlers skip. The
// slugs are prerendered from generateStaticParams, so the page ships as complete static HTML.
export default function Page({ params }: PageProps<"/areas/[slug]">) {
  return <AreaContent params={params} />;
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

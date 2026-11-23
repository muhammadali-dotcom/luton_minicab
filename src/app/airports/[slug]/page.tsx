import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

// No <Suspense> around the content: React moves a large finished boundary to the end of the
// HTML (after the footer, in a hidden div), which text extractors and AI crawlers skip. The
// slugs are prerendered from generateStaticParams, so the page ships as complete static HTML.
export default function Page({ params }: PageProps<"/airports/[slug]">) {
  return <Content params={params} />;
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

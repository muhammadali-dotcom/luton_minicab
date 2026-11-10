import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalJourneysPage } from "@/components/LocalJourneysPage";
import { SchoolRunsPage } from "@/components/SchoolRunsPage";
import { ServicePage } from "@/components/ServicePage";
import { serviceDetails } from "@/config/serviceDetails";
import { services } from "@/config/site";

const titleFor = (slug: string) => services.find((s) => s.slug === slug)?.name ?? null;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const title = titleFor((await params).slug);
  const slug = (await params).slug;
  return title ? { title, description: `${serviceDetails[slug].hero.text} Luton Minicab: fixed fares, DBS-checked drivers, available 24/7.` } : {};
}

// params is URL data, so it's read inside Suspense to keep navigation instant.
export default function Page({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<main id="main" className="flex-1" />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: PageProps<"/services/[slug]">["params"] }) {
  const { slug } = await params;
  const title = titleFor(slug);
  if (!title) notFound();
  if (slug === "local-journeys") return <LocalJourneysPage name={title} detail={serviceDetails[slug]} />;
  if (slug === "school-runs") return <SchoolRunsPage name={title} detail={serviceDetails[slug]} />;
  return <ServicePage slug={slug} name={title} detail={serviceDetails[slug]} />;
}

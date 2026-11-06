import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HoldingPage } from "@/components/HoldingPage";
import { services } from "@/config/site";

const titleFor = (slug: string) => services.find((s) => s.slug === slug)?.name ?? null;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const title = titleFor((await params).slug);
  return title ? { title, robots: { index: false } } : {};
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
  const title = titleFor((await params).slug);
  if (!title) notFound();
  return <HoldingPage title={title} />;
}

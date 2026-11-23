import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { FleetCards } from "@/components/FleetCards";
import { FleetCompare } from "@/components/FleetCompare";
import { FleetSteps } from "@/components/FleetSteps";
import { Briefcase, CarFront, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { fleet } from "@/config/site";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/config/seo";
import heroPhoto from "../../../public/brand/fleet-hero.webp";

const uses = [
  { label: "Everyday journeys", Icon: CarFront },
  { label: "Family & group trips", Icon: Users },
  { label: "Business travel", Icon: Briefcase },
];

export const metadata: Metadata = pageMetadata({
  title: "Our Cars: Saloon, Estate, MPV & Executive",
  description:
    "Saloons and estates for up to 4 passengers, MPVs for up to 7, and executive cars. See passenger, suitcase and hand luggage space for each car.",
  path: "/fleet",
});

const faqs = [
  {
    q: "Can I choose a specific car model?",
    a: "The pictures are examples. We’ll send a car from the category you book, and the model may vary.",
  },
  { q: "Can I ask for a child seat?", a: "Yes, child seats are available on request. Just mention it when you book." },
  {
    q: "How do I know how many bags will fit?",
    a: "Each car shows how many large cases and pieces of hand luggage it takes. Space depends on bag sizes, so if you’re unsure, ask us before you confirm.",
  },
];

// Structured data so search engines can read each car's capacity. No brands or prices.
const fleetSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Luton Minicab fleet",
  itemListElement: fleet.map(({ name, tagline, capacity }, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Vehicle",
      name,
      description: `${tagline} Up to ${capacity.passengers} passengers, ${capacity.cases} large cases and ${capacity.hand} pieces of hand luggage.`,
      vehicleSeatingCapacity: capacity.passengers,
    },
  })),
};

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <BreadcrumbSchema items={[{ name: "Our Fleet", path: "/fleet" }]} />
      <PageHero
        tone="light"
        image={heroPhoto}
        photoRight
        photoFrom="content"
        alt="Three dark cars parked on a sunny forecourt outside a brick building."
        eyebrow="OUR FLEET"
        heading={<span className="block max-w-[11em] text-balance">The right car for everyone coming along.</span>}
        text="From a quiet ride on your own to a family holiday with the suitcases, choose the car that fits."
        primary={{ label: "Explore Our Cars", href: "#choose-your-car" }}
        trust={uses}
        trustStyle="stacked"
      />
      <FleetCards />
      <FleetCompare />
      <FleetSteps band />
      <Faq items={faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetSchema) }} />
    </main>
  );
}

import type { Metadata } from "next";
import { Airports } from "@/components/Airports";
import { Areas } from "@/components/Areas";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { ServiceStrip } from "@/components/ServiceStrip";
import { Services } from "@/components/Services";
import { Vehicles } from "@/components/Vehicles";
import { pageMetadata } from "@/config/seo";
import { WhyTravel } from "@/components/WhyTravel";

export const metadata: Metadata = pageMetadata({
  description:
    "Taxis in Luton and nearby towns, with fixed fares and DBS-checked drivers. Early flights, school mornings, late trains home: book online or call, 24/7.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <ServiceStrip />
      <Services />
      <Airports />
      <WhyTravel />
      <Vehicles />
      <Areas />
      <Faq />
    </main>
  );
}

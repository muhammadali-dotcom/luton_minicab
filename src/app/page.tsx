import { Airports } from "@/components/Airports";
import { Areas } from "@/components/Areas";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { ServiceStrip } from "@/components/ServiceStrip";
import { Services } from "@/components/Services";
import { Vehicles } from "@/components/Vehicles";
import { WhyTravel } from "@/components/WhyTravel";

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

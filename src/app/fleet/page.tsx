import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { FleetCards } from "@/components/FleetCards";
import { FleetSteps } from "@/components/FleetSteps";
import { Briefcase, CarFront, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import heroPhoto from "../../../public/brand/fleet-hero.png";

const uses = [
  { label: "Everyday journeys", Icon: CarFront },
  { label: "Family & group trips", Icon: Users },
  { label: "Business travel", Icon: Briefcase },
];

export const metadata: Metadata = {
  title: "Our Fleet: Saloon, Estate, MPV & Executive",
  description:
    "From everyday saloons to estates, MPVs and executive cars. Choose the right vehicle for your passengers and luggage when you book.",
};

const faqs = [
  {
    q: "Can I choose a specific car model?",
    a: "The pictures are examples. We’ll send a car from the category you book, and the model may vary.",
  },
  { q: "Can I ask for a child seat?", a: "Yes, child seats are available on request. Just mention it when you book." },
  {
    q: "How do I know how many bags will fit?",
    a: "Exact passenger and luggage limits are shown when you book. If you’re unsure, ask us before you confirm.",
  },
];

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        photoRight
        alt="Three dark cars parked on a sunny forecourt outside a brick building."
        eyebrow="OUR FLEET"
        heading={
          <>
            <span className="block">Your plans.</span>
            <span className="block">Your people.</span>
            <span className="block">Your kind of car.</span>
          </>
        }
        text="From everyday trips to family holidays and business travel, find a car that suits your journey."
        primary={{ label: "Explore Our Cars", href: "#choose-your-car" }}
        trust={uses}
        trustStyle="stacked"
      />
      <FleetCards />
      <FleetSteps />
      <Faq items={faqs} band />
    </main>
  );
}

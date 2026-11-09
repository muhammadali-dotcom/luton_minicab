import type { Metadata } from "next";
import { PageHero, trustLocal } from "@/components/PageHero";
import { ServiceCards } from "@/components/ServiceCards";
import heroPhoto from "../../../public/brand/hero-photo.png";

export const metadata: Metadata = {
  title: "Taxi & Minicab Services",
  description:
    "Local journeys, airport transfers, school runs, assisted travel, business and long-distance trips from Luton. Fixed fares, available 24/7.",
};

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="dark"
        image={heroPhoto}
        alt="A driver opens the car door for a smiling passenger outside a brick house."
        eyebrow="OUR SERVICES"
        heading="Here for every part of your day."
        text="From school runs to airport trips, pick the journey you need."
        trust={trustLocal}
        compact
      />
      <ServiceCards />
    </main>
  );
}

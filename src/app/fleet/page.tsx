import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { FleetCards } from "@/components/FleetCards";
import { FleetSteps } from "@/components/FleetSteps";
import { PageHero, trustLocal } from "@/components/PageHero";
import heroPhoto from "../../../public/brand/hero-photo.png";

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
        tone="dark"
        image={heroPhoto}
        alt="A driver opens the car door for a smiling passenger outside a brick house."
        eyebrow="OUR FLEET"
        heading="A car that fits your journey."
        text="From everyday trips to family holidays and business travel, choose the car that suits you."
        trust={trustLocal}
      />
      <FleetCards />
      <FleetSteps />
      <Faq items={faqs} band />
    </main>
  );
}

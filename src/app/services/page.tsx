import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { MoreServices, ServiceAirportBanner } from "@/components/MoreServices";
import { PageHero } from "@/components/PageHero";
import { ServiceCards } from "@/components/ServiceCards";
import heroPhoto from "../../../public/brand/services/services-hero.png";

export const metadata: Metadata = {
  title: "Taxi & Minicab Services",
  description:
    "Local journeys, airport transfers, school runs, assisted travel, business and long-distance trips from Luton. Fixed fares, available 24/7.",
};

// Approved answers, reused from the homepage and service pages.
const faqs = [
  { q: "How do I book?", a: "Book online or call us. We’ll help you arrange your journey." },
  { q: "Is the fare fixed?", a: "Yes. You’ll know your fare when you book." },
  { q: "How can I pay?", a: "In cash, or online through a payment link." },
  { q: "Can I book at any time?", a: "Yes. We’re available 24/7, day or night." },
  { q: "Can I ask for a child seat?", a: "Yes, child seats are available on request. Just mention it when you book." },
];

export default function Page() {
  return (
    <main id="main" className="flex-1">
      {/* The owner's wall-style photo, set up like the service pages (no car badges to retouch). */}
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="A dark estate car with its rear door open, parked outside a limestone house with a green front door."
        fade="from-background/88 via-background/65 via-40% to-transparent to-55%"
        photoFrom="content"
        mobilePhotoPosition="object-[96%_center]"
        desktopPhotoPosition="lg:object-[center_55%]"
        eyebrow="OUR SERVICES"
        heading={<span className="block text-balance">Whatever’s planned, your ride starts here.</span>}
        text="Local trips, school runs and journeys further afield. Find the service that fits your plans."
        secondary={{ label: "Explore Services", href: "#services-list", icon: "down" }}
        note="Your journey. Your choice."
      />
      <ServiceCards />
      <MoreServices />
      <ServiceAirportBanner />
      <Faq items={faqs} />
    </main>
  );
}

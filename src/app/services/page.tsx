import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { MoreServices, ServiceAirportBanner } from "@/components/MoreServices";
import { PageHero } from "@/components/PageHero";
import { ServiceCards } from "@/components/ServiceCards";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/config/seo";
import heroPhoto from "../../../public/brand/services/services-hero.webp";

export const metadata: Metadata = pageMetadata({
  title: "Luton Taxi & Minicab Services | Fixed Fares",
  description:
    "Local journeys, airport transfers, school runs, business and long-distance trips from Luton. Fixed fares, DBS-checked drivers, available 24/7.",
  path: "/services",
});

// Approved answers, reused from the homepage and service pages.
const faqs = [
  { q: "How do I book?", a: "Book online or call us. We’ll help you arrange your journey." },
  { q: "Is the fare fixed?", a: "Yes. You’ll know your fare when you book." },
  {
    q: "How do I arrange a cruise, wedding or pet-friendly journey?",
    a: "Message us on WhatsApp or call us with your plans. Tell us the date, the time and anything we should know, such as luggage or a pet, and we’ll let you know what we can arrange.",
  },
  { q: "How can I pay?", a: "In cash, or online through a payment link." },
  { q: "Can I book at any time?", a: "Yes. We’re available 24/7, day or night." },
  { q: "Can I ask for a child seat?", a: "Yes, child seats are available on request. Just mention it when you book." },
];

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <BreadcrumbSchema items={[{ name: "Our Services", path: "/services" }]} />
      {/* The owner's wall-style photo, set up like the service pages (no car badges to retouch). */}
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="A dark estate car with its rear door open, parked outside a limestone house with a green front door."
        fade="from-background/88 via-background/65 via-40% to-transparent to-55%"
        photoFrom="content"
        mobilePhotoPosition="object-[96%_center]"
        // The car sits further left in this photo, so the photo starts later to keep it clear of the heading.
        photoLeft="lg:left-[calc(max(2.5rem,(100%-80rem)/2+2.5rem)+5rem)] xl:left-[calc(max(2.5rem,(100%-80rem)/2+2.5rem)+10rem)]"
        eyebrow="OUR SERVICES"
        heading={<span className="block text-balance">Tell us where you’re going. We’ll take it from there.</span>}
        text="A quick trip to the shops or a long drive to see family, there’s a journey here for you."
        secondary={{ label: "Explore Services", href: "#services-list", icon: "down" }}
        note="Booking takes a few minutes, day or night."
      />
      <ServiceCards />
      <MoreServices />
      <ServiceAirportBanner />
      <Faq items={faqs} />
    </main>
  );
}

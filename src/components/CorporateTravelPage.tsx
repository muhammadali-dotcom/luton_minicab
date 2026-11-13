import { Building2, CalendarClock, Car, Clock, MapPin, MessageCircleMore, PoundSterling, ReceiptPoundSterling, ShieldCheck, Wallet } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { BookingDetails } from "./BookingDetails";
import { BusinessJourneys } from "./BusinessJourneys";
import { LocalAreaCards } from "./LocalAreaCards";
import { Reassurances } from "./Reassurances";
import { ServiceHero } from "./ServiceHero";

// Business customers book and pay per journey (cash or payment link): no accounts,
// invoicing, prices or capacities. Built from the same blocks as School Runs.
export function CorporateTravelPage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <ServiceHero name={name} detail={detail} />

      <BusinessJourneys />

      <Reassurances
        id="business-heading"
        label="FOR BUSINESS TRAVEL"
        heading="The details that matter on a work day."
        items={[
          { title: "Fixed fares", text: "You’ll know your fare when you book.", Icon: PoundSterling },
          { title: "Early starts, late finishes", text: "We’re available 24/7.", Icon: Clock },
          { title: "DBS-checked drivers", text: "Every driver is DBS-checked.", Icon: ShieldCheck },
          { title: "Easy to pay", text: "Cash, or online through a payment link.", Icon: Wallet },
          {
            title: "A car to suit",
            text: "Ask for an executive car when you book.",
            Icon: Car,
            link: { label: "See our cars", href: "/fleet#executive" },
          },
        ]}
        card={{
          title: "One journey at a time",
          text: "Each journey is booked and paid on its own, so there’s nothing to set up first.",
          Icon: ReceiptPoundSterling,
        }}
      />

      <BookingDetails
        heading="Let’s plan your journey."
        text="Have these details ready, and we’ll help you arrange it."
        details={[
          { title: "Pickup address", text: "Home, office or hotel.", Icon: MapPin },
          { title: "Where you’re going", text: "The meeting, office or event address.", Icon: Building2 },
          { title: "Dates and times", text: "Include the pickup time and any return journey.", Icon: CalendarClock },
          { title: "Anything else?", text: "Who’s travelling, luggage, or the car you’d like.", Icon: MessageCircleMore },
        ]}
      />

      <LocalAreaCards
        eyebrow="WHERE WE PICK UP"
        heading="Business travel from across Luton."
        text="From homes, offices and hotels in Luton and the towns nearby."
        helpText="Don’t see your area? Have a question about a business trip? Just ask."
      />
    </main>
  );
}

import { Baby, CalendarClock, DoorOpen, MapPin, MessageCircleMore, PoundSterling, ShieldCheck, Signpost, Wallet } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { BookingDetails } from "./BookingDetails";
import { CarChoices } from "./CarChoices";
import { LocalAreaCards } from "./LocalAreaCards";
import { LongDistanceJourney } from "./LongDistanceJourney";
import { Reassurances } from "./Reassurances";
import { ServiceHero } from "./ServiceHero";

// Built from the shared service blocks, with "Room for the journey" as the page's own section.
// No destinations, distances, times or prices (owner's choice). Tones alternate: journeys
// dark, cars light, reassurances dark, booking light, areas dark.
export function LongDistancePage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <ServiceHero name={name} detail={detail} />

      <LongDistanceJourney />

      <CarChoices
        id="cars-heading"
        label="ROOM FOR THE JOURNEY"
        heading="Space for you and your luggage."
        text="Longer trips often mean more luggage. Here are three good places to start."
        cars={["saloon", "estate", "mpv-plus"]}
      />

      <Reassurances
        id="longer-heading"
        label="FOR LONGER JOURNEYS"
        heading="The details that matter on a longer trip."
        band
        items={[
          { title: "Fixed fares", text: "You’ll know your fare when you book.", Icon: PoundSterling },
          { title: "Door to door", text: "From your pickup address to your destination.", Icon: DoorOpen },
          { title: "DBS-checked drivers", text: "Every driver is DBS-checked.", Icon: ShieldCheck },
          { title: "Child seats on request", text: "Just mention it when you book.", Icon: Baby },
          { title: "Easy to pay", text: "Cash, or online through a payment link.", Icon: Wallet },
        ]}
      />

      <BookingDetails
        heading="Let’s plan your journey."
        band={false}
        details={[
          { title: "Pickup address", text: "Where should we collect you from?", Icon: MapPin },
          { title: "Where you’re going", text: "The full address you’re heading to.", Icon: Signpost },
          { title: "Dates and times", text: "Include any return journey.", Icon: CalendarClock },
          { title: "Anything else?", text: "Passengers, luggage, or the car you’d like.", Icon: MessageCircleMore },
        ]}
      />

      <LocalAreaCards
        eyebrow="STARTING FROM LUTON"
        heading="Longer journeys from across Luton."
        text="Pickups from homes in Luton and the towns nearby."
        helpText="Wherever you’re heading, tell us when you book. Just ask."
        band
      />
    </main>
  );
}

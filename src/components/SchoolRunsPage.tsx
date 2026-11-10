import { Baby, CalendarClock, Clock, HeartHandshake, MapPin, MessageCircleMore, PoundSterling, School, ShieldCheck, Wallet } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { BookingDetails } from "./BookingDetails";
import { JourneyPanels } from "./JourneyPanels";
import { LocalAreaCards } from "./LocalAreaCards";
import { Reassurances } from "./Reassurances";
import { ServiceHero } from "./ServiceHero";
import bag from "../../public/brand/school-day-bag.png";
import home from "../../public/brand/school-day-home.png";
import morning from "../../public/brand/school-day-morning.png";

// Confirmed facts only: no school names, contracts, regular plans, escorts, wheelchair access,
// medical care or prices. Each school journey is booked on its own.
export function SchoolRunsPage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <ServiceHero name={name} detail={detail} />

      {/* The owner's two illustrations (car badges retouched out). */}
      <JourneyPanels
        id="school-day-heading"
        label="THE SCHOOL DAY"
        heading="To school and home again."
        panels={[
          {
            label: "THE MORNING JOURNEY",
            title: "Off to school",
            text: "Arrange a pickup from home for the journey to school.",
            image: morning,
          },
          {
            label: "THE JOURNEY HOME",
            title: "Heading home",
            text: "Book the return journey for the end of the school day.",
            image: home,
            decoration: bag,
          },
        ]}
        note="Arrange each journey in advance."
      />

      <Reassurances
        id="peace-heading"
        label="PEACE OF MIND"
        heading="The little things parents ask about."
        items={[
          { title: "DBS-checked drivers", text: "Every driver is DBS-checked.", Icon: ShieldCheck },
          { title: "Child seats on request", text: "Just ask when you book.", Icon: Baby },
          { title: "Fixed fares", text: "You’ll know your fare when you book.", Icon: PoundSterling },
          { title: "Book any time", text: "We’re available 24/7.", Icon: Clock },
          { title: "Easy to pay", text: "Cash, or online through a payment link.", Icon: Wallet },
        ]}
        // SEND: the owner's approved wording only.
        card={{
          title: "A little extra support",
          text: "For passengers who need a little extra support. Tell us about any needs when you book.",
          Icon: HeartHandshake,
        }}
      />

      {/* "Any other needs" rather than "additional needs", so SEND stays the approved line only. */}
      <BookingDetails
        heading="Let’s plan your school run."
        details={[
          { title: "Pickup address", text: "Where should we collect from?", Icon: MapPin },
          { title: "School or college", text: "Tell us the name and drop-off location.", Icon: School },
          { title: "Dates and times", text: "Include the pickup time and any return journey.", Icon: CalendarClock },
          { title: "Anything else?", text: "Let us know about child seats or any other needs.", Icon: MessageCircleMore },
        ]}
      />

      <LocalAreaCards
        eyebrow="WHERE WE PICK UP"
        heading="School runs across Luton."
        text="From homes in Luton and the towns nearby."
        helpText="Don’t see your area? Have a question about a school run? Just ask."
      />
    </main>
  );
}

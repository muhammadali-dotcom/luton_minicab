import { BedDouble, Briefcase, CalendarClock, Clock, Luggage, MapPin, MessageCircleMore, Plane, PoundSterling, Signpost, TrainFront } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { BookingDetails } from "./BookingDetails";
import { LocalAreaCards } from "./LocalAreaCards";
import { Reassurances } from "./Reassurances";
import { ServiceHero } from "./ServiceHero";
import { StationHotelJourneys } from "./StationHotelJourneys";
import { container, eyebrow, h2, section } from "./ui";

// Stations are plain destinations; no train tracking (only flight tracking is confirmed),
// no hotel names (no implied partnerships), no luggage capacities on this page.
const stations = [
  { name: "Luton station", place: "In Luton town centre" },
  { name: "Leagrave station", place: "In north-west Luton" },
  { name: "Luton Airport Parkway station", place: "Near Luton Airport" },
];

// Built from the shared service blocks, with "Stations near you" as the page's own section.
// Tones alternate: journeys dark, stations light, hotels dark, booking light, areas dark.
export function StationHotelPage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <ServiceHero name={name} detail={detail} />

      <StationHotelJourneys />

      <section aria-labelledby="stations-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>STATIONS NEAR YOU</p>
          <h2 id="stations-heading" className={`${h2} mt-4 text-foreground`}>
            To the train, or home after it.
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">Rides to and from the stations around Luton.</p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
            {stations.map(({ name: station, place }) => (
              <li key={station} className="flex items-center gap-4 rounded-2xl border border-border bg-alt p-5">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/45 text-foreground">
                  <TrainFront aria-hidden size={24} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{station}</h3>
                  <p className="mt-1 text-base text-foreground">{place}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Reassurances
        id="hotels-heading"
        label="HOTELS MADE EASY"
        heading="Staying nearby? We’ll take it from here."
        band
        items={[
          { title: "From the hotel door", text: "We pick you up at the entrance, at the time you book.", Icon: BedDouble },
          { title: "Bags and cases", text: "Tell us about your luggage when you book.", Icon: Luggage },
          {
            title: "On to the airport",
            text: "Rides from your hotel to Luton and other airports.",
            Icon: Plane,
            link: { label: "Our airports", href: "/airports" },
          },
          { title: "Meetings and events", text: "Arrive ready, booked one journey at a time.", Icon: Briefcase },
          { title: "Fixed fares", text: "You’ll know your fare when you book.", Icon: PoundSterling },
        ]}
        card={{
          title: "Day or night",
          text: "We’re available 24/7, for early trains and late arrivals.",
          Icon: Clock,
        }}
      />

      <BookingDetails
        heading="Let’s plan your transfer."
        band={false}
        details={[
          { title: "Pickup address", text: "Home, hotel or station.", Icon: MapPin },
          { title: "Where you’re going", text: "The station, hotel or address.", Icon: Signpost },
          { title: "Dates and times", text: "Include your train time, if you have one.", Icon: CalendarClock },
          { title: "Anything else?", text: "Luggage, child seats, or the car you’d like.", Icon: MessageCircleMore },
        ]}
      />

      <LocalAreaCards
        eyebrow="WHERE WE PICK UP"
        heading="Station and hotel rides across Luton."
        text="From homes, hotels and stations in Luton and the towns nearby."
        helpText="Going to a station further afield? Just ask."
        band
      />
    </main>
  );
}

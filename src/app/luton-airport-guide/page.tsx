import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bus, CalendarClock, Clock, Footprints, Luggage, MapPin, Navigation, ParkingCircle, PlaneLanding } from "lucide-react";
import { BookingDetails } from "@/components/BookingDetails";
import { Faq } from "@/components/Faq";
import { PageHero, trustAirport } from "@/components/PageHero";
import { PopularRoutes } from "@/components/PopularRoutes";
import { container, eyebrow, h2, section } from "@/components/styles";
import { pageMetadata } from "@/config/seo";
import heroPhoto from "../../../public/brand/airport-luton-terminal-hero.png";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

export const metadata: Metadata = pageMetadata({
  title: "Luton Airport Guide: Drop-off, Pickup and Taxis",
  description:
    "A practical guide to getting to and from London Luton Airport by taxi: the drop-off and pickup zone, the free long-stay option, when to arrive and meeting your driver.",
  path: "/luton-airport-guide",
});

// Practical help that /airports/luton doesn't cover. Facts only from london-luton.co.uk
// (dropping-off, picking-up and taxi pages), checked on 17 November 2026. No charge amounts:
// the airport's own pages differ, and whether the charge is in the fare is not confirmed.
const checked = "Checked on london-luton.co.uk on 17 November 2026. Your booking confirmation is always your final instruction.";
const airportLink = "https://www.london-luton.co.uk/to-and-from-lla/taxi";

const dropOff = [
  {
    title: "The Drop Off and Pick Up Zone",
    text: "Most taxis use this zone. It’s about a 5-minute walk (around 260m, mostly flat) to the terminal, through a tunnel under the road.",
    Icon: Footprints,
  },
  {
    title: "Two entrances",
    text: "The zone has two entrances, and drivers can use whichever is quicker, which helps avoid queues.",
    Icon: Navigation,
  },
  {
    title: "The free option",
    text: "Drivers can drop you in the Long Stay Car Park for free. A free shuttle bus runs about every 20 minutes, 24 hours a day, and takes around 10 minutes to the terminal.",
    Icon: Bus,
  },
  {
    title: "Getting there by satnav",
    text: "The airport’s postcode is LU2 9QT. Near the roundabout before the tunnel, drivers follow the signs for the Drop Off and Pick Up Zone rather than the satnav.",
    Icon: MapPin,
  },
];

const faqs = [
  {
    q: "How early should I get to Luton Airport?",
    a: "The airport suggests arriving 2 to 3 hours before your flight. Tell us your flight time when you book, and we’ll agree a pickup time that allows for it.",
  },
  {
    q: "Where will my driver drop me off?",
    a: "Usually in the Drop Off and Pick Up Zone, about a 5-minute walk from the terminal. If you’d prefer the free Long Stay Car Park and shuttle bus, tell us when you book.",
  },
  {
    q: "Where do I meet my driver when I land?",
    a: "At the agreed meeting point in your booking confirmation. The airport’s guidance sends pre-booked passengers to the Pick Up Zone or an agreed meeting area, so keep your phone switched on when you land.",
  },
  {
    q: "What if my flight is delayed?",
    a: "We track your flight, so we know when you land. Your driver waits free for 15 minutes from when they reach the pickup point at the agreed time.",
  },
  {
    q: "Is a pre-booked taxi the same as the taxi rank?",
    a: "No. The rank near Bus Bay A is for walk-up black cabs with metered fares. A pre-booked journey with us has a fixed fare agreed when you book, and your driver meets you at the agreed point.",
  },
];

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="A dark saloon parked outside an airport terminal."
        photoRight
        eyebrow="LUTON AIRPORT GUIDE"
        heading={<span className="block text-balance">Getting to and from Luton Airport.</span>}
        text="Where taxis drop off and pick up, how long to allow, and how to meet your driver."
        trust={trustAirport}
      />

      <RevealSection aria-labelledby="dropoff-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>DROPPING OFF</p>
          <SectionHeading id="dropoff-heading" className={`${h2} mt-4 text-balance text-foreground`}>
            Where taxis drop you off.
          </SectionHeading>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {dropOff.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4 rounded-2xl border border-border bg-paper p-6 text-foreground">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/45">
                  <Icon aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-[1.375rem] font-semibold leading-tight">{title}</h3>
                  <p className="mt-1 text-[1.0625rem] leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-foreground">{checked}</p>
        </div>
      </RevealSection>

      <RevealSection aria-labelledby="timing-heading" className={`border-t border-border ${section}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:gap-14`}>
          <div>
            <p className={`${eyebrow} text-accent`}>TIMING</p>
            <SectionHeading id="timing-heading" className={`${h2} mt-4 text-balance text-foreground`}>
              Arrive with time to spare.
            </SectionHeading>
            <p className="mt-4 flex items-start gap-3 text-[1.125rem] leading-relaxed text-foreground">
              <Clock aria-hidden size={24} strokeWidth={1.5} className="mt-1 shrink-0" />
              The airport suggests arriving 2 to 3 hours before your flight, to get through check-in and security. Share your flight
              time when you book, and we’ll agree a pickup time that allows for the journey.
            </p>
          </div>
          <div>
            <p className={`${eyebrow} text-accent`}>LANDING</p>
            <SectionHeading className={`${h2} mt-4 text-balance text-foreground`}>Meeting your driver.</SectionHeading>
            <p className="mt-4 flex items-start gap-3 text-[1.125rem] leading-relaxed text-foreground">
              <ParkingCircle aria-hidden size={24} strokeWidth={1.5} className="mt-1 shrink-0" />
              We track your flight. Collect your bags, check the meeting point in your booking confirmation, then head there. Keep your
              phone on, as time in the Pick Up Zone is limited.
            </p>
            <Link
              href="/airports/luton"
              className="group mt-4 inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
            >
              Luton Airport transfers
              <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </RevealSection>

      <BookingDetails
        heading="Let’s plan your Luton Airport journey."
        details={[
          { title: "Pickup address", text: "Your home, hotel or workplace.", Icon: MapPin },
          { title: "Flight details", text: "Your flight number and time.", Icon: PlaneLanding },
          { title: "Dates and times", text: "Include any return journey.", Icon: CalendarClock },
          { title: "Passengers and luggage", text: "So we send a car with enough room.", Icon: Luggage },
        ]}
      />

      <Faq items={faqs} heading="Luton Airport: your questions.">
        <a
          href={airportLink}
          rel="noopener"
          className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
        >
          The airport’s own taxi guide
          <ArrowUpRight aria-hidden size={16} />
        </a>
        <PopularRoutes className="mt-12" />
      </Faq>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, Luggage, MapPin, TrainFront } from "lucide-react";
import { BookingDetails } from "@/components/BookingDetails";
import { Faq } from "@/components/Faq";
import { PageHero, trustLocal } from "@/components/PageHero";
import { PopularRoutes } from "@/components/PopularRoutes";
import { container, eyebrow, h2, section } from "@/components/styles";
import { pageMetadata } from "@/config/seo";
import heroPhoto from "../../../public/brand/services/station-hotel-transfers-hero.png";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

export const metadata: Metadata = pageMetadata({
  title: "Luton Station Taxis: Luton, Parkway and Leagrave",
  description:
    "Taxis to and from Luton, Luton Airport Parkway and Leagrave stations. Pickups at the station pickup point, fixed fares, DBS-checked drivers, available 24/7.",
  path: "/luton-station-transfers",
});

// Written differently from the "Stations near you" section of /services/station-hotel-transfers,
// which links here. No train tracking (only flight tracking is confirmed) and no times or prices.
const stations = [
  {
    name: "Luton station",
    where: "In Luton town centre",
    suits: "Trains towards London and the Midlands, and the town centre.",
    area: { label: "Taxis in Luton", href: "/areas/luton" },
  },
  {
    name: "Luton Airport Parkway",
    where: "Near Luton Airport",
    suits: "Rail travellers heading to or from the airport and the south of the town.",
    area: { label: "Luton Airport transfers", href: "/airports/luton" },
  },
  {
    name: "Leagrave station",
    where: "In north-west Luton",
    suits: "Leagrave, Lewsey, Marsh Farm, and nearby Houghton Regis and Dunstable.",
    area: { label: "Taxis in Leagrave", href: "/areas/leagrave" },
  },
];

const faqs = [
  {
    q: "Where will my driver pick me up at the station?",
    a: "At the station’s designated pickup point, not the taxi rank. Please call us when you arrive, and your driver will meet you there.",
  },
  {
    q: "What if my train is late?",
    a: "Please call or message us as soon as you know, and we’ll update your pickup. Your driver waits free for 15 minutes from the booked time.",
  },
  {
    q: "Can you take me to a London station instead?",
    a: "Yes, including St Pancras, Euston and King’s Cross. See our Luton to central London page, or tell us the station when you book.",
  },
  {
    q: "Do you pick up from stations at night?",
    a: "Yes. We’re available 24/7, for early trains and late arrivals.",
  },
];

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="A dark estate car parked outside a station entrance with a glass canopy, beside a hotel."
        fade="from-background/88 via-background/65 via-40% to-transparent to-55%"
        photoFrom="content"
        mobilePhotoPosition="object-[96%_center]"
        eyebrow="LUTON STATION TRANSFERS"
        heading={<span className="block max-w-[9em] text-balance">Taxis from Luton’s stations.</span>}
        text="To and from Luton, Luton Airport Parkway and Leagrave stations, with a driver waiting at the pickup point."
        trust={trustLocal}
      />

      <RevealSection aria-labelledby="stations-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>THREE STATIONS</p>
          <SectionHeading id="stations-heading" className={`${h2} mt-4 text-balance text-foreground`}>
            Which station suits you?
          </SectionHeading>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {stations.map(({ name, where, suits, area }) => (
              <li key={name} className="flex flex-col rounded-2xl border border-border bg-paper p-6 text-foreground">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/45">
                  <TrainFront aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-tight">{name}</h3>
                <p className="mt-1 text-base">{where}</p>
                <p className="mt-3 text-[1.0625rem] leading-relaxed">
                  <span className="font-semibold">Handy for: </span>
                  {suits}
                </p>
                <Link
                  href={area.href}
                  className="group mt-auto inline-flex min-h-[44px] items-center gap-2 pt-3 font-semibold underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                >
                  {area.label}
                  <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      <RevealSection aria-labelledby="pickup-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>AT THE STATION</p>
          <SectionHeading id="pickup-heading" className={`${h2} mt-4 text-balance text-foreground`}>
            How station pickups work.
          </SectionHeading>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              ["Share your train time", "Tell us your station and train time when you book."],
              ["Call when you arrive", "Give us a call as you leave the platform, so your driver is ready."],
              ["Meet at the pickup point", "Your driver waits at the station’s designated pickup point, not the taxi rank."],
            ].map(([title, text], i) => (
              <li key={title} className="border-t-2 border-primary pt-5 text-foreground">
                <span className="font-display text-[1.75rem] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-[1.375rem] font-semibold leading-tight">{title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/services/station-hotel-transfers"
            className="group mt-8 inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
          >
            Station & Hotel Transfers
            <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </RevealSection>

      <BookingDetails
        heading="Let’s plan your station transfer."
        details={[
          { title: "Station", text: "Luton, Luton Airport Parkway or Leagrave.", Icon: TrainFront },
          { title: "Pickup or destination", text: "The address you’re travelling to or from.", Icon: MapPin },
          { title: "Train time", text: "So we can plan your pickup.", Icon: CalendarClock },
          { title: "Passengers and luggage", text: "So we send a car with enough room.", Icon: Luggage },
        ]}
      />

      <Faq items={faqs} heading="Luton station taxis: your questions.">
        <PopularRoutes className="mt-12" />
      </Faq>
    </main>
  );
}

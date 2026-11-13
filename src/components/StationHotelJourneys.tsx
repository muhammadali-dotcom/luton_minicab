import Image from "next/image";
import { CalendarDays } from "lucide-react";
import scene from "../../public/brand/station-hotel-scene.png";
import { container, eyebrow, h2, section } from "./ui";

// From the owner's reference (assets/brand/station-hotel-journeys-reference.png): the street
// scene is cropped from it, with the car's grille emblem retouched out and the open background
// matched to band-alt. No train tracking, hotel names or prices.
const journeys = [
  {
    title: "To the station",
    text: "Arrange a pickup from home or your hotel. Share your train time when you book.",
  },
  {
    title: "From the station",
    text: "Tell us your arrival time and agree a pickup point when booking.",
  },
  {
    title: "To or from your hotel",
    text: "Share the hotel name, address and the time you would like to travel.",
  },
];

export function StationHotelJourneys() {
  return (
    <section aria-labelledby="stations-hotels-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>STATIONS &amp; HOTELS</p>
        <h2 id="stations-hotels-heading" className={`${h2} mt-4 text-foreground`}>
          From the station to your next stop.
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">
          Rides to and from stations and hotels, arranged around your plans.
        </p>
        {/* Wide scene from md; on phones a 2:1 crop keeps the car large, losing the far edges. */}
        <div className="relative -mx-4 mt-8 aspect-[2/1] overflow-hidden sm:mx-0 md:aspect-[1644/422]">
          <Image
            src={scene}
            alt="Illustration of a car on the road between a station and a hotel."
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="object-cover object-center"
          />
        </div>
        <ul className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
          {journeys.map(({ title, text }) => (
            <li key={title} className="border-t-2 border-primary pt-5">
              <h3 className="font-display text-[clamp(1.5rem,2.2vw,1.875rem)] font-semibold leading-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 flex items-center gap-4 border-t border-primary pt-6 text-[1.0625rem] text-foreground">
          <CalendarDays aria-hidden size={28} strokeWidth={1.5} className="shrink-0" />
          Allow time for your connection and include any luggage when choosing your vehicle.
        </p>
      </div>
    </section>
  );
}

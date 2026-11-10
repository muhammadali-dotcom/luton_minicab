import Link from "next/link";
import { ArrowRight, BedDouble, Briefcase, Luggage, Plane, TrainFront } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { BookOnlineLink } from "./BookOnlineLink";
import { ContactButtons } from "./LocalAreaCards";
import { ServiceHero } from "./ServiceHero";
import { container, eyebrow, h2, section } from "./ui";

// Stations are plain destinations; no train tracking (only flight tracking is confirmed),
// no hotel names (no implied partnerships), no luggage capacities until verified.
const stations = [
  { name: "Luton station", place: "In Luton town centre" },
  { name: "Leagrave station", place: "In north-west Luton" },
  { name: "Luton Airport Parkway station", place: "Near Luton Airport" },
];

const hotelPoints = [
  { title: "From the hotel door", text: "We pick you up at the entrance, at the time you book.", Icon: BedDouble },
  { title: "Bags and cases", text: "Tell us about your luggage when you book.", Icon: Luggage },
  { title: "On to the airport", text: "Rides from your hotel to Luton and other airports.", Icon: Plane, href: "/airports" },
  { title: "Meetings and events", text: "Arrive ready, booked one journey at a time.", Icon: Briefcase },
];

const iconCircle = "flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/45 text-foreground";
const h3 = "font-display text-[1.375rem] font-semibold leading-tight text-foreground";

export function StationHotelPage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <ServiceHero name={name} detail={detail} />

      <section aria-labelledby="stations-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>STATIONS NEAR YOU</p>
          <h2 id="stations-heading" className={`${h2} mt-4 text-foreground`}>
            To the train, or home after it.
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">Rides to and from the stations around Luton.</p>
          <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
            {stations.map(({ name: station, place }) => (
              <li key={station} className="flex items-center gap-4 rounded-2xl border border-border bg-paper p-5">
                <span className={iconCircle}>
                  <TrainFront aria-hidden size={24} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className={h3}>{station}</h3>
                  <p className="mt-1 text-base text-foreground">{place}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[1.125rem] text-foreground">Going to a station further afield? Just ask.</p>
        </div>
      </section>

      <section aria-labelledby="hotels-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>HOTELS MADE EASY</p>
          <h2 id="hotels-heading" className={`${h2} mt-4 text-foreground`}>
            Staying nearby? We’ll take it from here.
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {hotelPoints.map(({ title, text, Icon, href }) => (
              <li key={title}>
                <span className={iconCircle}>
                  <Icon aria-hidden size={24} strokeWidth={1.5} />
                </span>
                <h3 className={`${h3} mt-4`}>{title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
                {href && (
                  <Link
                    href={href}
                    className="group mt-1 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                  >
                    Our airports
                    <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="book-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>HOW TO BOOK</p>
          <h2 id="book-heading" className={`${h2} mt-4 text-foreground`}>
            Three simple steps.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {detail.steps.map(({ title, text }, i) => (
              <li key={title} className="flex gap-4 md:flex-col">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary font-display text-2xl font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className={h3}>{title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-5 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[1.125rem] text-foreground">
              <span className="font-semibold">Tip:</span> share your train time or hotel name when you book.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookOnlineLink arrow />
              <ContactButtons outline />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

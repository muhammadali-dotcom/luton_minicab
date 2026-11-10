import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { LocalAreaCards } from "./LocalAreaCards";
import { ServiceHero } from "./ServiceHero";
import { container, eyebrow, h2, section } from "./ui";
import everydayStreet from "../../public/brand/local-journeys-everyday.png";

// Place examples are plain public names, used only as destinations (owner to confirm).
const everyday = [
  {
    title: "Shopping & errands",
    text: ["Room for your bags.", "A ride there and back."],
    places: ["The Mall Luton", "Luton town centre"],
  },
  {
    title: "Appointments",
    text: ["One less thing to plan", "for your appointment."],
    places: ["Luton and Dunstable Hospital", "your GP or dentist"],
  },
  {
    title: "Family & friends",
    text: ["More time with the", "people you love."],
    places: ["Leagrave", "Stopsley", "Dunstable and nearby"],
  },
  {
    title: "Evenings & days out",
    text: ["Enjoy your evening.", "Plan your ride home."],
    places: ["Wardown Park", "the cinema", "The Hat Factory"],
  },
];

const otherJourneys = [
  { label: "Luton Airport", href: "/airports/luton" },
  { label: "Train stations", href: "/services/station-hotel-transfers" },
  { label: "School runs", href: "/services/school-runs" },
];

// The owner's own structure for this service, shorter than the shared ServicePage.
export function LocalJourneysPage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <ServiceHero name={name} detail={detail} />

      <section aria-labelledby="everyday-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>EVERYDAY JOURNEYS</p>
          <h2 id="everyday-heading" className={`${h2} mt-4 text-foreground`}>
            For the trips that fill your day.
          </h2>
          {/* The owner's street illustration; its background is matched to the band-alt cream. */}
          <Image
            src={everydayStreet}
            alt=""
            sizes="(min-width: 1280px) 1120px, 100vw"
            className="-mx-4 mt-10 w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full"
          />
          {/* Four columns, each centred under its gold dot on the road (dots at about 14%, 38%, 61% and 86%). */}
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 text-center md:grid-cols-[26fr_23.5fr_24fr_26.5fr] md:gap-x-0">
            {everyday.map(({ title, text, places }) => (
              <li key={title} className="md:px-2">
                <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
                <p className="mx-auto mt-2 text-[1.0625rem] leading-relaxed text-foreground">
                  {/* Two lines on wider screens, as in the owner's reference. */}
                  {text.map((line, i) => (
                    <span key={line} className="md:block">
                      {i > 0 && " "}
                      {line}
                    </span>
                  ))}
                </p>
                {/* Each place stays whole, so lines break between places. */}
                <p className="mx-auto mt-3 max-w-[17rem] text-base leading-relaxed text-foreground">
                  {places.map((place, i) => (
                    <span key={place} className="inline-block">
                      {i === 0 && (
                        <MapPin aria-hidden size={16} strokeWidth={1.75} className="mr-1 inline-block align-[-0.15em] text-accent" />
                      )}
                      {place}
                      {i < places.length - 1 && "\u00a0·\u00a0"}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <nav
            aria-label="Other journeys"
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border pt-6 md:justify-center"
          >
            <p className="w-full font-semibold text-foreground sm:w-auto">Other journeys:</p>
            {otherJourneys.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex min-h-[44px] items-center gap-1.5 text-[1.0625rem] font-medium text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
              >
                {label}
                <ArrowRight aria-hidden size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <LocalAreaCards />
    </main>
  );
}

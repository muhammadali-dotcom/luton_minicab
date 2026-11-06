import type { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { airportDetails } from "@/config/airportDetails";
import { airports } from "@/config/site";
import { AirportArrival } from "./AirportArrival";
import { AirportFleet } from "./AirportFleet";
import { AirportGuide } from "./AirportGuide";
import { AirportJourneys } from "./AirportJourneys";
import { AirportLocalAreas } from "./AirportLocalAreas";
import { AirportMeetDriver } from "./AirportMeetDriver";
import { Faq } from "./Faq";
import gatwickHero from "../../public/brand/airport-gatwick-hero.png";
import heathrowHero from "../../public/brand/airport-heathrow-hero.png";
import londonCityHero from "../../public/brand/airport-london-city-hero.png";
import lutonTerminalHero from "../../public/brand/airport-luton-terminal-hero.png";
import southendHero from "../../public/brand/airport-southend-hero.png";
import stanstedHero from "../../public/brand/airport-stansted-hero.png";
import { PageHero, trustAirport } from "./PageHero";

type Airport = (typeof airports)[number];

type HeroPhoto = { image: StaticImageData; alt: string; fade?: string; photoRight?: boolean };

// Covers the text column, then clears before the terminal signs (the earliest starts at about 66%).
const photoFade = "from-background/98 via-background/95 via-52% to-transparent to-66%";
const terminalAlt = "View from the back seat of a car, looking out at a glass airport terminal.";

// Every airport in `airports` needs a photo here and an entry in `airportDetails`.
const heroPhotos: Record<string, HeroPhoto> = {
  luton: { image: lutonTerminalHero, alt: "A dark saloon parked outside an airport terminal.", photoRight: true },
  heathrow: { image: heathrowHero, alt: terminalAlt, fade: photoFade },
  gatwick: { image: gatwickHero, alt: terminalAlt, fade: photoFade },
  stansted: { image: stanstedHero, alt: terminalAlt, fade: photoFade },
  "london-city": {
    image: londonCityHero,
    alt: "View from the back seat of a car, looking out at an airport terminal and a control tower.",
    fade: photoFade,
  },
  southend: { image: southendHero, alt: terminalAlt, fade: photoFade },
};

export function AirportPage({ airport }: { airport: Airport }) {
  const { name } = airport;
  const photo = heroPhotos[airport.slug];
  const detail = airportDetails[airport.slug];
  const { guide, arrival, localAreas } = detail;
  const others = airports.filter((a) => a.slug !== airport.slug);
  const otherAirportsNav = (
      <nav aria-label="Other airports" className="mt-12">
        <p className="font-semibold text-foreground">Other airports we cover</p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {others.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/airports/${a.slug}`}
                className="group inline-flex min-h-[44px] items-center gap-1.5 text-foreground underline-offset-4 hover:underline hover:decoration-primary"
              >
                {a.name}
                <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
  );

  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={photo.image}
        alt={photo.alt}
        fade={photo.fade}
        photoRight={photo.photoRight}
        eyebrow={`${name.toUpperCase()} AIRPORT TRANSFERS`}
        heading={<span className="block text-balance">{detail.hero.heading}</span>}
        text={detail.hero.text}
        trust={trustAirport}
      />

      <AirportJourneys {...detail.journeys} />

      <AirportMeetDriver {...detail.meetDriver}>
        {arrival && <AirportArrival arrival={arrival} />}
      </AirportMeetDriver>

      {guide && <AirportGuide guide={guide} />}

      {/* The terminal board is an extra light section, so the vehicles band after it swaps tone. */}
      <AirportFleet band={!!guide} />

      {localAreas && <AirportLocalAreas />}

      <Faq items={detail.faqs} band={!!arrival && !localAreas}>
        {otherAirportsNav}
      </Faq>
    </main>
  );
}

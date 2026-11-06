import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, PlaneLanding, PlaneTakeoff, Plus } from "lucide-react";
import { airportDetails } from "@/config/airportDetails";
import { airports, fleet } from "@/config/site";
import { AirportArrival } from "./AirportArrival";
import { AirportFleet } from "./AirportFleet";
import { AirportGuide } from "./AirportGuide";
import { AirportJourneys } from "./AirportJourneys";
import { AirportLocalAreas } from "./AirportLocalAreas";
import { AirportMeetDriver } from "./AirportMeetDriver";
import { BookOnlineLink } from "./BookOnlineLink";
import { Faq } from "./Faq";
import { container, h2 as h2Class } from "./ui";
import gatwickHero from "../../public/brand/airport-gatwick-hero.png";
import heathrowHero from "../../public/brand/airport-heathrow-hero.png";
import londonCityHero from "../../public/brand/airport-london-city-hero.png";
import lutonHero from "../../public/brand/airport-luton-hero.png";
import lutonTerminalHero from "../../public/brand/airport-luton-terminal-hero.png";
import southendHero from "../../public/brand/airport-southend-hero.png";
import stanstedHero from "../../public/brand/airport-stansted-hero.png";
import { PageHero, trustAirport } from "./PageHero";

type Airport = (typeof airports)[number];

type HeroPhoto = { image: StaticImageData; alt: string; fade?: string; photoRight?: boolean };

const defaultPhoto: HeroPhoto = {
  image: lutonHero,
  alt: "View from the back seat of a car, looking out at an airport terminal and a plane.",
};

// Covers the text column, then clears before the terminal signs (the earliest starts at about 66%).
const photoFade = "from-background/98 via-background/95 via-52% to-transparent to-66%";
const terminalAlt = "View from the back seat of a car, looking out at a glass airport terminal.";

// Airports with their own hero photo; any other airport uses the default.
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

// Wording sticks to confirmed facts: no meeting points, waiting times, prices or capacities.
export function AirportPage({ airport }: { airport: Airport }) {
  const { name } = airport;
  const photo = heroPhotos[airport.slug] ?? defaultPhoto;
  const steps = [
    { title: "We track your flight", text: "Your pickup follows your actual landing time." },
    { title: "Collect your bags", text: "Take your time through passport control and baggage reclaim." },
    { title: "Meet your driver", text: "Your driver meets you at the airport. We’ll share your driver’s details before you travel." },
    { title: "Head home", text: "Relax on the way home, or to wherever you’re heading next." },
  ];
  const faqs = [
    { q: "What if my flight is delayed?", a: "We track your flight, so your pickup follows your actual landing time." },
    { q: "Where do I meet my driver?", a: `Your driver meets you at ${name} Airport. We’ll share your driver’s details before you travel.` },
    {
      q: "How much luggage can I bring?",
      a: "Tell us how many bags when you book, and choose a car with room for them. Estates and MPVs have extra space.",
    },
    { q: `Can you take me to ${name} Airport too?`, a: "Yes. We provide drop-offs and pickups, day or night." },
    { q: "How do I pay?", a: "In cash, or online through a payment link." },
  ];
  const blocks = [
    {
      title: `Drop-offs to ${name} Airport`,
      Icon: PlaneTakeoff,
      text: "We collect you from your door and take you to the airport in good time for your flight. Book ahead with your flight details, and travel with a fixed fare.",
    },
    {
      title: `Pickups from ${name} Airport`,
      Icon: PlaneLanding,
      text: "We track your flight, and your driver meets you at the airport and takes you home, to a hotel or on to your next stop.",
    },
  ];
  const detail = airportDetails[airport.slug];
  // The terminal board is an extra light section, so the vehicles band after it swaps tone.
  const guide = detail?.guide;
  const arrival = detail?.arrival;
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
        heading={
          detail?.heroHeading ? <span className="block text-balance">{detail.heroHeading}</span> : "Your trip starts before take-off."
        }
        text={`Settle in for a comfortable ride to or from ${name} Airport.`}
        trust={trustAirport}
      />

      {detail ? (
        <AirportJourneys {...detail.journeys} />
      ) : (
        <section aria-labelledby="pickups-heading" className="band-alt border-t border-border py-16 sm:py-20">
          <div className={container}>
            <h2 id="pickups-heading" className={h2Class}>
              Pickups and drop-offs
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {blocks.map(({ title, Icon, text }) => (
                <div key={title} className="rounded-control border border-border bg-paper p-6 sm:p-8">
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary/45">
                    <Icon aria-hidden size={26} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 font-display text-[1.5rem] font-semibold leading-tight text-foreground">{title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {detail ? (
        <AirportMeetDriver {...detail.meetDriver}>
          {arrival && <AirportArrival arrival={arrival} />}
        </AirportMeetDriver>
      ) : (
        <section aria-labelledby="landing-heading" className="border-t border-border py-16 sm:py-20">
          <div className={container}>
            <h2 id="landing-heading" className={h2Class}>
              What happens after you land
            </h2>
            <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ title, text }, i) => (
                <li key={title}>
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary font-display text-xl font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-[1.1875rem] font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 leading-relaxed text-muted">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {guide && <AirportGuide guide={guide} />}

      {detail ? (
        <AirportFleet band={!!guide} />
      ) : (
        <section aria-labelledby="cars-heading" className="band-alt border-t border-border py-16 sm:py-20">
          <div className={container}>
            <h2 id="cars-heading" className={h2Class}>
              Choose your car
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {fleet.map((v) => (
                <li key={v.name} className="rounded-control border border-border bg-paper p-4">
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={`/brand/${v.image}`}
                      alt={`${v.name} example vehicle`}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mt-3 font-display text-[1.25rem] font-semibold text-foreground">{v.name}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">Exact passenger and luggage limits are shown when you book.</p>
              <BookOnlineLink variant="link" label="Book Online" />
            </div>
          </div>
        </section>
      )}

      {detail?.localAreas && <AirportLocalAreas />}

      {detail ? (
        <Faq items={detail.faqs} band={!!arrival && !detail.localAreas}>
          {otherAirportsNav}
        </Faq>
      ) : (
        <section aria-labelledby="airport-faq-heading" className="border-t border-border py-16 sm:py-20">
          <div className={container}>
            <div className="max-w-4xl">
              <h2 id="airport-faq-heading" className={h2Class}>
                Airport FAQs
              </h2>
              <div className="mt-8">
                {faqs.map(({ q, a }, i) => (
                  <details key={q} open={i === 0} className="group border-b border-border">
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.25rem] text-foreground [&::-webkit-details-marker]:hidden">
                      {q}
                      <Plus aria-hidden size={22} strokeWidth={1.5} className="shrink-0 group-open:hidden" />
                      <Minus aria-hidden size={22} strokeWidth={1.5} className="hidden shrink-0 group-open:block" />
                    </summary>
                    <p className="max-w-2xl pb-6 text-[1.0625rem] leading-relaxed text-foreground">{a}</p>
                  </details>
                ))}
              </div>
            </div>

            {otherAirportsNav}
          </div>
        </section>
      )}
    </main>
  );
}


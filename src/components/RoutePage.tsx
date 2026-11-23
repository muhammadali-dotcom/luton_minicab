import Link from "next/link";
import type { StaticImageData } from "next/image";
import { ArrowRight, CalendarClock, Clock, Luggage, MapPin, PlaneLanding, PoundSterling, ShieldCheck, Signpost } from "lucide-react";
import { airports } from "@/config/site";
import { siteOrigin } from "@/config/seo";
import { routes, type RouteDetail } from "@/config/routeDetails";
import gatwickHero from "../../public/brand/airport-gatwick-hero.webp";
import heathrowHero from "../../public/brand/airport-heathrow-hero.webp";
import londonCityHero from "../../public/brand/airport-london-city-hero.webp";
import stanstedHero from "../../public/brand/airport-stansted-hero.webp";
import streetHero from "../../public/brand/services/local-journeys-hero.webp";
import { BookingDetails } from "./BookingDetails";
import { Faq } from "./Faq";
import { PageHero, trustLocal } from "./PageHero";
import { container, eyebrow, h2, section } from "./styles";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

// The same photos and fade as the airport pages; central London uses the wall-style street photo.
const photoFade = "from-background/98 via-background/95 via-52% to-transparent to-66%";
const terminalAlt = "View from the back seat of a car, looking out at a glass airport terminal.";
// `headingWidth`: classes that keep the heading on a narrow photo wall (only the wall-style photo needs one).
const heroes: Record<string, { image: StaticImageData; alt: string; fade?: string; wall?: boolean; headingWidth?: string }> = {
  heathrow: { image: heathrowHero, alt: terminalAlt, fade: photoFade },
  gatwick: { image: gatwickHero, alt: terminalAlt, fade: photoFade },
  stansted: { image: stanstedHero, alt: terminalAlt, fade: photoFade },
  "london-city": { image: londonCityHero, alt: "View from the back seat of a car, looking out at an airport terminal and a control tower.", fade: photoFade },
};
const londonHero = {
  image: streetHero,
  alt: "A dark estate car parked on a sunny street, beside a cream wall, shopfronts and hanging flowers.",
  fade: "from-background/80 via-background/55 via-40% to-transparent to-55%",
  wall: true,
  // Small laptops: wrap before the hanging flower basket in the photo.
  headingWidth: "max-w-[12em] lg:max-w-[10.5em] xl:max-w-[12em]",
};

const linkClass =
  "group inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export function RoutePage({ route }: { route: RouteDetail }) {
  const hero = (route.airportSlug && heroes[route.airportSlug]) || londonHero;
  const airport = airports.find((a) => a.slug === route.airportSlug);
  const others = routes.filter((r) => r.slug !== route.slug);
  const facts = [
    { title: "Typical journey", text: `${route.typicalTime[0].toUpperCase()}${route.typicalTime.slice(1)}, depending on traffic.`, Icon: Clock },
    { title: "Fixed fare", text: "You’ll know your fare when you book.", Icon: PoundSterling },
    airport
      ? { title: "Flight tracking", text: "On your return pickup, with a meeting point agreed in advance.", Icon: PlaneLanding }
      : { title: "Door to door", text: "From your pickup address to your destination.", Icon: Signpost },
    { title: "DBS-checked drivers", text: "Available 24/7, day or night.", Icon: ShieldCheck },
  ];
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      "@id": `${siteOrigin}/routes/${route.slug}#service`,
      name: `${route.name} taxi`,
      url: `${siteOrigin}/routes/${route.slug}`,
      // The site-wide business from SiteSchema, so Google sees one business, not two.
      provider: { "@id": `${siteOrigin}/#business` },
      areaServed: [{ "@type": "Place", name: "Luton" }, { "@type": "Place", name: airport ? `${airport.name} Airport` : "Central London" }],
    },
  ];

  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        tone="light"
        image={hero.image}
        alt={hero.alt}
        fade={hero.fade}
        {...(hero.wall
          ? {
              photoFrom: "content" as const,
              mobilePhotoPosition: "object-[96%_center]",
              // Small laptops: start the photo 4rem later so the trust row stays off the planter.
              photoLeft:
                "lg:left-[calc((max(2.5rem,(100%-80rem)/2+2.5rem)-12%)/0.88+4rem)] xl:left-[calc((max(2.5rem,(100%-80rem)/2+2.5rem)-12%)/0.88)]",
            }
          : {})}
        eyebrow={`${route.name.toUpperCase()} TAXI`}
        heading={<span className={`block text-balance ${hero.headingWidth ?? ""}`}>{route.hero.heading}</span>}
        text={route.hero.text}
        trust={trustLocal}
      />

      <RevealSection aria-labelledby="journey-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>YOUR JOURNEY</p>
          <SectionHeading id="journey-heading" className={`${h2} mt-4 text-balance text-foreground`}>
            {`${route.name}: what to expect.`}
          </SectionHeading>
          <p className="mt-3 max-w-2xl text-[1.125rem] text-foreground">{route.journeyNote}</p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(({ title, text, Icon }) => (
              <li key={title} className="rounded-2xl border border-border bg-paper p-6 text-foreground">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/45">
                  <Icon aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-tight">{title}</h3>
                <p className="mt-1 text-[1.0625rem]">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      <RevealSection aria-labelledby="tips-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>GOOD TO KNOW</p>
          <SectionHeading id="tips-heading" className={`${h2} mt-4 text-balance text-foreground`}>
            A few things worth knowing.
          </SectionHeading>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {route.tips.map(({ title, text }, i) => (
              <li key={title} className="border-t-2 border-primary pt-5 text-foreground">
                <span className="font-display text-[1.75rem] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-balance font-display text-[1.375rem] font-semibold leading-tight">{title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
          {airport && (
            <Link href={`/airports/${airport.slug}`} className={`${linkClass} mt-8`}>
              {airport.name === "London Southend" ? "London Southend" : airport.name} Airport: terminals and meeting points
              <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </RevealSection>

      <BookingDetails
        heading={`Let’s plan your ${route.name} journey.`}
        details={[
          { title: "Pickup address", text: "Where in Luton should we collect you?", Icon: MapPin },
          airport
            ? { title: "Flight details", text: "Your flight time and terminal.", Icon: PlaneLanding }
            : { title: "Where you’re going", text: "The full London address or station.", Icon: Signpost },
          { title: "Dates and times", text: "Include any return journey.", Icon: CalendarClock },
          { title: "Passengers and luggage", text: "So we can send a car with enough room.", Icon: Luggage },
        ]}
      />

      <Faq items={route.faqs} heading={`${route.name} taxi: your questions.`}>
        <nav aria-label="Other routes from Luton" className="mt-12">
          <p className="font-semibold text-foreground">Other routes from Luton</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/routes/${r.slug}`}
                  className="group inline-flex min-h-[44px] items-center gap-1.5 text-foreground underline-offset-4 hover:underline hover:decoration-primary"
                >
                  {r.name}
                  <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Faq>
    </main>
  );
}

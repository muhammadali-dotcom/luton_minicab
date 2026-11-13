import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  CarFront,
  GraduationCap,
  HeartPulse,
  MapPin,
  MessageCircleMore,
  Plane,
  Route,
  ShoppingBag,
  Signpost,
  TrainFront,
  Trees,
  type LucideIcon,
} from "lucide-react";
import type { AreaDetail } from "@/config/areaDetails";
import { airportDetails } from "@/config/airportDetails";
import { serviceDetails } from "@/config/serviceDetails";
import { airports, services, site } from "@/config/site";
import heroPhoto from "../../public/brand/services/local-journeys-hero.png";
import { BookingDetails } from "./BookingDetails";
import { Faq } from "./Faq";
import { LocalAreaCards } from "./LocalAreaCards";
import { PageHero, trustLocal } from "./PageHero";
import { container, eyebrow, h2, section } from "./ui";

type Area = { slug: string; name: string; intro: string };

const serviceIcons: Record<string, LucideIcon> = {
  "local-journeys": CarFront,
  "school-runs": GraduationCap,
  "corporate-travel": Briefcase,
  "long-distance-travel": Route,
  "station-hotel-transfers": TrainFront,
};
const placeIcons: Record<AreaDetail["places"][number]["icon"], LucideIcon> = {
  shopping: ShoppingBag,
  health: HeartPulse,
  train: TrainFront,
  park: Trees,
};

const iconCircle = "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/45 text-foreground";
const h3 = "font-display text-[1.375rem] font-semibold leading-tight";
const textLink =
  "group inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

// The upgraded area page: each section carries the area's own name and content, built from
// the shared blocks. Tones alternate: hero, journeys dark, places light, airports dark,
// booking light, FAQ dark, nearby areas light.
export function AreaLocalPage({ area, detail }: { area: Area; detail: AreaDetail }) {
  const journeys = [
    ...services.map((s) => ({
      name: s.name,
      line: serviceDetails[s.slug]?.cardText,
      href: `/services/${s.slug}`,
      Icon: serviceIcons[s.slug] ?? CarFront,
    })),
    { name: "Airport Transfers", line: "To and from Luton and other UK airports.", href: "/airports", Icon: Plane },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: `Taxis in ${area.name}`,
    provider: { "@type": "LocalBusiness", name: site.name },
    areaServed: { "@type": "Place", name: area.name },
  };

  return (
    <main id="main" className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }} />
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="A dark estate car parked on a sunny high street, beside a cream wall, shopfronts and hanging flowers."
        fade="from-background/80 via-background/55 via-40% to-transparent to-55%"
        photoFrom="content"
        // Small laptops: start the photo 4rem later so the trust row stays clear of the planter.
        photoLeft="lg:left-[calc((max(2.5rem,(100%-80rem)/2+2.5rem)-12%)/0.88+4rem)] xl:left-[calc((max(2.5rem,(100%-80rem)/2+2.5rem)-12%)/0.88)]"
        mobilePhotoPosition="object-[96%_center]"
        eyebrow={`TAXIS IN ${area.name.toUpperCase()}`}
        heading={<span className="block text-balance">{detail.hero.heading}</span>}
        text={detail.hero.text}
        trust={trustLocal}
      />

      <section aria-labelledby="area-journeys-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>JOURNEYS FROM {area.name.toUpperCase()}</p>
          <h2 id="area-journeys-heading" className={`${h2} mt-4 text-foreground`}>
            Wherever you’re heading from {area.name}.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {journeys.map(({ name, line, href, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full min-h-[44px] items-start gap-4 rounded-2xl border border-border bg-paper p-5 text-foreground transition-colors hover:border-foreground"
                >
                  <span className={iconCircle}>
                    <Icon aria-hidden size={22} strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <h3 className={h3}>{name}</h3>
                    {line && <span className="mt-1 block text-base">{line}</span>}
                  </span>
                  <ArrowRight
                    aria-hidden
                    size={20}
                    strokeWidth={1.75}
                    className="mt-1 ml-auto shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="area-places-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>AROUND {area.name.toUpperCase()}</p>
          <h2 id="area-places-heading" className={`${h2} mt-4 text-foreground`}>
            Places we take you in {area.name}.
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">A few of the everyday trips we make.</p>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {detail.places.map(({ title, line, icon }) => {
              const Icon = placeIcons[icon];
              return (
                <li key={title} className="border-t-2 border-primary pt-5 text-foreground">
                  <Icon aria-hidden size={32} strokeWidth={1.5} />
                  <h3 className={`${h3} mt-4`}>{title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed">{line}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-[1.125rem] text-foreground">Somewhere else? Tell us where you’re going when you book.</p>
        </div>
      </section>

      <section aria-labelledby="area-airports-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>AIRPORT TRANSFERS</p>
          <h2 id="area-airports-heading" className={`${h2} mt-4 text-foreground`}>
            Flying from {area.name}?
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">Rides to and from the airports, with flight tracking on pickups.</p>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {airports.map(({ slug, name }) => (
              <li key={slug}>
                <Link
                  href={`/airports/${slug}`}
                  className="group flex min-h-[44px] items-center gap-4 border-b border-primary/60 py-4 text-foreground"
                >
                  <Plane aria-hidden size={22} strokeWidth={1.5} className="shrink-0 text-accent" />
                  <span className="min-w-0">
                    <span className="block text-[1.125rem] font-semibold">
                      {slug === "southend" ? "London Southend" : name} Airport
                    </span>
                    <span className="block text-base">{airportDetails[slug]?.cardText}</span>
                  </span>
                  <ArrowRight aria-hidden size={20} strokeWidth={1.5} className="ml-auto shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/airports" className={`${textLink} mt-6`}>
            View All Airports
            <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <BookingDetails
        heading={`Let’s plan your ${area.name} journey.`}
        band={false}
        details={[
          { title: "Pickup address", text: `Where in ${area.name} should we collect you?`, Icon: MapPin },
          { title: "Where you’re going", text: "The address, station or airport.", Icon: Signpost },
          { title: "Dates and times", text: "Include any return journey.", Icon: CalendarClock },
          { title: "Anything else?", text: "Luggage, child seats, or the car you’d like.", Icon: MessageCircleMore },
        ]}
      />

      <Faq items={detail.faqs} band heading={`Taxis in ${area.name}: your questions.`} text="Here are a few helpful answers." />

      <LocalAreaCards
        eyebrow="NEARBY AREAS"
        heading={`Near ${area.name}, too.`}
        text="We also pick up in the towns and neighbourhoods nearby."
        helpText="Don’t see your area? Just ask."
        exclude={area.slug}
      />
    </main>
  );
}

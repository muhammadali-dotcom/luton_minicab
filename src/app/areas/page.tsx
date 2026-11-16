import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CarFront, MapPin, MessageCircle, Plane, TrainFront } from "lucide-react";
import { PageHero, trustLocal } from "@/components/PageHero";
import { container, eyebrow, h2, section } from "@/components/ui";
import { areas } from "@/config/site";
import heroPhoto from "../../../public/brand/British places, elegantly woven into a panorama.png";

export const metadata: Metadata = {
  title: "Areas We Cover",
  description:
    "Taxis across Luton, Leagrave and Stopsley, plus Dunstable, Houghton Regis, Harpenden, Mill Hill, Hounslow and Heathrow, with transfers to all UK airports.",
};

const rowLink =
  "group flex min-h-[44px] items-center gap-3 border-b border-border text-[1.0625rem] font-medium text-foreground";

// Additional pickup coverage confirmed by the owner; these places do not have individual pages.
const additionalAreas = [
  { heading: "Around Luton", places: ["Caddington", "Slip End", "Barton-le-Clay", "Toddington"] },
  { heading: "Around Mill Hill", places: ["Edgware", "Burnt Oak", "Colindale", "Hendon", "Elstree", "Borehamwood"] },
  { heading: "Around Hounslow", places: ["Heston", "Cranford", "Isleworth", "Feltham"] },
  { heading: "Around Heathrow", places: ["Harlington, west London", "West Drayton", "Harmondsworth", "Stanwell"] },
];

const journeys = [
  { title: "Local journeys", text: "Shopping, appointments or a visit across town.", href: "/services/local-journeys", Icon: CarFront },
  { title: "Station transfers", text: "Arrange a ride to the station or a pickup for your arrival.", href: "/services/station-hotel-transfers", Icon: TrainFront },
  { title: "Airport transfers", text: "Plan your journey to or from a UK airport.", href: "/airports", Icon: Plane },
];

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="An illustrated panorama combining a clock tower, railway station, village green, high street and airport terminal."
        fade="from-background via-background/97 via-44% to-transparent to-60%"
        mobilePhotoPosition="object-[95%_40%]"
        desktopPhotoPosition="lg:object-[68%_0%]"
        eyebrow="AREAS WE COVER"
        heading="Your local ride. Wherever life takes you."
        text="From your front door to your next stop, we’re here for journeys across Luton and nearby towns."
        trust={trustLocal}
      />
      <section aria-labelledby="areas-list-heading" className="band-alt border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <h2 id="areas-list-heading" className={`${h2} text-foreground`}>
            Find your area
          </h2>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className={rowLink}>
                  <MapPin aria-hidden size={20} strokeWidth={1.5} className="shrink-0" />
                  {a.name}
                  <ArrowRight
                    aria-hidden
                    size={18}
                    strokeWidth={1.75}
                    className="ml-auto shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="area-journeys-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>JOURNEYS FROM YOUR AREA</p>
          <h2 id="area-journeys-heading" className={`${h2} mt-4 text-foreground`}>Where are you heading?</h2>
          <p className="mt-4 max-w-2xl text-[1.125rem] leading-relaxed text-foreground">
            Choose the service that fits your journey, from everyday trips to station pickups and airport transfers.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {journeys.map(({ title, text, href, Icon }) => (
              <li key={href}>
                <Link href={href} className="group flex h-full flex-col rounded-2xl border border-border bg-paper p-6 text-foreground transition-colors hover:border-foreground">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/45">
                    <Icon aria-hidden size={24} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-tight">{title}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed">{text}</p>
                  <span className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-5 font-semibold underline-offset-4 group-hover:underline">
                    Explore {title.toLowerCase()}<ArrowRight aria-hidden size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="other-areas-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>MORE PICKUP LOCATIONS</p>
          <h2 id="other-areas-heading" className={`${h2} mt-4 text-foreground`}>More areas we serve.</h2>
          <p className="mt-4 max-w-2xl text-[1.125rem] leading-relaxed text-foreground">
            We also arrange pickups in these areas around Luton, Mill Hill, Hounslow and Heathrow.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {additionalAreas.map(({ heading, places }) => (
              <div key={heading}>
                <h3 className="border-b border-primary pb-4 font-display text-[1.375rem] font-semibold leading-tight text-foreground">{heading}</h3>
                <ul className="mt-4 space-y-3 text-[1.0625rem] leading-relaxed text-foreground">
                  {places.map((place) => (
                    <li key={place} className="flex items-start gap-2">
                      <MapPin aria-hidden size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-accent" />
                      <span>{place}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h3 className="font-display text-[1.5rem] font-semibold leading-tight text-foreground">Can’t see your pickup area?</h3>
              <p className="mt-4 text-[1.125rem] leading-relaxed text-foreground">
                Tell us your pickup address and destination, and our team can confirm whether we can arrange your journey.
                Include your travel date when you get in touch.
              </p>
            </div>
            <Link href="/contact" className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 self-start rounded-control bg-primary px-7 text-[1.0625rem] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover md:self-auto">
              <MessageCircle aria-hidden size={20} strokeWidth={1.75} />Ask about your pickup<ArrowRight aria-hidden size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

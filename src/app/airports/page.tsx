import type { Metadata } from "next";
import Link from "next/link";
import { AirportCards } from "@/components/AirportCards";
import { PageHero, trustLocal } from "@/components/PageHero";
import { container, h2, section } from "@/components/styles";
import { regionalAirports } from "@/config/site";
import { PopularRoutes } from "@/components/PopularRoutes";
import { pageMetadata } from "@/config/seo";
import heroPhoto from "../../../public/brand/airport-luton-hero.webp";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

export const metadata: Metadata = pageMetadata({
  title: "Airport Transfers",
  description:
    "Transfers to and from UK airports. Book online or contact our team to arrange your journey.",
  path: "/airports",
});

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="View from the back seat of a car, looking out at an airport terminal and a plane."
        eyebrow="AIRPORT TRANSFERS"
        heading={<span className="block text-balance">Off on a trip, or on your way home?</span>}
        text="Choose your airport, and we’ll plan your pickup around your flight."
        trust={trustLocal}
        compact
      />

      <AirportCards />

      {/* No flight tracking, meet and greet, price or journey-time promises for these airports. */}
      <RevealSection id="other-airports" aria-labelledby="other-airports-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <SectionHeading id="other-airports-heading" className={`${h2} text-balance`}>
            Flying from somewhere else?
          </SectionHeading>
          <p className="mt-3 text-[1.125rem] text-foreground">Tell us where you’re starting, where you’re going, the date and who’s travelling, and we’ll help you plan it.</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {regionalAirports.map(({ region, airports: regional }) => (
              <div key={region}>
                <h3 className="font-display text-[1.25rem] font-semibold text-foreground">{region}</h3>
                <ul className="mt-2">
                  {regional.map((a) => (
                    <li key={a.slug}>
                      <span className="flex min-h-[48px] items-center border-b border-border text-[1.0625rem] font-medium text-foreground">
                        {a.name} Airport
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-control border border-input px-6 text-base font-semibold text-foreground transition-colors hover:border-foreground hover:bg-tint"
          >
            Enquire about an airport journey
          </Link>
          <PopularRoutes className="mt-12" />
        </div>
      </RevealSection>
    </main>
  );
}

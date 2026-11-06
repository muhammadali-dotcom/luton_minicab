import type { Metadata } from "next";
import Link from "next/link";
import { AirportCards } from "@/components/AirportCards";
import { CallToBook } from "@/components/CallToBook";
import { PageHero, trustAirport } from "@/components/PageHero";
import { container, h2, section } from "@/components/ui";
import { regionalAirports } from "@/config/site";
import heroPhoto from "../../../public/brand/airport-luton-hero.png";

export const metadata: Metadata = {
  title: "Airport Transfers",
  description: "Transfers to and from all UK airports, with flight tracking and meet and greet.",
};

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="View from the back seat of a car, looking out at an airport terminal and a plane."
        eyebrow="AIRPORT TRANSFERS"
        heading="Where are you flying from?"
        text="Pick your airport, and leave the road to us."
        trust={trustAirport}
      />

      <AirportCards />

      {/* No flight tracking, meet and greet, price or journey-time promises for these airports. */}
      <section aria-labelledby="other-airports-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <h2 id="other-airports-heading" className={h2}>
            Other UK airports
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">Book online, or contact us for a quote.</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {regionalAirports.map(({ region, airports: regional }) => (
              <div key={region}>
                <h3 className="font-display text-[1.25rem] font-semibold text-foreground">{region}</h3>
                <ul className="mt-1">
                  {regional.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/airports/${a.slug}`}
                        className="inline-flex min-h-[44px] items-center text-[1.0625rem] text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                      >
                        {a.name} Airport
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <CallToBook />
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center text-[1.0625rem] text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
            >
              Contact us for a quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

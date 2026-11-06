import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AirportCards } from "@/components/AirportCards";
import { PageHero, trustLocal } from "@/components/PageHero";
import { container, h2, section } from "@/components/ui";
import { regionalAirports, site } from "@/config/site";
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
        heading={<span className="block text-balance">Which airport are you travelling to or from?</span>}
        text="Pick your airport, and leave the road to us."
        trust={trustLocal}
        compact
      />

      <AirportCards />

      {/* No flight tracking, meet and greet, price or journey-time promises for these airports. */}
      <section aria-labelledby="other-airports-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <h2 id="other-airports-heading" className={h2}>
            Other UK airports
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">Don’t see yours? Just ask.</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {regionalAirports.map(({ region, airports: regional }) => (
              <div key={region}>
                <h3 className="font-display text-[1.25rem] font-semibold text-foreground">{region}</h3>
                <ul className="mt-2">
                  {regional.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/airports/${a.slug}`}
                        className="group flex min-h-[48px] items-center justify-between gap-3 border-b border-border text-[1.0625rem] font-medium text-foreground transition-colors hover:border-foreground"
                      >
                        {a.name} Airport
                        <ArrowRight
                          aria-hidden
                          size={16}
                          strokeWidth={1.75}
                          className="shrink-0 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <a
            href={site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : "/contact"}
            className="mt-8 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-control border border-input px-6 text-base font-semibold text-foreground transition-colors hover:border-foreground hover:bg-tint"
          >
            Ask about another airport
          </a>
        </div>
      </section>
    </main>
  );
}

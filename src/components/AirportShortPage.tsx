import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { airports } from "@/config/site";
import { BookOnlineLink } from "./BookOnlineLink";
import { PageHero, trustLocal } from "./PageHero";
import { container, h2, section } from "./ui";
import heroPhoto from "../../public/brand/airport-luton-hero.png";

const steps = [
  { title: "Book your journey", text: "Book online or call us, day or night." },
  { title: "Share your details", text: "Tell us your pickup, your destination and how many bags you have." },
  { title: "Meet your driver", text: "We’ll share your driver’s details before you travel." },
];

const linkClass =
  "group inline-flex min-h-[44px] items-center gap-1.5 text-foreground underline-offset-4 hover:underline hover:decoration-primary";

// Stays noindex and makes no flight tracking, meet and greet or landing claims:
// some of these airports may not have regular passenger flights.
export function AirportShortPage({ name }: { name: string }) {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="View from the back seat of a car, looking out at an airport terminal and a plane."
        eyebrow={`${name.toUpperCase()} AIRPORT TRANSFERS`}
        heading="Your trip starts before take-off."
        text={`Settle in for a comfortable ride to or from ${name} Airport.`}
        trust={trustLocal}
      />

      <section aria-labelledby="how-to-book-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <h2 id="how-to-book-heading" className={h2}>
            How to book
          </h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3">
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
          <div className="mt-8">
            <BookOnlineLink />
          </div>
        </div>
      </section>

      <section aria-labelledby="other-ways-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <h2 id="other-ways-heading" className={h2}>
            Other ways to travel
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {airports.map((a) => (
              <li key={a.slug}>
                <Link href={`/airports/${a.slug}`} className={linkClass}>
                  {a.name}
                  <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
            <li>
              <Link href="/airports" className={`${linkClass} font-semibold`}>
                View All Airports
                <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}

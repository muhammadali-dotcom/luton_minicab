import Image from "next/image";
import type { AirportDetail } from "@/config/airportDetails";
import { BookOnlineLink } from "./BookOnlineLink";
import { container, eyebrow, h2, section } from "./styles";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

// The illustrations sit on the page cream, so this section needs a plain (not
// band-alt) background.
export function AirportJourneys({ eyebrow: label, subline, items }: AirportDetail["journeys"]) {
  return (
    <RevealSection aria-labelledby="journeys-heading" className={`border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>{label}</p>
        <SectionHeading id="journeys-heading" className={`${h2} mt-4 text-foreground`}>
          Which way are you travelling?
        </SectionHeading>
        <p className="mt-3 text-[1.125rem] text-foreground">{subline}</p>

        <div className="mt-10 grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {items.map(({ image, alt, start, end, title, text }, i) => (
            <div key={title} className={`py-8 sm:px-6 sm:py-0 lg:px-10 ${i === 0 ? "pt-0" : "pb-0"}`}>
              <Image src={image} alt={alt} sizes="(min-width: 640px) 50vw, 100vw" className="h-auto w-full max-w-[702px]" />
              <p className={`${eyebrow} mt-6 text-balance text-accent`}>
                {start} <span aria-hidden>→</span>
                <span className="sr-only">to</span> {end}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <BookOnlineLink arrow size="lg" />
        </div>
      </div>
    </RevealSection>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { airportDetails } from "@/config/airportDetails";
import { airports } from "@/config/site";
import { container, h2, section } from "./styles";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

// Each card has its own terminal photo and a practical line, from `airportDetails`.
export function AirportCards() {
  return (
    <RevealSection aria-labelledby="main-airports-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <SectionHeading id="main-airports-heading" className={`${h2} text-foreground`}>
          Our main airports
        </SectionHeading>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {airports.map(({ slug, name }) => (
            <li key={slug} data-photo-card className="h-full">
              <Link
                href={`/airports/${slug}`}
                className="group transition-[translate,box-shadow,border-color] duration-300 ease-out motion-safe:hover:-translate-y-1.5 hover:shadow-lg hover:shadow-foreground/10 hover:border-foreground flex h-full flex-col overflow-hidden rounded-control border border-border bg-paper"
              >
                <span className="relative block aspect-video overflow-hidden">
                  <Image
                    src={airportDetails[slug].cardImage}
                    alt="The front entrance of an airport terminal."
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col px-5 py-5">
                  <span className="font-display text-[1.5rem] font-semibold leading-tight text-foreground">{name} Airport</span>
                  <span className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{airportDetails[slug].cardText}</span>
                  <span className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-3 font-semibold text-foreground">
                    View {name} Airport
                    <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}

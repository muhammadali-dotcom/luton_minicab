import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { airportDetails } from "@/config/airportDetails";
import { airports } from "@/config/site";
import { container, h2, section } from "./ui";

// Each card has its own terminal photo and a practical line, from `airportDetails`.
export function AirportCards() {
  return (
    <section aria-labelledby="main-airports-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <h2 id="main-airports-heading" className={`${h2} text-foreground`}>
          Our main airports
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {airports.map(({ slug, name }) => (
            <li key={slug}>
              <Link
                href={`/airports/${slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-control border border-border bg-paper transition-colors hover:border-foreground"
              >
                <span className="relative block aspect-video">
                  <Image
                    src={airportDetails[slug].cardImage}
                    alt="The front entrance of an airport terminal."
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
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
    </section>
  );
}

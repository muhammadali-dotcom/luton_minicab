import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Plane } from "lucide-react";
import { airports } from "@/config/site";
import airportPhoto from "../../public/brand/airport-luton.png";

// Photo for the featured Luton card. Without one, a plain panel with a plane shows.
const photo: StaticImageData | undefined = airportPhoto;
const photoAlt = "A dark saloon waiting at the kerb outside a glass airport terminal.";

// Luton is the home airport, so it gets the featured card; the rest are listed.
const otherAirports = airports.filter((a) => a.slug !== "luton");

export function Airports() {
  return (
    <section aria-labelledby="airports-heading" className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="flex items-center justify-center gap-4 text-sm font-semibold tracking-[0.2em] text-accent">
            <span aria-hidden className="h-px w-12 bg-primary" />
            AIRPORT JOURNEYS
            <span aria-hidden className="h-px w-12 bg-primary" />
          </p>
          <h2
            id="airports-heading"
            className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-balance text-foreground"
          >
            From your doorstep to your departure.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[1.125rem] leading-relaxed text-foreground">
            Flying away or coming home? We&rsquo;ll take care of the drive.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <article aria-labelledby="luton-airport-heading" className="overflow-hidden rounded-control bg-alt">
            <div className="relative aspect-[2/1] bg-alt">
              {photo ? (
                <Image
                  src={photo}
                  alt={photoAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-[center_65%]"
                />
              ) : (
                <div aria-hidden className="flex size-full items-center justify-center border-b border-border text-muted/60">
                  <Plane size={48} strokeWidth={1} />
                </div>
              )}
            </div>
            <div className="px-6 pb-7 pt-6 sm:px-8">
              <p className="text-sm font-semibold tracking-[0.2em] text-accent">CLOSE TO HOME</p>
              <h3
                id="luton-airport-heading"
                className="mt-2 font-display text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium leading-tight text-foreground"
              >
                Luton Airport
              </h3>
              <p className="mt-2 text-[1.0625rem] text-foreground">Your local airport. Your ride, taken care of.</p>
              <Link
                href="/airports/luton"
                className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-control bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Explore Luton Airport
                <ArrowRight aria-hidden size={18} />
              </Link>
            </div>
          </article>

          <div>
            <h3 className="font-display text-[1.5rem] font-medium leading-tight text-foreground">
              Travelling from another airport?
            </h3>
            <ul className="mt-3">
              {otherAirports.map(({ slug, name }) => (
                <li key={slug} className="border-b border-primary/60 last:border-b-0">
                  <Link
                    href={`/airports/${slug}`}
                    className="group flex min-h-16 items-center gap-5 py-3"
                  >
                    <Plane aria-hidden size={22} strokeWidth={1.25} className="shrink-0 text-accent" />
                    <span className="font-display text-[1.5rem] leading-tight text-foreground underline-offset-4 group-hover:underline group-hover:decoration-primary group-focus-visible:underline">
                      {name} Airport
                    </span>
                    <ArrowRight
                      aria-hidden
                      size={22}
                      strokeWidth={1.5}
                      className="ml-auto shrink-0 text-accent transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/airports"
              className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
            >
              View All Airports
              <ArrowRight aria-hidden size={18} />
            </Link>
          </div>
        </div>

        <p className="mt-10 flex items-center gap-6 font-display text-[1.125rem] italic text-foreground">
          <span aria-hidden className="h-px flex-1 bg-primary" />
          Pickups and drop-offs, day and night.
          <span aria-hidden className="h-px flex-1 bg-primary" />
        </p>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Plane } from "lucide-react";
import { PageHero, trustLocal } from "@/components/PageHero";
import { h2 } from "@/components/ui";
import { areas } from "@/config/site";
import heroPhoto from "../../../public/brand/hero-photo.png";

export const metadata: Metadata = {
  title: "Areas We Cover",
  description:
    "Taxis across Luton, Leagrave and Stopsley, plus Dunstable, Houghton Regis, Harpenden, Mill Hill, Hounslow and Heathrow, with transfers to all UK airports.",
};

const rowLink =
  "group flex min-h-[44px] items-center gap-3 border-b border-border text-[1.0625rem] font-medium text-foreground";

const askClass =
  "inline-flex min-h-[44px] items-center text-[1.0625rem] text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="dark"
        image={heroPhoto}
        alt="A driver opens the car door for a smiling passenger outside a brick house."
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

          <p className="mt-8 flex items-center gap-3 text-[1.0625rem] text-foreground">
            <Plane aria-hidden size={20} strokeWidth={1.5} className="shrink-0" />
            <span>
              Transfers to and from all UK airports.{" "}
              <Link href="/airports" className="font-semibold underline underline-offset-4 hover:decoration-primary">
                Airport transfers
              </Link>
            </span>
          </p>
          <p className="mt-3">
            <Link href="/contact" className={askClass}>
              Not sure we cover your pickup? Ask us.
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

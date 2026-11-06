import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { areas } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";

const localSlugs = ["luton", "leagrave", "stopsley", "dunstable", "houghton-regis", "harpenden"];
const localAreas = areas.filter((a) => localSlugs.includes(a.slug));

export function AirportLocalAreas() {
  return (
    <section aria-labelledby="local-areas-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>CLOSE TO HOME</p>
        <h2 id="local-areas-heading" className={`${h2} mt-4 text-foreground`}>
          Picking you up across Luton.
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">From your front door to the terminal, and back again.</p>
        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {localAreas.map(({ slug, name }) => (
            <li key={slug}>
              <Link
                href={`/areas/${slug}`}
                className="group flex min-h-[44px] items-center gap-3 border-b border-border py-1 text-[1.0625rem] font-medium text-foreground"
              >
                <MapPin aria-hidden size={20} strokeWidth={1.5} className="shrink-0" />
                {name}
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
        <Link
          href="/areas"
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
        >
          View All Areas
          <ArrowRight aria-hidden size={18} />
        </Link>
      </div>
    </section>
  );
}

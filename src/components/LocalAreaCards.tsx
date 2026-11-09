import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { areas, site } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";

// Short location lines, taken only from the geography in each area's intro in site.ts.
const places: Record<string, string> = {
  luton: "Across the town, day or night",
  leagrave: "North-west Luton",
  stopsley: "North-east Luton",
  dunstable: "Just west of Luton",
  "houghton-regis": "Just north of Dunstable",
  harpenden: "South of Luton, in Hertfordshire",
};

const localAreas = areas.filter((a) => a.slug in places);

// Local Journeys only: the six local areas as cards. Luton Airport keeps AirportLocalAreas.
export function LocalAreaCards() {
  return (
    <section aria-labelledby="local-areas-heading" className={`border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>WHERE WE PICK UP</p>
        <h2 id="local-areas-heading" className={`${h2} mt-4 text-foreground`}>
          Local areas we cover.
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">Luton neighbourhoods and the towns nearby.</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {localAreas.map(({ slug, name }) => (
            <li key={slug}>
              <Link
                href={`/areas/${slug}`}
                className="group flex h-full min-h-[44px] items-center gap-4 rounded-2xl border border-border bg-alt p-5 text-foreground transition-colors hover:border-foreground"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/45">
                  <MapPin aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <h3 className="font-display text-[1.375rem] font-semibold leading-tight">{name}</h3>
                  <span className="mt-1 block text-base">{places[slug]}</span>
                </span>
                <ArrowRight
                  aria-hidden
                  size={20}
                  strokeWidth={1.75}
                  className="ml-auto shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-[1.125rem] text-foreground">Don’t see your area? Just ask.</p>
            <a
              href={site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : "/contact"}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 self-start rounded-control border border-input px-6 text-base font-semibold text-foreground transition-colors hover:border-foreground hover:bg-tint"
            >
              Ask about your area
            </a>
          </div>
          <Link
            href="/areas"
            className="inline-flex min-h-[44px] items-center gap-2 self-start font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2 sm:self-auto"
          >
            View All Areas
            <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

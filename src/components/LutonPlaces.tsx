import Link from "next/link";
import { ArrowRight, GraduationCap, HeartPulse, ShoppingBag, TrainFront, Trees, type LucideIcon } from "lucide-react";
import { container, eyebrow, h2, section } from "./ui";

type Place = string | { label: string; href: string };

// Plain public place names, used only as destinations: no partnerships, times or prices.
const groups: { title: string; Icon: LucideIcon; places: Place[] }[] = [
  {
    title: "Health",
    Icon: HeartPulse,
    places: ["Luton and Dunstable University Hospital", "Your GP, dentist or pharmacy"],
  },
  {
    title: "Shopping",
    Icon: ShoppingBag,
    places: ["The Mall Luton", "Luton town centre", "Dunstable town centre"],
  },
  {
    title: "Travel",
    Icon: TrainFront,
    places: [
      "Luton station",
      "Leagrave station",
      "Luton Airport Parkway station",
      { label: "Luton Airport", href: "/airports/luton" },
    ],
  },
  {
    title: "Study",
    Icon: GraduationCap,
    places: ["University of Bedfordshire", { label: "Schools and colleges", href: "/services/school-runs" }],
  },
  {
    title: "Days out",
    Icon: Trees,
    places: ["Wardown Park and Museum", "Stockwood Discovery Centre", "Kenilworth Road", "The Hat Factory"],
  },
];

// Local Journeys: well-known Luton places, grouped by why people go there.
export function LutonPlaces() {
  return (
    <section aria-labelledby="luton-places-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>AROUND LUTON</p>
        <h2 id="luton-places-heading" className={`${h2} mt-4 text-foreground`}>
          Rides to the places you know.
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">A few of the places around Luton we can take you.</p>

        <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {groups.map(({ title, Icon, places }) => (
            <li key={title}>
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/45 text-foreground">
                <Icon aria-hidden size={22} strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
              <ul className="mt-3 space-y-2 text-[1.0625rem] leading-snug text-foreground">
                {places.map((place) =>
                  typeof place === "string" ? (
                    <li key={place}>{place}</li>
                  ) : (
                    <li key={place.label}>
                      <Link
                        href={place.href}
                        className="group -my-2.5 inline-flex min-h-[44px] items-center gap-1.5 font-semibold underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                      >
                        {place.label}
                        <ArrowRight aria-hidden size={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

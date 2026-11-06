import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { areas, services } from "@/config/site";
import heroPhoto from "../../public/brand/hero-photo.png";
import { PageHero, trustLocal } from "./PageHero";
import { container, h2 as h2Class } from "./ui";

type Area = (typeof areas)[number];

const benefits = [
  "Fixed fares",
  "Flight tracking",
  "Meet and greet",
  "Child seats on request",
  "DBS-checked drivers",
  "Available 24/7",
];


const rowLink =
  "group flex min-h-[44px] items-center gap-3 border-b border-border text-[1.0625rem] font-medium text-foreground";

function RowArrow() {
  return (
    <ArrowRight
      aria-hidden
      size={18}
      strokeWidth={1.75}
      className="ml-auto shrink-0 transition-transform group-hover:translate-x-1"
    />
  );
}

export function AreaPage({ area }: { area: Area }) {
  const journeys = [
    ...services.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
    {
      label: "Airport Transfers",
      href: area.slug === "heathrow" ? "/airports/heathrow" : "/airports",
    },
  ];
  const otherAreas = areas.filter((a) => a.slug !== area.slug);

  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="dark"
        image={heroPhoto}
        alt="A driver opens the car door for a smiling passenger outside a brick house."
        eyebrow={`TAXIS IN ${area.name.toUpperCase()}`}
        heading="Your local ride, close to home."
        text={area.intro}
        trust={trustLocal}
      />

      <section aria-labelledby="journeys-heading" className="band-alt border-t border-border py-16 sm:py-20">
        <div className={container}>
          <h2 id="journeys-heading" className={h2Class}>
            Journeys from {area.name}
          </h2>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
            {journeys.map((j) => (
              <li key={j.href}>
                <Link href={j.href} className={rowLink}>
                  {j.label}
                  <RowArrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="good-heading" className="border-t border-border py-16 sm:py-20">
        <div className={container}>
          <h2 id="good-heading" className={h2Class}>
            Good to know
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[1.0625rem] text-foreground">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/45">
                  <Check aria-hidden size={16} strokeWidth={2} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted">Pay in cash or online through a payment link.</p>
        </div>
      </section>

      <section aria-labelledby="other-areas-heading" className="band-alt border-t border-border py-16 sm:py-20">
        <div className={container}>
          <h2 id="other-areas-heading" className={h2Class}>
            Other areas we cover
          </h2>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {otherAreas.map((a) => (
              <li key={a.slug}>
                <Link href={`/areas/${a.slug}`} className={rowLink}>
                  <MapPin aria-hidden size={20} strokeWidth={1.5} className="shrink-0" />
                  {a.name}
                  <RowArrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </main>
  );
}

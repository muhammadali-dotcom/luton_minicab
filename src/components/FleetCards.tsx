import Image from "next/image";
import { ArrowRight, Briefcase, Luggage, Users } from "lucide-react";
import { fleet } from "@/config/site";
import { BookOnlineLink } from "./BookOnlineLink";
import { container, eyebrow, h2, section } from "./ui";

// Pictures are category examples, not the real fleet. No capacities until the owner verifies them.
export function FleetCards() {
  return (
    <section
      id="choose-your-car"
      aria-labelledby="fleet-cards-heading"
      className={`scroll-mt-20 band-alt border-t border-border ${section}`}
    >
      <div className={container}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`${eyebrow} text-accent`}>FIND YOUR FIT</p>
            <h2 id="fleet-cards-heading" className={`${h2} mt-4 text-foreground`}>
              Six ways to make it your journey.
            </h2>
            <p className="mt-3 text-[1.125rem] text-foreground">
              Explore our cars, from everyday comfort to extra room for everyone.
            </p>
          </div>
          <a
            href="#not-sure"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 self-start rounded-control border border-foreground px-6 text-base font-semibold text-foreground transition-colors hover:bg-tint lg:self-auto"
          >
            Need help choosing?
            <ArrowRight aria-hidden size={18} />
          </a>
        </div>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map(({ id, name, tagline, image, capacity }, i) => (
            <li
              key={id}
              id={id}
              className="flex scroll-mt-28 flex-col border-b border-primary/70 py-8 sm:px-4 sm:first:pt-8 lg:px-6"
            >
              <h3 className="flex items-baseline gap-3 font-display text-[1.75rem] font-semibold leading-tight text-foreground">
                <span className="text-[1.375rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                {name}
              </h3>
              <p className="mt-1 text-[1.0625rem] text-foreground sm:pl-[2.6rem]">{tagline}</p>
              <p className="sr-only">
                Up to {capacity.passengers} passengers, {capacity.cases} large cases and {capacity.hand} cabin bags.
              </p>
              <ul aria-hidden className="mt-3 flex flex-wrap gap-2 text-base text-foreground sm:pl-[2.6rem]">
                {[
                  { label: `Up to ${capacity.passengers}`, Icon: Users },
                  { label: `${capacity.cases} large cases`, Icon: Luggage },
                  { label: `${capacity.hand} cabin bags`, Icon: Briefcase },
                ].map(({ label, Icon }) => (
                  <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-primary/35 px-3 py-1">
                    <Icon size={16} strokeWidth={1.75} />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="relative mt-4 aspect-[2/1]">
                <Image
                  src={`/brand/${image}`}
                  alt={`Example ${name.toLowerCase()} car.`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-4">
                <BookOnlineLink variant="link" className="underline decoration-1 underline-offset-4" />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base text-muted">
          Up to: luggage space depends on bag sizes. Vehicle models may vary.
        </p>
      </div>
    </section>
  );
}

import Image from "next/image";
import { fleet } from "@/config/site";
import { BookOnlineLink } from "./BookOnlineLink";
import { container, h2, section } from "./ui";

// Pictures are category examples, not the real fleet. No capacities until the owner verifies them.
export function FleetCards() {
  return (
    <section aria-labelledby="fleet-cards-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <h2 id="fleet-cards-heading" className={`${h2} text-foreground`}>
          Choose your car
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map(({ id, name, bestFor, text, image }) => (
            <li
              key={id}
              id={id}
              className="flex scroll-mt-28 flex-col rounded-control border border-border bg-paper p-5"
            >
              <div className="relative aspect-[2/1]">
                <Image
                  src={`/brand/${image}`}
                  alt={`Example ${name.toLowerCase()} car.`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 font-display text-[1.5rem] font-semibold leading-tight text-foreground">{name}</h3>
              <p className="mt-1 text-sm font-semibold tracking-[0.08em] text-accent">BEST FOR: {bestFor.toUpperCase()}</p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
              <div className="mt-auto pt-4">
                <BookOnlineLink variant="link" />
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base text-muted">
          Exact passenger and luggage limits are shown when you book. Pictures are examples, and the model may vary.
        </p>
      </div>
    </section>
  );
}

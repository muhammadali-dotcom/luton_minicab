import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Luggage, Users } from "lucide-react";
import { fleet } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";

type Props = {
  id: string;
  label: string;
  heading: string;
  text?: string;
  // Vehicle ids from `fleet` in site.ts, in the order to show them.
  cars: string[];
};

// A few cars from the fleet with their "up to" capacities (owner-confirmed), each linking
// to its card on /fleet. Light section. Long-Distance Travel uses it for luggage choices.
export function CarChoices({ id, label, heading, text, cars }: Props) {
  const chosen = cars.map((carId) => fleet.find((car) => car.id === carId)).filter((car) => car !== undefined);
  return (
    <section aria-labelledby={id} className={`border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>{label}</p>
        <h2 id={id} className={`${h2} mt-4 text-foreground`}>
          {heading}
        </h2>
        {text && <p className="mt-3 text-[1.125rem] text-foreground">{text}</p>}
        <ul className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
          {chosen.map(({ id: carId, name, tagline, image, capacity }) => (
            <li key={carId}>
              <Link
                href={`/fleet#${carId}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-alt p-5 text-foreground transition-colors hover:border-foreground"
              >
                <div className="relative aspect-[2/1]">
                  <Image
                    src={`/brand/${image}`}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 flex items-center justify-between gap-3 font-display text-[1.5rem] font-semibold leading-tight">
                  {name}
                  <ArrowRight
                    aria-hidden
                    size={20}
                    strokeWidth={1.75}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </h3>
                <p className="mt-1 text-[1.0625rem]">{tagline}</p>
                <p className="sr-only">
                  Up to {capacity.passengers} passengers, {capacity.cases} large cases and {capacity.hand} cabin bags.
                </p>
                <ul aria-hidden className="mt-3 flex flex-wrap gap-2 text-base">
                  {[
                    { label: `Up to ${capacity.passengers}`, Icon: Users },
                    { label: `${capacity.cases} large cases`, Icon: Luggage },
                    { label: `${capacity.hand} cabin bags`, Icon: Briefcase },
                  ].map(({ label: chip, Icon }) => (
                    <li key={chip} className="inline-flex items-center gap-1.5 rounded-full bg-primary/35 px-3 py-1">
                      <Icon size={16} strokeWidth={1.75} />
                      {chip}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-foreground">Up to: luggage space depends on bag sizes. Vehicle models may vary.</p>
          <Link
            href="/fleet"
            className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2 sm:self-auto"
          >
            View our fleet
            <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, DoorOpen, Route } from "lucide-react";
import scene from "../../public/brand/long-distance-scene.png";
import { container, eyebrow, h2, section } from "./ui";

// From the owner's reference (assets/brand/long-distance-journey-reference.png): the country
// scene is cropped from it, with the car's grille emblem and bonnet ornament retouched out and
// the open sky matched to band-alt. No destinations, distances or prices.
const columns = [
  {
    title: "From your door to theirs",
    text: "Share your pickup and destination addresses. Choose a vehicle with space for your passengers and bags.",
    Icon: DoorOpen,
  },
  {
    title: "Plan the journey back",
    text: "Arrange a return for the same day or another day. Share the pickup time and address when booking.",
    Icon: Route,
  },
];

export function LongDistanceJourney() {
  return (
    <section aria-labelledby="longer-journey-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>THE LONGER JOURNEY</p>
        <h2 id="longer-journey-heading" className={`${h2} mt-4 text-foreground`}>
          Further afield. Still door to door.
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">
          From your pickup address to your destination, with a return journey if you need one.
        </p>
        {/* Wide scene from md; on phones a 2:1 crop keeps the car large, losing the far edges. */}
        <div className="relative -mx-4 mt-8 aspect-[2/1] overflow-hidden sm:mx-0 md:aspect-[1672/414]">
          <Image
            src={scene}
            alt="Illustration of a car on a country road between a cottage and a village hotel."
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="object-cover object-[42%_center]"
          />
        </div>
        <ul className="mt-10 grid gap-10 md:grid-cols-2 md:gap-0">
          {columns.map(({ title, text, Icon }, i) => (
            <li
              key={title}
              className={`flex gap-5 ${i === 1 ? "border-t border-primary pt-10 md:border-t-0 md:border-l md:pt-0 md:pl-10 lg:pl-14" : "md:pr-10 lg:pr-14"}`}
            >
              <Icon aria-hidden size={52} strokeWidth={1.25} className="shrink-0 text-foreground" />
              <div>
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 flex items-center gap-4 border-t border-primary pt-4 text-[1.0625rem] text-foreground md:justify-center">
          <CalendarDays aria-hidden size={28} strokeWidth={1.5} className="shrink-0" />
          <span>
            Have a stop or a special requirement?{" "}
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center font-semibold underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
            >
              Speak to our team
            </Link>{" "}
            before booking.
          </span>
        </p>
      </div>
    </section>
  );
}

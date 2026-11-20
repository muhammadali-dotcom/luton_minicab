import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fleet } from "@/config/site";
import { container, eyebrow, h2, section } from "./styles";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

// Images come from `fleet`; they illustrate categories, not guaranteed models.
const carImage = (name: string) => `/brand/${fleet.find((v) => v.name === name)?.image}`;

const choices = [
  {
    car: "Saloon",
    alt: "Example saloon car.",
    title: "Just you, or two",
    text: "For solo trips, couples and everyday airport journeys.",
    vehicles: "Saloon · Estate",
  },
  {
    car: "MPV Plus",
    alt: "Example MPV.",
    title: "Bringing everyone?",
    text: "More room for your people and their luggage.",
    vehicles: "MPV6 · MPV Plus · MPV7",
  },
  {
    car: "Executive",
    alt: "Example executive car.",
    title: "Travelling for work?",
    text: "A refined choice for meetings and business trips.",
    vehicles: "Executive",
  },
];

export function AirportFleet({ band = false }: { band?: boolean }) {
  return (
    <RevealSection aria-labelledby="fleet-heading" className={`border-t border-border ${section} ${band ? "band-alt" : ""}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>TRAVEL YOUR WAY</p>
        <SectionHeading id="fleet-heading" className={`${h2} mt-4 text-foreground`}>
          Room for everyone, and every bag.
        </SectionHeading>
        <p className="mt-3 text-[1.125rem] text-foreground">
          Travelling light, with the family, or with a boot full of holiday cases? Choose the car that fits.
        </p>

        <ul className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {choices.map(({ car, alt, title, text, vehicles }) => (
            <li key={title} data-photo-card className="group transition-[translate] duration-300 ease-out motion-safe:hover:-translate-y-1.5 flex flex-col">
              <div className="relative mx-auto aspect-[2/1] w-full max-w-md">
                <Image
                  src={carImage(car)}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-contain object-bottom transition-[scale] duration-500 ease-out motion-safe:group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-display text-[clamp(1.75rem,2.6vw,2.25rem)] font-semibold leading-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 max-w-xs text-[1.0625rem] leading-snug text-foreground">{text}</p>
              <p className="mt-auto pt-3 text-[1.0625rem] text-foreground">{vehicles}</p>
              <span aria-hidden className="mt-4 block h-[2px] w-16 bg-primary" />
            </li>
          ))}
        </ul>

        <Link
          href="/fleet"
          className="mt-10 inline-flex min-h-13 items-center gap-2 rounded-control bg-primary px-7 text-[1.0625rem] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          View Our Fleet
          <ArrowRight aria-hidden size={18} />
        </Link>
        <p className="mt-3 text-[1.0625rem] text-foreground">Choose your vehicle when booking.</p>
      </div>
    </RevealSection>
  );
}

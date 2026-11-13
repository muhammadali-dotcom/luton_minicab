import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, CarFront, GraduationCap, Hotel, Phone, Route, TrainFront, type LucideIcon } from "lucide-react";
import { site } from "@/config/site";
import { serviceDetails } from "@/config/serviceDetails";

type ServiceCard = {
  title: string;
  text: string;
  href: string;
  Icon: LucideIcon;
  // Photo for the card. Without one, a plain panel with the icon shows.
  image?: StaticImageData;
  imageAlt?: string;
  imagePosition?: string;
};

const cards: ServiceCard[] = [
  {
    title: "Local Journeys",
    text: "Shopping, appointments or seeing someone you love.",
    href: "/services/local-journeys",
    Icon: CarFront,
    image: (serviceDetails["local-journeys"].heroPhoto?.image ?? serviceDetails["local-journeys"].image),
    imageAlt: (serviceDetails["local-journeys"].heroPhoto?.alt ?? serviceDetails["local-journeys"].alt),
    imagePosition: "object-right",
  },
  {
    title: "School Runs",
    text: "A caring start to their school day.",
    href: "/services/school-runs",
    Icon: GraduationCap,
    image: (serviceDetails["school-runs"].heroPhoto?.image ?? serviceDetails["school-runs"].image),
    imageAlt: (serviceDetails["school-runs"].heroPhoto?.alt ?? serviceDetails["school-runs"].alt),
    imagePosition: "object-right",
  },
  {
    title: "Corporate Travel",
    text: "For your team, your clients and your next meeting.",
    href: "/services/corporate-travel",
    Icon: Briefcase,
    image: (serviceDetails["corporate-travel"].heroPhoto?.image ?? serviceDetails["corporate-travel"].image),
    imageAlt: (serviceDetails["corporate-travel"].heroPhoto?.alt ?? serviceDetails["corporate-travel"].alt),
    imagePosition: "object-right",
  },
  {
    title: "Long-Distance Travel",
    text: "A comfortable ride, wherever you’re heading.",
    href: "/services/long-distance-travel",
    Icon: Route,
    image: (serviceDetails["long-distance-travel"].heroPhoto?.image ?? serviceDetails["long-distance-travel"].image),
    imageAlt: (serviceDetails["long-distance-travel"].heroPhoto?.alt ?? serviceDetails["long-distance-travel"].alt),
    imagePosition: "object-right",
  },
  {
    title: "Station Transfers",
    text: "From your front door to the station, and home again.",
    href: "/services/station-hotel-transfers",
    Icon: TrainFront,
    image: (serviceDetails["station-hotel-transfers"].heroPhoto?.image ?? serviceDetails["station-hotel-transfers"].image),
    imageAlt: (serviceDetails["station-hotel-transfers"].heroPhoto?.alt ?? serviceDetails["station-hotel-transfers"].alt),
    imagePosition: "object-right",
  },
  {
    title: "Hotel Transfers",
    text: "A warm welcome and an easy onward journey.",
    href: "/services/station-hotel-transfers",
    Icon: Hotel,
    image: (serviceDetails["station-hotel-transfers"].heroPhoto?.image ?? serviceDetails["station-hotel-transfers"].image),
    imageAlt: (serviceDetails["station-hotel-transfers"].heroPhoto?.alt ?? serviceDetails["station-hotel-transfers"].alt),
    imagePosition: "object-right",
  },
];

// Links to the contact page until a real phone number is set in site.ts.
const talkClass =
  "inline-flex min-h-13 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-control bg-primary px-7 text-[1.0625rem] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover";

export function Services() {
  return (
    <section aria-labelledby="services-heading" className="band-alt border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="flex items-center justify-center gap-4 text-sm font-semibold tracking-[0.2em] text-accent">
            <span aria-hidden className="h-0.5 w-12 bg-primary" />
            OUR SERVICES
            <span aria-hidden className="h-0.5 w-12 bg-primary" />
          </p>
          <h2
            id="services-heading"
            className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-balance text-foreground"
          >
            Here for every part of your day.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1.125rem] leading-relaxed text-foreground">
            Whether you’re going down the street or across the world, we’re with you.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ title, text, href, Icon, image, imageAlt, imagePosition }) => (
            <li key={title} className="flex flex-col overflow-hidden rounded-control border border-border bg-paper">
              <div className="relative aspect-[3/2] bg-alt">
                {image ? (
                  <Image
                    src={image}
                    alt={imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover ${imagePosition ?? ""}`}
                  />
                ) : (
                  <div aria-hidden className="flex size-full items-center justify-center text-muted/60">
                    <Icon size={48} strokeWidth={1} />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <h3 className="font-display text-[1.5rem] font-medium leading-tight text-foreground">{title}</h3>
                <span aria-hidden className="mt-4 h-0.5 w-10 bg-primary" />
                <p className="mt-4 text-[1.0625rem] leading-snug text-foreground">{text}</p>
                <Link
                  href={href}
                  className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-4 font-semibold text-foreground underline-offset-4 hover:underline hover:decoration-primary hover:decoration-2"
                >
                  Find out more
                  <span className="sr-only"> about {title}</span>
                  <ArrowRight aria-hidden size={18} />
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-5 rounded-control bg-foreground px-6 py-6 [--color-ring:var(--color-primary)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="font-display text-[clamp(1.375rem,2vw,1.75rem)] font-medium leading-tight text-paper">
              Have another journey in mind?
            </h3>
            <p className="mt-1 text-[1.0625rem] text-paper/90">
              Business trips, longer journeys or something different&mdash;let&rsquo;s talk.
            </p>
          </div>
          {site.phone ? (
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className={talkClass}>
              <Phone aria-hidden size={20} strokeWidth={1.75} />
              Talk to Our Team
            </a>
          ) : (
            <Link href="/contact" className={talkClass}>
              <Phone aria-hidden size={20} strokeWidth={1.75} />
              Talk to Our Team
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

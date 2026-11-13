import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CarFront,
  MapPin,
  MessageCircle,
  MessageCircleMore,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { container, eyebrow, h2, section } from "@/components/ui";
import { areas, site } from "@/config/site";
import heroIllustration from "../../../public/brand/about-hero.png";
import whatIllustration from "../../../public/brand/about-what.png";
import whoIllustration from "../../../public/brand/about-who.png";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Luton Minicab offers local journeys, school runs, airport transfers and longer trips from Luton, with a team you can reach day or night.",
};

// Confirmed facts only (requirement.md): no history, fleet or driver numbers, awards or reviews.
const services = [
  { name: "Local Journeys", href: "/services/local-journeys" },
  { name: "School Runs", href: "/services/school-runs" },
  { name: "Corporate Travel", href: "/services/corporate-travel" },
  { name: "Long-Distance Travel", href: "/services/long-distance-travel" },
  {
    name: "Station & Hotel Transfers",
    href: "/services/station-hotel-transfers",
  },
  { name: "Airport Transfers", href: "/airports" },
];

// Owner's reference: three ways we help, then the six local areas.
const help = [
  {
    title: "Talk to our team",
    text: "Tell us about your plans by phone or WhatsApp.",
    link: { label: "Contact us", href: "/contact" },
    Icon: MessageCircleMore,
  },
  {
    title: "Change a booking",
    text: "Need to update a pickup time or address? Let us know as soon as you can.",
    link: {
      label: "Request a change on WhatsApp",
      href: site.whatsapp
        ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello, I’d like to change my booking.")}`
        : "/contact",
    },
    Icon: CalendarClock,
  },
  {
    title: "Find the right vehicle",
    text: "Explore cars for your passengers and luggage.",
    link: { label: "View our fleet", href: "/fleet" },
    Icon: CarFront,
  },
];

const localSlugs = [
  "luton",
  "leagrave",
  "stopsley",
  "dunstable",
  "houghton-regis",
  "harpenden",
];
const localAreas = localSlugs
  .map((slug) => areas.find((a) => a.slug === slug)!)
  .filter(Boolean);

const linkClass =
  "group inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export default function Page() {
  return (
    <main id="main" className="flex-1">
      {/* From the owner's reference: the street scene is cropped from assets/brand/about-hero-reference.png,
          with the car's grille retouched to remove the maker's design. */}
      <PageHero
        eyebrow="ABOUT LUTON MINICAB"
        heading={
          <span className="block text-balance">
            Here for wherever life takes you.
          </span>
        }
        text="From everyday trips to airport journeys, our team is here to help you get there."
        secondary={
          site.phone
            ? {
                label: "Call our team",
                href: `tel:${site.phone.replace(/\s+/g, "")}`,
                icon: "phone",
              }
            : undefined
        }
        centered
        illustration={{
          image: heroIllustration,
          alt: "Illustration of a Luton street with houses, a station and an airport, and a car on the road between them.",
          caption: "LOCAL TRIPS. LONGER JOURNEYS. THE SAME CARE.",
        }}
      />

      {/* From the owner's reference (assets/brand/about-who-reference.png); the caption is real text. */}
      <section
        aria-labelledby="who-heading"
        className={`band-alt border-t border-border ${section}`}
      >
        <div
          className={`${container} grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14`}
        >
          <div>
            <p className={`${eyebrow} flex items-center gap-4 text-accent`}>
              WHO WE ARE
              <span aria-hidden className="h-px w-16 bg-primary" />
            </p>
            <h2 id="who-heading" className={`${h2} mt-4 text-foreground`}>
              A local service with a team you can reach.
            </h2>
            <p className="mt-5 text-[1.125rem] leading-relaxed text-foreground">
              From everyday trips to airport transfers, we help people across
              Luton and nearby towns get where they need to be.
            </p>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-foreground">
              Bookings are handled by our team at Bittacy Cars in Mill Hill,
              north London. Book online, or speak to us about your journey.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-control bg-primary px-7 text-[1.0625rem] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Contact our team
              <ArrowRight aria-hidden size={18} />
            </Link>
            {(site.phone || site.whatsapp) && (
              <div className="mt-6 flex items-center gap-3 text-[1.0625rem] text-foreground">
                {site.phone && (
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    aria-label="Call us"
                    className="inline-flex size-[44px] items-center justify-center rounded-full hover:bg-primary/30"
                  >
                    <Phone aria-hidden size={22} strokeWidth={1.75} />
                  </a>
                )}
                {site.phone && site.whatsapp && (
                  <span aria-hidden className="h-6 w-px bg-primary" />
                )}
                {site.whatsapp && (
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    aria-label="Message us on WhatsApp"
                    className="inline-flex size-[44px] items-center justify-center rounded-full hover:bg-primary/30"
                  >
                    <MessageCircle aria-hidden size={22} strokeWidth={1.75} />
                  </a>
                )}
                <span className="ml-1">Call us or message on WhatsApp</span>
              </div>
            )}
          </div>
          <figure className="relative overflow-hidden rounded-2xl border border-border bg-paper">
            {/* Makes clear this is a drawing, not the real office. */}
            <span className="absolute top-3 right-3 rounded-full bg-paper/85 px-3 py-1 text-sm text-foreground">
              Illustration
            </span>
            <Image
              src={whoIllustration}
              alt=""
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="flex items-center gap-4 px-6 py-5 sm:gap-6 sm:px-10">
              <span aria-hidden className="h-px flex-1 bg-primary" />
              <span className="font-display text-[1.25rem] italic text-foreground sm:text-[1.375rem]">
                A real team behind every booking.
              </span>
              <span aria-hidden className="h-px flex-1 bg-primary" />
            </figcaption>
          </figure>
        </div>
      </section>

      {/* From the owner's reference (assets/brand/about-what-reference.png; the hotel sign re-lettered). */}
      <section
        aria-labelledby="what-heading"
        className={`border-t border-border ${section}`}
      >
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>WHAT WE DO</p>
          <h2 id="what-heading" className={`${h2} mt-4 text-foreground`}>
            Here for every part of your day.
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">
            Local trips, working days and journeys further afield.
          </p>
          <Image
            src={whatIllustration}
            alt=""
            sizes="(min-width: 768px) 70vw, 100vw"
            className="-mx-4 mt-8 h-auto w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full md:mx-auto md:w-[70%]"
          />
          <ul className="mt-8 grid sm:grid-cols-2 md:grid-cols-3">
            {services.map(({ name, href }, i) => (
              <li
                key={href}
                className={`border-b border-primary/60 last:border-b-0 sm:pr-8 ${i < 3 ? "md:border-b" : "md:border-b-0"}`}
              >
                {/* Name on the left, arrow pinned to the right of the column, so the arrows line up. */}
                <Link
                  href={href}
                  className="group flex min-h-[44px] w-full items-center justify-between gap-4 py-5 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight text-foreground"
                >
                  <span className="group-hover:underline group-hover:decoration-primary group-hover:decoration-2 group-hover:underline-offset-4">
                    {name}
                  </span>
                  <ArrowRight
                    aria-hidden
                    size={26}
                    strokeWidth={1.5}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* From the owner's reference. Tones are swapped from the reference (this one dark, the next light)
          so the page keeps alternating. */}
      <section
        aria-labelledby="help-heading"
        className={`band-alt border-t border-border ${section}`}
      >
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>HERE TO HELP</p>
          <h2 id="help-heading" className={`${h2} mt-4 text-foreground`}>
            A little help with your journey.
          </h2>
          <ul className="mt-10 grid md:grid-cols-3">
            {help.map(({ title, text, link, Icon }, i) => (
              <li
                key={title}
                className={`flex flex-col py-8 md:py-0 ${i > 0 ? "border-t border-primary/70 md:border-t-0 md:border-l md:pl-10" : ""} ${i < 2 ? "md:pr-10" : ""}`}
              >
                <Icon
                  aria-hidden
                  size={44}
                  strokeWidth={1.5}
                  className="text-foreground"
                />
                <h3 className="mt-5 font-display text-[1.75rem] font-semibold leading-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">
                  {text}
                </p>
                <a
                  href={link.href}
                  className={`${linkClass} mt-auto self-start pt-3`}
                >
                  {link.label}
                  <ArrowRight
                    aria-hidden
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="where-heading"
        className={`border-t border-border ${section}`}
      >
        <div
          className={`${container} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14`}
        >
          <div>
            <p className={`${eyebrow} text-accent`}>AROUND LUTON</p>
            <h2 id="where-heading" className={`${h2} mt-4 text-foreground`}>
              <span className="block">Local pickups.</span>
              <span className="block">Nearby towns, too.</span>
            </h2>
            <p className="mt-4 text-[1.125rem] text-foreground">
              Explore the places we cover around Luton.
            </p>
            <Link href="/areas" className={`${linkClass} mt-4`}>
              View all areas
              <ArrowRight
                aria-hidden
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          {/* Down then across, as in the reference. */}
          <ul className="grid gap-x-10 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
            {localAreas.map(({ slug, name }) => (
              <li key={slug}>
                <Link
                  href={`/areas/${slug}`}
                  className="group flex min-h-[44px] items-center gap-3 border-b border-primary/60 py-4 text-[1.125rem] font-semibold text-foreground"
                >
                  <MapPin
                    aria-hidden
                    size={24}
                    strokeWidth={1.5}
                    className="shrink-0 text-accent"
                  />
                  {name}
                  <ArrowRight
                    aria-hidden
                    size={20}
                    strokeWidth={1.5}
                    className="ml-auto shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

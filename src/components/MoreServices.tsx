import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PartyPopper, PawPrint, Ship } from "lucide-react";
import { site } from "@/config/site";
import { BookOnlineLink } from "./BookOnlineLink";
import { container, eyebrow, h2, section } from "./ui";
import airportPhoto from "../../public/brand/airport-luton.png";

// Extra services the owner confirmed (November 2026), listed here without pages of their own.
// Confirmed facts only: no port names, bridal cars, prices or capacities. Day hire,
// sightseeing and roadshow travel wait until their arrangements are confirmed.
const extras = [
  {
    title: "Seaport & Cruise Transfers",
    text: "Rides to and from the port, with room for your luggage. Tell us your sailing time when you book.",
    Icon: Ship,
  },
  {
    title: "Wedding & Event Transport",
    text: "Getting guests to the ceremony, the party and home again.",
    Icon: PartyPopper,
  },
  {
    title: "Pet-Friendly Journeys",
    text: "Travelling with a pet? Tell us when you book so we can arrange a suitable car.",
    Icon: PawPrint,
  },
];

const linkClass =
  "group inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export function MoreServices() {
  // Enquiries go to WhatsApp until the Contact page is built.
  const enquire = site.whatsapp ? `https://wa.me/${site.whatsapp}` : null;
  return (
    <section aria-labelledby="more-services-heading" className={`border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>MORE WAYS TO TRAVEL</p>
        <h2 id="more-services-heading" className={`${h2} mt-4 text-foreground`}>
          Something a little different?
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">Ask us and we’ll help you plan it.</p>
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {extras.map(({ title, text, Icon }) => (
            <li key={title} className="flex flex-col rounded-2xl border border-border bg-alt p-6">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/45 text-foreground">
                <Icon aria-hidden size={24} strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
              <p className="mt-2 flex-1 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
              {enquire && (
                <a href={enquire} className={`${linkClass} mt-3 self-start`}>
                  Enquire about this service
                  <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base text-foreground">All subject to availability. Ask us when you plan your trip.</p>
      </div>
    </section>
  );
}

// Airport Transfers gets its own banner on /services, pointing to /airports.
export function ServiceAirportBanner() {
  return (
    <section aria-labelledby="airport-banner-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <div className="grid overflow-hidden rounded-2xl border border-border bg-paper md:grid-cols-2">
          <div className="relative aspect-[3/2] md:aspect-auto md:min-h-80">
            <Image
              src={airportPhoto}
              alt="A dark saloon waiting at the kerb outside a glass airport terminal."
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className={`${eyebrow} text-accent`}>AIRPORT TRANSFERS</p>
            <h2 id="airport-banner-heading" className={`${h2} mt-4 text-foreground`}>
              Catching a flight?
            </h2>
            <p className="mt-3 text-[1.125rem] text-foreground">To and from all UK airports, with flight tracking.</p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <BookOnlineLink arrow />
              <Link href="/airports" className={linkClass}>
                View All Airports
                <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

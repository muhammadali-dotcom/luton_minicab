import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Briefcase,
  CarFront,
  Clock,
  GraduationCap,
  Plane,
  PlaneLanding,
  PoundSterling,
  Route,
  ShieldCheck,
  TrainFront,
  Wallet,
} from "lucide-react";
import { BookOnlineLink } from "@/components/BookOnlineLink";
import { PageHero, trustLocal } from "@/components/PageHero";
import { container, eyebrow, h2, section } from "@/components/ui";
import officeIllustration from "../../../public/brand/contact-office.png";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Luton Minicab offers local journeys, school runs, airport transfers and longer trips from Luton, with a team you can reach day or night.",
};

// Confirmed facts only (requirement.md): no history, fleet or driver numbers, awards or reviews.
const services = [
  { name: "Local Journeys", href: "/services/local-journeys", Icon: CarFront },
  { name: "School Runs", href: "/services/school-runs", Icon: GraduationCap },
  { name: "Corporate Travel", href: "/services/corporate-travel", Icon: Briefcase },
  { name: "Long-Distance Travel", href: "/services/long-distance-travel", Icon: Route },
  { name: "Station & Hotel Transfers", href: "/services/station-hotel-transfers", Icon: TrainFront },
  { name: "Airport Transfers", href: "/airports", Icon: Plane },
];

const reasons = [
  { title: "Available 24/7", text: "Early starts and late finishes, day or night.", Icon: Clock },
  { title: "Fixed fares", text: "You’ll know your fare when you book.", Icon: PoundSterling },
  { title: "DBS-checked drivers", text: "Every driver is DBS-checked.", Icon: ShieldCheck },
  { title: "Child seats on request", text: "Just ask when you book.", Icon: Baby },
  { title: "Flight tracking", text: "For airport pickups, we follow your flight.", Icon: PlaneLanding },
  { title: "Easy to pay", text: "Cash, or online through a payment link.", Icon: Wallet },
];

const iconCircle = "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/45 text-foreground";
const linkClass =
  "group inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        eyebrow="ABOUT US"
        heading="Local journeys. A friendly team."
        text="Luton Minicab helps people across Luton and the towns nearby get where they need to be, day or night."
        trust={trustLocal}
        compact
        centered
      />

      <section aria-labelledby="who-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
          <div>
            <p className={`${eyebrow} text-accent`}>WHO WE ARE</p>
            <h2 id="who-heading" className={`${h2} mt-4 text-foreground`}>
              A local service with a team you can reach.
            </h2>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-foreground">
              Luton Minicab offers local journeys, school runs, airport transfers and longer trips from Luton and the towns nearby.
            </p>
            <p className="mt-4 text-[1.125rem] leading-relaxed text-foreground">
              Bookings are handled by our team at Bittacy Cars in Mill Hill, north London. You can book online, call us or send a WhatsApp
              message at any time.
            </p>
            <Link href="/contact" className={`${linkClass} mt-4`}>
              Contact us
              <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          {/* The office illustration's background is the page cream, so it sits on a matching card. */}
          <div className="rounded-2xl border border-border bg-paper p-6 sm:p-8">
            <Image src={officeIllustration} alt="" sizes="(min-width: 1024px) 34rem, 100vw" className="h-auto w-full" />
          </div>
        </div>
      </section>

      <section aria-labelledby="what-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>WHAT WE DO</p>
          <h2 id="what-heading" className={`${h2} mt-4 text-foreground`}>
            Here for every part of your day.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ name, href, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex min-h-[44px] items-center gap-4 rounded-2xl border border-border bg-alt p-5 text-foreground transition-colors hover:border-foreground"
                >
                  <span className={iconCircle}>
                    <Icon aria-hidden size={22} strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-[1.375rem] font-semibold leading-tight">{name}</span>
                  <ArrowRight aria-hidden size={20} className="ml-auto shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>WHY PEOPLE CHOOSE US</p>
          <h2 id="why-heading" className={`${h2} mt-4 text-foreground`}>
            The little things that make a journey easier.
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4">
                <span className={iconCircle}>
                  <Icon aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
                  <p className="mt-1 text-[1.0625rem] text-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="where-heading" className={`border-t border-border ${section}`}>
        <div className={`${container} flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between`}>
          <div>
            <p className={`${eyebrow} text-accent`}>WHERE WE PICK UP</p>
            <h2 id="where-heading" className={`${h2} mt-4 text-foreground`}>
              Across Luton and the towns nearby.
            </h2>
            <p className="mt-3 text-[1.125rem] text-foreground">Including Leagrave, Stopsley, Dunstable, Houghton Regis and Harpenden.</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <BookOnlineLink arrow />
            <Link href="/areas" className={linkClass}>
              View All Areas
              <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { airports, areas, fleet, services, site } from "@/config/site";
import footerStreet from "../../public/brand/footer-street.png";
import { Logo } from "./Logo";

type FooterLink = { label: string; href: string; external?: boolean };

const footerAreas = ["luton", "dunstable", "houghton-regis", "harpenden", "leagrave", "stopsley"];

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "EXPLORE",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Fleet", href: "/fleet" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/#faqs" },
      // External booker: same tab, plain anchor.
      { label: "Book Online", href: site.bookingUrl, external: true },
    ],
  },
  {
    title: "AIRPORTS",
    links: [
      ...airports.map((a) => ({ label: a.name, href: `/airports/${a.slug}` })),
      { label: "View All Airports", href: "/airports" },
    ],
  },
  {
    title: "OUR SERVICES",
    links: [
      ...services
        .filter((s) => s.slug !== "station-hotel-transfers")
        .map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
      { label: "Station Transfers", href: "/services/station-hotel-transfers" },
      { label: "Hotel Transfers", href: "/services/station-hotel-transfers" },
    ],
  },
  {
    title: "AREAS WE COVER",
    links: [
      ...footerAreas.map((slug) => {
        const area = areas.find((a) => a.slug === slug)!;
        return { label: area.name, href: `/areas/${slug}` };
      }),
      { label: "View All Areas", href: "/areas" },
    ],
  },
  {
    title: "OUR FLEET",
    // Each opens its card on the fleet page.
    links: fleet.map((v) => ({ label: v.name, href: `/fleet#${v.id}` })),
  },
];

// Each becomes a real link once its value is set in site.ts.
const contacts: { label: string; Icon: LucideIcon; href: string | null }[] = [
  { label: "Call Us", Icon: Phone, href: site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : null },
  { label: "WhatsApp", Icon: MessageCircle, href: site.whatsapp ? `https://wa.me/${site.whatsapp}` : null },
  { label: "Email Us", Icon: Mail, href: site.email ? `mailto:${site.email}` : null },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

const linkClass = "inline-flex min-h-[44px] items-center text-[1.0625rem] text-foreground hover:underline hover:decoration-primary hover:underline-offset-4";

export function SiteFooter() {
  return (
    <footer className="text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Top row: brand, tagline, contact, hours */}
        <div className="flex flex-col gap-6 border-b border-primary/70 py-8 lg:flex-row lg:items-center lg:gap-0">
          <Link href="/" className="shrink-0 lg:pr-8">
            <Logo className="h-[4.5rem]" />
          </Link>
          <p className="max-w-sm text-[1.0625rem] leading-snug lg:border-l lg:border-primary/70 lg:px-8">
            Local rides, school runs and airport journeys. Here for your everyday plans.
          </p>
          <ul className="flex flex-wrap items-start gap-x-6 gap-y-4 lg:ml-auto lg:gap-0">
            {contacts.map(({ label, Icon, href }) => {
              const body = (
                <>
                  <Icon aria-hidden size={26} strokeWidth={1.5} />
                  <span>{label}</span>
                </>
              );
              return (
                <li key={label} className="lg:border-l lg:border-primary/70 lg:px-7">
                  {href ? (
                    <a href={href} className="flex min-h-[44px] flex-col items-center gap-1 text-sm hover:underline">
                      {body}
                    </a>
                  ) : (
                    <span className="flex flex-col items-center gap-1 text-sm">
                      {body}
                      <span className="text-xs text-muted">(to be added)</span>
                    </span>
                  )}
                </li>
              );
            })}
            <li className="self-center lg:border-l lg:border-primary/70 lg:pl-7">
              <span className="text-[1.0625rem]">Available 24/7</span>
            </li>
          </ul>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 sm:grid-cols-3 lg:grid-cols-5">
          {columns.map(({ title, links }) => (
            <div key={title}>
              <h2 className="text-sm font-bold tracking-[0.16em]">{title}</h2>
              <span aria-hidden className="mt-3 block h-0.5 w-12 bg-primary" />
              <ul className="mt-2">
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={href} className={linkClass}>
                        {label}
                      </a>
                    ) : (
                      <Link href={href} className={linkClass}>
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Image src={footerStreet} alt="" sizes="(min-width: 1280px) 1120px, 100vw" className="h-auto w-full" />
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-5 border-t border-primary/70 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[1.0625rem] leading-snug">
            {/* Fixed year: new Date() breaks prerendering under Cache Components. Update each January. */}
            <p>&copy; 2026 {site.name}</p>
            <p>
              Powered by{" "}
              <a
                href="https://mycabify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center font-semibold underline-offset-4 hover:underline hover:decoration-primary"
              >
                MyCabify
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ul className="flex flex-wrap items-center gap-x-5 sm:gap-x-0">
              {legal.map(({ label, href }, i) => (
                <li key={href} className={i > 0 ? "sm:ml-4 sm:border-l sm:border-primary/70 sm:pl-4" : ""}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="#"
              aria-label="Back to top"
              className="inline-flex size-[44px] items-center justify-center rounded-full border border-foreground transition-colors hover:bg-tint"
            >
              <ArrowUp aria-hidden size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { additionalAreas, airports, areas, services, site } from "@/config/site";
import footerStreet from "../../public/brand/footer-street.png";
import { routes } from "@/config/routeDetails";
import { Logo } from "./Logo";

type FooterLink = { label: string; href: string; arrow?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Fleet", href: "/fleet" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQs", href: "/#faqs" },
    ],
  },
  {
    title: "Airports",
    links: [
      ...airports.map(({ name, slug }) => ({ label: name, href: `/airports/${slug}` })),
      { label: "View All Airports", href: "/airports", arrow: true },
    ],
  },
  {
    title: "Our Services",
    links: [
      ...services
        .filter(({ slug }) => slug !== "station-hotel-transfers")
        .map(({ name, slug }) => ({ label: name, href: `/services/${slug}` })),
      { label: "Station & Hotel Transfers", href: "/services/station-hotel-transfers" },
      { label: "View All Services", href: "/services", arrow: true },
    ],
  },
];

const areaLinks: FooterLink[] = [
  ...areas.map(({ name, slug }) => ({ label: name, href: `/areas/${slug}` })),
  { label: "View All Areas", href: "/areas", arrow: true },
];

const routeLinks: FooterLink[] = [
  ...routes.map(({ name, slug }) => ({
    label: slug === "luton-to-central-london" ? "Luton to Central London" : name,
    href: `/routes/${slug}`,
  })),
  { label: "Luton Airport guide", href: "/luton-airport-guide" },
  { label: "Luton station transfers", href: "/luton-station-transfers" },
];

const pickupLinks = additionalAreas.map(({ id, heading }) => ({
  label: heading,
  href: `/areas#${id}`,
}));

const groupHeading = "text-sm font-bold uppercase tracking-[0.12em]";

function FooterNavLink({ label, href, arrow }: FooterLink) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[44px] items-center gap-2 text-base hover:underline hover:decoration-primary hover:underline-offset-4 lg:min-h-7"
    >
      {label}
      {arrow && <ArrowRight aria-hidden size={16} className="shrink-0" />}
    </Link>
  );
}

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

        <nav aria-label="Footer" className="pb-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-8 sm:gap-x-8 lg:grid-cols-[0.9fr_1fr_1.25fr_1.75fr] xl:gap-x-10">
            {columns.map(({ title, links }) => (
              <div key={title}>
                <h2 className={groupHeading}>{title}</h2>
                <ul className="mt-3 lg:space-y-1">
                  {links.map((link) => (
                    <li key={link.href}><FooterNavLink {...link} /></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <h2 className={groupHeading}>Areas We Cover</h2>
              <ul className="mt-3 grid grid-flow-col grid-cols-2 grid-rows-5 gap-x-4 lg:gap-x-6 lg:gap-y-1">
                {areaLinks.map((link) => (
                  <li key={link.href}><FooterNavLink {...link} /></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-3 border-t border-primary py-6 lg:grid-cols-[1.1fr_4fr] lg:gap-0">
            <h2 className={`${groupHeading} lg:pt-1`}>Popular Routes</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-12 lg:border-l lg:border-primary lg:pl-8 xl:pl-10">
              {routeLinks.map((link, index) => (
                <li key={link.href} className={index < 4 ? "lg:col-span-3" : "lg:col-span-4"}>
                  <FooterNavLink {...link} />
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 border-y border-primary py-4 lg:grid-cols-[1.1fr_4fr] lg:gap-0">
            <h2 className={`${groupHeading} lg:self-center`}>More Pickup Areas</h2>
            <ul className="grid grid-cols-2 gap-x-4 lg:flex lg:flex-wrap lg:gap-x-6 lg:border-l lg:border-primary lg:pl-8 xl:gap-x-8 xl:pl-10">
              {pickupLinks.map((link) => (
                <li key={link.href} className="flex items-center gap-6 xl:gap-8 lg:not-first:before:size-1 lg:not-first:before:rounded-full lg:not-first:before:bg-primary">
                  <FooterNavLink {...link} />
                </li>
              ))}
            </ul>
          </div>
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
            {site.operatorLicence && (
              <p>
                Operated by {site.operator}, {site.licensingAuthority} private hire operator licence {site.operatorLicence}
              </p>
            )}
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

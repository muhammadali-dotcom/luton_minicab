import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Route,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { BookOnlineLink } from "@/components/BookOnlineLink";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { container, eyebrow, h2, section } from "@/components/styles";
import { site } from "@/config/site";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/config/seo";
import officeIllustration from "../../../public/brand/contact-office.png";
import journeyIllustration from "../../../public/brand/fleet-help.png";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Call, WhatsApp or email Luton Minicab. Our team is available 24/7 to help with new journeys and existing bookings.",
  path: "/contact",
});

// Similar in flow to the owner's reference (heathrowminicab.com/contact), in Luton's own style.
// No form: every way to reach us is a direct link. Confirmed facts only.

// The booking team's base as A2B Radio Cars publishes it (no street address); never label it
// as a Luton office.
const office = {
  name: "Our booking team",
  lines: [`Based in ${site.base.area}`, site.base.postcode],
};
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Hounslow ${site.base.postcode}`)}`;
const tel = site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : null;

type Way = {
  title: string;
  text: string;
  action: string;
  href: string;
  Icon: LucideIcon;
  detail?: string;
  primary?: boolean;
};

// Each way shows only when its value is set in site.ts.
const wayOptions: (Way | null | "")[] = [
  tel && site.phone && {
    title: "Call our team",
    text: "For bookings, changes or pickup help.",
    action: "Call now",
    href: tel,
    Icon: Phone,
    detail: site.phone,
    primary: true,
  },
  site.whatsapp && {
    title: "Chat on WhatsApp",
    text: "Send your pickup, destination and travel details.",
    action: "WhatsApp us",
    href: `https://wa.me/${site.whatsapp}`,
    Icon: MessageCircle,
  },
  site.email && {
    title: "Send an email",
    text: "For general enquiries and journey requests.",
    action: "Email us",
    href: `mailto:${site.email}`,
    Icon: Mail,
    detail: site.email,
  },
];
const ways = wayOptions.filter((way): way is Way => !!way);

const checklists = [
  {
    title: "Your journey",
    note: "For every booking",
    Icon: Route,
    items: ["Pickup address", "Destination", "Date and pickup time", "Return journey, if needed"],
  },
  {
    title: "People & luggage",
    Icon: UsersRound,
    items: ["Number of passengers", "Large cases and cabin bags", "Child seat requests", "Any extra requirements"],
  },
  {
    title: "Flight or train details",
    optional: true,
    Icon: Plane,
    items: ["Flight or train number", "Terminal or station", "Arrival or departure time"],
  },
];

const nextSteps = [
  "We check your journey, passengers, luggage and flight or train details.",
  "We confirm the car, pickup time and fare, which is then fixed.",
  "Your confirmation explains where you’ll meet your driver.",
];

// Answers match the Terms (config/legal.ts) and the confirmed policies.
const faqs = [
  {
    q: "Can I change or cancel my booking?",
    a: "Yes. Tell us as soon as you can. Prepaid journeys cancelled at least 12 hours before pickup are refunded, minus bank or payment-processing charges.",
  },
  { q: "How can I pay?", a: "In cash to the driver, or online through a secure payment link." },
  {
    q: "Is there a waiting charge?",
    a: "Your driver waits free for 15 minutes. At airports this starts once they reach the pickup point at the agreed time; for other pickups it starts at the booked time. After that, waiting charges apply, and we discuss these with you before your booking is confirmed.",
  },
  {
    q: "Where will I meet my driver?",
    a: "At the agreed meeting point, or where your driver tells you. Your confirmation includes meeting instructions.",
  },
  {
    q: "What if I can’t find my driver?",
    a: "Stay where you are and call us with your booking name and where you are, so we can guide you. Please don’t leave the pickup point or take other transport without telling us.",
  },
];

const cardTitle = "font-display text-[1.375rem] font-semibold leading-tight";

export default function Page() {
  return (
    <main id="main" className="flex-1">
      <BreadcrumbSchema items={[{ name: "Contact", path: "/contact" }]} />
      <PageHero
        eyebrow="CONTACT LUTON MINICAB"
        heading={
          <>
            <span className="lg:block">Your journey starts </span>
            <span className="lg:block">with a conversation.</span>
          </>
        }
        text="Book online in a few minutes, or call or message us and we’ll plan your journey together."
        sideImage={{ image: officeIllustration, alt: "Illustration of a booking office on a quiet street." }}
      />

      <RevealSection aria-labelledby="ways-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`${eyebrow} text-accent`}>GET IN TOUCH</p>
              <SectionHeading id="ways-heading" className={`${h2} mt-4 text-foreground`}>
                A real person. A simpler journey.
              </SectionHeading>
              <p className="mt-3 text-[1.125rem] text-foreground">Book a ride or speak to our team. We’re here to help.</p>
            </div>
            <p className="inline-flex items-center gap-2 shrink-0 self-start rounded-full border border-primary px-4 py-2 text-base font-semibold text-foreground">
              <span aria-hidden className="size-2.5 rounded-full bg-primary" />
              Available 24/7
            </p>
          </div>

          {ways.length > 0 && (
            <ul className="mt-10 grid gap-6 lg:grid-cols-3">
              {ways.map(({ title, text, action, href, Icon, detail, primary }) => (
                <li key={title} className="flex min-w-0 flex-col rounded-2xl border border-border bg-paper p-6">
                  <span className="flex size-12 items-center justify-center rounded-full bg-tint">
                    <Icon aria-hidden size={24} strokeWidth={1.75} />
                  </span>
                  <h3 className={`${cardTitle} mt-4`}>{title}</h3>
                  <p className="mt-2 text-base text-pretty">{text}</p>
                  {detail && <p className={`mt-4 font-semibold wrap-anywhere ${primary ? "text-2xl tabular-nums" : "text-lg"}`}>{detail}</p>}
                  <div className="mt-auto pt-6">
                    <a
                      href={href}
                      className={`flex min-h-[44px] w-full items-center justify-between gap-3 rounded-control border border-foreground px-4 py-2 text-base font-semibold ${primary ? "bg-foreground text-paper hover:opacity-90" : "text-foreground hover:bg-tint"}`}
                    >
                      {action}
                      <ArrowRight aria-hidden size={20} strokeWidth={1.75} className="shrink-0" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-paper p-4 text-base text-foreground">
            <Info aria-hidden size={20} strokeWidth={1.75} className="shrink-0" />
            <span><strong className="font-semibold">Already booked?</strong> Have your booking reference ready when you contact us.</span>
          </p>

          <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-foreground p-6 text-paper [--color-ring:var(--color-primary)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-balance">Prefer to book online?</h3>
              <p className="mt-2 text-base">Choose your journey, add your details and confirm.</p>
            </div>
            <BookOnlineLink arrow size="lg" className="w-full shrink-0 sm:w-auto" />
          </div>
        </div>
      </RevealSection>

      <RevealSection aria-labelledby="send-heading" className={`border-t border-border ${section}`}>
        <div className={`${container} grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]`}>
          <div>
            <p className={`${eyebrow} text-accent`}>BEFORE YOU GET IN TOUCH</p>
            <SectionHeading id="send-heading" className={`${h2} mt-4 text-foreground`}>
              <span className="block">A few details. </span>
              <span className="block">A smoother journey.</span>
            </SectionHeading>
            <p className="mt-4 text-[1.125rem] text-pretty text-foreground">
              Have these ready when you call, email or message us.
            </p>
            <Image
              src={journeyIllustration}
              alt=""
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 30vw, 1px"
              className="mt-8 hidden h-auto w-full lg:block"
            />
          </div>

          <div>
            <ul className="grid gap-3 text-foreground">
              {checklists.map(({ title, note, optional, Icon, items }) => (
                <li key={title} className="grid gap-4 rounded-2xl border border-border bg-alt p-6 sm:grid-cols-2 sm:items-center sm:gap-6">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-tint">
                      <Icon aria-hidden size={24} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className={`${cardTitle} text-balance`}>{title}</h3>
                      {note && <p className="mt-1 text-base">{note}</p>}
                      {optional && (
                        <p className="mt-2 inline-block rounded-lg border border-accent px-2 py-0.5 text-sm font-medium text-accent">
                          If applicable
                        </p>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 text-base sm:border-l sm:border-border sm:pl-6">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check aria-hidden size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-3 rounded-xl bg-primary/15 p-4 text-base text-foreground">
              <Info aria-hidden size={20} strokeWidth={1.75} className="shrink-0 text-accent" />
              <span><strong className="font-semibold">Already booked?</strong> Include your booking reference and tell us what has changed.</span>
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection aria-labelledby="next-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <SectionHeading id="next-heading" className={`${h2} text-foreground`}>
            What happens after you get in touch
          </SectionHeading>
          <p className="mt-3 text-[1.125rem] text-foreground">
            Whether you book online, call or send a WhatsApp message, the steps are the same.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {nextSteps.map((step, i) => (
              <li key={step} className="rounded-2xl border border-border bg-paper p-6 text-foreground">
                <span className="font-display text-[2rem] font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[1.125rem] font-semibold leading-snug">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </RevealSection>

      <RevealSection aria-labelledby="driver-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <SectionHeading id="driver-heading" className={`${h2} text-foreground`}>
            Can’t find your driver?
          </SectionHeading>
          <div className="mt-8 rounded-2xl border border-border bg-alt p-6 text-foreground sm:p-8">
            <p className="max-w-2xl text-[1.125rem] leading-relaxed">
              Stay at the agreed pickup point and call us with your booking name and where you are, so we can guide you.
            </p>
            {tel && (
              <a
                href={tel}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-control border border-foreground px-6 text-[1.0625rem] font-semibold transition-colors hover:bg-tint"
              >
                <Phone aria-hidden size={18} strokeWidth={1.75} />
                Call {site.phone}
              </a>
            )}
          </div>
        </div>
      </RevealSection>

      <RevealSection aria-labelledby="office-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14`}>
          <div>
            <p className={`${eyebrow} text-accent`}>THE TEAM BEHIND YOUR JOURNEY</p>
            <SectionHeading id="office-heading" className={`${h2} mt-4 text-balance text-foreground`}>
              The people who answer your call.
            </SectionHeading>
            <p className="mt-4 max-w-xl text-[1.125rem] leading-relaxed text-foreground">
              Luton Minicab is operated by {site.operator}, a {site.licensingAuthority}-licensed private hire operator (licence {site.operatorLicence}). Our booking team is based in Hounslow, west London.
            </p>
          </div>
          <div className="rounded-2xl border border-foreground bg-paper p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-foreground">
                <MapPin aria-hidden size={26} strokeWidth={1.75} />
              </span>
              <p className="text-sm font-semibold tracking-[0.2em] text-foreground">OUR BOOKING TEAM</p>
            </div>
            <address className="mt-6 not-italic text-foreground">
              <span className="block font-display text-[clamp(1.875rem,3vw,2.5rem)] font-semibold leading-tight">{office.name}</span>
              <span className="mt-3 block text-[1.25rem] leading-relaxed">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <div className="mt-6 border-t border-primary/70 pt-6">
              <a
                href={mapUrl}
                className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-control bg-foreground px-6 text-[1.0625rem] font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                View on Google Maps
                <ArrowUpRight aria-hidden size={20} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </RevealSection>

      <Faq items={faqs} heading="Questions before you contact us" contactLink={false} />
    </main>
  );
}

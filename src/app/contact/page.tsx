import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { BookOnlineLink } from "@/components/BookOnlineLink";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { container, eyebrow, h2, section } from "@/components/ui";
import { site } from "@/config/site";
import { pageMetadata } from "@/config/seo";
import officeIllustration from "../../../public/brand/contact-office.png";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Call, WhatsApp or email Luton Minicab. Our team is available 24/7 to help with new journeys and existing bookings.",
  path: "/contact",
});

// Similar in flow to the owner's reference (heathrowminicab.com/contact), in Luton's own style.
// No form: every way to reach us is a direct link. Confirmed facts only.

// Confirmed booking office in Mill Hill; never label it as a Luton office.
const office = {
  name: "Our booking office",
  lines: ["2 Bittacy Hill", "Mill Hill, London", "NW7 1LB"],
};
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.lines.join(", "))}`;
const tel = site.phone ? `tel:${site.phone.replace(/\s+/g, "")}` : null;

type Way = { title: string; text: string; href: string; Icon: LucideIcon; detail: ReactNode };
// Each way shows only when its value is set in site.ts.
const wayOptions: (Way | false | null | "")[] = [
  tel && {
    title: "Call us",
    text: "For bookings, changes or pickup help.",
    href: tel,
    Icon: Phone,
    detail: <span className="font-semibold underline decoration-1 underline-offset-4">{site.phone}</span>,
  },
  site.whatsapp && {
    title: "Message on WhatsApp",
    text: "Send your pickup, destination and any flight or train details.",
    href: `https://wa.me/${site.whatsapp}`,
    Icon: MessageCircle,
    detail: (
      <span className="inline-flex min-h-[44px] items-center gap-2 rounded-control border border-input px-5 font-semibold">
        <MessageCircle aria-hidden size={18} strokeWidth={1.75} />
        Chat with us
      </span>
    ),
  },
  site.email && {
    title: "Email our team",
    text: "For general enquiries and journey requests.",
    href: `mailto:${site.email}`,
    Icon: Mail,
    detail: <span className="break-all font-semibold underline decoration-1 underline-offset-4">{site.email}</span>,
  },
];
const ways = wayOptions.filter((w): w is Way => !!w);

const steps = ["Choose your journey", "Add your details", "Confirm your booking"];

const checklists = [
  { title: "Journey", items: ["Pickup address", "Destination", "Date and time"] },
  { title: "Flight or train", items: ["Flight or train number", "Terminal or station", "Any changes to your plans"] },
  { title: "Passengers", items: ["Number of passengers", "Large cases and cabin bags", "Child seats or a return journey"] },
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
      <PageHero
        eyebrow="CONTACT LUTON MINICAB"
        heading={
          <>
            <span className="lg:block">Talk to our team, </span>
            <span className="lg:block">day or night.</span>
          </>
        }
        text="Book online in a few minutes, or call or message us and we’ll plan your journey together."
        sideImage={{ image: officeIllustration, alt: "Illustration of a booking office on a quiet street." }}
      />

      <section aria-labelledby="ways-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`${eyebrow} text-accent`}>GET IN TOUCH</p>
              <h2 id="ways-heading" className={`${h2} mt-4 text-foreground`}>
                Ways to reach us
              </h2>
              <p className="mt-3 text-[1.125rem] text-foreground">Book a journey or speak to our team. We’re here 24/7.</p>
            </div>
            <p className="inline-flex items-center gap-2 self-start rounded-full border border-foreground px-4 py-2 text-base font-semibold text-foreground sm:self-auto">
              <span aria-hidden className="size-2.5 rounded-full bg-primary" />
              Available 24/7
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="flex flex-col rounded-2xl bg-foreground p-6 text-background [--color-ring:var(--color-primary)] sm:p-8">
              <h3 className="font-display text-[1.75rem] font-semibold leading-tight">Prefer to book yourself?</h3>
              <p className="mt-2 text-[1.0625rem]">It only takes a few minutes online.</p>
              <ol className="mt-6 divide-y divide-background/20">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-4 py-4 text-[1.0625rem] font-semibold">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background/15">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-auto pt-6">
                <BookOnlineLink arrow size="lg" className="w-full justify-center" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-paper p-4 sm:p-6">
              <ul className="divide-y divide-border">
                {ways.map(({ title, text, href, Icon, detail }) => (
                  <li key={title}>
                    <a href={href} className="group flex min-h-[44px] items-start gap-4 rounded-xl p-3 text-foreground transition-colors hover:bg-tint sm:p-4">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-alt">
                        <Icon aria-hidden size={22} strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block ${cardTitle}`}>{title}</span>
                        <span className="mt-1 block text-base">{text}</span>
                        <span className="mt-2 block text-[1.125rem]">{detail}</span>
                      </span>
                      <ArrowRight aria-hidden size={20} strokeWidth={1.75} className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-3 rounded-xl bg-alt p-4 text-base text-foreground">
                <Info aria-hidden size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                Need help with an existing booking? Have your booking reference ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="send-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>BOOKING DETAILS</p>
          <h2 id="send-heading" className={`${h2} mt-4 text-foreground`}>
            What to send us
          </h2>
          <p className="mt-3 max-w-2xl text-[1.125rem] text-foreground">
            The clearer your details, the quicker we can confirm the right journey, car and pickup.
          </p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {checklists.map(({ title, items }) => (
              <li key={title} className="rounded-2xl border border-border bg-alt p-6 text-foreground">
                <h3 className={cardTitle}>{title}</h3>
                <ul className="mt-4 space-y-3 text-[1.0625rem]">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check aria-hidden size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="next-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <h2 id="next-heading" className={`${h2} text-foreground`}>
            What happens after you get in touch
          </h2>
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
      </section>

      <section aria-labelledby="driver-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <h2 id="driver-heading" className={`${h2} text-foreground`}>
            Can’t find your driver?
          </h2>
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
      </section>

      <section aria-labelledby="office-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14`}>
          <div>
            <p className={`${eyebrow} text-accent`}>THE TEAM BEHIND YOUR JOURNEY</p>
            <h2 id="office-heading" className={`${h2} mt-4 text-balance text-foreground`}>
              The people who answer your call.
            </h2>
            <p className="mt-4 max-w-xl text-[1.125rem] leading-relaxed text-foreground">
              Luton Minicab bookings are handled by our booking team in Mill Hill, north London.
            </p>
          </div>
          <div className="rounded-2xl border border-foreground bg-paper p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-foreground">
                <MapPin aria-hidden size={26} strokeWidth={1.75} />
              </span>
              <p className="text-sm font-semibold tracking-[0.2em] text-foreground">OUR MILL HILL OFFICE</p>
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
      </section>

      <Faq items={faqs} heading="Questions before you contact us" contactLink={false} />
    </main>
  );
}

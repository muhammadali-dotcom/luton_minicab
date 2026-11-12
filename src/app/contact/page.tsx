import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { container, eyebrow, h2, section } from "@/components/ui";
import { site } from "@/config/site";
import illustration from "../../../public/brand/fleet-help.png";
import officeIllustration from "../../../public/brand/contact-office.png";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp, email or send a message to Luton Minicab. We’re available 24/7 to help with new journeys and existing bookings.",
};

// TEMPORARY: the shared Bittacy Cars team and office (owner's choice, November 2026), labelled
// as Mill Hill, never as a Luton office. Replace with Luton Minicab's own details before launch.
const office = {
  name: "Bittacy Cars",
  lines: ["2 Bittacy Hill", "Mill Hill, London", "NW7 1LB"],
};
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.name}, ${office.lines.join(", ")}`)}`;

// "447983527104" -> "+44 7983 527104"
const formatWhatsapp = (n: string) => `+${n.slice(0, 2)} ${n.slice(2, 6)} ${n.slice(6)}`;

const details = [
  site.phone && { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s+/g, "")}`, Icon: Phone },
  site.whatsapp && { label: "WhatsApp", value: formatWhatsapp(site.whatsapp), href: `https://wa.me/${site.whatsapp}`, Icon: MessageCircle },
  site.email && { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "Opening hours", value: "Available 24/7, day or night", href: null, Icon: Clock },
].filter((d) => !!d);

const faqs = [
  {
    q: "How do I get a quote?",
    a: "Book online to see your fixed fare, or call or WhatsApp us with your journey and we’ll give you a quote.",
  },
  { q: "Can I change my booking?", a: "Yes. Get in touch as soon as you can and we’ll help you update your journey. For urgent changes, please call us." },
  {
    q: "How do I arrange a special journey?",
    a: "For a cruise, wedding, pet-friendly or other special journey, message us on WhatsApp or call us with your plans. Tell us the date, the time and anything we should know, and we’ll let you know what we can arrange.",
  },
];

const iconCircle = "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/45 text-foreground";

export default function Page() {
  return (
    <main id="main" className="flex-1">
      {/* Kept short so the contact options appear straight away. */}
      <PageHero
        eyebrow="CONTACT US"
        heading="Get in touch. We’re here to help."
        text="Planning a journey or asking about a booking? Call, WhatsApp or send us a message."
        compact
        buttons={false}
        centered
      />

      <section aria-labelledby="contact-details-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={`${container} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14`}>
          <div>
            <p className={`${eyebrow} text-accent`}>CONTACT DETAILS</p>
            <h2 id="contact-details-heading" className={`${h2} mt-4 text-foreground`}>
              Talk to our team
            </h2>
            <ul className="mt-8 space-y-6">
              {details.map(({ label, value, href, Icon }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className={iconCircle}>
                    <Icon aria-hidden size={22} strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-base text-foreground">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        className="inline-flex min-h-[44px] items-center break-all text-[1.25rem] font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="block text-[1.25rem] font-semibold text-foreground">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <Image src={illustration} alt="" sizes="20rem" className="mt-10 hidden h-auto w-full max-w-xs lg:block" />
          </div>

          <div className="rounded-2xl border border-border bg-paper p-6 sm:p-8">
            <h2 className="font-display text-[1.75rem] font-semibold leading-tight text-foreground">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
            {site.phone && (
              <p className="mt-6 border-t border-border pt-5 text-[1.0625rem] text-foreground">
                For urgent booking changes, please{" "}
                <span className="whitespace-nowrap">
                  <a
                    href={`tel:${site.phone.replace(/\s+/g, "")}`}
                    className="inline-flex min-h-[44px] items-center font-semibold underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                  >
                    call us
                  </a>
                  .
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* From the owner's reference: who handles bookings, with the office illustration and address card. */}
      <section aria-labelledby="office-heading" className={`border-t border-border ${section}`}>
        <div className={`${container} grid gap-10 border-y border-primary/70 py-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-14`}>
          <div>
            <p className={`${eyebrow} text-accent`}>THE TEAM BEHIND YOUR JOURNEY</p>
            <h2 id="office-heading" className={`${h2} mt-4 text-foreground`}>
              <span className="block">Local journeys.</span>
              <span className="block">A team you can reach.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[1.125rem] leading-relaxed text-foreground">
              Luton Minicab bookings are handled by our team at {office.name}, based in Mill Hill, north London.
            </p>
            <Image src={officeIllustration} alt="" sizes="(min-width: 1024px) 40rem, 100vw" className="mt-8 h-auto w-full max-w-2xl" />
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

      <Faq items={faqs} band />
    </main>
  );
}

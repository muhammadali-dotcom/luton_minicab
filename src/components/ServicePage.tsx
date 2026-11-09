import Link from "next/link";
import { ArrowRight, Baby, Clock, PoundSterling, ShieldCheck, Wallet } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { services } from "@/config/site";
import { Faq } from "./Faq";
import { PageHero, trustLocal } from "./PageHero";
import { container, eyebrow, h2, section } from "./ui";

// Confirmed benefits only (requirement.md).
const benefits = [
  { label: "DBS-checked drivers", Icon: ShieldCheck },
  { label: "Fixed fares", Icon: PoundSterling },
  { label: "Available 24/7", Icon: Clock },
  { label: "Child seats on request", Icon: Baby },
  { label: "Cash or online payment link", Icon: Wallet },
];

export function ServicePage({ slug, name, detail }: { slug: string; name: string; detail: ServiceDetail }) {
  const others = [
    ...services.filter((s) => s.slug !== slug).map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
    { label: "Airport Transfers", href: "/airports" },
  ];
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={detail.image}
        alt={detail.alt}
        photoRight
        photoMask="narrow"
        eyebrow={name.toUpperCase()}
        heading={<span className="block text-balance">{detail.hero.heading}</span>}
        text={detail.hero.text}
        trust={trustLocal}
      />

      <section aria-labelledby="for-who-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>WHO IT’S FOR</p>
          <h2 id="for-who-heading" className={`${h2} mt-4 text-foreground`}>
            {detail.forWho.heading}
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {detail.forWho.points.map(({ title, text }) => (
              <li key={title} className="rounded-control border border-border bg-paper p-6">
                <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="how-heading" className={`border-t border-border ${section}`}>
        <div className={`${container} grid gap-12 lg:grid-cols-[7fr_5fr]`}>
          <div>
            <p className={`${eyebrow} text-accent`}>HOW IT WORKS</p>
            <h2 id="how-heading" className={`${h2} mt-4 text-foreground`}>
              Three simple steps.
            </h2>
            <ol className="mt-8 space-y-6">
              {detail.steps.map(({ title, text }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xl font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.1875rem] font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-[1.0625rem] leading-relaxed text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="self-start rounded-control border border-border bg-paper p-6 lg:p-8">
            <h3 className="font-display text-[1.5rem] font-semibold leading-tight text-foreground">Why travel with us</h3>
            <ul className="mt-4 space-y-3">
              {benefits.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-3 text-[1.0625rem] text-foreground">
                  <Icon aria-hidden size={22} strokeWidth={1.5} className="shrink-0 text-accent" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Faq items={detail.faqs} band>
        <nav aria-label="Other services" className="mt-12">
          <p className="font-semibold text-foreground">Other services</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((o) => (
              <li key={o.href}>
                <Link
                  href={o.href}
                  className="group inline-flex min-h-[44px] items-center gap-1.5 text-foreground underline-offset-4 hover:underline hover:decoration-primary"
                >
                  {o.label}
                  <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Faq>
    </main>
  );
}

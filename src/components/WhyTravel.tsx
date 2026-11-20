import Link from "next/link";
import {
  ArrowRight,
  Baby,
  BadgePoundSterling,
  ClockFading,
  Handshake,
  Phone,
  PlaneTakeoff,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";

const reasons = [
  { title: "Clear fares", text: "You’ll know the price before you go.", Icon: BadgePoundSterling },
  { title: "Flight tracking", text: "We watch your flight, so a delay doesn’t leave you stranded.", Icon: PlaneTakeoff },
  { title: "A friendly welcome", text: "Someone waiting for you when you land.", Icon: Handshake },
  { title: "Little ones welcome", text: "Child seats on request, just ask when you book.", Icon: Baby },
  { title: "DBS-checked drivers", text: "Peace of mind for you and your family.", Icon: ShieldCheck },
  { title: "Here, day and night", text: "Open 24/7, for the 4am flight and the midnight train.", Icon: ClockFading },
];

const talkClass =
  "inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export function WhyTravel() {
  return (
    <RevealSection aria-labelledby="why-heading" className="band-alt border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-accent">WHY TRAVEL WITH US?</p>
        <SectionHeading
          id="why-heading"
          className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-balance text-foreground"
        >
          Small things that make a big difference.
        </SectionHeading>
        <p className="mt-4 flex items-center gap-5 text-[1.125rem] text-foreground">
          <span aria-hidden className="h-0.5 w-16 shrink-0 bg-primary" />
          When you&rsquo;re travelling with family or catching a flight, details like these matter.
        </p>

        {/* Gap-px over a border-coloured background draws hairlines between cells only. */}
        <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ title, text, Icon }) => (
            <li key={title} className="flex flex-col items-center bg-background px-6 py-8 text-center">
              <span className="flex size-24 items-center justify-center rounded-full bg-primary/45 text-foreground">
                <Icon aria-hidden size={34} strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-[1.5rem] font-semibold leading-tight text-foreground">{title}</h3>
              <p className="mt-2 max-w-[16rem] text-[1.0625rem] leading-snug text-muted">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-[1.0625rem] text-foreground">
            <Phone aria-hidden size={24} strokeWidth={1.5} className="shrink-0" />
            A real person when you need a hand.
          </p>
          <Link href="/contact" className={talkClass}>
            Talk to our team
            <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}

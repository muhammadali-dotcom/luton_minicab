import { Baby, Clock, PlaneLanding, PoundSterling, ShieldCheck } from "lucide-react";
import { container, h2, section } from "./ui";

const benefits = [
  { label: "DBS-checked drivers", Icon: ShieldCheck },
  { label: "Fixed fares", Icon: PoundSterling },
  { label: "Flight tracking", Icon: PlaneLanding },
  { label: "Available 24/7", Icon: Clock },
  { label: "Child seats on request", Icon: Baby },
];

type Props = { name: string; facts: string[]; note: string; band?: boolean };

// Facts come from each airport's own site. The benefits are the confirmed list in
// requirement.md; genuine reviews can join them here later.
export function AirportDetails({ name, facts, note, band = false }: Props) {
  return (
    <section aria-labelledby="details-heading" className={`border-t border-border ${section} ${band ? "band-alt" : ""}`}>
      <div className={`${container} grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14`}>
        <div>
          <h2 id="details-heading" className={`${h2} text-foreground`}>
            Good to know about {name} Airport
          </h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {facts.map((fact) => (
              <li key={fact} className="py-4 text-[1.0625rem] leading-relaxed text-foreground">
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base text-muted">{note}</p>
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
  );
}

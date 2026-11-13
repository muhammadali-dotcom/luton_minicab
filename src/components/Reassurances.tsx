import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { container, eyebrow, h2, section } from "./ui";

type Item = { title: string; text: string; Icon: LucideIcon; link?: { label: string; href: string } };
type Props = {
  id: string;
  label: string;
  heading: string;
  items: Item[];
  // Optional side card for the page's own point (e.g. School Runs' SEND line).
  card?: { title: string; text: string; Icon: LucideIcon };
  // true puts the section on band-alt, to keep a page alternating (default light).
  band?: boolean;
};

const iconCircle = "flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/45 text-foreground";
const h3 = "font-display text-[1.375rem] font-semibold leading-tight text-foreground";

// Icon reassurances in a grid, with an optional side card.
export function Reassurances({ id, label, heading, items, card, band = false }: Props) {
  return (
    <section aria-labelledby={id} className={`${band ? "band-alt " : ""}border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>{label}</p>
        <h2 id={id} className={`${h2} mt-4 text-foreground`}>
          {heading}
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {items.map(({ title, text, Icon, link }) => (
              <li key={title} className="flex gap-4">
                <span className={iconCircle}>
                  <Icon aria-hidden size={24} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className={h3}>{title}</h3>
                  <p className="mt-1 text-[1.0625rem] text-foreground">{text}</p>
                  {link && (
                    <Link
                      href={link.href}
                      className="group inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2"
                    >
                      {link.label}
                      <ArrowRight aria-hidden size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {card && (
            <aside className={`self-start rounded-2xl border border-border p-6 ${band ? "bg-paper" : "bg-alt"}`}>
              <span className={iconCircle}>
                <card.Icon aria-hidden size={24} strokeWidth={1.5} />
              </span>
              <h3 className={`${h3} mt-4`}>{card.title}</h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{card.text}</p>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

import Image, { type StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";
import { container, eyebrow, h2, section } from "./ui";

type Panel = {
  label: string;
  title: string;
  text: string;
  // The owner's illustration (background matched to band-alt). Until it arrives, a soft
  // panel with `Icon` stands in at the same shape.
  image?: StaticImageData;
  Icon?: LucideIcon;
  // Small decorative picture beside the title (hidden on phones), e.g. School Runs' bag.
  decoration?: StaticImageData;
};

type Props = { id: string; label: string; heading: string; panels: [Panel, Panel]; note?: string };

// Two journeys side by side with a divider from md (School Runs, Corporate Travel, ...).
export function JourneyPanels({ id, label, heading, panels, note }: Props) {
  return (
    <section aria-labelledby={id} className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>{label}</p>
        <h2 id={id} className={`${h2} mt-4 text-foreground`}>
          {heading}
        </h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-0">
          {panels.map(({ label: panelLabel, title, text, image, Icon, decoration }, i) => (
            <article key={title} className={i === 1 ? "md:border-l md:border-border md:pl-8 lg:pl-10" : "md:pr-8 lg:pr-10"}>
              {image ? (
                <Image src={image} alt="" sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
              ) : (
                <div aria-hidden className="flex aspect-[805/493] items-center justify-center rounded-2xl bg-paper">
                  <span className="flex size-36 items-center justify-center rounded-full bg-primary/35 text-foreground">
                    {Icon && <Icon size={72} strokeWidth={1.25} />}
                  </span>
                </div>
              )}
              <p className={`${eyebrow} mt-6 text-accent`}>{panelLabel}</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="font-display text-[clamp(1.875rem,3vw,2.5rem)] font-semibold leading-tight text-foreground">
                  {title}
                </h3>
                {decoration && <Image src={decoration} alt="" sizes="120px" className="hidden h-auto w-[7.5rem] shrink-0 sm:block" />}
              </div>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
            </article>
          ))}
        </div>
        {note && <p className="mt-10 text-center text-[1.125rem] text-foreground">{note}</p>}
      </div>
    </section>
  );
}

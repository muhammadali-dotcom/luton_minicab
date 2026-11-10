import type { LucideIcon } from "lucide-react";
import { BookOnlineLink } from "./BookOnlineLink";
import { ContactButtons } from "./LocalAreaCards";
import { container, eyebrow, h2, section } from "./ui";

type Props = {
  heading: string;
  text?: string;
  // Four details to have ready, shown 2 x 2 with rules between the rows.
  details: { title: string; text: string; Icon: LucideIcon }[];
  prompt?: string;
  note?: string;
};

// Band-alt "How to book": what to have ready, then Book Online, Call and WhatsApp.
export function BookingDetails({
  heading,
  text = "Have these details ready, and we’ll help you arrange the journey.",
  details,
  prompt = "Ready to arrange the journey?",
  note = "We’ll confirm the journey details and fare with you.",
}: Props) {
  return (
    <section aria-labelledby="book-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>HOW TO BOOK</p>
        <h2 id="book-heading" className={`${h2} mt-4 text-foreground`}>
          {heading}
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">{text}</p>
        <ul className="mt-8 grid md:grid-cols-2 md:gap-x-12">
          {details.map(({ title, text: line, Icon }, i) => (
            <li key={title} className={`flex gap-6 border-b border-primary/50 py-7 ${i >= 2 ? "md:border-b-0" : ""} ${i === 3 ? "border-b-0" : ""}`}>
              {/* Line icon over a soft gold circle, set up and to the left. */}
              <span aria-hidden className="relative flex size-16 shrink-0 items-center justify-center">
                <span className="absolute top-0 left-0 size-11 rounded-full bg-primary/35" />
                <Icon size={44} strokeWidth={1.5} className="relative text-foreground" />
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-semibold leading-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-[1.0625rem] leading-relaxed text-foreground">{line}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-col gap-5 border-t border-primary/50 pt-8 lg:flex-row lg:items-start lg:justify-between">
          <p className="text-[1.25rem] text-foreground lg:mt-2">{prompt}</p>
          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookOnlineLink arrow />
              <ContactButtons outline />
            </div>
            <p className="mt-3 text-base text-foreground">{note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

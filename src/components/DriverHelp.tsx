import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/config/site";

const buttonClass =
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-control px-6 text-base font-semibold transition-colors";

type Props = { text: string; heading?: string; headingId?: string; level?: "h2" | "h3"; divider?: boolean };

// Shared by the airport pages (below the meeting details) and Local Journeys.
export function DriverHelp({ text, heading = "Can’t find your driver?", headingId, level = "h3", divider = true }: Props) {
  const Heading = level;
  return (
    <div
      className={`flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between ${divider ? "mt-10 border-t border-primary/60 pt-8" : ""}`}
    >
      <div>
        <Heading id={headingId} className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight text-foreground">
          {heading}
        </Heading>
        <p className="mt-1 text-[1.0625rem] text-foreground">{text}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
        {site.phone && (
          <a
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            className={`${buttonClass} bg-primary text-primary-foreground hover:bg-primary-hover`}
          >
            <Phone aria-hidden size={16} strokeWidth={1.75} />
            Call us
          </a>
        )}
        {site.whatsapp && (
          <a
            href={`https://wa.me/${site.whatsapp}`}
            className={`${buttonClass} border border-input text-foreground hover:border-foreground hover:bg-tint`}
          >
            <MessageCircle aria-hidden size={16} strokeWidth={1.75} />
            WhatsApp us
          </a>
        )}
      </div>
    </div>
  );
}

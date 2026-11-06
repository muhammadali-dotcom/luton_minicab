import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/config/site";

const buttonClass =
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-control px-6 text-base font-semibold transition-colors";

// Shared by the airport pages, below the meeting details.
export function DriverHelp({ text }: { text: string }) {
  return (
    <div className="mt-10 flex flex-col gap-5 border-t border-primary/60 pt-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h3 className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight text-foreground">
          Can’t find your driver?
        </h3>
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

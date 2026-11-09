import Image from "next/image";
import { Luggage, MessageCircle, MessageCircleMore, Phone, Users } from "lucide-react";
import { site } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";
import illustration from "../../public/brand/fleet-help.png";

const tips = [
  { title: "Your passengers", text: "Count everyone travelling with you.", Icon: Users },
  { title: "Your luggage", text: "Include suitcases, hand luggage and bulky items.", Icon: Luggage },
  { title: "We’ll help you choose", text: "Call or WhatsApp us to talk through your journey.", Icon: MessageCircleMore },
];

const buttonClass =
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-control px-6 text-base font-semibold transition-colors";

// The illustration is a transparent cut-out from the owner's reference
// (assets/brand/fleet-help-reference.png).
export function FleetSteps() {
  return (
    <section id="not-sure" aria-labelledby="fleet-steps-heading" className={`scroll-mt-20 border-t border-border ${section}`}>
      <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
        <Image
          src={illustration}
          alt="Illustration: a car with its boot open, beside suitcases, a bag and a folded pushchair."
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="mx-auto h-auto w-full max-w-xl"
        />
        <div>
          <p className={`${eyebrow} text-accent`}>A LITTLE HELP CHOOSING</p>
          <h2 id="fleet-steps-heading" className={`${h2} mt-4 text-foreground`}>
            Not sure which car?
          </h2>
          <p className="mt-3 text-[1.125rem] text-foreground">Tell us who’s coming and what you’re bringing.</p>
          <ul className="mt-6 divide-y divide-primary/60">
            {tips.map(({ title, text, Icon }) => (
              <li key={title} className="flex items-center gap-5 py-4">
                <Icon aria-hidden size={40} strokeWidth={1.25} className="shrink-0 text-foreground" />
                <div>
                  <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
                  <p className="mt-1 text-[1.0625rem] text-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {site.phone && (
              <a
                href={`tel:${site.phone.replace(/\s+/g, "")}`}
                className={`${buttonClass} bg-primary text-primary-foreground hover:bg-primary-hover sm:flex-1`}
              >
                <Phone aria-hidden size={18} strokeWidth={1.75} />
                Call us
              </a>
            )}
            {site.whatsapp && (
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className={`${buttonClass} border border-foreground text-foreground hover:bg-tint sm:flex-1`}
              >
                <MessageCircle aria-hidden size={18} strokeWidth={1.75} />
                WhatsApp us
              </a>
            )}
          </div>
          <p className="mt-4 text-[1.0625rem] text-foreground">You can also compare vehicle limits when booking online.</p>
        </div>
      </div>
    </section>
  );
}

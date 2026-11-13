import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { areaPlaces, areas, site } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";

// The six local areas, with their location lines from `areaPlaces` in site.ts.
const localSlugs = ["luton", "leagrave", "stopsley", "dunstable", "houghton-regis", "harpenden"];
const localAreas = areas.filter((a) => localSlugs.includes(a.slug));
const places = areaPlaces;

const buttonClass =
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-control px-6 text-base font-semibold transition-colors";

// Call and WhatsApp buttons (each only once its number is set). "outline" makes both
// outlined, for rows that already have a gold Book Online button.
export function ContactButtons({ outline = false }: { outline?: boolean }) {
  const outlined = `${buttonClass} border border-input text-foreground hover:border-foreground hover:bg-tint`;
  return (
    <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
      {site.phone && (
        <a
          href={`tel:${site.phone.replace(/\s+/g, "")}`}
          className={outline ? outlined : `${buttonClass} bg-primary text-primary-foreground hover:bg-primary-hover`}
        >
          <Phone aria-hidden size={16} strokeWidth={1.75} />
          Call us
        </a>
      )}
      {site.whatsapp && (
        <a href={`https://wa.me/${site.whatsapp}`} className={outlined}>
          <MessageCircle aria-hidden size={16} strokeWidth={1.75} />
          WhatsApp us
        </a>
      )}
    </div>
  );
}

// `band` puts the section on band-alt, to keep a page alternating (default light).
type Props = { eyebrow?: string; heading?: string; text?: string; helpText?: string; band?: boolean; exclude?: string };

// The six local areas as cards with a help row (Local Journeys and School Runs).
// Luton Airport keeps AirportLocalAreas.
export function LocalAreaCards({
  eyebrow: label = "AROUND LUTON",
  heading = "Local areas we cover.",
  text = "Luton neighbourhoods and the towns nearby.",
  helpText = "Don’t see your area? Extra bags or a return trip? Just ask.",
  band = false,
  // Leaves out one area (an area page doesn't list itself).
  exclude,
}: Props) {
  return (
    <section aria-labelledby="local-areas-heading" className={`${band ? "band-alt " : ""}border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>{label}</p>
        <h2 id="local-areas-heading" className={`${h2} mt-4 text-foreground`}>
          {heading}
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">{text}</p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {localAreas.filter((a) => a.slug !== exclude).map(({ slug, name }) => (
            <li key={slug}>
              <Link
                href={`/areas/${slug}`}
                className={`group flex h-full min-h-[44px] items-center gap-4 rounded-2xl border border-border p-5 text-foreground transition-colors hover:border-foreground ${band ? "bg-paper" : "bg-alt"}`}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/45">
                  <MapPin aria-hidden size={22} strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <h3 className="font-display text-[1.375rem] font-semibold leading-tight">{name}</h3>
                  <span className="mt-1 block text-base">{places[slug]}</span>
                </span>
                <ArrowRight
                  aria-hidden
                  size={20}
                  strokeWidth={1.75}
                  className="ml-auto shrink-0 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* One help row (merged from the old help strip), then straight into the booking banner. */}
        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <p className="text-[1.125rem] text-foreground">{helpText}</p>
            <ContactButtons />
          </div>
          <Link
            href="/areas"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2 lg:self-auto"
          >
            View All Areas
            <ArrowRight aria-hidden size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

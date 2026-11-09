import { CalendarCheck, Heart, Moon, ShoppingBag } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { AirportLocalAreas } from "./AirportLocalAreas";
import { DriverHelp } from "./DriverHelp";
import { PageHero, trustLocal } from "./PageHero";
import { container, eyebrow, h2, section } from "./ui";
import heroPhoto from "../../public/brand/services/local-journeys-hero.png";

const everyday = [
  { title: "Shopping & errands", text: "Get there and back with your bags, without the bus.", Icon: ShoppingBag },
  { title: "Appointments", text: "Arrive on time for the doctor, the dentist or the bank.", Icon: CalendarCheck },
  { title: "Visiting family & friends", text: "See the people you love, then get home easily.", Icon: Heart },
  { title: "Evenings out", text: "Dinner, the cinema or a night with friends, and a ride home after.", Icon: Moon },
];

// Covers only the text column on the photo's plain cream wall, so the street and car stay bright.
const heroFade = "from-background/70 via-background/45 via-40% to-transparent to-55%";

// The owner's own structure for this service, shorter than the shared ServicePage.
export function LocalJourneysPage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <PageHero
        tone="light"
        image={heroPhoto}
        alt="A dark estate car parked on a sunny high street, beside a cream wall, shopfronts and hanging flowers."
        fade={heroFade}
        photoFrom="content"
        eyebrow={name.toUpperCase()}
        heading={<span className="block text-balance">{detail.hero.heading}</span>}
        text={detail.hero.text}
        trust={trustLocal}
      />

      <section aria-labelledby="everyday-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>EVERYDAY JOURNEYS</p>
          <h2 id="everyday-heading" className={`${h2} mt-4 text-foreground`}>
            For the trips that fill your day.
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {everyday.map(({ title, text, Icon }) => (
              <li key={title}>
                <span className="flex size-16 items-center justify-center rounded-full bg-primary/45 text-foreground">
                  <Icon aria-hidden size={28} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AirportLocalAreas
        eyebrow="AROUND LUTON"
        heading="Local areas we cover."
        text="Luton neighbourhoods and the towns nearby."
        band={false}
      />

      <section aria-labelledby="help-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <DriverHelp
            heading="Need help with your journey?"
            headingId="help-heading"
            level="h2"
            divider={false}
            text="Travelling with extra bags or need a return pickup? Tell us what you need."
          />
        </div>
      </section>
    </main>
  );
}

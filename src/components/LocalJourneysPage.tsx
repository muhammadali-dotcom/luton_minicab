import Image from "next/image";
import type { ServiceDetail } from "@/config/serviceDetails";
import { LocalAreaCards } from "./LocalAreaCards";
import { LutonPlaces } from "./LutonPlaces";
import { PageHero, trustLocal } from "./PageHero";
import { container, eyebrow, h2, section } from "./ui";
import heroPhoto from "../../public/brand/services/local-journeys-hero.png";
import everydayStreet from "../../public/brand/local-journeys-everyday.png";

const everyday = [
  { title: "Shopping & errands", text: ["Room for your bags.", "A ride there and back."] },
  { title: "Appointments", text: ["One less thing to plan", "for your appointment."] },
  { title: "Family & friends", text: ["More time with the", "people you love."] },
  { title: "Evenings out", text: ["Enjoy your evening.", "Plan your ride home."] },
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
          {/* The owner's street illustration; its background is matched to the band-alt cream. */}
          <Image
            src={everydayStreet}
            alt=""
            sizes="(min-width: 1280px) 1120px, 100vw"
            className="-mx-4 mt-10 w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full"
          />
          {/* Four columns, each centred under its gold dot on the road (dots at about 14%, 38%, 61% and 86%). */}
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 text-center md:grid-cols-[26fr_23.5fr_24fr_26.5fr] md:gap-x-0">
            {everyday.map(({ title, text }) => (
              <li key={title} className="md:px-2">
                <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{title}</h3>
                <p className="mx-auto mt-2 text-[1.0625rem] leading-relaxed text-foreground">
                  {/* Two lines on wider screens, as in the owner's reference. */}
                  {text.map((line, i) => (
                    <span key={line} className="md:block">
                      {i > 0 && " "}
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LocalAreaCards />

      <LutonPlaces />
    </main>
  );
}

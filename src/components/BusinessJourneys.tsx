import Image from "next/image";
import { CalendarDays } from "lucide-react";
import meetings from "../../public/brand/corporate-meetings.png";
import events from "../../public/brand/corporate-events.png";
import guests from "../../public/brand/corporate-guests.png";
import { container, eyebrow, h2, section } from "./ui";

// From the owner's reference (assets/brand/corporate-journeys-reference.png): three scenes
// cropped from it, with the cars' grille emblems and bonnet ornaments retouched out and the
// open background matched to band-alt. Journeys are booked one at a time (no accounts).
const journeys = [
  {
    title: "Meetings & office visits",
    text: "Travel from home, your office or a hotel to your next appointment.",
    image: meetings,
    alt: "Illustration of a car outside a glass office entrance.",
  },
  {
    title: "Conferences & events",
    text: "Plan your ride to the venue and arrange the journey back.",
    image: events,
    alt: "Illustration of a car outside a grand event venue.",
  },
  {
    title: "Client & guest travel",
    text: "Arrange a pickup for visitors travelling to your office or hotel.",
    image: guests,
    alt: "Illustration of a car and suitcases outside a hotel entrance.",
  },
];

export function BusinessJourneys() {
  return (
    <section aria-labelledby="business-journeys-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>BUSINESS JOURNEYS</p>
        <h2 id="business-journeys-heading" className={`${h2} mt-4 text-balance text-foreground`}>
          For wherever work takes you.
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">
          Meetings, office visits or welcoming a client. Arrange the journey that fits your day.
        </p>
        <ul className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-10">
          {journeys.map(({ title, text, image, alt }) => (
            <li key={title}>
              <Image src={image} alt={alt} sizes="(min-width: 768px) 30vw, 100vw" className="h-auto w-full" />
              <span aria-hidden className="mt-6 block h-0.5 w-16 bg-primary" />
              <h3 className="mt-5 text-balance font-display text-[clamp(1.5rem,2.2vw,1.875rem)] font-semibold leading-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 flex items-center gap-4 border-t border-primary pt-6 text-[1.0625rem] text-foreground">
          <CalendarDays aria-hidden size={28} strokeWidth={1.5} className="shrink-0" />
          Book each journey in advance. Share your pickup time and destination when booking.
        </p>
      </div>
    </section>
  );
}

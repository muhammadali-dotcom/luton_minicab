import Image from "next/image";
import { Baby, Clock, HeartHandshake, PoundSterling, ShieldCheck, Wallet } from "lucide-react";
import type { ServiceDetail } from "@/config/serviceDetails";
import { BookOnlineLink } from "./BookOnlineLink";
import { ContactButtons, LocalAreaCards } from "./LocalAreaCards";
import { ServiceHero } from "./ServiceHero";
import { container, eyebrow, h2, section } from "./ui";
import bag from "../../public/brand/school-day-bag.png";
import home from "../../public/brand/school-day-home.png";
import morning from "../../public/brand/school-day-morning.png";

// Confirmed facts only: no school names, contracts, regular plans, escorts, wheelchair access,
// medical care or prices. Each school journey is booked on its own.
// The owner's two illustrations (badges on the cars retouched out), background matched to band-alt.
const journeys = [
  {
    label: "THE MORNING JOURNEY",
    title: "Off to school",
    text: "Arrange a pickup from home for the journey to school.",
    image: morning,
  },
  {
    label: "THE JOURNEY HOME",
    title: "Heading home",
    text: "Book the return journey for the end of the school day.",
    image: home,
  },
];

const reassurances = [
  { title: "DBS-checked drivers", text: "Every driver is DBS-checked.", Icon: ShieldCheck },
  { title: "Child seats on request", text: "Just ask when you book.", Icon: Baby },
  { title: "Fixed fares", text: "You’ll know your fare when you book.", Icon: PoundSterling },
  { title: "Book any time", text: "We’re available 24/7.", Icon: Clock },
  { title: "Easy to pay", text: "Cash, or online through a payment link.", Icon: Wallet },
];

const iconCircle = "flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/45 text-foreground";
const h3 = "font-display text-[1.375rem] font-semibold leading-tight text-foreground";

export function SchoolRunsPage({ name, detail }: { name: string; detail: ServiceDetail }) {
  return (
    <main id="main" className="flex-1">
      <ServiceHero name={name} detail={detail} />

      <section aria-labelledby="school-day-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>THE SCHOOL DAY</p>
          <h2 id="school-day-heading" className={`${h2} mt-4 text-foreground`}>
            To school and home again.
          </h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-0">
            {journeys.map(({ label, title, text, image }, i) => (
              <article key={title} className={i === 1 ? "md:border-l md:border-border md:pl-8 lg:pl-10" : "md:pr-8 lg:pr-10"}>
                <Image src={image} alt="" sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
                <p className={`${eyebrow} mt-6 text-accent`}>{label}</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <h3 className="font-display text-[clamp(1.875rem,3vw,2.5rem)] font-semibold leading-tight text-foreground">
                    {title}
                  </h3>
                  {i === 1 && <Image src={bag} alt="" sizes="120px" className="hidden h-auto w-[7.5rem] shrink-0 sm:block" />}
                </div>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-[1.125rem] text-foreground">Arrange each journey in advance.</p>
        </div>
      </section>

      <section aria-labelledby="peace-heading" className={`border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>PEACE OF MIND</p>
          <h2 id="peace-heading" className={`${h2} mt-4 text-foreground`}>
            The little things parents ask about.
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {reassurances.map(({ title, text, Icon }) => (
                <li key={title} className="flex gap-4">
                  <span className={iconCircle}>
                    <Icon aria-hidden size={24} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className={h3}>{title}</h3>
                    <p className="mt-1 text-[1.0625rem] text-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            {/* SEND: the owner's approved wording only. */}
            <aside className="self-start rounded-2xl border border-border bg-alt p-6">
              <span className={iconCircle}>
                <HeartHandshake aria-hidden size={24} strokeWidth={1.5} />
              </span>
              <h3 className={`${h3} mt-4`}>A little extra support</h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">
                For passengers who need a little extra support. Tell us about any needs when you book.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section aria-labelledby="book-heading" className={`band-alt border-t border-border ${section}`}>
        <div className={container}>
          <p className={`${eyebrow} text-accent`}>HOW TO BOOK</p>
          <h2 id="book-heading" className={`${h2} mt-4 text-foreground`}>
            Three simple steps.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {detail.steps.map(({ title, text }, i) => (
              <li key={title} className="flex gap-4 md:flex-col">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary font-display text-2xl font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className={h3}>{title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-5 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[1.125rem] font-semibold text-foreground">Ready to book a school run?</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookOnlineLink arrow />
              <ContactButtons outline />
            </div>
          </div>
        </div>
      </section>

      <LocalAreaCards
        eyebrow="WHERE WE PICK UP"
        heading="School runs across Luton."
        text="From homes in Luton and the towns nearby."
        helpText="Don’t see your area? Have a question about a school run? Just ask."
      />
    </main>
  );
}

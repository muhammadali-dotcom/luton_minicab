import type { ReactNode } from "react";
import Image from "next/image";
import type { AirportDetail } from "@/config/airportDetails";
import { container, eyebrow, h2, section } from "./ui";
import bags from "../../public/brand/luton-step-bags.png";
import driver from "../../public/brand/luton-step-driver.png";
import phone from "../../public/brand/luton-step-phone.png";

// `lead` is the space before each circle. On the first step it stays empty; on the
// others it continues the gold line from the step before.
const icons = [
  { image: bags, lead: "lg:w-[4.5rem]" },
  { image: phone, lead: "lg:w-[6.5rem]" },
  { image: driver, lead: "lg:w-[5.5rem]" },
];

// The icons are cut out of the owner's reference, with transparent backgrounds, so
// this section works on either cream. The rings are drawn here because the ones in
// the reference aren't quite round.
type Props = AirportDetail["meetDriver"] & { children?: ReactNode };

export function AirportMeetDriver({ heading, subline, steps, children }: Props) {
  return (
    <section aria-labelledby="meet-driver-heading" className={`band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>MEETING YOUR DRIVER</p>
        <h2 id="meet-driver-heading" className={`${h2} mt-4 text-foreground`}>
          {heading}
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">{subline}</p>

        <ol className="mt-10 grid gap-8 lg:grid-cols-[34fr_39fr_27fr] lg:gap-0">
          {steps.map(({ title, text }, i) => (
            <li key={title} className="flex items-start gap-4 lg:block">
              <div className="flex shrink-0 items-center">
                <span aria-hidden className={`hidden h-[3px] lg:block ${icons[i].lead} ${i > 0 ? "bg-primary" : ""}`} />
                <span className="relative flex items-start gap-3 lg:block">
                  <span className="w-9 font-sans text-[1.75rem] font-bold leading-none text-accent lg:absolute lg:right-full lg:top-1 lg:mr-1 lg:w-auto">
                    0{i + 1}
                  </span>
                  <span className="flex size-20 items-center justify-center rounded-full border-2 border-foreground sm:size-24 lg:size-[9.5rem]">
                    <Image src={icons[i].image} alt="" sizes="(min-width: 1024px) 7.5rem, 5.5rem" className="size-[89%]" />
                  </span>
                </span>
                {i < steps.length - 1 && <span aria-hidden className="hidden h-[3px] flex-1 bg-primary lg:block" />}
              </div>
              <div className="min-w-0 lg:mt-6 lg:pr-6">
                <h3 className="text-[1.375rem] font-bold leading-tight text-foreground">{title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
        {children}
      </div>
    </section>
  );
}

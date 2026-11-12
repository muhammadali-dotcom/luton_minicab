"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { serviceDetails } from "@/config/serviceDetails";
import { services } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";

// The five main services as a numbered list. On desktop one photo beside the list shows the
// service being pointed at or focused; on smaller screens each row has its own small photo.
// Airport Transfers has its own banner on /services.
const rows = services.map(({ slug, name }) => {
  const detail = serviceDetails[slug];
  return { name, href: `/services/${slug}`, image: detail.heroPhoto?.image ?? detail.image, text: detail.cardText };
});

export function ServiceCards() {
  const [active, setActive] = useState(0);
  return (
    <section id="services-list" aria-labelledby="services-list-heading" className={`scroll-mt-20 band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>OUR MAIN SERVICES</p>
        <h2 id="services-list-heading" className={`${h2} mt-4 text-foreground`}>
          Choose your journey
        </h2>
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,28rem)] xl:grid-cols-[1fr_minmax(0,34rem)] xl:gap-16">
          <ol className="border-t border-primary/50">
            {rows.map(({ name, href, image, text }, i) => (
              <li key={href} className="border-b border-primary/50">
                <Link
                  href={href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center gap-4 py-5 text-foreground sm:gap-6 sm:py-6"
                >
                  {/* Below lg each row carries its own photo. */}
                  <span className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24 lg:hidden">
                    <Image src={image} alt="" fill sizes="96px" className="object-cover object-right" />
                  </span>
                  <span className={`${eyebrow} hidden w-8 shrink-0 text-accent sm:block`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight transition-colors ${
                        active === i ? "lg:text-foreground" : "lg:text-foreground/70"
                      }`}
                    >
                      {name}
                    </span>
                    <span className="mt-1 block text-[1.0625rem] leading-relaxed">{text}</span>
                  </span>
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      active === i ? "lg:border-primary lg:bg-primary" : "border-border"
                    } border-border group-hover:border-primary group-hover:bg-primary`}
                  >
                    <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-0.5" />
                    <span className="sr-only">View {name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          {/* Desktop: one photo that follows the service in view; all stay loaded so the switch is instant. */}
          <div aria-hidden className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            {rows.map(({ href, image }, i) => (
              <Image
                key={href}
                src={image}
                alt=""
                fill
                sizes="(min-width: 1280px) 34rem, 28rem"
                className={`object-cover object-right transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

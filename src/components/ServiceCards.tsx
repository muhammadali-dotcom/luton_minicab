import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceDetails } from "@/config/serviceDetails";
import { services } from "@/config/site";
import { container, eyebrow, h2, section } from "./ui";

// The five main services; Airport Transfers has its own banner on /services.
const cards = [
  ...services.map(({ slug, name }) => ({
    name,
    href: `/services/${slug}`,
    image: serviceDetails[slug].image,
    alt: serviceDetails[slug].alt,
    text: serviceDetails[slug].cardText,
  })),
];

export function ServiceCards() {
  return (
    <section id="services-list" aria-labelledby="services-list-heading" className={`scroll-mt-20 band-alt border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>OUR MAIN SERVICES</p>
        <h2 id="services-list-heading" className={`${h2} mt-4 text-foreground`}>
          Choose your journey
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ name, href, image, alt, text }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-control border border-border bg-paper transition-colors hover:border-foreground"
              >
                <span className="relative block aspect-[3/2]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-1 flex-col px-5 py-5">
                  <span className="font-display text-[1.5rem] font-semibold leading-tight text-foreground">{name}</span>
                  <span className="mt-2 text-[1.0625rem] leading-relaxed text-foreground">{text}</span>
                  <span className="mt-auto inline-flex min-h-[44px] items-center gap-2 pt-3 font-semibold text-foreground">
                    View {name}
                    <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

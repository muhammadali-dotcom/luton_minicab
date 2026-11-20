import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { areas } from "@/config/site";
import illustration from "../../public/brand/areas-illustration.png";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealSection } from "@/components/ui/reveal-section";


const askClass =
  "inline-flex min-h-[44px] items-center text-[1.0625rem] text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export function Areas() {
  return (
    <RevealSection aria-labelledby="areas-heading" className="band-alt border-t border-border py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-14 lg:px-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-accent">AREAS WE COVER</p>
          <SectionHeading
            id="areas-heading"
            className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Close to home, wherever that is.
          </SectionHeading>
          <p className="mt-4 max-w-md text-[1.125rem] leading-snug text-foreground">
            From your front door to your next stop, we cover Luton and nearby towns, plus Mill Hill, Hounslow and Heathrow.
          </p>

          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {areas.map(({ slug, name }) => (
              <li key={slug} className="border-b border-border">
                <Link href={`/areas/${slug}`} className="group flex min-h-[44px] items-center gap-3 text-[1.0625rem] font-medium text-foreground">
                  <MapPin aria-hidden size={20} strokeWidth={1.5} className="shrink-0" />
                  {name}
                  <ArrowRight
                    aria-hidden
                    size={18}
                    strokeWidth={1.75}
                    className="ml-auto shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/areas"
            className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-control bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            View All Areas
            <ArrowRight aria-hidden size={18} />
          </Link>
          <p className="mt-3">
            <Link href="/contact" className={askClass}>
              Not sure we cover your pickup? Ask us.
            </Link>
          </p>
        </div>

        <figure>
          <Image
            src={illustration}
            alt="Illustration: terraced houses, a railway station and a car on a winding road, with map pins across the neighbourhood."
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="mt-2 text-center font-display text-[1.25rem] italic text-foreground">
            Around the corner. A little further. We&rsquo;re here.
          </figcaption>
        </figure>
      </div>
    </RevealSection>
  );
}

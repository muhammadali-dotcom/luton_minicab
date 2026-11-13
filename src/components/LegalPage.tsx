import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { legalUpdated, type LegalSection } from "@/config/legal";
import { site } from "@/config/site";
import { PageHero } from "./PageHero";
import { container, section } from "./ui";

const linkClass =
  "inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-foreground underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

// Privacy, Terms and Cookies: a plain centred hero, then one band-alt reading column with an
// "On this page" list, numbered sections and a contact line. Content lives in config/legal.ts.
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <main id="main" className="flex-1">
      <PageHero eyebrow="LEGAL" heading={title} text={intro} compact centered buttons={false} />

      <section aria-label={title} className={`band-alt border-t border-border ${section}`}>
        <div className={`${container} max-w-3xl! text-foreground`}>
          <p className="text-base">Last updated: {legalUpdated}</p>

          <nav aria-labelledby="contents-heading" className="mt-6 rounded-2xl border border-border bg-paper p-6">
            <h2 id="contents-heading" className="text-sm font-semibold tracking-[0.2em] text-accent">
              ON THIS PAGE
            </h2>
            <ol className="mt-3 grid gap-x-8 sm:grid-cols-2">
              {sections.map(({ id, heading }, i) => (
                <li key={id}>
                  <a href={`#${id}`} className="flex min-h-[44px] items-center gap-2 underline-offset-4 hover:underline hover:decoration-primary">
                    <span className="w-6 shrink-0 text-accent">{i + 1}.</span>
                    {heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map(({ id, heading, paragraphs, bullets, after, links }, i) => (
            <div key={id} id={id} className="scroll-mt-28 border-b border-primary/50 py-8 last:border-b-0">
              <h2 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] font-semibold leading-tight">
                <span className="mr-2 text-accent">{i + 1}.</span>
                {heading}
              </h2>
              {paragraphs?.map((p) => (
                <p key={p} className="mt-3 text-[1.0625rem] leading-relaxed">
                  {p}
                </p>
              ))}
              {bullets && (
                <ul className="mt-3 space-y-2 text-[1.0625rem] leading-relaxed">
                  {bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {after?.map((p) => (
                <p key={p} className="mt-3 text-[1.0625rem] leading-relaxed">
                  {p}
                </p>
              ))}
              {links?.map(({ label, href }) => (
                <a key={href} href={href} rel="noopener" className={`${linkClass} mt-2`}>
                  {label}
                  <ArrowUpRight aria-hidden size={16} />
                </a>
              ))}
            </div>
          ))}

          <p className="mt-4 text-[1.125rem]">
            Questions?{" "}
            <Link href="/contact" className={linkClass}>
              Contact us
            </Link>
            {site.phone && (
              <>
                {" "}or{" "}
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className={linkClass}>
                  call {site.phone}
                </a>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}

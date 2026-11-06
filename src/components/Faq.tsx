import type { ReactNode } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { site } from "@/config/site";

// Answers stick to confirmed facts; the change-booking answer adds no policy terms.
const homepageFaqs = [
  {
    q: "How do I book?",
    a: "Book online or call us. We’ll help you arrange your journey.",
  },
  {
    q: "Which airports do you cover?",
    a: "Transfers to and from all UK airports, including Luton, Heathrow, Gatwick, Stansted, London City and Southend, with flight tracking and meet and greet.",
  },
  {
    q: "How can I pay?",
    a: "In cash, or online through a payment link.",
  },
  {
    q: "Can I change my booking?",
    a: "Yes. Get in touch as soon as you can and we’ll help you update your journey.",
  },
  {
    q: "Can I ask for a child seat?",
    a: "Yes, child seats are available on request. Just mention it when you book.",
  },
  {
    q: "Can I book at any time?",
    a: "Yes. We’re available 24/7, day or night.",
  },
];

type Props = {
  // Questions to show; the homepage six by default.
  items?: { q: string; a: string }[];
  // Deeper-cream background, for pages where the section above is plain cream.
  band?: boolean;
  // Extra content below the FAQ, inside the same section.
  children?: ReactNode;
};

const contactClass = "inline-flex min-h-[44px] items-center underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export function Faq({ items = homepageFaqs, band = false, children }: Props) {
  return (
    <section id="faqs" aria-labelledby="faq-heading" className={`scroll-mt-24 border-t border-border py-16 sm:py-20 ${band ? "band-alt" : ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-accent">FAQS</p>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Got a question?
          </h2>
          <p className="mt-2 text-[1.125rem] text-foreground">Here are a few helpful answers.</p>

          <div className="mt-8">
            {items.map(({ q, a }, i) => (
              <details key={q} open={i === 0} className="group border-b border-border">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.25rem] text-foreground [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus aria-hidden size={22} strokeWidth={1.5} className="shrink-0 group-open:hidden" />
                  <Minus aria-hidden size={22} strokeWidth={1.5} className="hidden shrink-0 group-open:block" />
                </summary>
                <p className="max-w-2xl pb-6 text-[1.0625rem] leading-relaxed text-foreground">{a}</p>
              </details>
            ))}
          </div>

          <p className="mt-8 text-[1.125rem] text-foreground">
            Need more help?{" "}
            {site.phone ? (
              <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className={contactClass}>
                Contact us
              </a>
            ) : (
              <Link href="/contact" className={contactClass}>
                Contact us
              </Link>
            )}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";

// Answers stick to confirmed facts; the change-booking answer adds no policy terms.
const homepageFaqs = [
  {
    q: "How do I book?",
    a: "Book online or call us. We’ll help you arrange your journey.",
  },
  {
    q: "Which airports do you cover?",
    a: "Transfers to and from all UK airports, including Luton, Heathrow, Gatwick, Stansted, London City and London Southend, with flight tracking and meet and greet.",
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
  // Overrides the heading and line (area pages name the place, which helps local search).
  heading?: string;
  text?: string;
  // false hides the closing "Need more help? Contact us" line (the Contact page itself).
  contactLink?: boolean;
  // Outputs FAQPage structured data for these questions (one Faq per page, so one FAQPage).
  schema?: boolean;
};

const contactClass = "inline-flex min-h-[44px] items-center underline decoration-1 underline-offset-4 hover:decoration-primary hover:decoration-2";

export function Faq({ items = homepageFaqs, band = false, children, heading = "Got a question?", text = "Here are the answers people ask us most.", contactLink = true, schema = true }: Props) {
  return (
    <section id="faqs" aria-labelledby="faq-heading" className={`scroll-mt-24 border-t border-border bg-alt py-16 sm:py-20 ${band ? "band-alt" : ""}`}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
            }),
          }}
        />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-accent">FAQS</p>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            {heading}
          </h2>
          <p className="mt-2 text-[1.125rem] text-foreground">{text}</p>

          <div className="mt-8 space-y-3">
            {items.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-border bg-paper shadow-xs open:border-primary">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-3 text-lg font-semibold text-foreground hover:bg-primary/10 group-open:rounded-b-none sm:gap-6 sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 text-pretty">{q}</span>
                  <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/40 group-open:bg-primary">
                    <Plus size={20} strokeWidth={1.75} className="group-open:hidden" />
                    <Minus size={20} strokeWidth={1.75} className="hidden group-open:block" />
                  </span>
                </summary>
                <p className="max-w-3xl px-4 pb-6 text-base leading-relaxed text-foreground sm:px-6">{a}</p>
              </details>
            ))}
          </div>

          {contactLink && (
            <p className="mt-8 text-[1.125rem] text-foreground">
              Need more help?{" "}
              <Link href="/contact" className={contactClass}>
                Contact us
              </Link>
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

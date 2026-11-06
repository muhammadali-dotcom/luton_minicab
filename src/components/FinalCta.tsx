import { BookOnlineLink } from "./BookOnlineLink";
import { CallToBook } from "./CallToBook";

// Closing booking banner. Rendered once in the root layout, so it appears on every page.
export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-foreground py-10 [--color-ring:var(--color-primary)] sm:py-12"
    >
      {/* Decorative route lines in the corners. */}
      <svg
        aria-hidden
        viewBox="0 0 220 320"
        fill="none"
        className="pointer-events-none absolute left-0 top-6 hidden h-40 w-28 md:block"
      >
        <path d="M0 10 C 90 40, 130 110, 120 190 C 112 250, 150 280, 205 288" stroke="var(--color-paper)" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="205" cy="288" r="7" fill="var(--color-primary)" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 220 320"
        fill="none"
        className="pointer-events-none absolute bottom-0 right-0 hidden h-44 w-28 md:block"
      >
        <path d="M200 24 C 150 40, 120 90, 110 160 C 100 230, 60 280, 0 320" stroke="var(--color-paper)" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="200" cy="24" r="7" fill="var(--color-primary)" />
      </svg>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-10">
        <svg aria-hidden viewBox="0 0 120 24" fill="none" className="h-4 w-20">
          <path d="M14 16 Q 60 0 106 16" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="17" r="5" fill="var(--color-primary)" />
          <circle cx="108" cy="17" r="5" fill="var(--color-primary)" />
        </svg>
        <p className="mt-3 text-sm font-medium tracking-[0.3em] text-paper">WHEREVER LIFE TAKES YOU</p>
        <h2
          id="cta-heading"
          className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-paper"
        >
          <span className="block">You make the plans.</span>
          <span className="block">We&rsquo;ll take you there.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-[1.0625rem] leading-snug text-paper">
          A trip across town or a journey further afield. Book your ride with us.
        </p>
        <div className="mt-6 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-start">
          <BookOnlineLink arrow />
          <CallToBook onDark />
        </div>
      </div>
    </section>
  );
}

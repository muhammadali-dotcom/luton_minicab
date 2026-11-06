"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { AirportDetail } from "@/config/airportDetails";
import { DriverHelp } from "./DriverHelp";
import { container, eyebrow, h2, section } from "./ui";

type Guide = NonNullable<AirportDetail["guide"]>;

type Item = Guide["items"][number];

// Heathrow's terminals are numbered; Gatwick's are named.
const itemId = ({ number, label }: Item) => (number ?? label ?? "").toLowerCase();
const itemName = ({ number, label }: Item) => (number ? `Terminal ${number}` : `${label} Terminal`);

function GuidePanel({ item }: { item: Item }) {
  return (
    <>
      <h3 className={`${eyebrow} text-primary`}>{itemName(item).toUpperCase()}</h3>
      <p className="mt-5 text-[1.0625rem] text-background">Head for</p>
      <p className="mt-1 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-tight text-background">
        {item.headFor}
      </p>
      <p className="mt-6 border-t border-background/25 pt-5 text-[1.0625rem] font-semibold text-primary">Good to know</p>
      <p className="mt-1 max-w-2xl text-[1.0625rem] leading-relaxed text-background">{item.goodToKnow}</p>
    </>
  );
}

// A green arrivals board with a tab per terminal. Every panel stays in the page so
// search engines can read it.
export function AirportGuide({ guide }: { guide: Guide }) {
  const { eyebrow: label, heading, subline, note, calloutTitle, calloutText, items } = guide;
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    const target =
      event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : step && (active + step + items.length) % items.length;
    if (target === undefined) return;
    event.preventDefault();
    setActive(target);
    tabs.current[target]?.focus();
  }

  return (
    <section aria-labelledby="guide-heading" className={`border-t border-border ${section}`}>
      <div className={container}>
        <p className={`${eyebrow} text-accent`}>{label}</p>
        <h2 id="guide-heading" className={`${h2} mt-4 text-foreground`}>
          {heading}
        </h2>
        <p className="mt-3 text-[1.125rem] text-foreground">{subline}</p>

        {/* Green panel, so the focus ring switches to gold. */}
        <div className="mt-8 rounded-control bg-foreground p-5 [--color-ring:var(--color-primary)] sm:p-8 lg:grid lg:grid-cols-[auto_1fr] lg:gap-12 lg:p-10">
          <div role="tablist" aria-label="Choose your terminal" onKeyDown={onKeyDown} className={`grid gap-2 lg:w-24 lg:grid-cols-1 lg:self-center ${items.length === 2 ? "grid-cols-2" : "grid-cols-4"}`}>
            {items.map((item, i) => (
              <button
                key={itemId(item)}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`terminal-tab-${itemId(item)}`}
                aria-label={itemName(item)}
                aria-selected={active === i}
                aria-controls={`terminal-panel-${itemId(item)}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`flex min-h-16 items-center justify-center rounded-control border border-primary font-display font-semibold transition-colors ${
                  item.number ? "text-[2rem]" : "text-[1.25rem]"
                } ${
                  active === i ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/15"
                }`}
              >
                {item.number ?? item.label}
              </button>
            ))}
          </div>

          {items.map((item, i) => (
            <div
              key={itemId(item)}
              role="tabpanel"
              id={`terminal-panel-${itemId(item)}`}
              aria-labelledby={`terminal-tab-${itemId(item)}`}
              tabIndex={0}
              hidden={active !== i}
              className="mt-6 text-background lg:mt-0 lg:self-center"
            >
              <GuidePanel item={item} />
            </div>
          ))}
        </div>

        <p className="mt-4 text-base text-muted">{note}</p>

        <div className="mt-8 rounded-control border-l-4 border-primary bg-alt px-5 py-4">
          <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{calloutTitle}</h3>
          <p className="mt-1 text-[1.0625rem] leading-relaxed text-foreground">{calloutText}</p>
        </div>

        <DriverHelp text="Call or WhatsApp us with your booking name, terminal and where you are." />
      </div>
    </section>
  );
}

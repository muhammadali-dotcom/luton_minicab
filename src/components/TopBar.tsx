import { Phone } from "lucide-react";
import { site } from "@/config/site";

const tel = (n: string) => `tel:${n.replace(/\s+/g, "")}`;

// Forest-green bar above the header (owner's change, November 2026): the two booking lines,
// centred. It scrolls away; the header below stays sticky.
export function TopBar() {
  const lines = [
    site.phone && { label: "Bookings", number: site.phone },
    site.phoneAlt && { label: "Alternative", number: site.phoneAlt },
  ].filter((l): l is { label: string; number: string } => !!l);
  if (!lines.length) return null;
  return (
    // A labelled region, so screen-reader users can find the phone numbers (axe "region").
    <aside aria-label="Phone bookings" className="bg-foreground text-background [--color-ring:var(--color-primary)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-0.5 px-4 py-2 text-sm sm:px-6 sm:text-[0.9375rem] lg:px-10">
        <span>Call us to book</span>
        {lines.map(({ label, number }) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <Phone aria-hidden size={14} strokeWidth={2} className="text-primary" />
            {label}
            {/* Padding gives a 44px tap area; the negative margin keeps the bar slim. */}
            <a
              href={tel(number)}
              aria-label={`Call ${label.toLowerCase()} on ${number}`}
              className="-my-4 inline-block py-4 font-semibold underline-offset-4 hover:underline"
            >
              {number}
            </a>
          </span>
        ))}
      </div>
    </aside>
  );
}

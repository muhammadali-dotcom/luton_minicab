import { CarFront, GraduationCap, Plane } from "lucide-react";

const items = [
  { label: "Local journeys", Icon: CarFront },
  { label: "School runs", Icon: GraduationCap },
  { label: "Airport transfers", Icon: Plane },
];

export function ServiceStrip() {
  return (
    <section aria-label="What we do" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <ul className="grid divide-y divide-border sm:grid-cols-3 sm:divide-y-0">
        {items.map(({ label, Icon }, i) => (
          <li
            key={label}
            className={`relative flex items-center gap-4 py-6 sm:justify-center sm:px-4 sm:py-8 ${
              i > 0 ? "sm:before:absolute sm:before:top-1/2 sm:before:left-0 sm:before:h-14 sm:before:-translate-y-1/2 sm:before:border-l sm:before:border-foreground/40" : ""
            }`}
          >
            <Icon aria-hidden size={26} strokeWidth={1.25} className="shrink-0 text-foreground" />
            <span className="text-[clamp(1.125rem,1.6vw,1.375rem)] font-semibold tracking-[-0.01em] text-foreground">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

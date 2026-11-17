import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routeDetails";

// Internal links to the route pages and Luton guides, so visitors and search engines find them.
export function PopularRoutes({ className = "" }: { className?: string }) {
  const links = [
    ...routes.map((r) => ({ label: `${r.name} taxi`, href: `/routes/${r.slug}` })),
    { label: "Luton Airport guide", href: "/luton-airport-guide" },
    { label: "Luton station transfers", href: "/luton-station-transfers" },
  ];
  return (
    <nav aria-labelledby="popular-routes-heading" className={className}>
      <h3 id="popular-routes-heading" className="font-display text-[1.375rem] font-semibold text-foreground">
        Popular routes from Luton
      </h3>
      <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex min-h-[44px] items-center justify-between gap-3 border-b border-primary/50 text-[1.0625rem] text-foreground"
            >
              {label}
              <ArrowRight aria-hidden size={18} strokeWidth={1.75} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

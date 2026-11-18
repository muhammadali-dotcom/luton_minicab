import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { BookOnlineLink } from "@/components/BookOnlineLink";
import { container, h1, h2, lead } from "@/components/ui";
import type { pickupAreas } from "@/config/site";

export function PickupAreaPage({ area }: { area: (typeof pickupAreas)[number] }) {
  return (
    <main id="main" className="flex-1">
      <div className={`${container} py-12 sm:py-16`}>
        <Link
          href={`/areas#${area.groupId}`}
          className="inline-flex min-h-11 items-center gap-2 font-medium underline decoration-primary underline-offset-4 hover:decoration-foreground"
        >
          <ArrowLeft aria-hidden size={18} />
          {area.groupHeading}
        </Link>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <section aria-labelledby="pickup-heading">
            <h1 id="pickup-heading" className={`${h1} text-balance`}>Minicabs in {area.name}</h1>
            <p className={`${lead} mt-4 max-w-xl text-pretty`}>
              Book a pickup in {area.name} for a local trip, a station or hotel transfer, or a ride to the airport.
            </p>
            <BookOnlineLink className="mt-6" label="Book online" arrow />
          </section>
          <section aria-labelledby="journey-heading" className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <MapPin aria-hidden size={24} className="text-accent" />
            <h2 id="journey-heading" className={`${h2} mt-4 text-balance`}>Plan your pickup</h2>
            <p className={`${lead} mt-4 text-pretty`}>{area.journey}</p>
            <p className="mt-4 text-base text-pretty">
              Have your pickup address, destination and travel date ready when you book.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

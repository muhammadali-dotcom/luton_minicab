import Image from "next/image";
import type { AirportDetail } from "@/config/airportDetails";
import { DriverHelp } from "./DriverHelp";

// Sits inside AirportMeetDriver, for airports without a terminal board. The
// illustration has a transparent background, so it works on either cream.
export function AirportArrival({ arrival }: { arrival: NonNullable<AirportDetail["arrival"]> }) {
  const { calloutTitle, calloutText, goodToKnow, note, image, alt } = arrival;
  return (
    <>
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="rounded-control border-l-4 border-primary bg-paper px-5 py-4">
            <h3 className="font-display text-[1.375rem] font-semibold leading-tight text-foreground">{calloutTitle}</h3>
            <p className="mt-1 text-[1.0625rem] leading-relaxed text-foreground">{calloutText}</p>
          </div>
          {goodToKnow && (
            <div className="mt-6">
              <h3 className="text-[1.1875rem] font-semibold text-foreground">Good to know</h3>
              <p className="mt-1 text-[1.0625rem] leading-relaxed text-foreground">{goodToKnow}</p>
              <p className="mt-3 text-base text-muted">{note}</p>
            </div>
          )}
        </div>
        <Image src={image} alt={alt} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
      </div>
      <DriverHelp text="Call or WhatsApp us with your booking name and where you are." />
    </>
  );
}

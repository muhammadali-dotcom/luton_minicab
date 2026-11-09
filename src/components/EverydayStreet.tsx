"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import car from "../../public/brand/local-journeys-car.png";
import road from "../../public/brand/local-journeys-everyday-road.png";

// The owner's street illustration with the car cut out, so it can drive the road once
// the strip comes into view (see .everyday-car in globals.css). Decorative: the four
// titles below carry the meaning.
export function EverydayStreet() {
  const ref = useRef<HTMLDivElement>(null);
  const [drive, setDrive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-drive={drive || undefined}
      className="relative -mx-4 mt-10 w-[calc(100%+2rem)] overflow-hidden sm:mx-0 sm:w-full"
    >
      <Image src={road} alt="" sizes="(min-width: 1280px) 1120px, 100vw" className="h-auto w-full" />
      <Image src={car} alt="" sizes="(min-width: 1280px) 150px, 13vw" className="everyday-car h-auto" />
    </div>
  );
}

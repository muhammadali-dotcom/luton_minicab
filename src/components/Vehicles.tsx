"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Luggage, Pause, Play, UserRound } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { fleet } from "@/config/site";
import { BookOnlineLink } from "./BookOnlineLink";

const vehicles = fleet;
const wrap = (index: number) => (index + vehicles.length) % vehicles.length;
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const serverMotion = () => true;
const serverVisible = () => false;
const getMotion = () => window.matchMedia(motionQuery).matches;
const getVisible = () => document.visibilityState === "visible";

export function Vehicles() {
  const [active, setActive] = useState(0);
  const [rotation, setRotation] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [interaction, setInteraction] = useState(0);
  const section = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, serverMotion);
  const visible = useSyncExternalStore(subscribeVisibility, getVisible, serverVisible);
  const autoplay = rotation ?? !reducedMotion;
  const running = autoplay && !hovered && inView && visible;
  const vehicle = vehicles[active];

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setActive((index) => wrap(index + 1)), 5000);
    return () => window.clearInterval(timer);
  }, [running, interaction]);

  function select(index: number) {
    setActive(wrap(index));
    setInteraction((value) => value + 1);
  }

  return (
    <section
      ref={section}
      aria-labelledby="vehicles-heading"
      aria-roledescription="carousel"
      className="fleet-carousel overflow-hidden border-t border-border py-16 text-center sm:py-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget) && event.target.matches(":focus-visible")) setRotation(false);
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-accent">OUR FLEET</p>
        <h2 id="vehicles-heading" className="mt-4 font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
          Room for you. Space for your plans.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          From everyday trips to days out together, find your kind of ride.
        </p>
      </div>

      <div
        className="fleet-stage relative mx-auto mt-8 max-w-[110rem] touch-pan-y"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        onTouchEnd={(event) => {
          const start = touchStart.current;
          touchStart.current = null;
          if (!start) return;
          const touch = event.changedTouches[0];
          const dx = touch.clientX - start.x;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(touch.clientY - start.y)) select(active + (dx < 0 ? 1 : -1));
        }}
      >
        {vehicles.map((item, index) => {
          const position = index === active ? "active" : index === wrap(active - 1) ? "previous" : index === wrap(active + 1) ? "next" : "hidden";
          return (
            <div key={item.name} className={`fleet-car fleet-car--${position}`} aria-hidden={index !== active}>
              <Image src={`/brand/${item.image}`} alt={`${item.name} example vehicle`} fill sizes="(max-width: 767px) 90vw, 54vw" className="object-contain" />
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-x-4 bottom-0 flex justify-between md:inset-x-[19%] md:bottom-auto md:top-1/2 md:-translate-y-1/2">
          <button type="button" aria-label="Previous vehicle" onClick={() => select(active - 1)} className="fleet-arrow pointer-events-auto"><ChevronLeft aria-hidden size={25} /></button>
          <button type="button" aria-label="Next vehicle" onClick={() => select(active + 1)} className="fleet-arrow pointer-events-auto"><ChevronRight aria-hidden size={25} /></button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div aria-live={autoplay ? "off" : "polite"} aria-atomic="true" className="mt-5" role="group" aria-roledescription="slide" aria-label={`${active + 1} of ${vehicles.length}`}>
          <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight">{vehicle.name}</h3>
          <p className="mt-2 min-h-[44px] text-lg leading-relaxed text-muted sm:min-h-7">{vehicle.text}</p>
        </div>
        <p className="mt-3 flex items-center justify-center gap-3 text-sm text-muted sm:text-base">
          <span className="flex shrink-0 gap-2"><UserRound aria-hidden size={23} /><Luggage aria-hidden size={23} /></span>
          Passenger &amp; luggage details at booking
        </p>
        <BookOnlineLink arrow className="mt-6 min-w-52" />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3" role="group" aria-label="Carousel controls">
          <div className="flex">
            {vehicles.map((item, index) => (
              <button key={item.name} type="button" aria-label={`Show ${item.name}`} aria-pressed={active === index} onClick={() => select(index)} className="flex min-h-[44px] min-w-[44px] items-center justify-center">
                <span className={`h-2.5 w-2.5 rounded-full border-2 ${active === index ? "border-foreground bg-foreground" : "border-muted/50"}`} />
              </button>
            ))}
          </div>
          <span className="border-l border-border pl-4 text-sm tabular-nums">{String(active + 1).padStart(2, "0")} / 06</span>
          <button type="button" onClick={() => setRotation(!autoplay)} aria-label={autoplay ? "Pause automatic rotation" : "Start automatic rotation"} className="inline-flex min-h-[44px] items-center gap-2 px-3 text-sm text-muted">
            {autoplay ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
            {autoplay ? "Pause" : "Play"}
          </button>
        </div>
        <p className="mt-2 text-sm italic text-muted">Vehicle shown is an example. Model may vary.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-2" role="group" aria-label="Choose a vehicle category">
          {vehicles.map((item, index) => (
            <button key={item.name} type="button" onClick={() => select(index)} aria-pressed={active === index} className={`min-h-[44px] px-2 text-base underline-offset-4 ${active === index ? "underline decoration-primary decoration-2" : "text-muted hover:text-foreground"}`}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

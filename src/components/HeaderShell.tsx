"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > 8;
const isScrolledOnServer = () => false;

// Header blends into the page at the top and gains a surface once scrolled.
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, isScrolled, isScrolledOnServer);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-50 border-b border-transparent transition-colors data-[scrolled]:border-border data-[scrolled]:bg-surface"
    >
      {children}
    </header>
  );
}

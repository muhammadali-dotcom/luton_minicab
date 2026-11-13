"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Every new page opens at the top (owner's rule). Back and forward keep the position the
// browser restores, and links to a section (#...) still land on that section.
export function ScrollToTop() {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Hides shared layout content (e.g. the booking banner) on the listed pages only.
export function HideOnPaths({ paths, children }: { paths: string[]; children: ReactNode }) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : children;
}

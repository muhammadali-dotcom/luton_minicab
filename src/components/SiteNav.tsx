"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { isNavGroup, site, type NavGroup } from "@/config/site";
import { BookOnlineLink } from "./BookOnlineLink";

const inSection = (pathname: string, group: NavGroup) =>
  pathname === group.overview.href || pathname.startsWith(`${group.overview.href}/`);

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  // The open dropdown is tied to the page it was opened on, so navigating closes it.
  const [dropdown, setDropdown] = useState<{ id: string; at: string } | null>(null);
  const openDropdown = dropdown?.at === pathname ? dropdown.id : null;
  const toggleRef = useRef<HTMLButtonElement>(null);
  const desktopRef = useRef<HTMLElement>(null);
  const groupButtons = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!openDropdown) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdown(null);
        groupButtons.current[openDropdown!]?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!desktopRef.current?.contains(event.target as Node)) setDropdown(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openDropdown]);

  const topLinkClass =
    "inline-flex min-h-[44px] items-center text-[0.95rem] leading-none text-muted transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-primary aria-[current=page]:underline-offset-8";

  return (
    <>
      <nav ref={desktopRef} aria-label="Main" className="hidden items-center gap-8 lg:flex">
        <ul className="flex items-center gap-7">
          {site.nav.map((item) => {
            if (!isNavGroup(item)) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={topLinkClass}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isOpen = openDropdown === item.id;
            const active = inSection(pathname, item);
            return (
              <li key={item.id} className="relative">
                <button
                  ref={(el) => {
                    groupButtons.current[item.id] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`menu-${item.id}`}
                  onClick={() => setDropdown(isOpen ? null : { id: item.id, at: pathname })}
                  className={`inline-flex min-h-[44px] items-center gap-1 text-[0.95rem] leading-none transition-colors hover:text-foreground ${
                    active ? "text-foreground underline decoration-primary underline-offset-8" : "text-muted"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    size={16}
                    strokeWidth={1.75}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={`menu-${item.id}`}
                  hidden={!isOpen}
                  className="absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 rounded-control border border-border bg-background p-2"
                >
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={pathname === child.href ? "page" : undefined}
                          onClick={() => setDropdown(null)}
                          className="block rounded-control px-3 py-2.5 text-[0.95rem] text-foreground transition-colors hover:bg-tint aria-[current=page]:bg-tint aria-[current=page]:font-semibold"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={item.overview.href}
                    aria-current={pathname === item.overview.href ? "page" : undefined}
                    onClick={() => setDropdown(null)}
                    className="mt-1 block border-t border-border px-3 pb-1.5 pt-3 text-sm font-semibold text-foreground hover:underline hover:decoration-primary hover:underline-offset-4"
                  >
                    {item.overview.label} →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        <BookOnlineLink className="min-h-[44px] px-5" />
      </nav>

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-[44px] items-center justify-center text-foreground lg:hidden"
      >
        {open ? <X aria-hidden size={24} /> : <Menu aria-hidden size={24} />}
      </button>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-border bg-surface px-4 pb-8 pt-2 sm:px-6 lg:hidden"
      >
        <ul className="divide-y divide-border">
          {site.nav.map((item) => {
            if (!isNavGroup(item)) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="-mx-3 flex min-h-14 items-center rounded-control px-3 text-lg text-foreground aria-[current=page]:bg-tint aria-[current=page]:font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            const isExpanded = expanded === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`mobile-${item.id}`}
                  onClick={() => setExpanded(isExpanded ? null : item.id)}
                  className="-mx-3 flex min-h-14 w-[calc(100%+1.5rem)] items-center justify-between rounded-control px-3 text-lg text-foreground"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    size={20}
                    strokeWidth={1.75}
                    className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
                <ul id={`mobile-${item.id}`} hidden={!isExpanded} className="pb-3 pl-3">
                  {[...item.children, item.overview].map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        aria-current={pathname === child.href ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="-mx-3 flex min-h-[44px] items-center rounded-control px-3 text-base text-muted aria-[current=page]:bg-tint aria-[current=page]:font-semibold aria-[current=page]:text-foreground"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <BookOnlineLink className="mt-6 w-full" />
      </nav>
    </>
  );
}

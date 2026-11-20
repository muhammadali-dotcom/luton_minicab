"use client";

// One element that fades up 16px each time it scrolls into view, from above or below (owner's
// choice, 20 November 2026). It renders the very same tag with the same props as the element it
// replaces (no extra wrapper box), so layouts don't change. Used by RevealSection (reveal-section.tsx),
// which decides what animates; never put an image inside one.
import Link from "next/link";
import { MotionConfig, motion, useInView } from "motion/react";
import { useRef, useState, type FocusEvent, type ReactNode } from "react";

const MotionLink = motion.create(Link);

type Props = {
  tag: string;
  delay?: number;
  // How far it rises (px): 16 for blocks, 24 for whole photo cards.
  distance?: number;
  elProps: Record<string, unknown> & { className?: string };
  children?: ReactNode;
};

export function RevealHost({ tag, delay = 0, distance = 16, elProps, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: false });
  // Keyboard users: a block shows at once when something inside it gets focus, so a focused
  // link or button is never invisible while the block is still waiting to fade in.
  const [focused, setFocused] = useState(false);
  const visible = inView || focused;
  const ownFocus = elProps.onFocus as ((e: FocusEvent<HTMLElement>) => void) | undefined;
  const ownBlur = elProps.onBlur as ((e: FocusEvent<HTMLElement>) => void) | undefined;

  const Tag = (tag === "Link" ? MotionLink : (motion as unknown as Record<string, typeof motion.div>)[tag] ?? motion.div) as typeof motion.div;
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        {...(elProps as object)}
        ref={ref as React.Ref<HTMLDivElement>}
        className={`js-text-effect ${elProps.className ?? ""}`.trim()}
        initial={{ opacity: 0, y: distance }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
        onFocus={(e: FocusEvent<HTMLElement>) => {
          setFocused(true);
          ownFocus?.(e);
        }}
        onBlur={(e: FocusEvent<HTMLElement>) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          ownBlur?.(e);
        }}
        transition={focused ? { duration: 0.15 } : { duration: 0.5, ease: "easeOut", delay: visible ? delay : 0 }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}

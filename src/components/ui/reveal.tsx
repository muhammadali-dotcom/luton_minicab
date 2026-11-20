"use client";

// One element that fades up 16px each time it scrolls into view, from above or below (owner's
// choice, 20 November 2026). It renders the very same tag with the same props as the element it
// replaces (no extra wrapper box), so layouts don't change. Used by RevealSection (reveal-section.tsx),
// which decides what animates; never put an image inside one.
import Link from "next/link";
import { MotionConfig, motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

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
  const visible = useInView(ref, { amount: 0.15, once: false });

  const Tag = (tag === "Link" ? MotionLink : (motion as unknown as Record<string, typeof motion.div>)[tag] ?? motion.div) as typeof motion.div;
  return (
    <MotionConfig reducedMotion="user">
      <Tag
        {...(elProps as object)}
        ref={ref as React.Ref<HTMLDivElement>}
        className={`js-text-effect ${elProps.className ?? ""}`.trim()}
        initial={{ opacity: 0, y: distance }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
        transition={{ duration: 0.5, ease: "easeOut", delay: visible ? delay : 0 }}
      >
        {children}
      </Tag>
    </MotionConfig>
  );
}

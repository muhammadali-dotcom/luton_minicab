"use client";

// A block that fades up each time it scrolls into view, from above or below (used for the
// hero line under the h1, after its words). Same rules as TextEffect's inView mode: always
// rendered, reduced motion respected, and the `js-text-effect` marker so the <noscript> style
// shows it without JavaScript.
import { cn } from "@/lib/utils";
import { MotionConfig, motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

export function FadeInView({
  children,
  className,
  delay = 0,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const visible = useInView(ref, { amount, once: false });
  return (
    <MotionConfig reducedMotion="user">
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: visible ? delay : 0 }}
        className={cn("js-text-effect", className)}
      >
        {children}
      </motion.p>
    </MotionConfig>
  );
}

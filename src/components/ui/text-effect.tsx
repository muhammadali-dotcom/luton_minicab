"use client";

// TextEffect from motion-primitives, adapted for this site (19 November 2026):
// - imports from `motion/react` (the current name of framer-motion);
// - `inView` mode: the text stays rendered and replays each time it scrolls into view, from
//   above or below, so its space is always kept and the page never jumps;
// - extra HTML attributes (id, ...) pass through, so aria-labelledby keeps working;
// - reduced-motion settings are respected (MotionConfig reducedMotion="user").
import { cn } from "@/lib/utils";
import { AnimatePresence, MotionConfig, motion, useInView, type TargetAndTransition, type Variants } from "motion/react";
import React, { useRef } from "react";

type PresetType = "blur" | "shake" | "scale" | "fade" | "slide";

type TextEffectProps = {
  // Plain text, or JSX already split into TextEffectWord spans (set `presplit` and `label`).
  children: React.ReactNode;
  presplit?: boolean;
  // Screen-reader text for presplit children.
  label?: string;
  per?: "word" | "char" | "line";
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  // Replays whenever the text scrolls into view (both directions); ignores `trigger`.
  inView?: boolean;
  // Share of the text that must be on screen to play (inView mode).
  amount?: number;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
  id?: string;
};

const defaultStaggerTimes: Record<"char" | "word" | "line", number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
      exit: { x: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: "line" | "word" | "char";
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === "line" ? (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    ) : per === "word" ? (
      <motion.span aria-hidden="true" variants={variants} className="inline-block whitespace-pre">
        {segment}
      </motion.span>
    ) : (
      <motion.span className="inline-block whitespace-pre">
        {segment.split("").map((char, charIndex) => (
          <motion.span key={`char-${charIndex}`} aria-hidden="true" variants={variants} className="inline-block whitespace-pre">
            {char}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === "line" ? "block" : "inline-block";

  return <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>{content}</span>;
});

AnimationComponent.displayName = "AnimationComponent";

// One word for headings split ahead of time by `splitWords` (split-words.tsx). Splitting happens
// where the heading's JSX is written: JSX passed from a server component arrives here as opaque
// placeholders on the client but as real elements during the server render, so splitting here
// would make the two differ (a hydration mismatch).
export function TextEffectWord({ children, variants }: { children: string; variants: Variants }) {
  return (
    <motion.span aria-hidden="true" variants={variants} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  );
}

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset,
  delay = 0,
  trigger = true,
  inView = false,
  amount = 0.6,
  presplit = false,
  label,
  onAnimationComplete,
  segmentWrapperClassName,
  id,
}: TextEffectProps) {
  const ref = useRef<HTMLElement>(null);
  // Replays every time `amount` of the text is on screen, and resets when it leaves.
  const visible = useInView(ref, { amount, once: false });

  const text = typeof children === "string" ? children : "";
  let segments: string[];

  if (per === "line") {
    segments = text.split("\n");
  } else if (per === "word") {
    // Words only: spaces stay as plain text between them, so line breaking (text-balance) is unchanged.
    segments = text.split(/(\s+)/);
  } else {
    segments = text.split("");
  }

  const MotionTag = motion[as] as typeof motion.div;
  const selectedVariants = preset ? presetVariants[preset] : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;
  const ariaLabel = per === "line" ? undefined : (label ?? text).replace(/\s+/g, " ").trim();

  const stagger = defaultStaggerTimes[per];

  const delayedContainerVariants: Variants = {
    hidden: containerVariants.hidden,
    visible: {
      ...containerVariants.visible,
      transition: {
        ...(containerVariants.visible as TargetAndTransition)?.transition,
        staggerChildren: (containerVariants.visible as TargetAndTransition)?.transition?.staggerChildren || stagger,
        delayChildren: delay,
      },
    },
    exit: containerVariants.exit,
  };

  const renderSegments = (source: string, keyPrefix: string) =>
    (per === "word" ? source.split(/(\s+)/) : segments).map((segment, index) =>
      per === "word" && /^\s*$/.test(segment) ? (
        segment
      ) : (
        <AnimationComponent
          key={`${keyPrefix}-${per}-${index}-${segment}`}
          segment={segment}
          variants={itemVariants}
          per={per}
          segmentWrapperClassName={segmentWrapperClassName}
        />
      ),
    );

  // Presplit JSX keeps every element and its classes; motion variants reach the nested word spans
  // through context, so the stagger runs across all lines in order.
  const segmentNodes = presplit ? children : renderSegments(text, "t");

  if (inView) {
    return (
      <MotionConfig reducedMotion="user">
        <MotionTag
          ref={ref as React.Ref<HTMLDivElement>}
          id={id}
          initial="hidden"
          animate={visible ? "visible" : "hidden"}
          aria-label={ariaLabel}
          variants={delayedContainerVariants}
          className={cn("js-text-effect", className)}
          onAnimationComplete={onAnimationComplete}
        >
          {segmentNodes}
        </MotionTag>
      </MotionConfig>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          id={id}
          initial="hidden"
          animate="visible"
          exit="exit"
          aria-label={ariaLabel}
          variants={delayedContainerVariants}
          className={cn("whitespace-pre-wrap", className)}
          onAnimationComplete={onAnimationComplete}
        >
          {segmentNodes}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}

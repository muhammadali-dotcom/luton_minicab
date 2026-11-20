import type { ReactNode } from "react";
import type { Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { TextEffect } from "./ui/text-effect";
import { plainText, splitWords } from "./ui/split-words";

// Headings with the text effect (owner's choice, 19 November 2026): words slide up one by one
// each time the heading scrolls into view, from above or below. Plain text or JSX lines (spans
// keep their classes). `as="h1"` is used by the page heroes, with a lower `amount` so the
// heading replays when you scroll back to the top. Every heading is balanced, so no line is
// left with one word. The words are split here, where the JSX is
// written, so the server render and the browser match (see split-words.tsx).
const slideWord: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function SectionHeading({
  id,
  className,
  children,
  as = "h2",
  amount,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  as?: "h1" | "h2";
  amount?: number;
}) {
  return (
    <TextEffect as={as} per="word" inView amount={amount} id={id} className={cn("text-balance", className)} presplit label={plainText(children)}>
      {splitWords(children, slideWord)}
    </TextEffect>
  );
}

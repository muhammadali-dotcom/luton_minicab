import { cloneElement, Fragment, isValidElement, type ReactNode } from "react";
import type { Variants } from "motion/react";
import { TextEffectWord } from "./text-effect";

// Splits a heading's text into TextEffectWord spans, keeping every element (line spans,
// sr-only, width classes) as it is. No "use client": it runs wherever the heading's JSX is
// written (server or client), so the server render and the browser get the same tree.

// The text a screen reader should hear. Lines written as separate spans are joined with a
// space, then spaces before punctuation are removed ("Luton Minicab: Wherever ...").
export function plainText(node: ReactNode): string {
  return collect(node).replace(/\s+/g, " ").replace(/\s+([:;,.?!])/g, "$1").trim();
}

function collect(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collect).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return ` ${collect(node.props.children)} `;
  return "";
}

export function splitWords(node: ReactNode, variants: Variants, key = "w"): ReactNode {
  if (node === null || node === undefined || typeof node === "boolean") return node;
  if (typeof node === "string" || typeof node === "number") {
    // Spaces stay as plain text between words, so line breaking (text-balance) is unchanged.
    return String(node)
      .split(/(\s+)/)
      .map((part, i) =>
        /^\s*$/.test(part) ? part : (
          <TextEffectWord key={`${key}-${i}`} variants={variants}>
            {part}
          </TextEffectWord>
        ),
      );
  }
  if (Array.isArray(node)) return node.map((child, i) => <Fragment key={`${key}-${i}`}>{splitWords(child, variants, `${key}-${i}`)}</Fragment>);
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return cloneElement(node, undefined, splitWords(node.props.children, variants, `${key}-c`));
  }
  return node;
}

import { Children, cloneElement, Fragment, isValidElement, type ComponentProps, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import { SectionHeading } from "../SectionHeading";
import { RevealHost } from "./reveal";

// A <section> whose parts fade up one after another as they scroll into view (owner's choice,
// 20 November 2026). No "use client": like split-words.tsx it runs where the section's JSX is
// written, so the server render and the browser get the same tree (no hydration mismatch).
//
// It walks the section's own JSX and turns blocks into RevealHost elements with the same tag
// and props (no extra boxes):
// - anything holding an image (an element with `src`) is never animated; its other children are;
// - SectionHeading keeps its own word effect; blocks after it wait 0.3s;
// - lists and grids (ul, ol, dl, or a `grid`/`flex` class) play their items 80ms apart;
// - a flex row of components (e.g. the Book Online and Call buttons) fades as one row;
// - next/link elements animate as links; other components are left as they are;
// - a photo card (marked `data-photo-card`) rises as a whole, photo included, 100ms apart
//   (owner's choice, 20 November 2026); no other picture ever moves;
// - a section holding the page's h1 (a hero) is left completely still.

type AnyEl = ReactElement<Record<string, unknown> & { children?: ReactNode; className?: string; src?: unknown }>;

const STAGGER = 0.08;
const MAX_STEPS = 8;
const SKIP_TAGS = new Set(["svg", "script", "style", "noscript", "img", "picture", "video", "source", "br", "hr"]);

function isImage(el: AnyEl) {
  return el.props.src !== undefined || el.type === "img" || el.type === "picture" || el.type === "video";
}

function some(node: ReactNode, test: (el: AnyEl) => boolean): boolean {
  let found = false;
  Children.forEach(node, (child) => {
    if (found || !isValidElement(child)) return;
    const el = child as AnyEl;
    if (test(el) || some(el.props.children, test)) found = true;
  });
  return found;
}

const hasImage = (node: ReactNode) => some(node, isImage);
const hasPhotoCard = (node: ReactNode) => some(node, (el) => el.props["data-photo-card"] !== undefined);
const isHeading = (el: AnyEl) => el.type === SectionHeading;
const hasHeading = (node: ReactNode) => some(node, isHeading);
const hasH1 = (node: ReactNode) => some(node, (el) => isHeading(el) && el.props.as === "h1");

function classOf(el: AnyEl) {
  return typeof el.props.className === "string" ? ` ${el.props.className} ` : "";
}

function hasOwnText(el: AnyEl) {
  return Children.toArray(el.props.children).some((c) => (typeof c === "string" || typeof c === "number") && String(c).trim() !== "");
}

function isList(el: AnyEl) {
  if (el.type === "ul" || el.type === "ol" || el.type === "dl") return true;
  if (hasOwnText(el)) return false; // e.g. a label with decorative lines: one piece
  const c = classOf(el);
  return / (grid|flex)[ ]/.test(c) || /\s(sm|md|lg):grid\s/.test(c);
}

function elementChildren(node: ReactNode) {
  return Children.toArray(node).filter(isValidElement) as AnyEl[];
}

function animate(el: AnyEl, delay: number, key?: string, distance?: number): ReactNode {
  const { children, ...rest } = el.props;
  const tag = el.type === Link ? "Link" : (el.type as string);
  return (
    <RevealHost key={key ?? (el.key as string | undefined)} tag={tag} delay={delay} distance={distance} elProps={rest}>
      {children}
    </RevealHost>
  );
}

// Walk a parent's children: animate blocks in order, recursing where images or the heading sit.
function walkChildren(children: ReactNode, base: number, list: boolean): ReactNode {
  let step = 0;
  let afterHeading = false;
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as AnyEl;
    const delay = () => {
      const d = base + (afterHeading ? 0.3 : 0) + (list ? 0.15 : 0) + Math.min(step, MAX_STEPS) * (list ? STAGGER : 0.12);
      step += 1;
      return d;
    };
    if (isHeading(el)) {
      afterHeading = true;
      return el;
    }
    if (el.props["data-photo-card"] !== undefined) {
      const d = base + (afterHeading ? 0.3 : 0) + 0.15 + Math.min(step, MAX_STEPS) * 0.1;
      step += 1;
      return animate(el, d, undefined, 24);
    }
    return walk(el, delay, list);
  });
}

function walk(el: AnyEl, nextDelay: () => number, inList: boolean): ReactNode {
  const isHost = typeof el.type === "string";
  if (el.type === Fragment) {
    return <Fragment key={el.key}>{walkChildren(el.props.children, 0, inList)}</Fragment>;
  }
  if (isHost && SKIP_TAGS.has(el.type as string)) return el;
  if (isImage(el)) return el;

  // An element with its own ref (e.g. a terminal tab) keeps it: never replaced.
  if (el.props.ref !== undefined) return el;

  const children = el.props.children;
  const imageInside = hasImage(children);
  const headingInside = hasHeading(children) || hasPhotoCard(children);

  if (!isHost) {
    // Components: links animate as links; a link card holding a photo keeps the photo still and
    // animates its text parts; any other component is left as it is.
    if (el.type === Link && !imageInside) return animate(el, nextDelay());
    if (el.type === Link) return cloneElement(el, undefined, walkChildren(children, 0, false));
    return el;
  }

  if (imageInside || headingInside) {
    // Keep this element still and look inside it.
    return cloneHost(el, walkChildren(children, 0, isList(el)));
  }
  if (isList(el)) {
    const kids = elementChildren(children);
    // A row holding a component (e.g. Book Online beside a link) fades as one block.
    const hasComponent = kids.some((k) => typeof k.type !== "string" && k.type !== Link && k.type !== SectionHeading);
    // So does a row whose items keep their own refs (the terminal tabs): the row moves, not them.
    const hasRefs = kids.some((k) => k.props.ref !== undefined);
    if ((hasComponent || hasRefs) && !imageInside) return animate(el, nextDelay());
    if (kids.length > 1) return cloneHost(el, walkChildren(children, 0, true));
  }
  return animate(el, nextDelay());
}

function cloneHost(el: AnyEl, children: ReactNode) {
  const Tag = el.type as unknown as (props: Record<string, unknown>) => ReactNode;
  return (
    <Tag key={el.key} {...el.props}>
      {children}
    </Tag>
  );
}

// The same walk for a block that isn't a <section> (stand-alone pieces such as PopularRoutes,
// DriverHelp and AirportArrival, which a parent RevealSection can't see inside).
export function RevealArea({ as = "div", children, ...props }: ComponentProps<"div"> & { as?: "div" | "nav" | "aside" }) {
  const Tag = as as unknown as (p: Record<string, unknown>) => ReactNode;
  return <Tag {...props}>{walkChildren(children, 0, false)}</Tag>;
}

export function RevealSection({ children, ...props }: ComponentProps<"section">) {
  if (hasH1(children)) return <section {...props}>{children}</section>;
  return <section {...props}>{walkChildren(children, 0, false)}</section>;
}

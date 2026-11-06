import type { ReactNode } from "react";

// Shared pieces for the PROVISIONAL line-art scenes. They follow the hero
// illustration: thin foreground strokes, background fills, yellow details.

export const FOREGROUND = "var(--color-foreground)";
export const PRIMARY = "var(--color-illustration)";
export const ROAD = "var(--color-road)";
export const BACKGROUND = "var(--color-background)";

type SceneProps = {
  label: string;
  // Cropped to each scene's content; drawing coordinates share one 520-wide space.
  viewBox?: string;
  className?: string;
  children: ReactNode;
};

export function Scene({ label, viewBox = "0 0 520 360", className = "", children }: SceneProps) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={label} className={className}>
      {children}
    </svg>
  );
}

export function LineArt({ children }: { children: ReactNode }) {
  return (
    <g
      className="line-art"
      fill={BACKGROUND}
      stroke={FOREGROUND}
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {children}
    </g>
  );
}

export function Road({ y = 315 }: { y?: number }) {
  const d = `M 0 ${y} H 520`;
  return (
    <>
      <path d={d} fill="none" stroke={ROAD} strokeWidth={12} />
      <path d={d} fill="none" stroke={BACKGROUND} strokeWidth={1.5} strokeDasharray="8 12" />
    </>
  );
}

/** Saloon minicab, side view, facing right. `y` is the road centre line. */
export function Minicab({ x, y = 315 }: { x: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y - 12})`}>
      <LineArt>
        <path d="M 0 12 V 4 Q 0 0 4 0 H 12 L 18 -8 H 36 L 44 0 H 50 Q 54 0 54 4 V 12 Z" />
        <path d="M 20 -6 H 26 V 0 H 15 Z M 29 -6 H 35 L 40 0 H 29 Z" fill="none" />
        <rect x={24} y={-13} width={6} height={4} fill={PRIMARY} />
        <circle cx={12} cy={12} r={4.5} />
        <circle cx={42} cy={12} r={4.5} />
      </LineArt>
    </g>
  );
}

/** Larger MPV, side view, facing right. `y` is the road centre line. */
export function Mpv({ x, y = 315 }: { x: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y - 12})`}>
      <LineArt>
        <path d="M 0 12 V 2 Q 0 -4 6 -4 H 12 L 18 -16 H 60 Q 66 -16 68 -10 L 72 -2 H 74 Q 78 -2 78 2 V 12 Z" />
        <path d="M 20 -13 H 32 V -4 H 15 Z M 35 -13 H 47 V -4 H 35 Z M 50 -13 H 60 L 64 -4 H 50 Z" fill="none" />
        <rect x={36} y={-21} width={6} height={4} fill={PRIMARY} />
        <circle cx={16} cy={12} r={5} />
        <circle cx={62} cy={12} r={5} />
      </LineArt>
    </g>
  );
}

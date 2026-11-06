import { FOREGROUND, LineArt, Minicab, PRIMARY, Road, Scene } from "./parts";

// PROVISIONAL artwork: terminal, control tower, departing plane, minicab at the kerb.
export function AirportScene({ className }: { className?: string }) {
  return (
    <Scene
      viewBox="0 36 520 296"
      label="Illustration: an airport terminal and control tower with a plane taking off, and a minicab waiting at the kerb."
      className={className}
    >
      <Road />
      <g className="line-art">
        <path
          d="M 120 150 Q 210 110 300 82"
          fill="none"
          stroke={FOREGROUND}
          strokeOpacity={0.35}
          strokeWidth={1.5}
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
      </g>
      <LineArt>
        <path d="M 10 280 H 510" fill="none" strokeOpacity={0.5} />

        {/* Terminal */}
        <rect x={40} y={196} width={340} height={84} />
        <path d="M 32 200 Q 121 160 210 192 Q 299 160 388 200" fill="none" />
        <path
          d="M 64 208 V 272 M 88 208 V 272 M 112 208 V 272 M 136 208 V 272 M 160 208 V 272 M 260 208 V 272 M 284 208 V 272 M 308 208 V 272 M 332 208 V 272 M 356 208 V 272"
          fill="none"
          strokeOpacity={0.6}
        />
        <path d="M 172 238 H 248 M 176 238 V 280 M 244 238 V 280" fill="none" />
        <rect x={196} y={248} width={28} height={32} fill={PRIMARY} />

        {/* Control tower */}
        <rect x={428} y={128} width={16} height={152} />
        <path d="M 418 128 H 454 L 449 108 H 423 Z" />
        <path d="M 425 116 H 447" fill="none" stroke={PRIMARY} />
        <path d="M 436 108 V 92" fill="none" />

        {/* Suitcase on the pavement */}
        <rect x={110} y={262} width={14} height={18} rx={2} />
        <path d="M 114 262 V 257 H 120 V 262" fill="none" />

        {/* Departing plane */}
        <g transform="translate(330 72) rotate(-14) scale(1.3)">
          <path d="M -30 0 H 24 Q 34 0 34 4 Q 34 8 24 8 H -26 L -32 2 Z" />
          <path d="M -26 0 L -32 -12 H -24 L -16 0" />
          <path d="M -2 6 L -14 22 H -6 L 10 6" />
          <path d="M 18 2 H 24" fill="none" stroke={PRIMARY} />
        </g>
      </LineArt>
      <Minicab x={46} />
    </Scene>
  );
}

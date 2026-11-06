// PROVISIONAL artwork: an editable stand-in until the approved hero
// illustration asset is supplied. One continuous road links home, school,
// town and airport. No text lives inside the drawing.

const FOREGROUND = "var(--color-foreground)";
const PRIMARY = "var(--color-illustration)";
const ROAD = "var(--color-road)";
const BACKGROUND = "var(--color-background)";

type Props = {
  className?: string;
};

export function HeroIllustration({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 600 500"
      role="img"
      aria-label="Illustration: a yellow road linking a home, a school, a town high street and an airport, with a minicab on its way."
      className={className}
    >
      {/* Road: bottom row left to right, turns, then top row right to left. */}
      <path
        d="M 0 470 H 440 C 600 470 600 240 440 240 H 0"
        fill="none"
        stroke={ROAD}
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d="M 0 470 H 440 C 600 470 600 240 440 240 H 0"
        fill="none"
        stroke={BACKGROUND}
        strokeWidth={1.5}
        strokeDasharray="8 12"
      />

      <g
        className="line-art"
        fill={BACKGROUND}
        stroke={FOREGROUND}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Ground lines */}
        <path d="M 20 440 H 420 M 20 210 H 470" fill="none" strokeOpacity={0.5} />

        {/* Home: British brick house with chimney, bay and front door */}
        <g>
          <rect x={132} y={300} width={12} height={34} />
          <rect x={60} y={350} width={100} height={90} />
          <path d="M 52 352 L 110 300 L 168 352 Z" />
          <rect x={70} y={364} width={20} height={22} />
          <path d="M 80 364 V 386 M 70 375 H 90" fill="none" />
          <rect x={130} y={364} width={20} height={22} />
          <path d="M 140 364 V 386 M 130 375 H 150" fill="none" />
          <path d="M 126 440 V 402 H 154 V 440" />
          <path d="M 135 402 V 425 M 145 402 V 425 M 126 425 H 154" fill="none" />
          <rect x={92} y={398} width={22} height={42} fill={PRIMARY} />
          <path d="M 92 396 A 11 9 0 0 1 114 396" fill="none" />
          {/* Garden tree */}
          <circle cx={34} cy={404} r={16} />
          <path d="M 34 420 V 440" fill="none" />
        </g>

        {/* School: Victorian board school with central gable and clock */}
        <g>
          <rect x={220} y={370} width={65} height={70} />
          <path d="M 216 372 L 232 352 H 285 V 372 Z" />
          <rect x={335} y={370} width={65} height={70} />
          <path d="M 335 352 H 388 L 404 372 H 335 Z" />
          <rect x={285} y={330} width={50} height={110} />
          <path d="M 280 332 L 310 296 L 340 332 Z" />
          <circle cx={310} cy={318} r={7} fill="none" />
          <path d="M 310 318 V 313 M 310 318 L 314 320" fill="none" stroke={PRIMARY} />
          <path d="M 300 440 V 412 A 10 10 0 0 1 320 412 V 440 Z" fill={PRIMARY} />
          <path d="M 297 356 V 380 M 310 352 V 380 M 323 356 V 380" fill="none" />
          {[232, 250, 268, 347, 365, 383].map((x) => (
            <path
              key={x}
              d={`M ${x - 5} 412 V 392 A 5 5 0 0 1 ${x + 5} 392 V 412 Z`}
            />
          ))}
        </g>

        {/* Inside the bend */}
        <circle cx={498} cy={346} r={18} />
        <path d="M 498 364 V 384" fill="none" />

        {/* Town: high street terrace with shopfronts and a lamp post */}
        <g>
          <rect x={268} y={140} width={50} height={70} />
          <path d="M 266 140 H 320" fill="none" />
          <rect x={276} y={150} width={12} height={14} />
          <rect x={298} y={150} width={12} height={14} />
          <rect x={272} y={177} width={42} height={5} fill={PRIMARY} />
          <path d="M 276 210 V 188 H 296 V 210 M 302 210 V 188 H 310 V 210" fill="none" />

          <rect x={318} y={120} width={46} height={90} />
          <path d="M 316 122 L 341 98 L 366 122 Z" />
          <circle cx={341} cy={113} r={4} fill="none" />
          <rect x={327} y={132} width={10} height={14} />
          <rect x={345} y={132} width={10} height={14} />
          <rect x={327} y={156} width={10} height={14} />
          <rect x={345} y={156} width={10} height={14} />
          <path d="M 326 210 V 182 H 356 V 210 M 341 182 V 210" fill="none" />

          <rect x={364} y={132} width={54} height={78} />
          <path d="M 364 132 V 126 H 376 V 120 H 406 V 126 H 418 V 132" />
          {[372, 386, 400].map((x) => (
            <g key={x}>
              <rect x={x} y={142} width={9} height={13} />
              <rect x={x} y={164} width={9} height={13} />
            </g>
          ))}
          <rect x={386} y={190} width={12} height={20} fill={PRIMARY} />

          <rect x={418} y={152} width={40} height={58} />
          <path d="M 416 152 H 460" fill="none" />
          <rect x={426} y={162} width={10} height={12} />
          <rect x={442} y={162} width={10} height={12} />
          <path d="M 424 210 V 186 H 452 V 210" fill="none" />

          <path d="M 470 210 V 162 M 470 162 H 478" fill="none" />
          <circle cx={479} cy={166} r={3} fill={PRIMARY} stroke="none" />
        </g>

        {/* Airport: terminal, control tower and a departing aircraft */}
        <g>
          <rect x={30} y={160} width={170} height={50} />
          <path d="M 24 163 Q 115 128 206 163" fill="none" />
          <path
            d="M 47 170 V 202 M 64 170 V 202 M 81 170 V 202 M 98 170 V 202 M 132 170 V 202 M 149 170 V 202 M 166 170 V 202 M 183 170 V 202"
            fill="none"
            strokeOpacity={0.6}
          />
          <rect x={106} y={182} width={18} height={28} fill={PRIMARY} />

          <rect x={222} y={110} width={14} height={100} />
          <path d="M 214 110 H 244 L 240 94 H 218 Z" />
          <path d="M 220 100 H 238" fill="none" stroke={PRIMARY} />
          <path d="M 229 94 V 82" fill="none" />

          <g transform="translate(120 66) rotate(12) scale(-1 1)">
            <path d="M -30 0 H 24 Q 34 0 34 4 Q 34 8 24 8 H -26 L -32 2 Z" />
            <path d="M -26 0 L -32 -12 H -24 L -16 0" />
            <path d="M -2 6 L -14 22 H -6 L 10 6" />
            <path d="M 18 2 H 24" fill="none" stroke={PRIMARY} />
          </g>
        </g>
      </g>

      {/* Minicab, heading from home towards school */}
      <g
        className="line-art"
        transform="translate(168 0)"
        fill={BACKGROUND}
        stroke={FOREGROUND}
        strokeWidth={1.5}
        strokeLinejoin="round"
      >
        <path d="M 0 470 V 462 Q 0 458 4 458 H 12 L 18 450 H 36 L 44 458 H 50 Q 54 458 54 462 V 470 Z" />
        <path d="M 20 452 H 26 V 458 H 15 Z M 29 452 H 35 L 40 458 H 29 Z" fill="none" />
        <rect x={24} y={445} width={6} height={4} fill={PRIMARY} />
        <circle cx={12} cy={470} r={4.5} />
        <circle cx={42} cy={470} r={4.5} />
      </g>
    </svg>
  );
}

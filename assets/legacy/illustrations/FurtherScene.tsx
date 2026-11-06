import { LineArt, Mpv, PRIMARY, Road, Scene } from "./parts";

// PROVISIONAL artwork: offices giving way to open country, with an MPV on the road.
export function FurtherScene({ className }: { className?: string }) {
  return (
    <Scene
      viewBox="0 76 520 256"
      label="Illustration: office buildings giving way to rolling hills, with a larger minicab heading out along the road."
      className={className}
    >
      <Road />
      <LineArt>
        {/* Hills behind */}
        <path d="M 250 280 Q 330 200 410 246 Q 460 214 540 234 V 280 Z" />
        {[
          [300, 246],
          [352, 236],
          [404, 240],
        ].map(([cx, cy]) => (
          <g key={cx}>
            <circle cx={cx} cy={cy} r={9} />
            <path d={`M ${cx} ${cy + 9} V ${cy + 20}`} fill="none" />
          </g>
        ))}
        <path d="M 10 280 H 510" fill="none" strokeOpacity={0.5} />

        {/* Offices */}
        <rect x={30} y={120} width={70} height={160} />
        {[134, 158, 182, 206, 230].map((y) =>
          [42, 60, 78].map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={10} height={12} />
          )),
        )}
        <rect x={60} y={254} width={14} height={26} fill={PRIMARY} />
        <rect x={100} y={164} width={60} height={116} />
        {[178, 202, 226].map((y) =>
          [112, 130, 148].map((x) => (
            <rect key={`${x}-${y}`} x={x - 2} y={y} width={10} height={12} />
          )),
        )}
        <rect x={160} y={92} width={48} height={188} />
        <path
          d="M 172 104 V 268 M 184 104 V 268 M 196 104 V 268 M 160 104 H 208"
          fill="none"
          strokeOpacity={0.6}
        />

        {/* Lamp post */}
        <path d="M 232 280 V 226 M 232 226 H 240" fill="none" />
        <circle cx={241} cy={230} r={3} fill={PRIMARY} stroke="none" />

        {/* Direction sign without text */}
        <rect x={440} y={240} width={52} height={26} rx={2} />
        <path d="M 452 280 V 266 M 480 280 V 266" fill="none" />
        <path d="M 452 253 H 476 M 470 247 L 477 253 L 470 259" fill="none" stroke={PRIMARY} />
      </LineArt>
      <Mpv x={262} />
    </Scene>
  );
}

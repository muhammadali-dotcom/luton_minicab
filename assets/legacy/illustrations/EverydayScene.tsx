import { LineArt, Minicab, PRIMARY, Road, Scene } from "./parts";

// PROVISIONAL artwork: terraced street, school gate and a minicab.
export function EverydayScene({ className }: { className?: string }) {
  return (
    <Scene
      viewBox="0 96 520 236"
      label="Illustration: a terraced street and a school gate, with a minicab on the road outside."
      className={className}
    >
      <Road />
      <LineArt>
        <path d="M 10 280 H 510" fill="none" strokeOpacity={0.5} />

        {/* Terraced houses */}
        {[66, 136, 206].map((x) => (
          <rect key={x} x={x - 6} y={150} width={12} height={30} />
        ))}
        <rect x={20} y={190} width={210} height={90} />
        <path d="M 16 192 L 55 158 L 90 192 L 125 158 L 160 192 L 195 158 L 234 192 Z" />
        <path d="M 90 192 V 280 M 160 192 V 280" fill="none" />
        {[20, 90, 160].map((x) => (
          <g key={x}>
            <rect x={x + 10} y={204} width={18} height={20} />
            <rect x={x + 42} y={204} width={18} height={20} />
            <rect x={x + 42} y={242} width={18} height={20} />
            <path d={`M ${x + 51} 242 V 262`} fill="none" />
            <rect x={x + 12} y={246} width={16} height={34} fill={PRIMARY} />
          </g>
        ))}

        {/* Tree */}
        <circle cx={262} cy={238} r={18} />
        <path d="M 262 256 V 280" fill="none" />

        {/* School building behind the gate */}
        <rect x={340} y={152} width={112} height={128} />
        <path d="M 334 154 L 396 116 L 458 154 Z" />
        <circle cx={396} cy={138} r={7} fill="none" />
        <path d="M 396 138 V 133 M 396 138 L 400 140" fill="none" stroke={PRIMARY} />
        {[356, 376, 416, 436].map((x) => (
          <path key={x} d={`M ${x - 5} 198 V 176 A 5 5 0 0 1 ${x + 5} 176 V 198 Z`} />
        ))}
        <path d="M 386 236 V 216 A 10 10 0 0 1 406 216 V 236 Z" fill={PRIMARY} />

        {/* Railings and gateposts */}
        <path
          d="M 320 244 H 472 M 320 272 H 472 M 330 238 V 280 M 342 238 V 280 M 354 238 V 280 M 366 238 V 280 M 426 238 V 280 M 438 238 V 280 M 450 238 V 280 M 462 238 V 280"
          fill="none"
        />
        <path d="M 378 280 V 244 M 414 280 V 244" fill="none" stroke={PRIMARY} />
        <rect x={300} y={206} width={20} height={74} />
        <path d="M 297 206 L 310 194 L 323 206 Z" />
        <rect x={472} y={206} width={20} height={74} />
        <path d="M 469 206 L 482 194 L 495 206 Z" />
      </LineArt>
      <Minicab x={214} />
    </Scene>
  );
}

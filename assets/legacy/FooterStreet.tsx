// Decorative line-art street across the footer: deep-green strokes on cream,
// one gold door. Editable placeholder until a designer supplies final art.

const STROKE = "var(--color-foreground)";
const GOLD = "var(--color-primary)";
const FILL = "var(--color-background)";

function Tree({ x, s = 1 }: { x: number; s?: number }) {
  return (
    <g transform={`translate(${x} 150) scale(${s})`}>
      <path d="M0 0 V-34 M0 -18 L-9 -28 M0 -24 L8 -33" />
      <path d="M-24 -40 C-34 -46 -30 -64 -18 -64 C-16 -80 4 -84 10 -70 C24 -74 32 -58 24 -48 C34 -40 26 -24 12 -28 C4 -18 -16 -20 -18 -30 C-30 -28 -32 -38 -24 -40 Z" fill={FILL} />
    </g>
  );
}

function Bush({ x, w = 30 }: { x: number; w?: number }) {
  return <path d={`M${x} 150 C${x} 140 ${x + w * 0.3} 136 ${x + w * 0.5} 142 C${x + w * 0.7} 134 ${x + w} 140 ${x + w} 150`} fill={FILL} />;
}

function Windows({ x, y, cols, rows = 1, gap = 22 }: { x: number; y: number; cols: number; rows?: number; gap?: number }) {
  const out = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const wx = x + c * gap, wy = y + r * 22;
      out.push(
        <g key={`${r}-${c}`}>
          <rect x={wx} y={wy} width="12" height="14" fill={FILL} />
          <path d={`M${wx + 6} ${wy} V${wy + 14} M${wx} ${wy + 7} H${wx + 12}`} />
        </g>,
      );
    }
  return <>{out}</>;
}

export function FooterStreet({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 160"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
    >
      <Tree x={50} />
      <Bush x={80} w={26} />

      {/* Terrace of two houses */}
      <path d="M110 150 V92 L150 66 L190 92 V150" fill={FILL} />
      <path d="M190 150 V92 L222 70 L262 92 V150" fill={FILL} />
      <rect x="128" y="56" width="8" height="14" fill={FILL} />
      <rect x="230" y="58" width="8" height="14" fill={FILL} />
      <Windows x={124} y={100} cols={2} rows={2} gap={24} />
      <Windows x={204} y={100} cols={2} rows={2} gap={24} />

      {/* Church tower */}
      <path d="M300 150 V70 H332 V150" fill={FILL} />
      <path d="M296 70 H336 M300 70 V58 M308 70 V58 M316 70 V58 M324 70 V58 M332 70 V58 M296 58 H336" />
      <path d="M310 40 L316 26 L322 40 Z M316 26 V18" fill={FILL} />
      <path d="M304 58 V40 H328 V58" fill={FILL} />
      <path d="M311 98 V86 A5 5 0 0 1 321 86 V98 Z M311 130 V116 A5 5 0 0 1 321 116 V130 Z" fill={FILL} />
      <Bush x={336} w={34} />
      <Tree x={392} s={0.9} />

      {/* Wide house */}
      <path d="M430 150 V96 L470 74 H560 L600 96 V150" fill={FILL} />
      <path d="M430 96 H600" />
      <rect x="470" y="62" width="9" height="14" fill={FILL} />
      <rect x="548" y="62" width="9" height="14" fill={FILL} />
      <Windows x={446} y={104} cols={2} rows={2} gap={26} />
      <Windows x={540} y={104} cols={2} rows={2} gap={26} />
      <path d="M506 150 V122 H524 V150" fill={FILL} />

      {/* Lamp post */}
      <path d="M640 150 V86 M632 150 H648" />
      <path d="M632 86 L636 74 H644 L648 86 Z" fill={FILL} />
      <path d="M640 74 V68" />

      {/* Car */}
      <g transform="translate(680 116)">
        <path d="M0 26 V18 Q0 14 6 13 L22 10 L36 0 H74 L90 10 L104 12 Q110 14 110 20 V26 Z" fill={FILL} />
        <path d="M40 4 H58 V11 H30 Z M62 4 H72 L84 11 H62 Z" />
        <circle cx="24" cy="27" r="7" fill={FILL} />
        <circle cx="86" cy="27" r="7" fill={FILL} />
      </g>

      <Tree x={826} s={0.95} />
      <Bush x={850} w={30} />

      {/* Detached house with gold door */}
      <path d="M880 150 V84 L910 60 H1000 L1030 84 V150" fill={FILL} />
      <path d="M880 84 H1030" />
      <rect x="916" y="46" width="9" height="16" fill={FILL} />
      <rect x="986" y="46" width="9" height="16" fill={FILL} />
      <Windows x={898} y={92} cols={2} rows={1} gap={84} />
      <Windows x={898} y={120} cols={2} rows={1} gap={84} />
      <path d="M946 150 V118 A9 9 0 0 1 964 118 V150 Z" fill={GOLD} />

      {/* Semi-detached pair */}
      <path d="M1050 150 V96 L1080 76 L1110 96 V150" fill={FILL} />
      <path d="M1110 150 V96 L1132 80 L1150 96 V150" fill={FILL} />
      <rect x="1094" y="68" width="8" height="14" fill={FILL} />
      <Windows x={1062} y={104} cols={2} rows={2} gap={20} />
      <Windows x={1118} y={104} cols={1} rows={2} />

      <Tree x={1176} s={0.85} />

      {/* Ground line */}
      <path d="M0 150.5 H1200" />
    </svg>
  );
}

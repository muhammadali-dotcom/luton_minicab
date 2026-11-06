type Side = "left" | "right";

type Props = {
  from: Side;
  to: Side;
};

// Centres of the two scene columns in the lg two-column grid (gap-20, px-10).
const x = { left: 23.3, right: 76.7 };

const dot = "absolute size-2 -translate-x-1/2 rounded-full bg-road";

// Decorative route line linking one scene to the next.
export function RouteConnector({ from, to }: Props) {
  const d = `M ${x[from]} 0 C ${x[from]} 55, ${x[to]} 45, ${x[to]} 100`;

  return (
    <div aria-hidden className="relative z-10 mx-auto -my-10 max-w-7xl px-4 sm:px-6 lg:-my-14 lg:px-10">
      <svg className="mx-auto block h-14 w-2 overflow-visible lg:hidden" viewBox="0 0 2 56">
        <path
          d="M 1 0 V 56"
          stroke="var(--color-road)"
          strokeWidth={2}
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
      </svg>
      <div className="relative hidden h-36 lg:block">
        <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={d}
            fill="none"
            stroke="var(--color-road)"
            strokeWidth={2}
            strokeDasharray="2 9"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className={`${dot} -top-1`} style={{ left: `${x[from]}%` }} />
        <span className={`${dot} -bottom-1`} style={{ left: `${x[to]}%` }} />
      </div>
    </div>
  );
}

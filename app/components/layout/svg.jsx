export function GlowDot({ style, delay = 0 }) {
  // Float duration varies per-dot via delay offset so no two dots move in sync
  const floatDuration = 4.2 + (delay % 1.8);

  return (
    <div
      style={{
        ...style,
        animation: `dot-float ${floatDuration.toFixed(1)}s ease-in-out ${delay * 0.5}s infinite`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        style={{
          display: "block",
          animation: `dot-pulse 4.8s ease-in-out ${delay}s infinite`,
        }}
      >
        <g filter="url(#filter0_f_192_274)">
          <circle cx="7" cy="7" r="3" fill="#D9D9D9" />
        </g>
        <defs>
          <filter
            id="filter0_f_192_274"
            x="0"
            y="0"
            width="14"
            height="14"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_192_274" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

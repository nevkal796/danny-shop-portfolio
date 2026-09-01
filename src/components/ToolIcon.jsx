// Technical line art, not filled icons — same language as the blueprints.
const PATHS = {
  wrench: (
    <>
      <circle cx="34" cy="13" r="6.5" />
      <path d="M29.6 17.8 L18.5 28.9" />
      <path d="M18.5 28.9 a6.5 6.5 0 1 0 -6.6 6.6" />
    </>
  ),
  caliper: (
    <>
      <path d="M6 19 H42" />
      <path d="M10 19 V34" />
      <path d="M24 19 V34" />
      <rect x="21.5" y="12.5" width="9" height="7" rx="1" />
      <path d="M34 15.5 H41" />
    </>
  ),
  micrometer: (
    <>
      <path d="M30 12 a14 14 0 1 0 0 24" />
      <path d="M22 24 H40" />
      <path d="M31 19 h9 v10 h-9 z" />
    </>
  ),
  torque: (
    <>
      <rect x="8" y="21" width="24" height="6" rx="3" />
      <circle cx="36" cy="24" r="7" />
      <path d="M36 20.5 v7" />
      <path d="M32.5 24 h7" />
    </>
  ),
  screwdriver: (
    <>
      <rect x="8" y="18" width="13" height="12" rx="3" />
      <path d="M21 24 H33" />
      <path d="M33 21.5 h6 v5 h-6 z" />
    </>
  ),
  clamp: (
    <>
      <path d="M30 10 a15 15 0 1 0 0 28" />
      <path d="M30 10 H16" />
      <path d="M30 38 H16" />
      <path d="M16 24 H34" />
      <path d="M34 20 v8" />
    </>
  ),
  laptop: (
    <>
      <path d="M13 14 h22 v17 H13 z" />
      <path d="M8 31 h32 l3 5 H5 z" />
    </>
  ),
  chip: (
    <>
      <rect x="15" y="15" width="18" height="18" rx="1.5" />
      <path d="M21 15 V9 M27 15 V9 M21 33 v6 M27 33 v6" />
      <path d="M15 21 H9 M15 27 H9 M33 21 h6 M33 27 h6" />
    </>
  ),
}

export default function ToolIcon({ name, className = '', size = 44 }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.wrench}
    </svg>
  )
}

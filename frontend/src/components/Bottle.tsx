/** Stylised premium water bottle rendered as pure SVG. */
export default function Bottle({
  className = "",
  accentFrom = "#67E8F9",
  accentTo = "#0E4D92",
}: {
  className?: string;
  accentFrom?: string;
  accentTo?: string;
}) {
  // Deterministic id (duplicate defs across identical bottles are harmless)
  const id = `bottle-${accentFrom.replace("#", "")}-${accentTo.replace("#", "")}`;
  return (
    <svg viewBox="0 0 120 320" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-water`} x1="30" y1="90" x2="95" y2="310" gradientUnits="userSpaceOnUse">
          <stop stopColor={accentFrom} stopOpacity="0.85" />
          <stop offset="1" stopColor={accentTo} stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="25" y1="60" x2="95" y2="310" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="44" y="8" width="32" height="26" rx="5" fill="#0A1F3C" stroke="#38BDF8" strokeOpacity="0.5" />
      <rect x="44" y="16" width="32" height="3" fill="#38BDF8" fillOpacity="0.35" />
      {/* neck */}
      <path d="M48 34h24v22c0 4 2 7 5 10H43c3-3 5-6 5-10V34Z" fill={`url(#${id}-glass)`} />
      {/* body */}
      <path
        d="M43 66c-8 8-15 20-15 34v186c0 14 11 26 25 26h14c14 0 25-12 25-26V100c0-14-7-26-15-34H43Z"
        fill={`url(#${id}-glass)`}
        stroke="#A5F3FC"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      {/* water fill */}
      <path
        d="M31 132v154c0 12 10 22 22 22h14c12 0 22-10 22-22V132c-10 8-20 8-29 3s-19-6-29-3Z"
        fill={`url(#${id}-water)`}
        opacity="0.85"
      />
      {/* label band */}
      <rect x="28" y="176" width="64" height="54" rx="6" fill="#040B16" fillOpacity="0.55" stroke="#A5F3FC" strokeOpacity="0.3" />
      <text
        x="60"
        y="200"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="3.5"
        fill="#E2F4FF"
        fontFamily="inherit"
        fontWeight="700"
      >
        AQUOR
      </text>
      <text x="60" y="217" textAnchor="middle" fontSize="6.5" letterSpacing="1.5" fill="#8FB8D8">
        PREMIUM WATER
      </text>
      {/* shine */}
      <path d="M40 80c-5 8-8 16-8 26v170" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

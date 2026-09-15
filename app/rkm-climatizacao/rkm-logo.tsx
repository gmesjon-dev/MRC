/**
 * Original circular recreation of the RKM Climatização mark (blue-to-silver
 * angular monogram) so a real logo file isn't required — swap in the
 * client's actual logo asset at /public/rkm/logo.png later if pixel-exact
 * fidelity to the source artwork matters.
 */
export function RkmLogo({
  className,
  id = 'a',
}: {
  className?: string;
  id?: string;
}) {
  const gradId = `rkm-grad-${id}`;
  const ringId = `rkm-ring-${id}`;
  return (
    <svg
      viewBox="0 0 200 200"
      aria-label="RKM Climatização"
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="8%" y1="15%" x2="96%" y2="88%">
          <stop offset="0%" stopColor="#4aa3e8" />
          <stop offset="38%" stopColor="#155f9e" />
          <stop offset="55%" stopColor="#0a3055" />
          <stop offset="72%" stopColor="#aeb9c2" />
          <stop offset="100%" stopColor="#eef1f4" />
        </linearGradient>
        <linearGradient id={ringId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4aa3e8" />
          <stop offset="50%" stopColor="#d3dae0" />
          <stop offset="100%" stopColor="#155f9e" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="97" fill="#060f1a" />
      <circle
        cx="100"
        cy="100"
        r="94.5"
        fill="none"
        stroke={`url(#${ringId})`}
        strokeWidth="3"
      />
      <circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="#24333f"
        strokeWidth="1"
      />
      <text
        x="100"
        y="106"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={900}
        fontSize="52"
        letterSpacing="0.5"
        fill={`url(#${gradId})`}
      >
        RKM
      </text>
      <path d="M62 128h76l-10 11H72z" fill="#8996a3" opacity="0.85" />
      <text
        x="100"
        y="153"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={700}
        fontSize="11.5"
        letterSpacing="3"
        fill="#aeb9c2"
      >
        CLIMATIZAÇÃO
      </text>
    </svg>
  );
}

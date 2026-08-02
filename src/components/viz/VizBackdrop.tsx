type VizBackdropProps = {
  /** Unique per panel instance; namespaces the pattern/gradient ids. */
  id: string;
};

/**
 * The shared plot backdrop: fine grid, coarse teal grid, navy vignette, and
 * a warm glow in the top-right corner. Rendered first inside every viz SVG.
 */
export function VizBackdrop({ id }: VizBackdropProps) {
  return (
    <>
      <defs>
        <pattern id={`gf-${id}`} width="11" height="11" patternUnits="userSpaceOnUse">
          <path d="M11 0H0V11" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
        </pattern>
        <pattern id={`gc-${id}`} width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" fill="none" stroke="rgba(102,203,213,0.10)" strokeWidth="0.8" />
        </pattern>
        <radialGradient id={`gv-${id}`} cx="48%" cy="42%" r="76%">
          <stop offset="0%" stopColor="#081f4a" stopOpacity="0" />
          <stop offset="58%" stopColor="#081f4a" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#06183b" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id={`gw-${id}`} cx="94%" cy="4%" r="58%">
          <stop offset="0%" stopColor="#f4711a" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#f4711a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#gf-${id})`} />
      <rect width="100%" height="100%" fill={`url(#gc-${id})`} />
      <rect width="100%" height="100%" fill={`url(#gv-${id})`} />
      <rect width="100%" height="100%" fill={`url(#gw-${id})`} />
    </>
  );
}

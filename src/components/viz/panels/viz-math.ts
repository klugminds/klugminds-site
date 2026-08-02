/** Gaussian bucket heights — mirrors `_bell` in the V4 viz generator. */
export function bell(n: number, centre: number, spread: number, peak: number): number[] {
  return Array.from({ length: n }, (_, i) => peak * Math.exp(-((i - centre) ** 2) / spread));
}

/** Harm trajectory points — mirrors `harm()` in the V4 viz generator. */
export function harmPoints(count = 32): Array<[number, number, number]> {
  const pts: Array<[number, number, number]> = [];
  for (let i = 0; i < count; i++) {
    const x = 26 + i * 10.3;
    const raw = 6 + i ** 1.85 * 0.3 + Math.sin(i / 2.0) * 5;
    const score = Math.max(2, Math.min(118, raw));
    const y = 122 - score * 0.86;
    pts.push([Math.round(x), Math.round(y * 10) / 10, Math.round(score)]);
  }
  return pts;
}

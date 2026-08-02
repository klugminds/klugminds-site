/**
 * The tiny SVG toolkit the demo stages draw with, ported from the V4
 * reference. Stages build their scaffolding once with these helpers and then
 * mutate attributes per frame — every frame is a pure function of time.
 */

const NS = 'http://www.w3.org/2000/svg';

type Attrs = Record<string, string | number | null | undefined>;

/** Create an SVG element; the `text` key sets textContent. */
export function E<K extends keyof SVGElementTagNameMap>(
  name: K,
  attrs: Attrs = {},
  parent: SVGElement | null = null,
): SVGElementTagNameMap[K] {
  const el = document.createElementNS(NS, name);
  for (const key of Object.keys(attrs)) {
    const value = attrs[key];
    if (value === null || value === undefined) {
      continue;
    }
    if (key === 'text') {
      el.textContent = String(value);
    } else {
      el.setAttribute(key, String(value));
    }
  }
  if (parent) {
    parent.appendChild(el);
  }
  return el;
}

export function G(parent: SVGElement, attrs: Attrs = {}): SVGGElement {
  return E('g', attrs, parent);
}

export const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, p: number): number => a + (b - a) * p;
export const easeOut = (p: number): number => 1 - (1 - p) ** 3;
export const easeInOut = (p: number): number =>
  p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;

/**
 * Progress through a time window, eased — the only timing primitive the
 * stages use, which is what keeps them scrub-safe.
 */
export function win(
  t: number,
  a: number,
  b: number,
  ease: (p: number) => number = easeOut,
): number {
  if (b <= a) {
    return t >= b ? 1 : 0;
  }
  return ease(clamp((t - a) / (b - a), 0, 1));
}

export function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, '0')}`;
}

export const money = (n: number): string => `£${n.toLocaleString('en-GB')}`;

/** Deterministic PRNG so each demo looks identical on every load. */
export function prng(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/** A framed sub-panel — the vocabulary every stage builds from. */
export function panel(
  parent: SVGElement,
  x: number,
  y: number,
  w: number,
  h: number,
  label?: string,
  cls = 'dm-panel',
): SVGGElement {
  const g = G(parent);
  E('rect', { x, y, width: w, height: h, rx: 6, class: cls }, g);
  if (label) {
    E('text', { x: x + 8, y: y + 13, class: 'dm-label', text: label }, g);
  }
  return g;
}

export type StatTile = {
  g: SVGGElement;
  val: SVGTextElement;
};

export function statTile(
  parent: SVGElement,
  x: number,
  y: number,
  w: number,
  label: string,
): StatTile {
  const g = G(parent);
  E('rect', { x, y, width: w, height: 40, rx: 5, class: 'dm-panel' }, g);
  E('text', { x: x + 7, y: y + 13, class: 'dm-label', text: label }, g);
  const val = E('text', { x: x + 7, y: y + 32, class: 'dm-num-sm', text: '—' }, g);
  return { g, val };
}

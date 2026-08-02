import {
  E,
  G,
  clamp,
  lerp,
  easeInOut,
  money,
  prng,
  statTile,
  win,
} from '@/components/demo/toolkit';
import { defineStage } from '@/components/demo/stages/types';
import type { StatTile } from '@/components/demo/toolkit';

type Item = {
  id: number;
  amt: number;
  score: number;
  fraud: boolean;
  lane: number;
  at: number;
};

type Mark = {
  g: SVGGElement;
  dot: SVGCircleElement;
  ring: SVGCircleElement;
  lbl: SVGTextElement;
  it: Item;
};

type Handle = {
  marks: Mark[];
  cutLine: SVGLineElement;
  cutLbl: SVGTextElement;
  tiles: StatTile[];
};

/**
 * Fraud Detection Suite (32s): payments land on a score axis, the cut-off
 * decides them, and moving the cut-off re-decides everything on screen.
 */
export const stream = defineStage<Handle>({
  init(svg) {
    const r = prng(4471);
    const items: Item[] = Array.from({ length: 16 }, (_, i) => {
      const fraud = i % 5 === 2 || i === 7;
      const score = fraud ? 0.58 + r() * 0.4 : r() * 0.62;
      return {
        id: 4100 + Math.floor(r() * 899),
        amt: Math.round((12 + r() * 780) / 2) * 2,
        score,
        fraud,
        lane: i % 7,
        at: 1.6 + i * 1.05,
      };
    });

    const root = G(svg);
    const ax = G(root);
    E('line', { x1: 92, y1: 214, x2: 452, y2: 214, class: 'dm-line' }, ax);
    [0, 0.25, 0.5, 0.75, 1].forEach((v) => {
      const x = 92 + v * 360;
      E('line', { x1: x, y1: 214, x2: x, y2: 219, class: 'dm-line' }, ax);
      E('text', { x, y: 229, class: 'dm-label', 'text-anchor': 'middle', text: v.toFixed(2) }, ax);
    });
    E(
      'text',
      { x: 272, y: 245, class: 'dm-label', 'text-anchor': 'middle', text: 'MODEL SCORE' },
      ax,
    );
    E(
      'text',
      { x: 92, y: 40, class: 'dm-label dm-label-hi', text: 'LIVE PAYMENT AUTHORISATIONS' },
      root,
    );

    const cut = G(root);
    const cutLine = E(
      'line',
      { x1: 0, y1: 46, x2: 0, y2: 214, class: 'dm-line-flame', 'stroke-dasharray': '3 3' },
      cut,
    );
    const cutLbl = E(
      'text',
      {
        x: 0,
        y: 40,
        class: 'dm-label dm-label-warm',
        'text-anchor': 'middle',
        text: 'CUT-OFF 0.62',
      },
      cut,
    );

    const marks: Mark[] = items.map((it) => {
      const g = G(root, { opacity: 0 });
      const dot = E('circle', { cx: 0, cy: 0, r: 4.6, class: 'dm-teal' }, g);
      const ring = E(
        'circle',
        { cx: 0, cy: 0, r: 9, fill: 'none', stroke: '#f4711a', 'stroke-width': 1, opacity: 0 },
        g,
      );
      const lbl = E('text', { x: 11, y: 3, class: 'dm-label', text: '' }, g);
      return { g, dot, ring, lbl, it };
    });

    const tiles = [
      statTile(root, 92, 56, 110, 'FRAUD CAUGHT'),
      statTile(root, 212, 56, 110, 'FALSE POSITIVES'),
      statTile(root, 332, 56, 120, 'REVIEW LOAD'),
    ];
    return { marks, cutLine, cutLbl, tiles };
  },

  frame(h, t) {
    /* The cut-off is loosened part-way through, on purpose: the point of the
       demo is that the number is a business decision, not a setting. */
    const cutoff = lerp(0.62, 0.44, win(t, 19, 23, easeInOut));
    const cx = 92 + cutoff * 360;
    h.cutLine.setAttribute('x1', String(cx));
    h.cutLine.setAttribute('x2', String(cx));
    h.cutLbl.setAttribute('x', String(clamp(cx, 120, 424)));
    h.cutLbl.textContent = `CUT-OFF ${cutoff.toFixed(2)}`;

    let caught = 0;
    let missed = 0;
    let fp = 0;
    let review = 0;
    let landed = 0;

    h.marks.forEach((m) => {
      const p = win(t, m.it.at, m.it.at + 1.15);
      if (p <= 0) {
        m.g.setAttribute('opacity', '0');
        return;
      }
      const x = lerp(92, 92 + m.it.score * 360, p);
      const y = lerp(112, 128 + m.it.lane * 12, p);
      m.g.setAttribute('opacity', String(Math.min(1, p * 1.6)));
      m.g.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)})`);

      const flagged = m.it.score >= cutoff;
      m.dot.setAttribute('class', flagged ? 'dm-flame' : 'dm-teal');
      m.ring.setAttribute('opacity', flagged && p > 0.9 ? '0.85' : '0');
      m.lbl.setAttribute('class', `dm-label ${flagged ? 'dm-label-warm' : ''}`);
      m.lbl.textContent = p > 0.85 ? `${m.it.id} ${money(m.it.amt)}` : '';

      if (p >= 1) {
        landed += 1;
        if (flagged) {
          review += 1;
          if (m.it.fraud) {
            caught += 1;
          } else {
            fp += 1;
          }
        } else if (m.it.fraud) {
          missed += 1;
        }
      }
    });

    const totalFraud = caught + missed;
    const [caughtTile, fpTile, reviewTile] = h.tiles;
    if (caughtTile) {
      caughtTile.val.textContent = totalFraud ? `${Math.round((caught / totalFraud) * 100)}%` : '—';
    }
    if (fpTile) {
      fpTile.val.textContent = landed ? `${((fp / landed) * 100).toFixed(1)}%` : '—';
    }
    if (reviewTile) {
      reviewTile.val.textContent = landed ? `${((review / landed) * 100).toFixed(1)}%` : '—';
      reviewTile.val.setAttribute(
        'class',
        review / Math.max(landed, 1) > 0.3 ? 'dm-num-sm dm-flame' : 'dm-num-sm',
      );
    }
  },
});

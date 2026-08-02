import { E, G, lerp, win } from '@/components/demo/toolkit';
import { defineStage } from '@/components/demo/stages/types';

type Column = {
  k: string;
  n: number;
  x: number;
  num: SVGTextElement;
  rows: SVGRectElement[];
};

type Handle = {
  built: Column[];
  card: SVGGElement;
  l1: SVGTextElement;
  l2: SVGTextElement;
  stamp: SVGGElement;
};

/**
 * AML Monitoring (30s): a day of alerts walking down the triage funnel until
 * six become a filed report.
 */
export const queue = defineStage<Handle>({
  init(svg) {
    const cols = [
      { k: 'RAW ALERTS', n: 1240, x: 24 },
      { k: 'DEDUPED', n: 486, x: 118 },
      { k: 'MODEL SCORED', n: 112, x: 212 },
      { k: 'ANALYST REVIEW', n: 38, x: 306 },
      { k: 'REPORT FILED', n: 6, x: 400 },
    ];
    const root = G(svg);
    E(
      'text',
      { x: 24, y: 26, class: 'dm-label dm-label-hi', text: 'ONE OPERATING DAY · ALERT TRIAGE' },
      root,
    );

    const built: Column[] = cols.map((c, i) => {
      const g = G(root);
      E(
        'rect',
        {
          x: c.x,
          y: 40,
          width: 80,
          height: 150,
          rx: 6,
          class: i === 4 ? 'dm-panel-warm dm-panel' : 'dm-panel',
        },
        g,
      );
      E(
        'text',
        { x: c.x + 6, y: 54, class: `dm-label ${i === 4 ? 'dm-label-warm' : ''}`, text: c.k },
        g,
      );
      const num = E('text', { x: c.x + 6, y: 76, class: 'dm-num-sm', text: '0' }, g);
      const bars = G(g);
      const rows = Array.from({ length: 14 }, (_, j) =>
        E(
          'rect',
          {
            x: c.x + 6,
            y: 86 + j * 7.2,
            width: 0,
            height: 4.4,
            rx: 2,
            fill: i === 4 ? '#f4711a' : '#33b8c4',
            opacity: 0.75,
          },
          bars,
        ),
      );
      return { ...c, num, rows };
    });

    /* The one alert that becomes a report, opened out at the end. */
    const card = G(root, { opacity: 0 });
    E(
      'rect',
      { x: 96, y: 196, width: 320, height: 60, rx: 6, class: 'dm-panel dm-panel-warm' },
      card,
    );
    E(
      'text',
      { x: 106, y: 212, class: 'dm-label dm-label-warm', text: 'CASE 0072 · STRUCTURING' },
      card,
    );
    const l1 = E('text', { x: 106, y: 228, class: 'dm-val', text: '' }, card);
    const l2 = E('text', { x: 106, y: 242, class: 'dm-val', text: '' }, card);
    const stamp = G(root, { opacity: 0 });
    E(
      'rect',
      { x: 336, y: 202, width: 68, height: 20, rx: 4, class: 'dm-panel-warm dm-panel' },
      stamp,
    );
    E(
      'text',
      {
        x: 370,
        y: 216,
        class: 'dm-label dm-label-warm',
        'text-anchor': 'middle',
        text: 'SAR FILED',
      },
      stamp,
    );

    return { built, card, l1, l2, stamp };
  },

  frame(h, t) {
    h.built.forEach((c, i) => {
      const start = 1.2 + i * 3.4;
      const p = win(t, start, start + 2.6);
      c.num.textContent = Math.round(c.n * p).toLocaleString('en-GB');
      const filled = Math.round(p * Math.min(14, Math.max(1, Math.round(c.n / 90) + 2)));
      c.rows.forEach((rw, j) => {
        rw.setAttribute(
          'width',
          j < filled ? String(lerp(0, 68, win(t, start + j * 0.14, start + j * 0.14 + 0.5))) : '0',
        );
      });
    });

    const cp = win(t, 17.5, 19.5);
    h.card.setAttribute('opacity', String(cp));
    h.l1.textContent = cp > 0.4 ? '9 deposits, £2,480 each, 4 branches, 6 days' : '';
    h.l2.textContent = cp > 0.7 ? 'Scenario missed it. Model ranked it 3rd of 112.' : '';
    h.stamp.setAttribute('opacity', String(win(t, 22, 23.4)));
  },
});

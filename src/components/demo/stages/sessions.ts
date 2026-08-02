import { E, G, prng, win } from '@/components/demo/toolkit';
import { defineStage } from '@/components/demo/stages/types';

type Day = {
  i: number;
  mins: number;
  night: boolean;
  bar: SVGRectElement;
  moon: SVGTextElement;
};

type Tier = {
  at: number;
  g: SVGGElement;
};

type Handle = {
  bars: Day[];
  harm: SVGPathElement;
  tiers: Tier[];
};

/**
 * Responsible Gaming (28s): fourteen days of play, a harm score that climbs,
 * and the graded response at each tier.
 */
export const sessions = defineStage<Handle>({
  init(svg) {
    const r = prng(7781);
    const days = Array.from({ length: 14 }, (_, i) => ({
      i,
      mins: Math.round(18 + (i / 13) ** 1.7 * 190 + r() * 26),
      night: i > 7 && r() > 0.4,
    }));
    const root = G(svg);
    E(
      'text',
      { x: 24, y: 24, class: 'dm-label dm-label-hi', text: 'PLAYER 60219 · 14 DAYS' },
      root,
    );

    const bars: Day[] = days.map((d) => {
      const x = 30 + d.i * 30;
      const g = G(root);
      const bar = E(
        'rect',
        { x, y: 170, width: 17, height: 0, rx: 2, fill: '#33b8c4', opacity: 0.85 },
        g,
      );
      E(
        'text',
        { x: x + 8.5, y: 186, class: 'dm-label', 'text-anchor': 'middle', text: String(d.i + 1) },
        g,
      );
      const moon = E(
        'text',
        { x: x + 8.5, y: 196, class: 'dm-label dm-label-warm', 'text-anchor': 'middle', text: '' },
        g,
      );
      return { ...d, bar, moon };
    });
    E(
      'text',
      { x: 24, y: 208, class: 'dm-label', text: 'SESSION MINUTES PER DAY · ORANGE = AFTER 01:00' },
      root,
    );

    const harm = E('path', { d: '', class: 'dm-line-flame', 'stroke-width': 1.6 }, root);
    E(
      'text',
      { x: 424, y: 44, class: 'dm-label dm-label-warm', 'text-anchor': 'end', text: 'HARM SCORE' },
      root,
    );

    const tiers: Tier[] = [
      { k: 'TIER 1 · OBSERVE', at: 6, warm: false },
      { k: 'TIER 2 · NUDGE', at: 11, warm: false },
      { k: 'TIER 3 · DEPOSIT LIMIT', at: 16, warm: true },
      { k: 'TIER 4 · COOL-OFF OFFERED', at: 21, warm: true },
    ].map((tr, i) => {
      const g = G(root, { opacity: 0 });
      E(
        'rect',
        {
          x: 24 + i * 112,
          y: 226,
          width: 104,
          height: 24,
          rx: 5,
          class: tr.warm ? 'dm-panel dm-panel-warm' : 'dm-panel dm-panel-hi',
        },
        g,
      );
      E(
        'text',
        {
          x: 76 + i * 112,
          y: 241,
          class: `dm-label ${tr.warm ? 'dm-label-warm' : 'dm-label-hi'}`,
          'text-anchor': 'middle',
          text: tr.k,
        },
        g,
      );
      return { at: tr.at, g };
    });
    return { bars, harm, tiers };
  },

  frame(h, t) {
    const pts: Array<[number, number]> = [];
    h.bars.forEach((d) => {
      const start = 1 + d.i * 1.35;
      const p = win(t, start, start + 0.8);
      const hgt = (d.mins / 240) * 118 * p;
      d.bar.setAttribute('height', hgt.toFixed(1));
      d.bar.setAttribute('y', (170 - hgt).toFixed(1));
      d.bar.setAttribute('fill', d.night ? '#f4711a' : '#33b8c4');
      d.moon.textContent = d.night && p > 0.6 ? '•' : '';
      if (p > 0.3) {
        pts.push([38.5 + d.i * 30, 150 - (d.mins / 240) * 96]);
      }
    });
    h.harm.setAttribute(
      'd',
      pts.length > 1
        ? pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
        : '',
    );
    h.tiers.forEach((tr) => tr.g.setAttribute('opacity', String(win(t, tr.at, tr.at + 1.2))));
  },
});

import { E, G, easeInOut, lerp, statTile, win } from '@/components/demo/toolkit';
import { defineStage } from '@/components/demo/stages/types';
import type { StatTile } from '@/components/demo/toolkit';

type Seat = {
  i: number;
  x: number;
  y: number;
  g: SVGGElement;
  box: SVGRectElement;
  net: SVGTextElement;
  inRing: boolean;
};

type Flow = {
  ring: boolean;
  g: SVGGElement;
  path: SVGPathElement;
  chip: SVGCircleElement;
};

type Handle = {
  seats: Seat[];
  flows: Flow[];
  tiles: StatTile[];
  verdict: SVGGElement;
};

/**
 * iGaming Integrity (30s): chips moving one way around a table until three
 * seats stop looking like three players.
 */
export const ring = defineStage<Handle>({
  init(svg) {
    const root = G(svg);
    E(
      'text',
      { x: 24, y: 24, class: 'dm-label dm-label-hi', text: 'TABLE 3391 · 480 HANDS OBSERVED' },
      root,
    );
    const cx = 190;
    const cy = 148;
    E(
      'ellipse',
      {
        cx,
        cy,
        rx: 118,
        ry: 74,
        fill: 'rgba(0,165,179,0.05)',
        stroke: 'rgba(255,255,255,0.12)',
        'stroke-width': 0.8,
      },
      root,
    );
    E(
      'ellipse',
      {
        cx,
        cy,
        rx: 96,
        ry: 56,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.07)',
        'stroke-width': 0.6,
      },
      root,
    );

    const ringSeats = [1, 3, 5];
    const seats: Seat[] = Array.from({ length: 6 }, (_, i) => {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / 6;
      const x = cx + Math.cos(a) * 112;
      const y = cy + Math.sin(a) * 70;
      const g = G(root);
      const box = E(
        'rect',
        { x: x - 24, y: y - 12, width: 48, height: 24, rx: 5, class: 'dm-panel' },
        g,
      );
      E(
        'text',
        {
          x,
          y: y - 1,
          class: 'dm-label dm-label-hi',
          'text-anchor': 'middle',
          text: `SEAT ${i + 1}`,
        },
        g,
      );
      const net = E(
        'text',
        { x, y: y + 9, class: 'dm-label', 'text-anchor': 'middle', text: '' },
        g,
      );
      return { i, x, y, g, box, net, inRing: ringSeats.includes(i) };
    });

    /* Chip flows: ring seats feed seat 3, the rest are noise. */
    const flows: Flow[] = [
      { from: 1, to: 3, ring: true },
      { from: 5, to: 3, ring: true },
      { from: 0, to: 2, ring: false },
      { from: 4, to: 3, ring: true },
      { from: 2, to: 0, ring: false },
    ].flatMap((f) => {
      const a = seats[f.from];
      const b = seats[f.to];
      if (!a || !b) {
        return [];
      }
      const g = G(root, { opacity: 0 });
      const path = E(
        'path',
        {
          d: `M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`,
          fill: 'none',
          stroke: f.ring ? '#f4711a' : 'rgba(102,203,213,0.4)',
          'stroke-width': f.ring ? 1.4 : 0.9,
          'stroke-dasharray': '5 6',
        },
        g,
      );
      const chip = E('circle', { r: 2.6, fill: f.ring ? '#fb923c' : '#66cbd5' }, g);
      return [{ ring: f.ring, g, path, chip }];
    });

    const tiles = [
      statTile(root, 326, 44, 130, 'CHIP ASYMMETRY'),
      statTile(root, 326, 94, 130, 'SHARED DEVICE'),
      statTile(root, 326, 144, 130, 'SESSION OVERLAP'),
    ];
    const verdict = G(root, { opacity: 0 });
    E(
      'rect',
      { x: 326, y: 200, width: 130, height: 40, rx: 5, class: 'dm-panel dm-panel-warm' },
      verdict,
    );
    E('text', { x: 336, y: 216, class: 'dm-label dm-label-warm', text: 'ACTION' }, verdict);
    E('text', { x: 336, y: 232, class: 'dm-num-sm dm-flame', text: 'SUSPEND 1·4·6' }, verdict);
    return { seats, flows, tiles, verdict };
  },

  frame(h, t) {
    h.flows.forEach((f, i) => {
      const start = 1.5 + i * 0.9;
      const p = win(t, start, start + 1);
      f.g.setAttribute('opacity', String(p));
      /* Chips cycle along the arc: position is a function of t only. */
      const cyc = ((t - start) / 2.2) % 1;
      if (cyc >= 0 && p > 0) {
        const len = f.path.getTotalLength ? f.path.getTotalLength() : 0;
        if (len) {
          const pt = f.path.getPointAtLength(cyc * len);
          f.chip.setAttribute('cx', pt.x.toFixed(1));
          f.chip.setAttribute('cy', pt.y.toFixed(1));
        }
      }
    });

    const detect = win(t, 14, 17, easeInOut);
    h.seats.forEach((s) => {
      if (s.inRing) {
        s.box.setAttribute('class', detect > 0.5 ? 'dm-panel dm-panel-warm' : 'dm-panel');
        s.net.textContent = detect > 0.3 ? (s.i === 3 ? '+£4,180' : '-£1,940') : '';
        s.net.setAttribute('class', `dm-label ${detect > 0.3 ? 'dm-label-warm' : ''}`);
      } else {
        /* Written on every frame, including the frames where nothing is
           shown — a branch that only writes forwards leaves stale values on
           screen after a scrub back. */
        s.net.textContent = detect > 0.3 ? '-£210' : '';
        s.g.setAttribute('opacity', detect > 0.3 ? String(lerp(1, 0.5, detect)) : '1');
      }
    });

    const [asym, device, overlap] = h.tiles;
    if (asym) {
      asym.val.textContent = t > 7 ? `${(3.1 * win(t, 7, 9)).toFixed(1)}×` : '—';
    }
    if (device) {
      device.val.textContent = t > 10 ? '2 OF 3' : '—';
    }
    if (overlap) {
      overlap.val.textContent = t > 12 ? '94%' : '—';
      overlap.val.setAttribute('class', t > 12 ? 'dm-num-sm dm-flame' : 'dm-num-sm');
    }
    h.verdict.setAttribute('opacity', String(win(t, 20, 22)));
  },
});

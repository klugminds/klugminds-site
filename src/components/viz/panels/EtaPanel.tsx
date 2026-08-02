'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizStat } from '@/components/viz/types';

const CENTRE = 190;
const PER_MIN = 4.6;
const DEFAULT_WINDOW = 20;

const BINS: Array<[number, number]> = Array.from({ length: 36 }, (_, i) => {
  const x = 26 + i * 9;
  const mass = Math.exp(-((x - CENTRE) ** 2) / 2100);
  return [Math.round(x), Math.round(mass * 10000) / 10000] as [number, number];
});

const BIN_TOTAL = BINS.reduce((sum, [, mass]) => sum + mass, 0);
const POLYLINE_POINTS = BINS.map(([x, mass]) => `${x},${(126 - mass * 74).toFixed(1)}`).join(' ');

const STATS: VizStat[] = [
  { el: 'm-window', label: 'Promised window' },
  { el: 'm-inside', label: 'Arrivals inside', tone: 'accent' },
  { el: 'm-late', label: 'Missed promises', tone: 'signal' },
];

function fmtPct(n: number): string {
  return `${n.toFixed(0)}%`;
}

/** Logistics panel: predicted arrival distribution vs an adjustable promise window. */
export function EtaPanel() {
  const figureRef = useRef<HTMLElement>(null);
  const [windowMin, setWindowMin] = useState(DEFAULT_WINDOW);

  const half = windowMin * PER_MIN;
  const left = CENTRE - half;
  const right = CENTRE + half;

  const statValues = useMemo(() => {
    const inside = BINS.reduce((sum, [x, mass]) => sum + (x >= left && x <= right ? mass : 0), 0);
    const pct = BIN_TOTAL ? (inside / BIN_TOTAL) * 100 : 0;
    return new Map<string, string>([
      ['m-window', `±${windowMin} min`],
      ['m-inside', fmtPct(pct)],
      ['m-late', fmtPct(100 - pct)],
    ]);
  }, [left, right, windowMin]);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) {
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      figure.classList.add('is-live');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          figure.classList.add('is-live');
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(figure);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={figureRef} className="viz" data-viz="eta" role="group" aria-label="ETA confidence">
      <div className="viz-head">
        <span className="viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="viz-title">ETA confidence</span>
        <span className="viz-hint">
          <i aria-hidden="true" />
          Drag the window
        </span>
      </div>
      <svg
        className="viz-plot"
        viewBox="0 0 380 152"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="eta1" />
        <rect x={left} y="26" width={half * 2} height="100" fill="#00a5b3" fillOpacity="0.12" />
        <line
          x1={left}
          y1="26"
          x2={left}
          y2="126"
          stroke="rgba(102,203,213,0.55)"
          strokeDasharray="3 3"
        />
        <line
          x1={right}
          y1="26"
          x2={right}
          y2="126"
          stroke="rgba(102,203,213,0.55)"
          strokeDasharray="3 3"
        />
        <text x={CENTRE} y="22" textAnchor="middle" className="viz-label viz-label-accent">
          {`PROMISED WINDOW ±${windowMin} MIN`}
        </text>
        <polyline points={POLYLINE_POINTS} fill="none" stroke="#66cbd5" strokeWidth="2.2" />
        <line x1="26" y1="126" x2="356" y2="126" stroke="rgba(255,255,255,0.14)" />
        <text x="26" y="142" className="viz-label">
          EARLY
        </text>
        <text x="356" y="142" textAnchor="end" className="viz-label">
          LATE
        </text>
      </svg>
      <div className="viz-controls">
        <div className="viz-range">
          <label htmlFor="eta-slider">Window</label>
          <input
            id="eta-slider"
            type="range"
            min={5}
            max={45}
            value={windowMin}
            onChange={(e) => setWindowMin(Number(e.target.value))}
          />
        </div>
      </div>
      <dl className="viz-readout" aria-live="polite">
        {STATS.map((stat) => (
          <div
            key={stat.el}
            className={`viz-stat${
              stat.tone === 'signal' ? 'is-signal' : stat.tone === 'accent' ? 'is-accent' : ''
            }`}
          >
            <dt>{stat.label}</dt>
            <dd>{statValues.get(stat.el) ?? '—'}</dd>
          </div>
        ))}
      </dl>
      <div className="viz-detail">
        <p className="viz-detail-title">Widen the promise, or tighten the prediction</p>
        <p>
          The distribution is what your fleet actually does. Widening the window always keeps more
          promises — and costs you the customer&apos;s afternoon. Narrowing the distribution is the
          only move that improves both, and that comes from your telematics, not a wider SLA.
        </p>
      </div>
      <figcaption className="sr-only">
        Predicted arrival times against an adjustable promised delivery window, showing what share
        of arrivals land inside it.
      </figcaption>
    </figure>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizStat } from '@/components/viz/types';

import { bell } from './viz-math';

const N = 26;
const X0 = 26;
const BW = 13.4;
const DEFAULT_T = 17;
const PLOT_RIGHT = 380;
const BASE_Y = 150;
const GH = 104;
const BH = 84;

const GOOD = bell(N, 7.5, 26, 620);
const BAD = bell(N, 19.5, 18, 44);
const GMAX = Math.max(...GOOD);
const BMAX = Math.max(...BAD);
const GOOD_TOTAL = GOOD.reduce((a, b) => a + b, 0);
const BAD_TOTAL = BAD.reduce((a, b) => a + b, 0);

const STATS: VizStat[] = [
  { el: 'm-caught', label: 'Fraud value caught', tone: 'accent' },
  { el: 'm-fpr', label: 'Good customers stopped', tone: 'signal' },
  { el: 'm-review', label: 'Reviews per 10k' },
];

function fmtPct(n: number, digits: number): string {
  return `${n.toFixed(digits)}%`;
}

function fmtInt(n: number): string {
  return String(Math.round(n));
}

/** Fraud scoring panel: drag the cut-off across two bell-curve populations. */
export function ThresholdPanel() {
  const figureRef = useRef<HTMLElement>(null);
  const [cutoff, setCutoff] = useState(DEFAULT_T);

  const statValues = useMemo(() => {
    let gAbove = 0;
    let bAbove = 0;
    for (let i = 0; i < N; i++) {
      if (i >= cutoff) {
        gAbove += GOOD[i] ?? 0;
        bAbove += BAD[i] ?? 0;
      }
    }
    const flagged = gAbove + bAbove;
    const total = GOOD_TOTAL + BAD_TOTAL;
    return new Map<string, string>([
      ['m-caught', fmtPct((bAbove / BAD_TOTAL) * 100, 0)],
      ['m-fpr', fmtPct((gAbove / GOOD_TOTAL) * 100, 1)],
      ['m-review', fmtInt((flagged / total) * 10000)],
    ]);
  }, [cutoff]);

  const cutX = X0 + cutoff * BW;

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
    <figure
      ref={figureRef}
      className="viz"
      data-viz="threshold"
      role="group"
      aria-label="Where you set the cut-off"
    >
      <div className="viz-head">
        <span className="viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="viz-title">Where you set the cut-off</span>
        <span className="viz-hint">
          <i aria-hidden="true" />
          Drag the cut-off
        </span>
      </div>
      <svg
        className="viz-plot"
        viewBox="0 0 400 176"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="thr1" />
        <rect
          x={cutX}
          y="20"
          width={PLOT_RIGHT - cutX}
          height="130"
          fill="#00a5b3"
          opacity="0.07"
        />
        {GOOD.map((g, i) => {
          const x = X0 + i * BW;
          const gH = (g / GMAX) * GH;
          const bH = ((BAD[i] ?? 0) / BMAX) * BH;
          const above = i >= cutoff;
          return (
            <g key={i} data-bucket={i} opacity={above ? 0.95 : 0.3}>
              <rect x={x} y={BASE_Y - gH} width={BW - 2.6} height={gH} rx="1.5" fill="#0b6f7d" />
              <rect
                x={x}
                y={BASE_Y - bH}
                width={BW - 2.6}
                height={bH}
                rx="1.5"
                fill="none"
                stroke="#f4711a"
                strokeWidth="1.4"
              />
              <rect
                x={x}
                y={BASE_Y - bH}
                width={BW - 2.6}
                height={bH}
                rx="1.5"
                fill="#f4711a"
                fillOpacity="0.42"
              />
            </g>
          );
        })}
        <line
          x1={cutX}
          y1="18"
          x2={cutX}
          y2="156"
          stroke="#66cbd5"
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <text x={cutX + 5} y="30" className="viz-label viz-label-accent">
          CUT-OFF
        </text>
        <line x1="26" y1="150" x2="380" y2="150" stroke="rgba(255,255,255,0.14)" />
        <text x="26" y="166" className="viz-label">
          LOWER RISK
        </text>
        <text x="380" y="166" textAnchor="end" className="viz-label">
          HIGHER RISK
        </text>
      </svg>
      <div className="viz-controls">
        <div className="viz-range">
          <label htmlFor="thr-slider">Cut-off</label>
          <input
            id="thr-slider"
            type="range"
            min={1}
            max={N - 1}
            value={cutoff}
            onChange={(e) => setCutoff(Number(e.target.value))}
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
        <p className="viz-detail-title">Score distribution</p>
        <p>
          Score distribution for legitimate and fraudulent transactions. Moving the cut-off trades
          fraud caught against good customers stopped.
        </p>
        <div className="viz-kv">
          <span>Legitimate</span>
          <span>Fraud</span>
        </div>
      </div>
      <figcaption className="sr-only">
        Score distribution for legitimate and fraudulent transactions. Moving the cut-off trades
        fraud caught against good customers stopped.
      </figcaption>
    </figure>
  );
}

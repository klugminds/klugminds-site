'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizStat } from '@/components/viz/types';

const SKUS = [
  { key: 'sku4471', label: 'SKU-4471', baseSlot: 0, rankedSlot: 2, baseW: 34, rankedW: 52 },
  { key: 'sku1180', label: 'SKU-1180', baseSlot: 1, rankedSlot: 0, baseW: 56, rankedW: 128 },
  { key: 'sku9032', label: 'SKU-9032', baseSlot: 2, rankedSlot: 1, baseW: 44, rankedW: 94 },
  { key: 'sku2265', label: 'SKU-2265', baseSlot: 3, rankedSlot: 3, baseW: 26, rankedW: 30 },
] as const;

const SLOT_Y = [40, 70, 100, 130];

const BASELINE = {
  title: 'Baseline ordering',
  text: 'Sorted by catalogue position and recency — the default that treats every session as the same session.',
};

const RANKED = {
  title: 'Ranked for this session',
  text: 'Re-ordered on predicted click-through for this shopper, in this session, at this price. The top slot wins the session, so it is the only slot worth optimising hard.',
};

const STATS: VizStat[] = [
  { el: 'm-mode', label: 'Ordering' },
  { el: 'm-top', label: 'Top slot' },
  { el: 'm-ctr', label: 'Session click-through', tone: 'accent' },
];

/** E-commerce panel: baseline catalogue ordering vs learning-to-rank reordering. */
export function RankingPanel() {
  const figureRef = useRef<HTMLElement>(null);
  const [ranked, setRanked] = useState(false);

  const detail = ranked ? RANKED : BASELINE;
  const statValues = useMemo(
    () =>
      new Map<string, string>([
        ['m-mode', ranked ? 'Ranked' : 'Baseline'],
        ['m-top', ranked ? 'SKU-1180' : 'SKU-4471'],
        ['m-ctr', ranked ? '6.4%' : '2.9%'],
      ]),
    [ranked],
  );

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
      data-viz="ranking"
      role="group"
      aria-label="Learning to rank"
    >
      <div className="viz-head">
        <span className="viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="viz-title">Learning to rank</span>
        <span className="viz-hint">
          <i aria-hidden="true" />
          Apply the model
        </span>
      </div>
      <svg
        className="viz-plot"
        viewBox="0 0 380 160"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="rnk1" />
        <text x="22" y="26" className="viz-label">
          RESULT SLOTS · PREDICTED CLICK-THROUGH
        </text>
        <line x1="88" y1="30" x2="88" y2="150" stroke="rgba(255,255,255,0.14)" />
        {SKUS.map((sku) => {
          const slot = ranked ? sku.rankedSlot : sku.baseSlot;
          const y = SLOT_Y[slot] ?? 40;
          const w = ranked ? sku.rankedW : sku.baseW;
          return (
            <g key={sku.key} className="viz-move" transform={`translate(0 ${y})`}>
              <text x="22" y="12" className="viz-label viz-label-strong">
                {sku.label}
              </text>
              <rect
                className="viz-bar"
                x="96"
                y="3"
                width={w}
                height="12"
                rx="6"
                fill={ranked ? '#00a5b3' : 'rgba(255,255,255,0.28)'}
              />
            </g>
          );
        })}
        {SLOT_Y.map((y, i) => (
          <text key={i} x="352" y={y + 12} textAnchor="end" className="viz-label">
            {`SLOT ${i + 1}`}
          </text>
        ))}
      </svg>
      <div className="viz-controls">
        <button
          type="button"
          className="viz-btn"
          onClick={() => setRanked((on) => !on)}
          aria-pressed={ranked}
        >
          {ranked ? 'Show the baseline' : 'Apply the model'}
        </button>
      </div>
      <dl className="viz-readout" aria-live="polite">
        {STATS.map((stat) => (
          <div key={stat.el} className={`viz-stat${stat.tone === 'accent' ? 'is-accent' : ''}`}>
            <dt>{stat.label}</dt>
            <dd>{statValues.get(stat.el) ?? '—'}</dd>
          </div>
        ))}
      </dl>
      <div className="viz-detail">
        <p className="viz-detail-title">{detail.title}</p>
        <p>{detail.text}</p>
      </div>
      <figcaption className="sr-only">
        Four results ordered by catalogue position, then re-ordered by predicted click-through for
        the current session.
      </figcaption>
    </figure>
  );
}

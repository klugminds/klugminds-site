'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizStat } from '@/components/viz/types';

const STABLE_DETAIL = {
  title: 'Stable',
  text: 'Feature distributions sit inside tolerance. The monitoring plane went live before the model did, so this baseline predates the first scored request.',
};

const DRIFT_DETAIL = {
  title: 'Threshold breached — day 17',
  text: 'An upstream schema change shifted one feature. The runbook fires: page the named engineer, freeze auto-decisions above the review band, retrain on the post-change window.',
};

const STATS: VizStat[] = [
  { el: 'm-psi', label: 'Population stability', tone: 'accent' },
  { el: 'm-status', label: 'Status', tone: 'accent' },
  { el: 'm-window', label: 'Watch window' },
];

function buildPoints(): { stable: string; drifted: string } {
  const stable: string[] = [];
  const drifted: string[] = [];
  for (let i = 0; i < 30; i++) {
    const x = 24 + i * 11;
    const y = 88 + Math.sin(i / 2.4) * 11;
    stable.push(`${x},${y.toFixed(1)}`);
    const dy = i < 16 ? 0 : (i - 16) * 3.6;
    drifted.push(`${x},${(y - dy).toFixed(1)}`);
  }
  return { stable: stable.join(' '), drifted: drifted.join(' ') };
}

/** MLOps panel: population stability with an injectable drift alert. */
export function DriftPanel() {
  const figureRef = useRef<HTMLElement>(null);
  const [driftOn, setDriftOn] = useState(false);
  const points = useMemo(() => buildPoints(), []);

  const detail = driftOn ? DRIFT_DETAIL : STABLE_DETAIL;
  const statValues = new Map<string, string>([
    ['m-psi', driftOn ? '0.31' : '0.06'],
    ['m-status', driftOn ? 'Breached' : 'Stable'],
    ['m-window', '30 days'],
  ]);

  const toggleDrift = useCallback(() => {
    setDriftOn((on) => !on);
  }, []);

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
      data-viz="drift"
      role="group"
      aria-label="Drift monitoring"
    >
      <div className="viz-head">
        <span className="viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="viz-title">Drift monitoring</span>
        <span className="viz-hint">
          <i aria-hidden="true" />
          Trigger an alert
        </span>
      </div>
      <svg
        className="viz-plot"
        viewBox="0 0 380 146"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="drf1" />
        <rect x="24" y="42" width="332" height="58" fill="#00a5b3" opacity="0.07" />
        <line
          x1="24"
          y1="42"
          x2="356"
          y2="42"
          stroke="rgba(244,113,26,0.5)"
          strokeDasharray="4 4"
        />
        <text x="28" y="36" className="viz-label viz-label-signal">
          ALERT THRESHOLD
        </text>
        <polyline
          points={points.stable}
          fill="none"
          stroke="#66cbd5"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polyline
          className="viz-fade"
          opacity={driftOn ? 1 : 0}
          points={points.drifted}
          fill="none"
          stroke="#f4711a"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <g className="viz-fade" opacity={driftOn ? 1 : 0}>
          <circle cx="343" cy="38" r="12" fill="#f4711a" opacity="0.3" className="viz-alert-ring" />
        </g>
        <circle
          className="viz-fade"
          opacity={driftOn ? 1 : 0}
          cx="343"
          cy="38"
          r="5"
          fill="#f4711a"
        />
        <line x1="24" y1="118" x2="356" y2="118" stroke="rgba(255,255,255,0.14)" />
        <text x="24" y="134" className="viz-label">
          FEATURE STABILITY · TRAILING 30 DAYS
        </text>
      </svg>
      <div className="viz-controls">
        <button
          type="button"
          className="viz-btn is-signal"
          onClick={toggleDrift}
          aria-pressed={driftOn}
        >
          {driftOn ? 'Reset the feed' : 'Inject drift'}
        </button>
      </div>
      <dl className="viz-readout" aria-live="polite">
        {STATS.map((stat) => (
          <div
            key={stat.el}
            className={`viz-stat${
              stat.el === 'm-status'
                ? driftOn
                  ? 'is-signal'
                  : 'is-accent'
                : stat.tone === 'accent'
                  ? 'is-accent'
                  : ''
            }`}
          >
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
        Population stability over thirty days, with an injected drift that breaches the alert
        threshold on day seventeen.
      </figcaption>
    </figure>
  );
}

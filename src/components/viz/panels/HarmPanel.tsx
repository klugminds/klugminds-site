'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizStat } from '@/components/viz/types';

import { harmPoints } from './viz-math';

const PTS = harmPoints();
const DEFAULT_SESSION = 10;

const TIERS = [
  {
    max: 24,
    name: 'Watch',
    title: 'Watch',
    action:
      'Nothing sent. The trajectory is inside normal variation, and a message here would be noise the player learns to ignore.',
    colour: '#00a5b3',
    alert: false,
  },
  {
    max: 49,
    name: 'Nudge',
    title: 'Nudge',
    action:
      "An in-session reality check with the player's own numbers: time played, net position, deposits this week.",
    colour: '#00a5b3',
    alert: false,
  },
  {
    max: 74,
    name: 'Limit',
    title: 'Limit prompt',
    action:
      'A deposit-limit prompt pre-filled below the current trajectory, plus a cooling-off offer. Outcome is recorded as a label.',
    colour: '#fb923c',
    alert: false,
  },
  {
    max: 200,
    name: 'Outreach',
    title: 'Human outreach',
    action:
      'Routed to a named safer-gambling queue for a person to call, with the evidence trail attached for the file review.',
    colour: '#f4711a',
    alert: true,
  },
] as const;

const STATS: VizStat[] = [
  { el: 'm-session', label: 'Session' },
  { el: 'm-score', label: 'Harm score' },
  { el: 'm-tier', label: 'Response tier', tone: 'accent' },
];

const POLYLINE = PTS.map(([x, y]) => `${x},${y}`).join(' ');

/** Responsible gaming panel: scrub sessions along a harm trajectory. */
export function HarmPanel() {
  const figureRef = useRef<HTMLElement>(null);
  const [session, setSession] = useState(DEFAULT_SESSION);

  const idx = session - 1;
  const point: [number, number, number] = PTS[idx] ?? [26, 116, 10];
  const [cx, cy, score] = point;
  const tier = TIERS.find((t) => score <= t.max) ?? TIERS[0];

  const statValues = useMemo(
    () =>
      new Map<string, string>([
        ['m-session', String(session)],
        ['m-score', String(score)],
        ['m-tier', tier.name],
      ]),
    [session, score, tier.name],
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
      data-viz="harm"
      role="group"
      aria-label="Harm trajectory"
    >
      <div className="viz-head">
        <span className="viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="viz-title">Harm trajectory</span>
        <span className="viz-hint">
          <i aria-hidden="true" />
          Scrub the sessions
        </span>
      </div>
      <svg
        className="viz-plot"
        viewBox="0 0 380 148"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="hrm1" />
        <rect x="26" y="24" width="330" height="26" fill="#f4711a" opacity="0.08" />
        <line
          x1="26"
          y1="50"
          x2="356"
          y2="50"
          stroke="rgba(244,113,26,0.45)"
          strokeDasharray="4 3"
        />
        <text x="30" y="38" className="viz-label viz-label-signal">
          HARM THRESHOLD
        </text>
        <polyline
          points={POLYLINE}
          fill="none"
          stroke="#66cbd5"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <line
          x1={cx}
          y1="22"
          x2={cx}
          y2="122"
          stroke="rgba(255,255,255,0.22)"
          strokeDasharray="2 3"
        />
        <circle cx={cx} cy={cy} r="5.5" fill={tier.colour} stroke="#081f4a" strokeWidth="2" />
        <line x1="26" y1="122" x2="356" y2="122" stroke="rgba(255,255,255,0.14)" />
        <text x="26" y="138" className="viz-label">
          SESSION 1
        </text>
        <text x="356" y="138" textAnchor="end" className="viz-label">
          SESSION 32
        </text>
      </svg>
      <div className="viz-controls">
        <div className="viz-range">
          <label htmlFor="harm-slider">Session</label>
          <input
            id="harm-slider"
            type="range"
            min={1}
            max={32}
            value={session}
            onChange={(e) => setSession(Number(e.target.value))}
          />
        </div>
      </div>
      <dl className="viz-readout" aria-live="polite">
        {STATS.map((stat) => (
          <div
            key={stat.el}
            className={`viz-stat${
              stat.el === 'm-tier' && tier.alert
                ? 'is-signal'
                : stat.tone === 'signal'
                  ? 'is-signal'
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
        <h4>{tier.title}</h4>
        <p>{tier.action}</p>
      </div>
      <figcaption className="sr-only">
        A player&apos;s harm score across thirty-two sessions. Each band maps to one specific,
        recorded intervention.
      </figcaption>
    </figure>
  );
}

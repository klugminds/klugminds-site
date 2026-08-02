'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizStat } from '@/components/viz/types';

const GATE_NAMES = ['SAST', 'SCA', 'SECRETS', 'DAST', 'SBOM'] as const;

const GATE_INFO = [
  {
    title: 'SAST — passed',
    text: 'Static analysis on the diff only, so review time goes to new findings rather than the backlog.',
    blocks: false,
  },
  {
    title: 'SCA — passed',
    text: 'Dependencies pinned, provenance checked, and the lockfile diff reviewed as part of the change.',
    blocks: false,
  },
  {
    title: 'Secret detection — blocked',
    text: 'A live API key in a test fixture. The merge stops here, attached to the commit that introduced it, rather than surfacing in a quarterly report.',
    blocks: true,
  },
  {
    title: 'DAST',
    text: 'Runs against the ephemeral environment for this branch.',
    blocks: false,
  },
  {
    title: 'SBOM',
    text: 'Generated per release and signed with the artefact.',
    blocks: false,
  },
] as const;

const IDLE = {
  title: 'Five gates, every merge',
  text: 'Static analysis, dependency provenance, secret detection, a dynamic pass, and an SBOM. Run it and watch where a real pull request stops.',
};

const STATS: VizStat[] = [
  { el: 'm-status', label: 'Pipeline' },
  { el: 'm-passed', label: 'Gates passed', tone: 'accent' },
];

type GateState = 'idle' | 'pass' | 'block';

/** DevSecOps panel: open a pull request and watch CI gates run. */
export function GatesPanel() {
  const figureRef = useRef<HTMLElement>(null);
  const timersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [passed, setPassed] = useState('0/5');
  const [gateStates, setGateStates] = useState<GateState[]>(Array(5).fill('idle'));
  const [detail, setDetail] = useState(IDLE);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setRunning(false);
    setStatus('Idle');
    setPassed('0/5');
    setGateStates(Array(5).fill('idle'));
    setDetail(IDLE);
  }, [clearTimers]);

  const runPipeline = useCallback(() => {
    clearTimers();
    setRunning(true);
    setStatus('Scanning');
    setPassed('0/5');
    setGateStates(Array(5).fill('idle'));
    setDetail(IDLE);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduced ? 60 : 620;

    const step = (i: number, passCount: number) => {
      if (i >= GATE_NAMES.length) {
        setStatus('Merged');
        setRunning(false);
        return;
      }
      const info = GATE_INFO[i]!;
      setGateStates((prev) => {
        const next = [...prev];
        next[i] = info.blocks ? 'block' : 'pass';
        return next;
      });
      setDetail({ title: info.title, text: info.text });
      if (info.blocks) {
        setStatus('Blocked');
        setPassed(`${passCount}/${GATE_NAMES.length}`);
        setRunning(false);
        return;
      }
      const nextPass = passCount + 1;
      setPassed(`${nextPass}/${GATE_NAMES.length}`);
      setStatus('Scanning');
      timersRef.current.push(setTimeout(() => step(i + 1, nextPass), delay));
    };

    timersRef.current.push(setTimeout(() => step(0, 0), delay));
  }, [clearTimers]);

  const handleClick = () => {
    if (running || status === 'Blocked' || status === 'Merged') {
      reset();
      return;
    }
    runPipeline();
  };

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

  useEffect(() => () => clearTimers(), [clearTimers]);

  const statValues = new Map<string, string>([
    ['m-status', status],
    ['m-passed', passed],
  ]);

  const buttonLabel =
    running || status === 'Blocked' || status === 'Merged'
      ? 'Reset pipeline'
      : 'Open a pull request';

  return (
    <figure
      ref={figureRef}
      className="viz"
      data-viz="gates"
      role="group"
      aria-label="CI security gates"
    >
      <div className="viz-head">
        <span className="viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="viz-title">CI security gates</span>
        <span className="viz-hint">
          <i aria-hidden="true" />
          Run the pipeline
        </span>
      </div>
      <svg
        className="viz-plot"
        viewBox="0 0 360 126"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="gts1" />
        <rect
          x="18"
          y="56"
          width="42"
          height="26"
          rx="6"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.2)"
        />
        <text x="39" y="72" textAnchor="middle" className="viz-label viz-label-strong">
          PR
        </text>
        <line x1="60" y1="69" x2="342" y2="69" stroke="rgba(102,203,213,0.22)" strokeWidth="2" />
        {GATE_NAMES.map((name, i) => {
          const x = 84 + i * 58;
          const state = gateStates[i];
          const stroke =
            state === 'block' ? '#f4711a' : state === 'pass' ? '#00a5b3' : 'rgba(255,255,255,0.22)';
          const markFill = state === 'block' ? '#f4711a' : '#00a5b3';
          return (
            <g key={name} data-gate={i}>
              <rect
                x={x - 24}
                y="54"
                width="48"
                height="30"
                rx="7"
                fill="#0d2c65"
                stroke={stroke}
                strokeWidth="1.8"
              />
              <text x={x} y="73" textAnchor="middle" className="viz-label viz-label-strong">
                {name}
              </text>
              <circle cx={x} cy="40" r="5.5" fill={markFill} opacity={state === 'idle' ? 0 : 1} />
            </g>
          );
        })}
        <text x="18" y="112" className="viz-label">
          FINDINGS BLOCK THE MERGE THAT INTRODUCED THEM
        </text>
      </svg>
      <div className="viz-controls">
        <button type="button" className="viz-btn" onClick={handleClick} aria-pressed={running}>
          {buttonLabel}
        </button>
      </div>
      <dl className="viz-readout cols-2" aria-live="polite">
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
        A pull request passing static analysis and dependency scanning, then being blocked by secret
        detection.
      </figcaption>
    </figure>
  );
}

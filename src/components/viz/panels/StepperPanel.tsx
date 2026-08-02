import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const PHASES = [
  { key: 'frame', label: 'FRAME', dur: '2–4 weeks', x: 46 },
  { key: 'design', label: 'DESIGN', dur: '3–6 weeks', x: 130 },
  { key: 'deliver', label: 'DELIVER', dur: '6–12 weeks', x: 214 },
  { key: 'deploy', label: 'DEPLOY', dur: '2–4 weeks', x: 298 },
  { key: 'operate', label: 'OPERATE', dur: 'ongoing', x: 378 },
] as const;

const CONFIG: VizConfig = {
  initial: 'frame',
  items: {
    frame: {
      title: 'Frame — a written decision document',
      text: 'Which decision changes, who acts on it, and what the counterfactual is. Most projects that fail, fail here, before any modelling.',
      kv: ['decision document', 'success criteria', 'go / no-go'],
      stats: [
        ['m-phase', 'Frame'],
        ['m-dur', '2–4 weeks'],
        ['m-gate', 'Go / no-go'],
      ],
    },
    design: {
      title: 'Design — pipeline, features, and a baseline to beat',
      text: 'A deliberately unambitious baseline, agreed up front, so there is a number the model has to beat before anyone celebrates.',
      kv: ['feature store', 'baseline', 'monitoring plan'],
      stats: [
        ['m-phase', 'Design'],
        ['m-dur', '3–6 weeks'],
        ['m-gate', 'Baseline agreed'],
      ],
    },
    deliver: {
      title: 'Deliver — build, tune, validate',
      text: 'Challenger comparison, stress tests, and fairness diagnostics run every release as part of the harness, not as a later project.',
      kv: ['validation report', 'challenger model', 'fairness pack'],
      stats: [
        ['m-phase', 'Deliver'],
        ['m-dur', '6–12 weeks'],
        ['m-gate', 'Validation'],
      ],
    },
    deploy: {
      title: 'Deploy — shadow, canary, measured',
      text: 'Rollback criteria agreed before traffic moves. Your team shadows ours through the whole staged rollout.',
      kv: ['shadow', 'canary', 'runbook'],
      stats: [
        ['m-phase', 'Deploy'],
        ['m-dur', '2–4 weeks'],
        ['m-gate', 'Rollback criteria'],
      ],
    },
    operate: {
      title: 'Operate — the phase most vendors skip',
      text: "Drift response, retraining on a published cadence, and a quarterly review that can conclude 'retire this model'.",
      kv: ['named engineer', 'quarterly review', 'retirement criteria'],
      stats: [
        ['m-phase', 'Operate'],
        ['m-dur', 'ongoing'],
        ['m-gate', 'Quarterly review'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-phase', label: 'Phase' },
  { el: 'm-dur', label: 'Duration' },
  { el: 'm-gate', label: 'Exit gate', tone: 'accent' },
];

/** Delivery panel: five phases from framing to operating the model. */
export function StepperPanel() {
  return (
    <SelectableViz
      kind="stepper"
      title="Delivery pipeline"
      hint="Select a phase"
      config={CONFIG}
      stats={STATS}
      caption="Five delivery phases from framing a decision to operating the model, each with a duration and an exit gate."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 424 118"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="stp1" />
        <line x1="46" y1="72" x2="378" y2="72" stroke="rgba(102,203,213,0.22)" strokeWidth="2" />
        <line
          className="viz-flow"
          x1="46"
          y1="72"
          x2="378"
          y2="72"
          stroke="#66cbd5"
          strokeWidth="2"
        />
        {PHASES.map((phase, i) => (
          <g key={phase.key} className="viz-hit" data-key={phase.key} aria-label={phase.label}>
            <circle
              className="viz-ring"
              cx={phase.x}
              cy="72"
              r="21"
              fill="#66cbd5"
              fillOpacity="0.16"
            />
            <circle
              cx={phase.x}
              cy="72"
              r="14"
              fill="#0d2c65"
              stroke={i === 4 ? '#00a5b3' : '#66cbd5'}
              strokeWidth="2"
            />
            <text
              x={phase.x}
              y="76"
              textAnchor="middle"
              className="viz-label viz-label-accent"
              fontSize="9"
            >
              {`0${i + 1}`}
            </text>
            <text x={phase.x} y="42" textAnchor="middle" className="viz-label viz-label-strong">
              {phase.label}
            </text>
            <text x={phase.x} y="104" textAnchor="middle" className="viz-label">
              {phase.dur}
            </text>
          </g>
        ))}
      </svg>
    </SelectableViz>
  );
}

import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const LEVELS = [
  { key: 'observe', label: 'OBSERVE', x: 40, blocked: false },
  { key: 'suggest', label: 'SUGGEST', x: 108, blocked: false },
  { key: 'draft', label: 'DRAFT', x: 176, blocked: false },
  { key: 'act', label: 'ACT', x: 244, blocked: false },
  { key: 'decide', label: 'DECIDE', x: 312, blocked: true },
] as const;

const CONFIG: VizConfig = {
  initial: 'draft',
  items: {
    observe: {
      title: 'Observe — the agent watches',
      text: 'Scores and summarises live activity and changes nothing. Useful for a fortnight, because it tells you whether the agent is any good before anyone depends on it.',
      kv: ['read-only', 'shadow period'],
      stats: [
        ['m-level', 'Observe'],
        ['m-check', 'None needed'],
        ['m-rev', 'Yes — reads only'],
      ],
    },
    suggest: {
      title: 'Suggest — the agent ranks',
      text: 'Reorders the queue and recommends which cases to open first. An analyst can ignore every suggestion.',
      kv: ['ranks the queue', 'disagreement tracked'],
      stats: [
        ['m-level', 'Suggest'],
        ['m-check', 'Before anything moves'],
        ['m-rev', 'Yes — advice only'],
      ],
    },
    draft: {
      title: 'Draft — the agent writes, a person sends',
      text: 'The agent produces the artefact an analyst would have written and attaches its sources. Nothing reaches a customer, a regulator, or the ledger without a signature.',
      kv: ['default for filings', 'full audit trail'],
      stats: [
        ['m-level', 'Draft'],
        ['m-check', 'Before it is sent'],
        ['m-rev', 'n/a — nothing acted'],
      ],
    },
    act: {
      title: 'Act — but only where undo is real',
      text: 'Step-up a session, hold a payout for review, request a document. Each one is undone by a single click.',
      kv: ['undo in one click', 'hourly review'],
      stats: [
        ['m-level', 'Act, reversible'],
        ['m-check', 'Review within the hour'],
        ['m-rev', 'Yes — one click back'],
      ],
    },
    decide: {
      title: 'Decide — the line we do not cross',
      text: 'Closing an account, filing a report, moving money, declining credit. These are irreversible for the person on the other end, so an agent will not do them here.',
      kv: ['irreversible', 'human only'],
      stats: [
        ['m-level', 'Decide'],
        ['m-check', 'Not offered'],
        ['m-rev', 'No'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-level', label: 'Level' },
  { el: 'm-check', label: 'Human checkpoint', tone: 'accent' },
  { el: 'm-rev', label: 'Reversible' },
];

/** Topic explorer: five autonomy levels with human checkpoints. */
export function AutonomyPanel() {
  return (
    <SelectableViz
      kind="autonomy"
      title="Autonomy dial"
      hint="Select a level"
      config={CONFIG}
      stats={STATS}
      caption="Five autonomy levels from read-only observation to irreversible decisions, with the human checkpoint required at each, and the top level marked as one Klugminds does not ship."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 350 142"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="aut1" />
        <line
          x1="40"
          y1="66"
          x2="312"
          y2="66"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="40"
          y1="66"
          x2="176"
          y2="66"
          stroke="#00a5b3"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {LEVELS.map((level) => (
          <g key={level.key} className="viz-hit" data-key={level.key} aria-label={level.label}>
            <circle
              className="viz-ring"
              cx={level.x}
              cy="66"
              r="14"
              fill="#66cbd5"
              fillOpacity="0.16"
            />
            <circle
              cx={level.x}
              cy="66"
              r="8"
              fill="#0d2c65"
              stroke={level.blocked ? '#f4711a' : 'rgba(255,255,255,0.3)'}
              strokeWidth="1.8"
            />
            <text
              x={level.x}
              y="50"
              textAnchor="middle"
              className={level.blocked ? 'viz-label viz-label-signal' : 'viz-label'}
            >
              {level.label}
            </text>
          </g>
        ))}
        <rect
          x="288"
          y="34"
          width="52"
          height="62"
          rx="8"
          fill="rgba(244,113,26,0.09)"
          stroke="rgba(244,113,26,0.4)"
          strokeDasharray="3 3"
        />
        <text x="314" y="112" textAnchor="middle" className="viz-label viz-label-signal">
          WE STOP HERE
        </text>
        <text x="40" y="132" className="viz-label">
          AUTONOMY IS HONEST ONLY WHERE THE ACTION CAN BE UNDONE
        </text>
      </svg>
    </SelectableViz>
  );
}

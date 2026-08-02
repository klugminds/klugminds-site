import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const STAGES = ['PLAN', 'RETRIEVE', 'ANALYSE', 'VERIFY', 'DRAFT'] as const;

const CONFIG: VizConfig = {
  initial: 'ring',
  items: {
    ring: {
      title: 'Find the network',
      text: "Is this alert part of a larger network? Plan, retrieve, analyse, verify, draft — seven minutes of agent time; the decision is still the analyst's.",
      kv: ['GRAPH', 'SQL', 'DOCS', '7.0 min'],
      stats: [
        ['m-task', 'Find network'],
        ['m-stages', '5'],
        ['m-signoff', 'Analyst'],
      ],
    },
    sar: {
      title: 'Draft a narrative',
      text: 'Draft the narrative for this confirmed case. Each sentence has to point at a record; gaps are flagged, not written around.',
      kv: ['CASE', 'SQL', 'DOCS', '9.1 min'],
      stats: [
        ['m-task', 'Draft narrative'],
        ['m-stages', '5'],
        ['m-signoff', 'MLRO'],
      ],
    },
    rule: {
      title: 'Author a rule',
      text: 'Turn this pattern into a candidate rule. Backtested on twelve months of history with the false-positive cost known before deploy.',
      kv: ['SQL', 'BACKTEST', 'SIM', '11.8 min'],
      stats: [
        ['m-task', 'Author rule'],
        ['m-stages', '5'],
        ['m-signoff', 'Risk owner'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-task', label: 'Question' },
  { el: 'm-stages', label: 'Stages' },
  { el: 'm-signoff', label: 'Sign-off', tone: 'accent' },
];

/** Topic explorer: three analyst questions through the same five-stage agent run. */
export function PromptsPanel() {
  return (
    <SelectableViz
      kind="prompts"
      title="Agent run"
      hint="Select a question"
      config={CONFIG}
      stats={STATS}
      caption="An agent answering three real analyst questions through the same five stages, with the tool calls and elapsed time for each."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 360 162"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="prm1" />
        <rect
          x="16"
          y="26"
          width="328"
          height="26"
          rx="7"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.16)"
        />
        <text x="27" y="43" className="viz-label viz-label-accent">
          ANALYST ASKS →
        </text>
        {(['ring', 'sar', 'rule'] as const).map((key, i) => {
          const item = CONFIG.items[key]!;
          return (
            <g key={key} className="viz-hit" data-key={key} aria-label={item.title}>
              <rect
                className="viz-ring"
                x={16 + i * 110}
                y="58"
                width="104"
                height="36"
                rx="7"
                fill="#66cbd5"
                fillOpacity="0.14"
              />
              <text
                x={68 + i * 110}
                y="80"
                textAnchor="middle"
                className="viz-label viz-label-strong"
                fontSize="7"
              >
                {key === 'ring' ? 'NETWORK?' : key === 'sar' ? 'NARRATIVE' : 'RULE'}
              </text>
            </g>
          );
        })}
        <line x1="30" y1="110" x2="330" y2="110" stroke="rgba(102,203,213,0.2)" strokeWidth="2" />
        {STAGES.map((name, i) => {
          const x = 40 + i * 70;
          const gate = i === STAGES.length - 1;
          return (
            <g key={name}>
              <circle
                cx={x}
                cy="110"
                r="9"
                fill="#0d2c65"
                stroke={gate ? '#f4711a' : 'rgba(255,255,255,0.28)'}
                strokeWidth="1.8"
              />
              <text x={x} y="138" textAnchor="middle" className="viz-label">
                {name}
              </text>
            </g>
          );
        })}
        <text x="30" y="152" className="viz-label viz-label-signal">
          THE LAST STAGE IS A DRAFT. A HUMAN STILL DECIDES.
        </text>
      </svg>
    </SelectableViz>
  );
}

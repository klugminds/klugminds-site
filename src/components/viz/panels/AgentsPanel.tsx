import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const LEFT = [
  { key: 'triage', label: 'TRIAGE', y: 44 },
  { key: 'data', label: 'DATA ANALYST', y: 100 },
  { key: 'graph', label: 'GRAPH ANALYST', y: 156 },
] as const;

const RIGHT = [
  { key: 'evidence', label: 'EVIDENCE', y: 44 },
  { key: 'narrative', label: 'NARRATIVE', y: 100 },
  { key: 'rules', label: 'RULE ASSISTANT', y: 156 },
] as const;

const HUB = { x: 175, y: 100 };

const CONFIG: VizConfig = {
  initial: 'case',
  items: {
    case: {
      title: 'One case, six agents',
      text: 'The case is the unit of work, not the chat window. Every agent writes into the same case file, so an investigator reads one trail rather than six transcripts.',
      kv: ['shared state', 'one audit trail'],
      with: ['triage', 'data', 'graph', 'evidence', 'narrative', 'rules', 'case'],
      stats: [
        ['m-agent', 'The case'],
        ['m-reach', 'Case file'],
        ['m-authority', 'Human owns it'],
      ],
    },
    triage: {
      title: 'Triage agent',
      text: "Reads the alert, pulls the customer's history, and assembles the case file before an analyst opens it.",
      kv: ['read-only', 'ranks the queue'],
      with: ['case'],
      stats: [
        ['m-agent', 'Triage'],
        ['m-reach', 'Alerts, history'],
        ['m-authority', 'Proposes'],
      ],
    },
    data: {
      title: 'Data analyst agent',
      text: 'Writes the query an analyst would have asked a data team for, runs it against the warehouse, and returns the table with the SQL attached.',
      kv: ['read-only SQL', 'shows its query'],
      with: ['case'],
      stats: [
        ['m-agent', 'Data analyst'],
        ['m-reach', 'Warehouse'],
        ['m-authority', 'Proposes'],
      ],
    },
    graph: {
      title: 'Graph analyst agent',
      text: 'Expands the linked-account cluster hop by hop and stops when the edges stop paying.',
      kv: ['bounded expansion', 'names the edge'],
      with: ['case'],
      stats: [
        ['m-agent', 'Graph analyst'],
        ['m-reach', 'Entity graph'],
        ['m-authority', 'Proposes'],
      ],
    },
    evidence: {
      title: 'Evidence agent',
      text: 'Gathers documents, registry records, and open sources, and cites each one.',
      kv: ['cites or drops', 'no paraphrase'],
      with: ['case'],
      stats: [
        ['m-agent', 'Evidence'],
        ['m-reach', 'Docs, registries'],
        ['m-authority', 'Proposes'],
      ],
    },
    narrative: {
      title: 'Narrative agent',
      text: 'Drafts the decision or filing narrative from what is in the case file and nothing else.',
      kv: ['draft only', 'flags gaps'],
      with: ['case'],
      stats: [
        ['m-agent', 'Narrative'],
        ['m-reach', 'Case file'],
        ['m-authority', 'Drafts'],
      ],
    },
    rules: {
      title: 'Rule assistant',
      text: 'Turns a pattern an analyst describes in a sentence into a candidate rule, then backtests it on twelve months of history.',
      kv: ['backtests first', 'no auto-deploy'],
      with: ['case'],
      stats: [
        ['m-agent', 'Rule assistant'],
        ['m-reach', 'Rule engine'],
        ['m-authority', 'Proposes'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-agent', label: 'Agent' },
  { el: 'm-reach', label: 'Reaches' },
  { el: 'm-authority', label: 'Authority', tone: 'accent' },
];

/** Topic explorer: six agents working one case file. */
export function AgentsPanel() {
  return (
    <SelectableViz
      kind="agents"
      title="Agent roster"
      hint="Select an agent"
      config={CONFIG}
      stats={STATS}
      caption="Six agents working one case file — triage, data analysis, graph expansion, evidence gathering, narrative drafting, and rule authoring — none of which can act without a human."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 350 200"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="agt1" />
        {[
          { col: LEFT, x: 58, d: 1 },
          { col: RIGHT, x: 292, d: -1 },
        ].map(({ col, x, d }) =>
          col.map((agent) => {
            const sx = x + d * 47;
            const ex = HUB.x - d * 31;
            return (
              <path
                key={agent.key}
                data-edge={`${agent.key}|case`}
                d={`M${sx},${agent.y} C${sx + d * 20},${agent.y} ${ex - d * 20},${HUB.y} ${ex},${HUB.y}`}
                fill="none"
                stroke="rgba(102,203,213,0.32)"
                strokeWidth="1.2"
              />
            );
          }),
        )}
        {[
          { col: LEFT, x: 58 },
          { col: RIGHT, x: 292 },
        ].map(({ col, x }) =>
          col.map((agent) => (
            <g key={agent.key} className="viz-hit" data-key={agent.key} aria-label={agent.label}>
              <rect
                className="viz-ring"
                x={x - 51}
                y={agent.y - 17}
                width="102"
                height="34"
                rx="9"
                fill="#66cbd5"
                fillOpacity="0.15"
              />
              <rect
                x={x - 47}
                y={agent.y - 13}
                width="94"
                height="26"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.2)"
              />
              <text
                x={x}
                y={agent.y + 3}
                textAnchor="middle"
                className="viz-label viz-label-strong"
              >
                {agent.label}
              </text>
            </g>
          )),
        )}
        <g className="viz-hit" data-key="case" aria-label="The case">
          <circle
            className="viz-ring"
            cx={HUB.x}
            cy={HUB.y}
            r="37"
            fill="#00a5b3"
            fillOpacity="0.16"
          />
          <circle cx={HUB.x} cy={HUB.y} r="30" fill="#0d2c65" stroke="#00a5b3" strokeWidth="2" />
          <text x={HUB.x} y={HUB.y - 2} textAnchor="middle" className="viz-label viz-label-accent">
            ONE
          </text>
          <text x={HUB.x} y={HUB.y + 9} textAnchor="middle" className="viz-label viz-label-accent">
            CASE
          </text>
        </g>
        <path d="M175,132 V150" stroke="rgba(244,113,26,0.5)" strokeWidth="1.2" />
        <path
          d="M112,153 H238"
          stroke="#f4711a"
          strokeWidth="1.7"
          strokeDasharray="7 5"
          opacity="0.9"
        />
        <text x="175" y="192" textAnchor="middle" className="viz-label viz-label-signal">
          NOTHING LEAVES THE CASE WITHOUT A NAMED HUMAN
        </text>
      </svg>
    </SelectableViz>
  );
}

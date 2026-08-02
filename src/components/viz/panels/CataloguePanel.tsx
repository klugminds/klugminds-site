import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const ROWS = [
  { key: 'fraud', label: 'FRAUD DETECTION', chips: ['TXN', 'DEVICE', 'GRAPH', 'VELOCITY'] },
  { key: 'aml', label: 'AML MONITORING', chips: ['TXN', 'GRAPH', 'KYC'] },
  { key: 'igaming', label: 'IGAMING INTEGRITY', chips: ['DEVICE', 'GRAPH', 'GAMEPLAY'] },
  { key: 'rg', label: 'RESPONSIBLE GAMING', chips: ['SESSION', 'DEPOSIT'] },
] as const;

const CONFIG: VizConfig = {
  initial: 'fraud',
  items: {
    fraud: {
      title: 'Fraud Detection Suite',
      text: 'Reads the most signal families of the four, so it is usually deployed first — the device and graph features it builds are the ones the other three reuse.',
      kv: ['4 signal families', 'deployed first'],
      stats: [
        ['m-model', 'Fraud detection'],
        ['m-sig', '4'],
        ['m-shared', 'Device + graph'],
      ],
    },
    aml: {
      title: 'AML Monitoring',
      text: 'Shares the transaction and graph features with fraud, which is why the second deployment costs materially less than the first one did.',
      kv: ['3 signal families', 'shares graph'],
      stats: [
        ['m-model', 'AML monitoring'],
        ['m-sig', '3'],
        ['m-shared', 'Txn + graph'],
      ],
    },
    igaming: {
      title: 'iGaming Integrity',
      text: 'The same graph the fraud model builds, read for collusion and multi-accounting instead of payment risk. One graph, two questions.',
      kv: ['3 signal families', 'shares graph'],
      stats: [
        ['m-model', 'iGaming integrity'],
        ['m-sig', '3'],
        ['m-shared', 'Graph + device'],
      ],
    },
    rg: {
      title: 'Responsible Gaming',
      text: 'The only model that reads session and deposit behaviour rather than payment risk, and the only one whose output is an intervention rather than a score.',
      kv: ['2 signal families', 'graded playbook'],
      stats: [
        ['m-model', 'Responsible gaming'],
        ['m-sig', '2'],
        ['m-shared', 'Session store'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-model', label: 'Model' },
  { el: 'm-sig', label: 'Signal families', tone: 'accent' },
  { el: 'm-shared', label: 'Shared layer' },
];

/** Solutions hero panel: the four models and the signal families each reads. */
export function CataloguePanel() {
  return (
    <SelectableViz
      kind="catalogue"
      title="Solution catalogue"
      hint="Select a model"
      config={CONFIG}
      stats={STATS}
      ariaLabel="Solution catalogue"
      caption="Four models and the signal families each one reads, with the layers they share so a second deployment costs less than the first."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 400 202"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="cat3" />
        <text x="20" y="24" className="viz-label">
          MODEL · SIGNAL FAMILIES READ
        </text>
        {ROWS.map((row, i) => {
          const y = i * 30;
          return (
            <g key={row.key} className="viz-hit" data-key={row.key} aria-label={row.label}>
              <rect
                className="viz-ring"
                x="14"
                y={35 + y}
                width="366"
                height="26"
                rx="13"
                fill="#66cbd5"
                fillOpacity="0.13"
              />
              <circle cx="24" cy={48 + y} r="3.4" fill="#00a5b3" />
              <text x="34" y={52 + y} className="viz-label viz-label-strong">
                {row.label}
              </text>
              {row.chips.map((chip, j) => (
                <g key={chip}>
                  <rect
                    x={168 + j * 53}
                    y={40 + y}
                    width="48"
                    height="16"
                    rx="8"
                    fill="#00a5b3"
                    fillOpacity="0.14"
                    stroke="rgba(102,203,213,0.45)"
                    strokeWidth="0.8"
                  />
                  <text
                    x={192 + j * 53}
                    y={52 + y}
                    className="viz-label viz-label-accent"
                    textAnchor="middle"
                  >
                    {chip}
                  </text>
                </g>
              ))}
              <text
                x={168 + row.chips.length * 53 + 8}
                y={52 + y}
                className="viz-label viz-label-strong"
              >
                {row.chips.length}
              </text>
            </g>
          );
        })}
        <line x1="20" y1="176" x2="380" y2="176" stroke="rgba(255,255,255,0.14)" />
        <text x="20" y="192" className="viz-label viz-label-accent">
          FOUR MODELS · ONE FEATURE STORE · ONE EVALUATION HARNESS
        </text>
      </svg>
    </SelectableViz>
  );
}

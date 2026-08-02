import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const ROWS = [
  { key: 'device', label: 'DEVICE', y: 40 },
  { key: 'behaviour', label: 'BEHAVIOUR', y: 84 },
  { key: 'graph', label: 'NETWORK GRAPH', y: 128 },
] as const;

const CONFIG: VizConfig = {
  initial: 'device',
  items: {
    device: {
      title: 'Device intelligence',
      text: 'Fingerprints that survive cookie clearing, private browsing, and a factory reset.',
      kv: ['persistent', 'no cookie reliance'],
      with: ['score'],
      stats: [
        ['m-family', 'Device'],
        ['m-lift', '+14 pts'],
      ],
    },
    behaviour: {
      title: 'Behavioural biometrics',
      text: 'Typing cadence, pointer movement, and form-fill rhythm as a passive signal.',
      kv: ['passive', 'no extra friction'],
      with: ['score'],
      stats: [
        ['m-family', 'Behaviour'],
        ['m-lift', '+21 pts'],
      ],
    },
    graph: {
      title: 'Network graph',
      text: 'Attributes shared across accounts — the layer where coordinated attacks become visible.',
      kv: ['community detection', 'ring-aware'],
      with: ['score'],
      stats: [
        ['m-family', 'Network graph'],
        ['m-lift', '+33 pts'],
      ],
    },
    score: {
      title: 'One score, one decision',
      text: 'Three families scored in a single pass, inside the latency budget, with ranked reason codes attached to the result.',
      kv: ['<80 ms p99', 'reason codes'],
      with: ['device', 'behaviour', 'graph'],
      stats: [
        ['m-family', 'Fused'],
        ['m-lift', '92 / 100'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-family', label: 'Signal family' },
  { el: 'm-lift', label: 'Contribution', tone: 'accent' },
];

/** Fraud panel: device, behavioural, and graph signals fused into one score. */
export function SignalsPanel() {
  return (
    <SelectableViz
      kind="signals"
      title="Signal fusion"
      hint="Select a signal family"
      config={CONFIG}
      stats={STATS}
      statsCols={2}
      caption="Device, behavioural, and network-graph signals fused into one risk score inside a single latency budget."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 360 168"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="sig1" />
        {ROWS.map((row) => (
          <g key={row.key} className="viz-hit" data-key={row.key} aria-label={row.label}>
            <rect
              className="viz-ring"
              x="18"
              y={row.y - 20}
              width="128"
              height="34"
              rx="7"
              fill="#66cbd5"
              fillOpacity="0.14"
            />
            <text x="26" y={row.y - 9} className="viz-label viz-label-strong">
              {row.label}
            </text>
            {Array.from({ length: 9 }, (_, k) => (
              <rect
                key={k}
                x={26 + k * 13}
                y={row.y - 4}
                width="8"
                height="10"
                rx="2"
                fill="#00a5b3"
                opacity={0.25 + k * 0.07}
              />
            ))}
            <path
              data-edge={`${row.key}|score`}
              className="viz-flow"
              d={`M152,${row.y} Q204,${row.y} 240,86`}
              fill="none"
              stroke="rgba(102,203,213,0.42)"
              strokeWidth="1.4"
            />
          </g>
        ))}
        <g className="viz-hit" data-key="score" aria-label="Fused score">
          <circle className="viz-ring" cx="266" cy="86" r="36" fill="#66cbd5" fillOpacity="0.14" />
          <circle cx="266" cy="86" r="30" fill="#00a5b3" opacity="0.12" />
          <circle cx="266" cy="86" r="24" fill="#0d2c65" stroke="#00a5b3" strokeWidth="2" />
          <text
            x="266"
            y="83"
            textAnchor="middle"
            className="viz-label viz-label-accent viz-num-md"
          >
            92
          </text>
          <text x="266" y="94" textAnchor="middle" className="viz-label" fontSize="6">
            RISK
          </text>
        </g>
        <path
          className="viz-flow"
          d="M296,86 L344,86"
          fill="none"
          stroke="#66cbd5"
          strokeWidth="1.6"
        />
        <text
          x="322"
          y="78"
          textAnchor="middle"
          className="viz-label viz-label-accent"
          fontSize="6"
        >
          DECIDE
        </text>
      </svg>
    </SelectableViz>
  );
}

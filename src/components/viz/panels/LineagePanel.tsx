import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const COLS = [
  {
    label: 'SOURCE',
    x: 46,
    items: [
      { key: 'core_txn', text: 'core_txn', y: 44 },
      { key: 'kyc_ref', text: 'kyc_ref', y: 78 },
      { key: 'device_ev', text: 'device_ev', y: 112 },
    ],
  },
  {
    label: 'MODELLED',
    x: 170,
    items: [
      { key: 'txn_clean', text: 'txn_clean', y: 61 },
      { key: 'party', text: 'party', y: 95 },
    ],
  },
  {
    label: 'FEATURE',
    x: 294,
    items: [
      { key: 'velocity_7d', text: 'velocity_7d', y: 44 },
      { key: 'device_age', text: 'device_age', y: 78 },
      { key: 'peer_ratio', text: 'peer_ratio', y: 112 },
    ],
  },
] as const;

const LINKS = [
  ['core_txn', 'txn_clean'],
  ['kyc_ref', 'party'],
  ['device_ev', 'txn_clean'],
  ['core_txn', 'party'],
  ['txn_clean', 'velocity_7d'],
  ['txn_clean', 'peer_ratio'],
  ['party', 'peer_ratio'],
  ['device_ev', 'device_age'],
] as const;

const POS: Record<string, { x: number; y: number }> = {};
for (const col of COLS) {
  for (const item of col.items) {
    POS[item.key] = { x: col.x, y: item.y + 11 };
  }
}

const CONFIG: VizConfig = {
  initial: 'velocity_7d',
  items: {
    velocity_7d: {
      title: 'velocity_7d',
      text: 'Seven-day transaction velocity. Derived from cleaned transactions only — one hop, one owner, one contract.',
      kv: ['1 source', 'owner: risk-data'],
      with: ['txn_clean', 'core_txn', 'device_ev'],
      stats: [
        ['m-node', 'velocity_7d'],
        ['m-hops', '2'],
      ],
    },
    device_age: {
      title: 'device_age',
      text: 'Days since the device was first seen. Traced to the raw event stream, so a schema change upstream fails this build.',
      kv: ['1 source', 'owner: platform'],
      with: ['device_ev'],
      stats: [
        ['m-node', 'device_age'],
        ['m-hops', '1'],
      ],
    },
    peer_ratio: {
      title: 'peer_ratio',
      text: 'Activity against a peer segment. Two upstream tables, so the drift monitor watches both feeds independently.',
      kv: ['2 sources', 'owner: risk-data'],
      with: ['txn_clean', 'party', 'core_txn', 'kyc_ref', 'device_ev'],
      stats: [
        ['m-node', 'peer_ratio'],
        ['m-hops', '2'],
      ],
    },
    txn_clean: {
      title: 'txn_clean',
      text: 'The modelled transaction table. A tested expectation on every column; a failure here fails the pipeline rather than a dashboard.',
      kv: ['quality tests', 'deprecation path'],
      with: ['core_txn', 'device_ev', 'velocity_7d', 'peer_ratio'],
      stats: [
        ['m-node', 'txn_clean'],
        ['m-hops', '1'],
      ],
    },
    party: {
      title: 'party',
      text: 'Resolved customer entity. Master data with named ownership, which is what makes the peer segment defensible.',
      kv: ['MDM', 'named owner'],
      with: ['kyc_ref', 'core_txn', 'peer_ratio'],
      stats: [
        ['m-node', 'party'],
        ['m-hops', '1'],
      ],
    },
    core_txn: {
      title: 'core_txn',
      text: 'Source system. Bound to consumers by a schema contract enforced in CI, so a breaking change cannot ship quietly.',
      kv: ['contract in CI'],
      with: ['txn_clean', 'party'],
      stats: [
        ['m-node', 'core_txn'],
        ['m-hops', '0'],
      ],
    },
    kyc_ref: {
      title: 'kyc_ref',
      text: 'Reference data for identity attributes. Refresh cadence documented per field.',
      kv: ['cadence documented'],
      with: ['party'],
      stats: [
        ['m-node', 'kyc_ref'],
        ['m-hops', '0'],
      ],
    },
    device_ev: {
      title: 'device_ev',
      text: 'Raw device event stream. High volume, so the contract covers both schema and expected throughput.',
      kv: ['schema + volume'],
      with: ['txn_clean', 'device_age'],
      stats: [
        ['m-node', 'device_ev'],
        ['m-hops', '0'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-node', label: 'Selected' },
  { el: 'm-hops', label: 'Hops to source', tone: 'accent' },
];

/** Data panel: column lineage from source systems to model features. */
export function LineagePanel() {
  return (
    <SelectableViz
      kind="lineage"
      title="Column lineage"
      hint="Trace a feature"
      config={CONFIG}
      stats={STATS}
      statsCols={2}
      caption="Column-level lineage from source systems through modelled tables to model features, generated from the pipeline."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 340 168"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="lin1" />
        {LINKS.map(([a, b]) => {
          const from = POS[a]!;
          const to = POS[b]!;
          return (
            <path
              key={`${a}|${b}`}
              data-edge={`${a}|${b}`}
              d={`M${from.x + 42},${from.y} C${from.x + 78},${from.y} ${to.x - 78},${to.y} ${to.x - 42},${to.y}`}
              fill="none"
              stroke="rgba(102,203,213,0.3)"
              strokeWidth="1.2"
            />
          );
        })}
        {COLS.map((col) => (
          <g key={col.label}>
            <text x={col.x} y="24" textAnchor="middle" className="viz-label viz-label-accent">
              {col.label}
            </text>
            {col.items.map((item) => (
              <g key={item.key} className="viz-hit" data-key={item.key} aria-label={item.text}>
                <rect
                  className="viz-ring"
                  x={col.x - 46}
                  y={item.y - 4}
                  width="92"
                  height="30"
                  rx="7"
                  fill="#66cbd5"
                  fillOpacity="0.14"
                />
                <rect
                  x={col.x - 42}
                  y={item.y}
                  width="84"
                  height="22"
                  rx="5"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.18)"
                />
                <text
                  x={col.x}
                  y={item.y + 15}
                  textAnchor="middle"
                  className="viz-label viz-label-strong"
                >
                  {item.text}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </SelectableViz>
  );
}

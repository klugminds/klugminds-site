import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const NODES = [
  { key: 'device', label: 'DEVICE', x: 70, y: 82 },
  { key: 'player', label: 'ACCOUNT', x: 186, y: 104 },
  { key: 'payment', label: 'PAYMENT', x: 250, y: 56 },
  { key: 'session', label: 'SESSION', x: 318, y: 200 },
  { key: 'cluster', label: 'CLUSTER', x: 198, y: 156, warm: true },
  { key: 'dormant', label: 'DORMANT', x: 92, y: 214 },
] as const;

const EDGES = [
  { edge: 'device|player', d: 'M70,82 Q128,66 186,104' },
  { edge: 'player|payment', d: 'M186,104 Q218,40 250,56' },
  { edge: 'device|cluster', d: 'M70,82 Q134,66 198,156', warm: true },
  { edge: 'cluster|payment', d: 'M198,156 Q224,40 250,56', warm: true },
  { edge: 'cluster|session', d: 'M198,156 Q258,140 318,200', warm: true },
  { edge: 'device|dormant', d: 'M70,82 Q81,66 92,214' },
  { edge: 'cluster|dormant', d: 'M198,156 Q145,140 92,214', warm: true },
  { edge: 'player|cluster', d: 'M186,104 Q192,88 198,156', warm: true },
] as const;

const CONFIG: VizConfig = {
  initial: 'cluster',
  items: {
    cluster: {
      title: 'Linked-account cluster',
      text: 'Six accounts resolve to one player: shared device fingerprint, one payment instrument, overlapping session windows. Escalated as a single case.',
      kv: ['6 accounts', '1 device', '1 payment', 'risk 92.4'],
      with: ['device', 'player', 'payment', 'session', 'dormant'],
      stats: [
        ['m-focus', 'Cluster'],
        ['m-risk', '92.4'],
        ['m-action', 'Escalate'],
      ],
    },
    device: {
      title: 'Device fingerprint',
      text: 'A persistent identifier that survives cookie clearing and private browsing. Here it is shared by accounts that claim to be strangers.',
      kv: ['12 sign-ups', '3 countries'],
      with: ['player', 'cluster', 'dormant'],
      stats: [
        ['m-focus', 'Device'],
        ['m-risk', '78.1'],
        ['m-action', 'Link'],
      ],
    },
    player: {
      title: 'Account',
      text: 'On its own this account looks ordinary. Its velocity, deposits, and KYC all pass. The signal is entirely in what it shares.',
      kv: ['KYC passed', 'no rule hits'],
      with: ['device', 'payment', 'cluster'],
      stats: [
        ['m-focus', 'Account'],
        ['m-risk', '31.6'],
        ['m-action', 'Monitor'],
      ],
    },
    payment: {
      title: 'Payment instrument',
      text: 'One card behind several accounts, each withdrawing just under the review threshold — the pattern a per-transaction rule cannot see.',
      kv: ['4 accounts', 'under threshold'],
      with: ['player', 'cluster'],
      stats: [
        ['m-focus', 'Payment'],
        ['m-risk', '84.7'],
        ['m-action', 'Hold'],
      ],
    },
    session: {
      title: 'Session overlap',
      text: 'Play windows that interleave rather than overlap — consistent with one person operating several accounts in turn.',
      kv: ['interleaved', 'same ASN'],
      with: ['cluster'],
      stats: [
        ['m-focus', 'Session'],
        ['m-risk', '66.0'],
        ['m-action', 'Review'],
      ],
    },
    dormant: {
      title: 'Dormant account',
      text: 'Registered on the same device eight months ago and never used. Cheap to hold in reserve — and a strong hint that the ring plans ahead.',
      kv: ['0 deposits', '8 months idle'],
      with: ['device', 'cluster'],
      stats: [
        ['m-focus', 'Dormant'],
        ['m-risk', '44.2'],
        ['m-action', 'Flag'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-focus', label: 'In focus' },
  { el: 'm-risk', label: 'Risk score', tone: 'signal' },
  { el: 'm-action', label: 'Next action', tone: 'accent' },
];

/** Home hero panel: an entity graph scoring six linked accounts as one ring. */
export function RiskGraphPanel() {
  return (
    <SelectableViz
      kind="graph"
      title="Risk graph · sample view"
      hint="Select a node"
      config={CONFIG}
      stats={STATS}
      caption="An entity graph in which six accounts share a device and a payment instrument, scored as one cluster rather than six weak alerts."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 400 238"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="grf1" />
        {EDGES.map((e, i) => (
          <path
            key={e.edge}
            data-edge={e.edge}
            className="viz-flow"
            d={e.d}
            fill="none"
            stroke={'warm' in e && e.warm ? 'rgba(244,113,26,0.55)' : 'rgba(102,203,213,0.42)'}
            strokeWidth="1.4"
            style={{ animationDelay: `-${(i * 0.35).toFixed(2)}s` }}
          />
        ))}
        {NODES.map((n) => {
          const warm = 'warm' in n && n.warm;
          return (
            <g key={n.key} className="viz-hit" data-key={n.key} aria-label={n.label}>
              <circle
                className="viz-ring"
                cx={n.x}
                cy={n.y}
                r={warm ? 20 : 16}
                fill={warm ? '#f4711a' : '#66cbd5'}
                fillOpacity="0.18"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={warm ? 11 : 7}
                fill={warm ? '#3a1406' : '#0d2c65'}
                stroke={warm ? '#f4711a' : '#66cbd5'}
                strokeWidth="2"
              />
              <text
                x={n.x}
                y={n.y - (warm ? 22 : 18)}
                textAnchor="middle"
                className={warm ? 'viz-label viz-label-signal' : 'viz-label'}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </SelectableViz>
  );
}

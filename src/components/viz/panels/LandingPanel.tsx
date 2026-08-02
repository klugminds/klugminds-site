import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const BOXES = [
  { key: 'mgmt', label: 'MANAGEMENT', x: 175, y: 30, hard: false },
  { key: 'security', label: 'SECURITY', x: 62, y: 92, hard: false },
  { key: 'shared', label: 'SHARED SERVICES', x: 175, y: 92, hard: false },
  { key: 'workload', label: 'WORKLOADS', x: 288, y: 92, hard: false },
  { key: 'archive', label: 'LOG ARCHIVE', x: 62, y: 154, hard: true },
  { key: 'prod', label: 'PRODUCTION', x: 200, y: 154, hard: true },
  { key: 'nonprod', label: 'NON-PRODUCTION', x: 300, y: 154, hard: false },
] as const;

const LINKS = [
  ['mgmt', 'security'],
  ['mgmt', 'shared'],
  ['mgmt', 'workload'],
  ['security', 'archive'],
  ['workload', 'prod'],
  ['workload', 'nonprod'],
] as const;

const POS = Object.fromEntries(BOXES.map((b) => [b.key, { x: b.x, y: b.y }]));

const CONFIG: VizConfig = {
  initial: 'mgmt',
  items: {
    mgmt: {
      title: 'Management account',
      text: 'Owns the organisation, the guardrail policies, and nothing else. No workload ever runs here.',
      kv: ['policy only', 'no workloads'],
      with: ['security', 'shared', 'workload'],
      stats: [
        ['m-boundary', 'Management'],
        ['m-radius', 'The organisation'],
        ['m-access', 'Break-glass only'],
      ],
    },
    security: {
      title: 'Security account',
      text: 'Detection, key management, and the audit trail. Separated from the workloads it watches.',
      kv: ['separate credentials', 'read-only into prod'],
      with: ['mgmt', 'archive'],
      stats: [
        ['m-boundary', 'Security'],
        ['m-radius', 'Detection plane'],
        ['m-access', 'Security team'],
      ],
    },
    shared: {
      title: 'Shared services',
      text: 'Networking, private endpoints, the container registry, and the CI runners.',
      kv: ['one network core', 'signed images'],
      with: ['mgmt'],
      stats: [
        ['m-boundary', 'Shared services'],
        ['m-radius', 'Connectivity'],
        ['m-access', 'Platform team'],
      ],
    },
    workload: {
      title: 'Workload boundary',
      text: 'The parent of the environments below it. Budgets, service-control policies, and the region allow-list live here.',
      kv: ['budgets', 'region allow-list'],
      with: ['mgmt', 'prod', 'nonprod'],
      stats: [
        ['m-boundary', 'Workloads'],
        ['m-radius', 'All environments'],
        ['m-access', 'Platform team'],
      ],
    },
    archive: {
      title: 'Log archive',
      text: 'Write-once retention with an object lock, in an account whose credentials the workload accounts have never seen.',
      kv: ['object lock', 'no delete path'],
      with: ['security'],
      stats: [
        ['m-boundary', 'Log archive'],
        ['m-radius', 'Nothing — it is the record'],
        ['m-access', 'Nobody writes'],
      ],
    },
    prod: {
      title: 'Production',
      text: 'Reached by the pipeline, not by people. Access is a time-boxed role with a ticket attached.',
      kv: ['pipeline deploys', 'time-boxed access'],
      with: ['workload'],
      stats: [
        ['m-boundary', 'Production'],
        ['m-radius', 'One workload'],
        ['m-access', 'Time-boxed role'],
      ],
    },
    nonprod: {
      title: 'Non-production',
      text: 'Ephemeral environments per branch, with synthetic data and a hard expiry.',
      kv: ['synthetic data', 'expires in 72h'],
      with: ['workload'],
      stats: [
        ['m-boundary', 'Non-production'],
        ['m-radius', 'One branch'],
        ['m-access', 'Any engineer'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-boundary', label: 'Boundary' },
  { el: 'm-radius', label: 'Blast radius', tone: 'accent' },
  { el: 'm-access', label: 'Human access' },
];

/** Topic explorer: cloud landing zone account boundaries. */
export function LandingPanel() {
  return (
    <SelectableViz
      kind="landing"
      title="Landing zone"
      hint="Select a boundary"
      config={CONFIG}
      stats={STATS}
      caption="A cloud landing zone in seven account boundaries, showing what each one contains and how far a failure inside it can reach."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 350 196"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="lzn1" />
        {LINKS.map(([a, b]) => {
          const from = POS[a]!;
          const to = POS[b]!;
          return (
            <path
              key={`${a}|${b}`}
              data-edge={`${a}|${b}`}
              d={`M${from.x},${from.y + 13} L${from.x},${(from.y + to.y) / 2} L${to.x},${(from.y + to.y) / 2} L${to.x},${to.y - 13}`}
              fill="none"
              stroke="rgba(102,203,213,0.32)"
              strokeWidth="1.2"
            />
          );
        })}
        {BOXES.map((box) => {
          const w = box.key === 'nonprod' ? 84 : 88;
          return (
            <g key={box.key} className="viz-hit" data-key={box.key} aria-label={box.label}>
              <rect
                className="viz-ring"
                x={box.x - w / 2 - 4}
                y={box.y - 17}
                width={w + 8}
                height="34"
                rx="9"
                fill={box.hard ? '#f4711a' : '#66cbd5'}
                fillOpacity="0.15"
              />
              <rect
                x={box.x - w / 2}
                y={box.y - 13}
                width={w}
                height="26"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.2)"
              />
              {box.hard ? (
                <rect
                  x={box.x - w / 2}
                  y={box.y - 13}
                  width="2.6"
                  height="26"
                  rx="1.3"
                  fill="#f4711a"
                />
              ) : null}
              <text
                x={box.x}
                y={box.y + 3}
                textAnchor="middle"
                className="viz-label viz-label-strong"
              >
                {box.label}
              </text>
            </g>
          );
        })}
        <text x="175" y="188" textAnchor="middle" className="viz-label viz-label-signal">
          NOBODY HOLDS STANDING WRITE ACCESS TO PRODUCTION
        </text>
      </svg>
    </SelectableViz>
  );
}

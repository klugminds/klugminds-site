import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const LOAD = [
  96, 84, 78, 82, 104, 148, 196, 232, 251, 268, 262, 240, 226, 234, 248, 256, 238, 204, 176, 152,
  138, 124, 112, 102,
];
const PEAK = Math.max(...LOAD);
const UNIT_PER_NODE = 24;
const COST_PER_HOUR = 0.38;
const BASE_Y = 128;
const TOP_UNITS = 520;
const PX_PER_UNIT = 104 / TOP_UNITS;

const TARGETS = [
  { key: 'conservative', label: '55%', target: 55 },
  { key: 'balanced', label: '70%', target: 70 },
  { key: 'aggressive', label: '85%', target: 85 },
] as const;

function fleetStats(target: number) {
  const nodes = Math.ceil(PEAK / (UNIT_PER_NODE * (target / 100)));
  const cap = nodes * UNIT_PER_NODE;
  const headroom = Math.round(((cap - PEAK) / PEAK) * 100);
  const cost = Math.round(nodes * COST_PER_HOUR * 730);
  return { nodes, headroom, cost: cost.toLocaleString() };
}

const CONFIG: VizConfig = {
  initial: 'balanced',
  items: Object.fromEntries(
    TARGETS.map(({ key, label, target }) => {
      const { nodes, headroom, cost } = fleetStats(target);
      return [
        key,
        {
          title: `${label} utilisation target`,
          text: 'Every point of utilisation you claim back is headroom you no longer have when a campaign lands. Below 20% headroom the saving starts being paid for in incidents.',
          kv: [`${nodes} nodes`, `${headroom}% headroom`],
          stats: [
            ['m-nodes', `${nodes} nodes`],
            ['m-cost', `$${cost}`],
            ['m-headroom', `${headroom}%`],
          ],
        },
      ];
    }),
  ),
};

const STATS: VizStat[] = [
  { el: 'm-nodes', label: 'Fleet' },
  { el: 'm-cost', label: 'Monthly cost', tone: 'accent' },
  { el: 'm-headroom', label: 'Headroom over peak' },
];

const balanced = fleetStats(70);
const capY = BASE_Y - balanced.nodes * UNIT_PER_NODE * PX_PER_UNIT;

/** Topic explorer: capacity sizing against one day of demand. */
export function RightsizePanel() {
  return (
    <SelectableViz
      kind="rightsize"
      title="Capacity and cost"
      hint="Select a target"
      config={CONFIG}
      stats={STATS}
      caption="One day of demand with provisioned capacity set by utilisation target — fleet size, monthly cost, and headroom over peak."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 360 152"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="rsz1" />
        <rect
          x="30"
          y={capY}
          width="316"
          height={BASE_Y - PEAK * PX_PER_UNIT - capY}
          fill="#00a5b3"
          opacity="0.08"
        />
        {LOAD.map((v, i) => {
          const x = 30 + i * 13;
          const h = v * PX_PER_UNIT;
          return (
            <rect
              key={i}
              x={x}
              y={BASE_Y - h}
              width="9.6"
              height={h}
              rx="1.5"
              fill="#0b6f7d"
              opacity="0.9"
            />
          );
        })}
        <line
          x1="30"
          y1={capY}
          x2="346"
          y2={capY}
          stroke="#66cbd5"
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <text x="30" y={capY - 6} className="viz-label viz-label-accent">
          PROVISIONED
        </text>
        <line
          x1="30"
          y1={BASE_Y - PEAK * PX_PER_UNIT}
          x2="346"
          y2={BASE_Y - PEAK * PX_PER_UNIT}
          stroke="rgba(244,113,26,0.55)"
          strokeWidth="1.2"
        />
        <text
          x="346"
          y={BASE_Y - PEAK * PX_PER_UNIT + 11}
          textAnchor="end"
          className="viz-label viz-label-signal"
        >
          PEAK DEMAND
        </text>
        <line x1="30" y1={BASE_Y} x2="346" y2={BASE_Y} stroke="rgba(255,255,255,0.14)" />
        {TARGETS.map((t, i) => (
          <g key={t.key} className="viz-hit" data-key={t.key} aria-label={t.label}>
            <rect
              className="viz-ring"
              x={30 + i * 108}
              y="8"
              width="96"
              height="22"
              rx="6"
              fill="#66cbd5"
              fillOpacity="0.14"
            />
            <text
              x={78 + i * 108}
              y="22"
              textAnchor="middle"
              className="viz-label viz-label-strong"
            >
              {t.label} TARGET
            </text>
          </g>
        ))}
        <text x="30" y="144" className="viz-label">
          00:00
        </text>
        <text x="188" y="144" textAnchor="middle" className="viz-label">
          ONE DAY OF DEMAND
        </text>
        <text x="346" y="144" textAnchor="end" className="viz-label">
          24:00
        </text>
      </svg>
    </SelectableViz>
  );
}

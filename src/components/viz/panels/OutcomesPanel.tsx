import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const ROWS = [
  { key: 'aml', label: 'AML case throughput', before: 46, after: 158 },
  { key: 'fraud', label: 'Chargeback losses', before: 152, after: 59 },
  { key: 'rg', label: 'Actionable RG interventions', before: 40, after: 160 },
  { key: 'credit', label: 'Approval rate, target segment', before: 98, after: 124 },
] as const;

const CONFIG: VizConfig = {
  initial: 'aml',
  items: {
    aml: {
      title: 'European neobank',
      text: 'Nineteen analysts sat six thousand alerts behind, and the regulator had noticed. Adding headcount was not on the table.',
      kv: ['90 days', 'no new headcount', '2 validations passed'],
      stats: [
        ['m-before', 'Backlog of 6,000'],
        ['m-after', 'Cleared in 90 days'],
        ['m-delta', '3.4× throughput'],
      ],
    },
    fraud: {
      title: 'UAE marketplace',
      text: 'Chargebacks compounded month on month behind a rules engine nobody was willing to prune.',
      kv: ['2 quarters', 'volume +40%', 'analysts flat'],
      stats: [
        ['m-before', 'Rising monthly'],
        ['m-after', '61% lower'],
        ['m-delta', 'FPs down 34%'],
      ],
    },
    rg: {
      title: 'European iGaming operator',
      text: 'Safer-gambling controls were rule-based, triggered late, and rarely produced an action anyone could take.',
      kv: ['month one', '12 escalations'],
      stats: [
        ['m-before', 'Rules, triggered late'],
        ['m-after', '4× interventions'],
        ['m-delta', '12 cases in month 1'],
      ],
    },
    credit: {
      title: 'Indian NBFC',
      text: 'A large addressable segment had thin bureau files and no defensible way to price them.',
      kv: ['MRM passed first time', 'loss unchanged'],
      stats: [
        ['m-before', 'Declined on thin file'],
        ['m-after', '+27% approvals'],
        ['m-delta', 'Expected loss flat'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-before', label: 'Before' },
  { el: 'm-after', label: 'After', tone: 'accent' },
  { el: 'm-delta', label: 'Change' },
];

/** Outcomes panel: four measured engagements, before against after. */
export function OutcomesPanel() {
  return (
    <SelectableViz
      kind="outcomes"
      title="Before / after"
      hint="Select an outcome"
      config={CONFIG}
      stats={STATS}
      caption="Four anonymised client engagements with their measured before and after values."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 340 176"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="out1" />
        {ROWS.map((row, i) => {
          const y = 30 + i * 36;
          return (
            <g key={row.key} className="viz-hit" data-key={row.key} aria-label={row.label}>
              <rect
                className="viz-ring"
                x="16"
                y={y - 14}
                width="316"
                height="32"
                rx="6"
                fill="#66cbd5"
                fillOpacity="0.1"
              />
              <text x="22" y={y - 4} className="viz-label">
                {row.label}
              </text>
              <rect
                x="22"
                y={y + 1}
                width={row.before}
                height="7"
                rx="3.5"
                fill="#ffffff"
                opacity="0.24"
              />
              <rect
                x="22"
                y={y + 11}
                width={row.after}
                height="7"
                rx="3.5"
                fill="#00a5b3"
                opacity="0.9"
              />
            </g>
          );
        })}
        <text x="22" y="168" className="viz-label">
          <tspan fill="rgba(255,255,255,0.45)">Before</tspan>
          <tspan dx="12" fill="#00a5b3">
            After
          </tspan>
        </text>
      </svg>
    </SelectableViz>
  );
}

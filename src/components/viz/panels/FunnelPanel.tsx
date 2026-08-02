import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const STAGES = [
  { key: 'raised', label: 'Alerts raised', count: 12400, w: 330 },
  { key: 'scored', label: 'Model-scored', count: 12400, w: 268 },
  { key: 'grouped', label: 'Grouped per customer', count: 3100, w: 196 },
  { key: 'queued', label: 'Queued by expected value', count: 1240, w: 124 },
  { key: 'filed', label: 'Reported', count: 214, w: 58 },
] as const;

const CONFIG: VizConfig = {
  initial: 'raised',
  items: {
    raised: {
      title: 'Alerts raised',
      text: 'Scenario coverage your examiner expects, tuned to your own thresholds. Every hit lands, unranked.',
      kv: ['12,400 / month', 'unranked'],
      stats: [
        ['m-volume', '12,400'],
        ['m-share', '100%'],
      ],
    },
    scored: {
      title: 'Model-scored',
      text: 'A supervised model trained on your outcomes scores raw activity too — so it can find what no scenario covers.',
      kv: ['your labels', "not a vendor's"],
      stats: [
        ['m-volume', '12,400'],
        ['m-share', '100%'],
      ],
    },
    grouped: {
      title: 'Grouped per customer',
      text: 'Alerts collapse into cases. One customer structuring across nine days is one case, not nine alerts.',
      kv: ['4:1 collapse'],
      stats: [
        ['m-volume', '3,100'],
        ['m-share', '25%'],
      ],
    },
    queued: {
      title: 'Queued by expected value',
      text: 'Ordered by probability of a report times the cost of investigating — so the first hour of the day is the most valuable one.',
      kv: ['EV ranked'],
      stats: [
        ['m-volume', '1,240'],
        ['m-share', '10%'],
      ],
    },
    filed: {
      title: 'Reported',
      text: 'Conversion rose 21% because what reaches an analyst is more likely to be genuinely reportable.',
      kv: ['+21% conversion'],
      stats: [
        ['m-volume', '214'],
        ['m-share', '1.7%'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-volume', label: 'Volume at stage' },
  { el: 'm-share', label: 'Share of intake', tone: 'accent' },
];

/** AML panel: alert triage funnel from raised alerts to filed reports. */
export function FunnelPanel() {
  return (
    <SelectableViz
      kind="funnel"
      title="Alert triage, after scoring"
      hint="Select a stage"
      config={CONFIG}
      stats={STATS}
      statsCols={2}
      caption="Five triage stages between raising an alert and filing a report, with the volume surviving each stage."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 400 172"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="fnl1" />
        {STAGES.map((stage, i) => {
          const y = 22 + i * 29;
          const x = (400 - stage.w) / 2;
          const op = 0.24 + i * 0.17;
          return (
            <g key={stage.key} className="viz-hit" data-key={stage.key} aria-label={stage.label}>
              <rect
                className="viz-ring"
                x={x - 4}
                y={y - 3}
                width={stage.w + 8}
                height="26"
                rx="6"
                fill="#66cbd5"
                fillOpacity="0.16"
              />
              <rect x={x} y={y} width={stage.w} height="20" rx="4" fill="#00a5b3" opacity={op} />
              <text x="200" y={y + 14} textAnchor="middle" className="viz-label viz-label-strong">
                {stage.label}
              </text>
              <text x={x + stage.w + 8} y={y + 14} className="viz-label">
                {stage.count.toLocaleString()}
              </text>
            </g>
          );
        })}
      </svg>
    </SelectableViz>
  );
}

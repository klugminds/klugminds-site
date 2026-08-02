import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const ROWS = [
  { key: 'monitor', label: 'MONITOR', w: 268, colour: '#00a5b3', opacity: 0.34, share: '72%' },
  { key: 'review', label: 'REVIEW', w: 176, colour: '#00a5b3', opacity: 0.6, share: '19%' },
  { key: 'outreach', label: 'OUTREACH', w: 100, colour: '#fb923c', opacity: 0.75, share: '7%' },
  { key: 'intervene', label: 'INTERVENE', w: 46, colour: '#f4711a', opacity: 0.95, share: '2%' },
] as const;

const CONFIG: VizConfig = {
  initial: 'monitor',
  items: {
    monitor: {
      title: 'Monitor',
      text: 'Scored every session, contacted never. Messaging this tier trains players to ignore the messages that matter.',
      kv: ['no contact'],
      stats: [
        ['m-tier', 'Monitor'],
        ['m-players', '72%'],
        ['m-action', 'None'],
      ],
    },
    review: {
      title: 'Review',
      text: 'Queued for an analyst to look at within the working day, with the trajectory and the linked-account view attached.',
      kv: ['same-day queue'],
      stats: [
        ['m-tier', 'Review'],
        ['m-players', '19%'],
        ['m-action', 'Analyst review'],
      ],
    },
    outreach: {
      title: 'Outreach',
      text: 'A named safer-gambling queue makes contact. The outcome is recorded and becomes a training label for the next cycle.',
      kv: ['named owner', 'outcome logged'],
      stats: [
        ['m-tier', 'Outreach'],
        ['m-players', '7%'],
        ['m-action', 'Human contact'],
      ],
    },
    intervene: {
      title: 'Intervene',
      text: 'Account action with the evidence trail pre-assembled for the licence file. Two percent of players, and the reason the control exists.',
      kv: ['account action', 'file-ready'],
      stats: [
        ['m-tier', 'Intervene'],
        ['m-players', '2%'],
        ['m-action', 'Account action'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-tier', label: 'Tier' },
  { el: 'm-players', label: 'Share of base', tone: 'accent' },
  { el: 'm-action', label: 'Defined action' },
];

/** iGaming panel: player base graded into four risk tiers with defined actions. */
export function TiersPanel() {
  return (
    <SelectableViz
      kind="tiers"
      title="Player risk tiers"
      hint="Select a tier"
      config={CONFIG}
      stats={STATS}
      caption="A player base graded into four risk tiers, each mapped to one specific action."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 380 176"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="tie1" />
        {ROWS.map((row, i) => {
          const y = 30 + i * 30;
          return (
            <g key={row.key} className="viz-hit" data-key={row.key} aria-label={row.label}>
              <rect
                className="viz-ring"
                x="18"
                y={y - 4}
                width="330"
                height="28"
                rx="7"
                fill="#66cbd5"
                fillOpacity="0.13"
              />
              <rect
                x="22"
                y={y}
                width={row.w}
                height="20"
                rx="4"
                fill={row.colour}
                fillOpacity={row.opacity}
              />
              <text x="30" y={y + 14} className="viz-label viz-label-strong">
                {row.label}
              </text>
              <text x={22 + row.w + 8} y={y + 14} className="viz-label">
                {row.share}
              </text>
            </g>
          );
        })}
        <text x="22" y="164" className="viz-label viz-label-accent">
          EVERY TIER MAPS TO ONE DEFINED, RECORDED ACTION
        </text>
      </svg>
    </SelectableViz>
  );
}

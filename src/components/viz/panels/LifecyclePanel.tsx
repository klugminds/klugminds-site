import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const STAGES = [
  { key: 'shadow', label: 'SHADOW', traffic: '0%', x: 44, w: 56 },
  { key: 'canary', label: 'CANARY', traffic: '5%', x: 122, w: 52 },
  { key: 'ramp', label: 'RAMP', traffic: '25%', x: 196, w: 48 },
  { key: 'full', label: 'FULL', traffic: '100%', x: 266, w: 44 },
] as const;

const CONFIG: VizConfig = {
  initial: 'shadow',
  items: {
    shadow: {
      title: 'Shadow — 0% of traffic',
      text: 'Scores every live request and decides nothing. The point is to compare against the incumbent on real traffic before anyone is exposed to it.',
      kv: ['no user impact', '1–2 weeks'],
      stats: [
        ['m-stage', 'Shadow'],
        ['m-traffic', '0%'],
        ['m-rollback', 'n/a'],
      ],
    },
    canary: {
      title: 'Canary — 5% of traffic',
      text: 'A small slice, watched on the metric the model was commissioned to move rather than on accuracy. Rollback is one config change.',
      kv: ['5%', 'instant rollback'],
      stats: [
        ['m-stage', 'Canary'],
        ['m-traffic', '5%'],
        ['m-rollback', 'Metric regression'],
      ],
    },
    ramp: {
      title: 'Ramp — 25% of traffic',
      text: 'Enough volume for the effect to be measurable rather than suggestive, still small enough that a bad week is recoverable.',
      kv: ['25%', 'holdout retained'],
      stats: [
        ['m-stage', 'Ramp'],
        ['m-traffic', '25%'],
        ['m-rollback', 'Drift or latency'],
      ],
    },
    full: {
      title: 'Full — 100% of traffic',
      text: 'A permanent holdout stays behind, because without it you lose the ability to prove the model is still earning its place a year later.',
      kv: ['100%', 'permanent holdout'],
      stats: [
        ['m-stage', 'Full'],
        ['m-traffic', '100%'],
        ['m-rollback', 'Runbook'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-stage', label: 'Stage' },
  { el: 'm-traffic', label: 'Live traffic', tone: 'accent' },
  { el: 'm-rollback', label: 'Rollback trigger' },
];

/** ML panel: staged rollout from shadow scoring to full traffic. */
export function LifecyclePanel() {
  return (
    <SelectableViz
      kind="lifecycle"
      title="Staged rollout"
      hint="Select a stage"
      config={CONFIG}
      stats={STATS}
      caption="A model's path to production in four stages, from shadow scoring to full traffic, with the rollback trigger for each."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 380 130"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="lif1" />
        {STAGES.map((stage, i) => (
          <g key={stage.key}>
            <g className="viz-hit" data-key={stage.key} aria-label={stage.label}>
              <rect
                className="viz-ring"
                x={stage.x - stage.w / 2 - 6}
                y="46"
                width={stage.w + 12}
                height="38"
                rx="9"
                fill="#66cbd5"
                fillOpacity="0.16"
              />
              <rect
                x={stage.x - stage.w / 2}
                y="52"
                width={stage.w}
                height="26"
                rx="6"
                fill="#00a5b3"
                fillOpacity={0.32 + i * 0.18}
              />
              <text x={stage.x} y="42" textAnchor="middle" className="viz-label viz-label-strong">
                {stage.label}
              </text>
              <text x={stage.x} y="69" textAnchor="middle" className="viz-label">
                {stage.traffic}
              </text>
            </g>
            {i < STAGES.length - 1 &&
              (() => {
                const next = STAGES[i + 1]!;
                return (
                  <path
                    className="viz-flow"
                    d={`M${stage.x + stage.w / 2 + 4},65 L${next.x - next.w / 2 - 4},65`}
                    fill="none"
                    stroke="#66cbd5"
                    strokeWidth="1.3"
                  />
                );
              })()}
          </g>
        ))}
        <path
          d="M300,65 L330,65 L330,104 L44,104 L44,88"
          fill="none"
          stroke="rgba(244,113,26,0.5)"
          strokeWidth="1.3"
          strokeDasharray="4 3"
        />
        <path d="M40,92 L44,84 L48,92 Z" fill="#f4711a" />
        <text x="188" y="118" textAnchor="middle" className="viz-label viz-label-signal">
          ROLLBACK CRITERIA AGREED BEFORE ANY TRAFFIC MOVES
        </text>
      </svg>
    </SelectableViz>
  );
}

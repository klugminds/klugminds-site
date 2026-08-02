import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const LAYERS = [
  { key: 'monitoring', label: 'Monitoring plane', y: 30, opacity: 0.86 },
  { key: 'explain', label: 'Explainability layer', y: 60, opacity: 0.7 },
  { key: 'model', label: 'Model + evaluation harness', y: 90, opacity: 0.54 },
  { key: 'features', label: 'Shared feature store', y: 120, opacity: 0.4 },
  { key: 'data', label: 'Data + lineage', y: 150, opacity: 0.26 },
] as const;

const CONFIG: VizConfig = {
  initial: 'monitoring',
  items: {
    monitoring: {
      title: 'Monitoring plane',
      text: 'Data drift, concept drift, and outcome tracking — live before the model is, so the baseline predates the first scored request.',
      kv: ['PSI', 'outcome tracking', 'alerting'],
      stats: [['m-layer', 'Monitoring plane']],
    },
    explain: {
      title: 'Explainability layer',
      text: 'Ranked reason codes generated at score time, plus a governance report per release. Designed into the scoring path, not reverse-engineered later.',
      kv: ['reason codes', 'per-release report'],
      stats: [['m-layer', 'Explainability layer']],
    },
    model: {
      title: 'Model + evaluation harness',
      text: 'The model and the harness that judges it ship together, so every release is measured the same way as the one before.',
      kv: ['challenger', 'backtests', 'fairness'],
      stats: [['m-layer', 'Model + harness']],
    },
    features: {
      title: 'Shared feature store',
      text: 'The reason your second and third model cost less than your first: features, definitions, and freshness guarantees are reused.',
      kv: ['reused features', 'point-in-time correct'],
      stats: [['m-layer', 'Feature store']],
    },
    data: {
      title: 'Data + lineage',
      text: 'Column-level lineage from source system to feature, generated from the pipeline so it cannot go stale between audits.',
      kv: ['lineage', 'quality tests', 'contracts'],
      stats: [['m-layer', 'Data + lineage']],
    },
  },
};

const STATS: VizStat[] = [{ el: 'm-layer', label: 'Layer', tone: 'accent' }];

/** Solutions panel: the five layers that ship with every model. */
export function StackPanel() {
  return (
    <SelectableViz
      kind="stack"
      title="What ships, every time"
      hint="Select a layer"
      config={CONFIG}
      stats={STATS}
      statsCols={2}
      ariaLabel="What ships, every time"
      caption="The five layers that ship with every Klugminds model, from data lineage up to the monitoring plane."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 440 178"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="stk4" />
        {LAYERS.map((layer) => {
          const { y } = layer;
          return (
            <g key={layer.key} className="viz-hit" data-key={layer.key} aria-label={layer.label}>
              <path
                className="viz-ring"
                d={`M30,${y} L176,${y - 12} L322,${y} L176,${y + 14} Z`}
                fill="#66cbd5"
                fillOpacity="0.18"
              />
              <path
                d={`M36,${y} L176,${y - 10} L316,${y} L176,${y + 10} Z`}
                fill="#00a5b3"
                opacity={layer.opacity}
              />
              <path
                d={`M36,${y} L176,${y + 10} L176,${y + 17} L36,${y + 7} Z`}
                fill="#083a52"
                opacity={layer.opacity}
              />
              <path
                d={`M316,${y} L176,${y + 10} L176,${y + 17} L316,${y + 7} Z`}
                fill="#0a4c68"
                opacity={layer.opacity}
              />
              <text x="330" y={y + 4} className="viz-label viz-label-strong">
                {layer.label}
              </text>
            </g>
          );
        })}
      </svg>
    </SelectableViz>
  );
}

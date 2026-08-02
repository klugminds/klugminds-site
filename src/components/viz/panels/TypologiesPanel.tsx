import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const ROWS = [
  { key: 'structuring', label: 'Structuring', scen: true, model: true },
  { key: 'layering', label: 'Layering', scen: true, model: true },
  { key: 'mules', label: 'Mule networks', scen: false, model: true },
  { key: 'passthrough', label: 'Rapid pass-through', scen: true, model: false },
  { key: 'dormant', label: 'Dormant then active', scen: false, model: true },
] as const;

const CONFIG: VizConfig = {
  initial: 'structuring',
  items: {
    structuring: {
      title: 'Structuring — both layers',
      text: 'The scenario catches the textbook shape; the model catches the version that stays under every threshold. Agreement here is cheap confidence.',
      kv: ['scenario + model'],
      stats: [
        ['m-typology', 'Structuring'],
        ['m-layer', 'Both'],
        ['m-rate', '94%'],
      ],
    },
    layering: {
      title: 'Layering — both layers',
      text: 'Circular flows between related parties. The scenario needs the relationship declared; the model infers it from the counterparty graph.',
      kv: ['scenario + model'],
      stats: [
        ['m-typology', 'Layering'],
        ['m-layer', 'Both'],
        ['m-rate', '88%'],
      ],
    },
    mules: {
      title: 'Mule networks — model only',
      text: "No scenario describes this well, because the signal is graph structure rather than any single account's behaviour. This is the case for having a model at all.",
      kv: ['model only', 'graph structure'],
      stats: [
        ['m-typology', 'Mule networks'],
        ['m-layer', 'Model only'],
        ['m-rate', '76%'],
      ],
    },
    passthrough: {
      title: 'Rapid pass-through — scenario only',
      text: 'Cheap to express as a rule and stable over time. We keep it as a scenario rather than asking a model to relearn arithmetic.',
      kv: ['scenario only', 'examiner expects it'],
      stats: [
        ['m-typology', 'Pass-through'],
        ['m-layer', 'Scenario only'],
        ['m-rate', '91%'],
      ],
    },
    dormant: {
      title: 'Dormant then active — model only',
      text: 'Depends on what normal looked like for this customer, which is a distribution question rather than a threshold question.',
      kv: ['model only', 'per-customer baseline'],
      stats: [
        ['m-typology', 'Dormant then active'],
        ['m-layer', 'Model only'],
        ['m-rate', '69%'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-typology', label: 'Typology' },
  { el: 'm-layer', label: 'Caught by', tone: 'accent' },
  { el: 'm-rate', label: 'Detection rate' },
];

/** AML panel: typology coverage across scenario and model layers. */
export function TypologiesPanel() {
  return (
    <SelectableViz
      kind="typologies"
      title="Typology coverage"
      hint="Select a typology"
      config={CONFIG}
      stats={STATS}
      caption="Five AML typologies against the two detection layers, showing which are caught by scenarios, which by the model, and which by both."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 380 182"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="typ1" />
        <text x="212" y="26" textAnchor="middle" className="viz-label">
          SCENARIO
        </text>
        <text x="300" y="26" textAnchor="middle" className="viz-label">
          MODEL
        </text>
        {ROWS.map((row, i) => {
          const y = 38 + i * 24;
          return (
            <g key={row.key} className="viz-hit" data-key={row.key} aria-label={row.label}>
              <rect
                className="viz-ring"
                x="16"
                y={y - 4}
                width="340"
                height="24"
                rx="6"
                fill="#66cbd5"
                fillOpacity="0.13"
              />
              <text x="22" y={y + 12} className="viz-label viz-label-strong">
                {row.label}
              </text>
              {[row.scen, row.model].map((on, j) => {
                const cx = 212 + j * 88;
                return (
                  <rect
                    key={j}
                    x={cx - 31}
                    y={y}
                    width="62"
                    height="16"
                    rx="4"
                    fill={on ? '#00a5b3' : '#ffffff'}
                    fillOpacity={on ? 0.85 : 0.09}
                  />
                );
              })}
            </g>
          );
        })}
        <text x="22" y="172" className="viz-label viz-label-accent">
          WHERE THE TWO LAYERS DISAGREE IS WHERE WE INVESTIGATE FIRST
        </text>
      </svg>
    </SelectableViz>
  );
}

import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const BOXES = [
  { key: 'data', label: 'DATA', version: 'v14', x: 3 },
  { key: 'features', label: 'FEATURES', version: 'v9', x: 85 },
  { key: 'model', label: 'MODEL', version: 'v3.2', x: 167 },
  { key: 'decision', label: 'DECISION', version: '#48211', x: 249 },
  { key: 'report', label: 'REPORT', version: 'Q3', x: 325, teal: true },
] as const;

const CONFIG: VizConfig = {
  initial: 'data',
  items: {
    data: {
      title: 'Data snapshot — v14',
      text: "The exact rows the model saw, pinned by version. An audit question about a decision made in March is answered with March's data, not today's.",
      kv: ['immutable', '7-year retention'],
      stats: [
        ['m-artefact', 'Data snapshot'],
        ['m-version', 'v14'],
        ['m-retained', '7 years'],
      ],
    },
    features: {
      title: 'Feature definitions — v9',
      text: 'Point-in-time-correct definitions shared by training and serving, so the two cannot quietly disagree about what a feature means.',
      kv: ['point-in-time', 'shared with training'],
      stats: [
        ['m-artefact', 'Feature set'],
        ['m-version', 'v9'],
        ['m-retained', '7 years'],
      ],
    },
    model: {
      title: 'Model binary — v3.2',
      text: 'The fitted artefact plus its training run, hyperparameters, and the challenger it beat. Rebuildable from the pinned inputs above.',
      kv: ['reproducible', 'challenger recorded'],
      stats: [
        ['m-artefact', 'Model binary'],
        ['m-version', 'v3.2'],
        ['m-retained', '7 years'],
      ],
    },
    decision: {
      title: 'Decision log — #48211',
      text: 'One row per scored request: inputs, score, ranked reason codes, and which model version produced it. This is what a regulator actually asks for.',
      kv: ['reason codes', 'per request'],
      stats: [
        ['m-artefact', 'Decision log'],
        ['m-version', '#48211'],
        ['m-retained', '7 years'],
      ],
    },
    report: {
      title: 'Validation report — Q3',
      text: 'Generated with the release rather than written about it afterwards: performance, fairness diagnostics, assumptions, and stated limitations.',
      kv: ['per release', 'fairness pack'],
      stats: [
        ['m-artefact', 'Validation report'],
        ['m-version', 'Q3'],
        ['m-retained', '7 years'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-artefact', label: 'Artefact' },
  { el: 'm-version', label: 'Pinned at', tone: 'accent' },
  { el: 'm-retained', label: 'Retained' },
];

/** Home panel: the five versioned artefacts behind one scored decision. */
export function GovernanceTrailPanel() {
  return (
    <SelectableViz
      kind="governance"
      title="Reproducible decision trail"
      hint="Select an artefact"
      config={CONFIG}
      stats={STATS}
      caption="The five versioned artefacts behind a single scored decision, each retained so the decision can be replayed exactly."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 400 148"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="gov2" />
        <line x1="34" y1="72" x2="356" y2="72" stroke="rgba(102,203,213,0.2)" strokeWidth="2" />
        {BOXES.map((box, i) => {
          const cx = box.x + 31;
          const next = BOXES[i + 1];
          return (
            <g key={box.key}>
              <g className="viz-hit" data-key={box.key} aria-label={box.label}>
                <rect
                  className="viz-ring"
                  x={box.x - 5}
                  y="50"
                  width="72"
                  height="44"
                  rx="9"
                  fill="#66cbd5"
                  fillOpacity="0.16"
                />
                <rect
                  x={box.x}
                  y="55"
                  width="62"
                  height="34"
                  rx="7"
                  fill="#0d2c65"
                  stroke={'teal' in box && box.teal ? '#00a5b3' : '#66cbd5'}
                  strokeWidth="1.8"
                />
                <text x={cx} y="70" textAnchor="middle" className="viz-label viz-label-strong">
                  {box.label}
                </text>
                <text x={cx} y="82" textAnchor="middle" className="viz-label viz-label-accent">
                  {box.version}
                </text>
              </g>
              {next ? (
                <path
                  className="viz-flow"
                  d={`M${box.x + 64},72 L${next.x - 2},72`}
                  fill="none"
                  stroke="#66cbd5"
                  strokeWidth="1.4"
                />
              ) : null}
            </g>
          );
        })}
        <path
          d="M34,104 L34,120 L356,120 L356,104"
          fill="none"
          stroke="rgba(244,113,26,0.4)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <text x="195" y="136" textAnchor="middle" className="viz-label viz-label-signal">
          REPLAY ANY DECISION FROM ITS OWN VERSIONS
        </text>
      </svg>
    </SelectableViz>
  );
}

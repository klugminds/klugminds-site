import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const CONFIG: VizConfig = {
  initial: 'aiml',
  items: {
    aiml: {
      title: 'AI, data science & ML',
      text: 'Discovery through production: custom models, validation, fairness testing, and the governance documentation a regulated deployment needs.',
      kv: ['classical ML', 'graph learning', 'applied LLM'],
      stats: [
        ['m-practice', 'AI / ML'],
        ['m-owns', 'The model'],
      ],
    },
    stack: {
      title: 'Full-stack engineering',
      text: 'The application around the model: the queue, the case view, the override path, and the audit trail that turn a score into an operational control.',
      kv: ['React', 'TypeScript', 'Python', 'Go'],
      stats: [
        ['m-practice', 'Full-stack'],
        ['m-owns', 'The workflow'],
      ],
    },
    devsecops: {
      title: 'DevSecOps & platform',
      text: 'Cloud architecture, CI/CD with security wired into every merge, and alerting tuned to symptoms users feel rather than busy machines.',
      kv: ['Terraform', 'Kubernetes', 'SBOM'],
      stats: [
        ['m-practice', 'DevSecOps'],
        ['m-owns', 'The platform'],
      ],
    },
    data: {
      title: 'Data strategy & architecture',
      text: 'Platform design, quality expectations that fail the build, and column-level lineage generated from the pipeline so it cannot go stale.',
      kv: ['lakehouse', 'contracts', 'lineage'],
      stats: [
        ['m-practice', 'Data'],
        ['m-owns', 'The foundation'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-practice', label: 'Practice' },
  { el: 'm-owns', label: 'Owns', tone: 'accent' },
];

const NODE_R = 24;
const NODE_HALO_R = 32;

const PRACTICES = [
  { key: 'aiml', cx: 246, cy: 100, ariaLabel: 'AI and machine learning', lines: ['AI / ML'] },
  { key: 'stack', cx: 150, cy: 164, ariaLabel: 'Full-stack engineering', lines: ['FULL', 'STACK'] },
  {
    key: 'devsecops',
    cx: 54,
    cy: 100,
    ariaLabel: 'DevSecOps and platform',
    lines: ['DEVSEC', 'OPS'],
  },
  { key: 'data', cx: 150, cy: 36, ariaLabel: 'Data strategy', lines: ['DATA'] },
] as const;

function OrbitNodeLabel({ cx, cy, lines }: { cx: number; cy: number; lines: readonly string[] }) {
  if (lines.length === 1) {
    return (
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        className="viz-label viz-label-strong viz-orbit-label"
      >
        {lines[0]}
      </text>
    );
  }

  return (
    <>
      <text
        x={cx}
        y={cy - 3}
        textAnchor="middle"
        className="viz-label viz-label-strong viz-orbit-label"
      >
        {lines[0]}
      </text>
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        className="viz-label viz-label-strong viz-orbit-label"
      >
        {lines[1]}
      </text>
    </>
  );
}

/** Services hero panel: four practices orbiting one senior delivery pod. */
export function OrbitPanel() {
  return (
    <SelectableViz
      kind="orbit"
      title="One team, four practices"
      hint="Select a practice"
      config={CONFIG}
      stats={STATS}
      statsCols={2}
      caption="Four engineering practices orbiting one senior delivery pod."
      ariaLabel="One team, four practices"
    >
      <svg
        className="viz-plot"
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <VizBackdrop id="orb5" />
        <path
          d="M54,100 A96,64 0 1,1 246,100 A96,64 0 1,1 54,100"
          fill="none"
          stroke="rgba(102,203,213,0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        {PRACTICES.map((p) => (
          <g key={p.key} className="viz-hit" data-key={p.key} aria-label={p.ariaLabel}>
            <circle
              className="viz-ring"
              cx={p.cx}
              cy={p.cy}
              r={NODE_HALO_R}
              fill="#66cbd5"
              fillOpacity="0.16"
            />
            <circle
              cx={p.cx}
              cy={p.cy}
              r={NODE_R}
              fill="#0d2c65"
              stroke="#66cbd5"
              strokeWidth="1.8"
            />
            <OrbitNodeLabel cx={p.cx} cy={p.cy} lines={p.lines} />
          </g>
        ))}
        <circle cx="150" cy="100" r="34" fill="#00a5b3" opacity="0.14" />
        <circle cx="150" cy="100" r="27" fill="#0d2c65" stroke="#00a5b3" strokeWidth="2" />
        <text
          x="150"
          y="97"
          textAnchor="middle"
          className="viz-label viz-label-accent viz-orbit-label-center"
        >
          SENIOR
        </text>
        <text
          x="150"
          y="107"
          textAnchor="middle"
          className="viz-label viz-label-accent viz-orbit-label-center"
        >
          POD
        </text>
      </svg>
    </SelectableViz>
  );
}

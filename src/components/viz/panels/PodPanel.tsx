import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const ROLES = [
  { key: 'lead', label: 'ENGAGEMENT LEAD', x: 175, y: 36, r: 15 },
  { key: 'architect', label: 'ARCHITECT', x: 175, y: 92, r: 14 },
  { key: 'ml', label: 'ML ENGINEER', x: 76, y: 150, r: 12 },
  { key: 'data', label: 'DATA ENGINEER', x: 175, y: 150, r: 12 },
  { key: 'platform', label: 'PLATFORM', x: 274, y: 150, r: 12 },
] as const;

const CONFIG: VizConfig = {
  initial: 'lead',
  items: {
    lead: {
      title: 'Engagement lead',
      text: 'Owns the decision document and the client relationship, and is an engineer — the person arguing about scope is the person who will build to it.',
      kv: ['1 per pod', 'writes the framing'],
      stats: [
        ['m-role', 'Engagement lead'],
        ['m-owns', 'The framing'],
        ['m-seats', '1'],
      ],
    },
    architect: {
      title: 'Technical architect',
      text: "Owns the design, the service boundaries, and the answer to 'can we replace the model later without a rewrite'.",
      kv: ['1 per pod', 'owns the design'],
      stats: [
        ['m-role', 'Architect'],
        ['m-owns', 'The design'],
        ['m-seats', '1'],
      ],
    },
    ml: {
      title: 'ML engineer',
      text: 'Builds the model and stays on it after go-live. You will be on the incident bridge for something you built six months earlier, which is the job.',
      kv: ['1–3 per pod', 'on-call for own work'],
      stats: [
        ['m-role', 'ML engineer'],
        ['m-owns', 'The model'],
        ['m-seats', '1–3'],
      ],
    },
    data: {
      title: 'Data engineer',
      text: 'Owns the pipeline, the feature store, and the quality expectations that fail the build rather than a dashboard.',
      kv: ['1–2 per pod', 'owns the contracts'],
      stats: [
        ['m-role', 'Data engineer'],
        ['m-owns', 'The pipeline'],
        ['m-seats', '1–2'],
      ],
    },
    platform: {
      title: 'Platform engineer',
      text: 'Owns deployment, observability, and cost. Also owns the awkward question of whether the thing we are about to ship can actually be operated.',
      kv: ['1 per pod', 'owns cost'],
      stats: [
        ['m-role', 'Platform engineer'],
        ['m-owns', 'The platform'],
        ['m-seats', '1'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-role', label: 'Seat' },
  { el: 'm-owns', label: 'Owns', tone: 'accent' },
  { el: 'm-seats', label: 'Per pod' },
];

/** Careers panel: the five seats in a delivery pod and what each owns. */
export function PodPanel() {
  return (
    <SelectableViz
      kind="pod"
      title="Delivery pod"
      hint="Select a seat"
      config={CONFIG}
      stats={STATS}
      caption="The five seats in a Klugminds delivery pod and what each one owns."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 350 206"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="pod1" />
        <path d="M175,51 L175,78" stroke="rgba(102,203,213,0.4)" strokeWidth="1.4" />
        <path
          d="M175,106 L175,124 M76,124 L274,124 M76,124 L76,138 M175,124 L175,138 M274,124 L274,138"
          stroke="rgba(102,203,213,0.4)"
          strokeWidth="1.4"
          fill="none"
        />
        {ROLES.map((role) => (
          <g key={role.key} className="viz-hit" data-key={role.key} aria-label={role.label}>
            <circle
              className="viz-ring"
              cx={role.x}
              cy={role.y}
              r={role.r + 8}
              fill="#66cbd5"
              fillOpacity="0.17"
            />
            <circle
              cx={role.x}
              cy={role.y}
              r={role.r}
              fill="#0d2c65"
              stroke="#66cbd5"
              strokeWidth="1.8"
            />
            <text
              x={role.x}
              y={role.y + role.r + 13}
              textAnchor="middle"
              className="viz-label viz-label-strong"
            >
              {role.label}
            </text>
          </g>
        ))}
        <text x="175" y="196" textAnchor="middle" className="viz-label viz-label-accent">
          FOUR TO EIGHT PEOPLE · DELIBERATELY SENIOR
        </text>
      </svg>
    </SelectableViz>
  );
}

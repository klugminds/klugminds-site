import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const LOADS = [
  { key: 'scoring', label: 'REAL-TIME SCORING', y: 46, cloud: 'aws' },
  { key: 'features', label: 'FEATURE PIPELINE', y: 78, cloud: 'gcp' },
  { key: 'training', label: 'MODEL TRAINING', y: 110, cloud: 'gcp' },
  { key: 'app', label: 'ANALYST APP', y: 142, cloud: 'azure' },
  { key: 'archive', label: 'LOG ARCHIVE', y: 174, cloud: 'aws' },
] as const;

const CLOUDS = [
  { key: 'aws', label: 'AWS', y: 62 },
  { key: 'azure', label: 'AZURE', y: 110 },
  { key: 'gcp', label: 'GCP', y: 158 },
] as const;

const CPOS = Object.fromEntries(CLOUDS.map((c) => [c.key, c.y]));

const CONFIG: VizConfig = {
  initial: 'scoring',
  items: {
    scoring: {
      title: 'Real-time scoring',
      text: 'Sits inline in authorisation, so it lives in whichever cloud your payment stack already occupies.',
      kv: ['<80ms at p99', 'no cross-cloud hop'],
      with: ['aws'],
      stats: [
        ['m-load', 'Real-time scoring'],
        ['m-cloud', 'AWS'],
        ['m-why', 'Latency budget'],
      ],
    },
    features: {
      title: 'Feature pipeline',
      text: 'Runs beside the warehouse, because moving a day of features between clouds costs more in egress than the compute that produced them.',
      kv: ['egress dominates', 'co-located'],
      with: ['gcp'],
      stats: [
        ['m-load', 'Feature pipeline'],
        ['m-cloud', 'GCP'],
        ['m-why', 'Egress cost'],
      ],
    },
    training: {
      title: 'Model training',
      text: 'Bursty and interruptible, so it goes wherever the accelerators are actually available this quarter.',
      kv: ['spot capacity', 'checkpointed'],
      with: ['gcp'],
      stats: [
        ['m-load', 'Model training'],
        ['m-cloud', 'GCP'],
        ['m-why', 'GPU availability'],
      ],
    },
    app: {
      title: 'Analyst application',
      text: 'Follows the identity provider. Putting the case-management UI next to your directory is what makes conditional access work.',
      kv: ['SSO', 'one audit trail'],
      with: ['azure'],
      stats: [
        ['m-load', 'Analyst app'],
        ['m-cloud', 'Azure'],
        ['m-why', 'Identity and audit'],
      ],
    },
    archive: {
      title: 'Log archive',
      text: 'Chosen on retention mechanics, not price alone: the store has to refuse a delete for the full retention window.',
      kv: ['object lock', '7-year retention'],
      with: ['aws'],
      stats: [
        ['m-load', 'Log archive'],
        ['m-cloud', 'AWS'],
        ['m-why', 'Retention lock'],
      ],
    },
    aws: {
      title: 'AWS',
      text: 'Carries the latency-critical path and the archive.',
      kv: ['scoring', 'archive'],
      with: ['scoring', 'archive'],
      stats: [
        ['m-load', 'AWS'],
        ['m-cloud', '2 workloads'],
        ['m-why', 'Latency, retention'],
      ],
    },
    azure: {
      title: 'Azure',
      text: 'Carries the operator-facing application.',
      kv: ['analyst app'],
      with: ['app'],
      stats: [
        ['m-load', 'Azure'],
        ['m-cloud', '1 workload'],
        ['m-why', 'Identity'],
      ],
    },
    gcp: {
      title: 'GCP',
      text: 'Carries the data plane and training.',
      kv: ['features', 'training'],
      with: ['features', 'training'],
      stats: [
        ['m-load', 'GCP'],
        ['m-cloud', '2 workloads'],
        ['m-why', 'Data gravity'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-load', label: 'Workload' },
  { el: 'm-cloud', label: 'Runs on', tone: 'accent' },
  { el: 'm-why', label: 'Decided by' },
];

/** Topic explorer: workload placement across AWS, Azure, and GCP. */
export function MulticloudPanel() {
  return (
    <SelectableViz
      kind="multicloud"
      title="Workload placement"
      hint="Select a workload"
      config={CONFIG}
      stats={STATS}
      caption="Five workloads placed across AWS, Azure, and GCP, each with the constraint — latency, egress, accelerator supply, identity, or retention — that decided it."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 350 212"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="mcl1" />
        <text x="278" y="28" textAnchor="middle" className="viz-label viz-label-accent">
          RUNS ON
        </text>
        {LOADS.map((load) => {
          const cy = CPOS[load.cloud] ?? 62;
          const mid = (load.y + cy) / 2;
          return (
            <g key={load.key}>
              <path
                data-edge={`${load.key}|${load.cloud}`}
                d={`M140,${load.y} C182,${load.y} 198,${cy} 236,${cy}`}
                fill="none"
                stroke="rgba(102,203,213,0.32)"
                strokeWidth="1.2"
              />
              <rect
                x="184"
                y={mid - 4}
                width="8"
                height="8"
                rx="1.6"
                transform={`rotate(45 188 ${mid})`}
                fill="#f4711a"
                opacity="0.85"
              />
            </g>
          );
        })}
        {LOADS.map((load) => (
          <g key={load.key} className="viz-hit" data-key={load.key} aria-label={load.label}>
            <rect
              className="viz-ring"
              x="14"
              y={load.y - 15}
              width="130"
              height="30"
              rx="8"
              fill="#66cbd5"
              fillOpacity="0.15"
            />
            <rect
              x="18"
              y={load.y - 11}
              width="122"
              height="22"
              rx="5"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.2)"
            />
            <text x="79" y={load.y + 4} textAnchor="middle" className="viz-label viz-label-strong">
              {load.label}
            </text>
          </g>
        ))}
        {CLOUDS.map((cloud) => (
          <g key={cloud.key} className="viz-hit" data-key={cloud.key} aria-label={cloud.label}>
            <rect
              className="viz-ring"
              x="232"
              y={cloud.y - 17}
              width="94"
              height="34"
              rx="9"
              fill="#66cbd5"
              fillOpacity="0.15"
            />
            <rect
              x="236"
              y={cloud.y - 13}
              width="86"
              height="26"
              rx="6"
              fill="#0d2c65"
              stroke="#00a5b3"
              strokeWidth="1.6"
            />
            <text
              x="279"
              y={cloud.y + 3}
              textAnchor="middle"
              className="viz-label viz-label-strong"
            >
              {cloud.label}
            </text>
          </g>
        ))}
        <text x="18" y="204" className="viz-label viz-label-signal">
          PLACEMENT IS A CONSTRAINT DECISION, NOT A PREFERENCE
        </text>
      </svg>
    </SelectableViz>
  );
}

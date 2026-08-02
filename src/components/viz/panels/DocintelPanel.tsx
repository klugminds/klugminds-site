import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const FIELDS = [
  { key: 'patient', label: 'Patient ID', conf: 96, route: 'Auto-accepted' },
  { key: 'admission', label: 'Admission date', conf: 88, route: 'Auto-accepted' },
  { key: 'diagnosis', label: 'Diagnosis code', conf: 71, route: 'Clinician review' },
  { key: 'discharge', label: 'Discharge plan', conf: 58, route: 'Clinician review' },
] as const;

const SCAN_LINES = [
  { y: 46, w: 104 },
  { y: 59, w: 88 },
  { y: 72, w: 112 },
  { y: 85, w: 72 },
  { y: 98, w: 96 },
  { y: 111, w: 60 },
] as const;

function fieldCopy(label: string, conf: number, route: string) {
  const alert = conf < 70;
  return {
    title: `${label} — ${conf}% confidence`,
    text: alert
      ? 'Below the threshold, so it routes to a clinician with the source region highlighted. The model never silently guesses on a clinical field.'
      : 'Above the threshold, so it posts straight into the record with the extraction logged for audit.',
    kv: ['threshold 70%', route.toLowerCase()],
    stats: [
      ['m-field', label],
      ['m-conf', `${conf}%`],
      ['m-route', route],
    ] as Array<[string, string]>,
  };
}

const CONFIG: VizConfig = {
  initial: 'patient',
  items: Object.fromEntries(
    FIELDS.map((field) => [field.key, fieldCopy(field.label, field.conf, field.route)]),
  ),
};

const STATS: VizStat[] = [
  { el: 'm-field', label: 'Field' },
  { el: 'm-conf', label: 'Confidence', tone: 'accent' },
  { el: 'm-route', label: 'Routed to' },
];

/** Healthcare panel: extracted document fields with confidence-based routing. */
export function DocintelPanel() {
  return (
    <SelectableViz
      kind="docintel"
      title="Document intelligence"
      hint="Select a field"
      config={CONFIG}
      stats={STATS}
      caption="Four fields extracted from a scanned record, each with the confidence that decides whether it posts automatically or goes to a clinician."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 380 168"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="doc1" />
        <rect
          x="24"
          y="32"
          width="132"
          height="122"
          rx="7"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.14)"
        />
        {SCAN_LINES.map((line, i) => (
          <rect
            key={line.y}
            x="34"
            y={line.y}
            width={line.w}
            height="5"
            rx="2.5"
            fill={`rgba(255,255,255,${i % 2 ? '0.22' : '0.13'})`}
          />
        ))}
        <rect x="34" y="128" width="76" height="5" rx="2.5" fill="#00a5b3" fillOpacity="0.7" />
        <text x="90" y="150" textAnchor="middle" className="viz-label">
          SCANNED RECORD
        </text>
        <path
          className="viz-flow"
          d="M164,92 L192,92"
          fill="none"
          stroke="#66cbd5"
          strokeWidth="1.6"
        />
        {FIELDS.map((field, i) => {
          const y = 46 + i * 28;
          const barW = Math.round((128 * field.conf) / 100);
          const barColour = field.conf >= 70 ? '#00a5b3' : '#f4711a';
          return (
            <g key={field.key} className="viz-hit" data-key={field.key} aria-label={field.label}>
              <rect
                className="viz-ring"
                x="196"
                y={y - 14}
                width="176"
                height="30"
                rx="7"
                fill="#66cbd5"
                fillOpacity="0.14"
              />
              <text x="200" y={y - 4} className="viz-label viz-label-strong">
                {field.label}
              </text>
              <rect x="200" y={y} width="128" height="12" rx="6" fill="rgba(255,255,255,0.07)" />
              <rect
                x="200"
                y={y}
                width={barW}
                height="12"
                rx="6"
                fill={barColour}
                fillOpacity="0.85"
              />
              <text x="368" y={y + 10} textAnchor="end" className="viz-label viz-label-accent">
                {field.conf}%
              </text>
            </g>
          );
        })}
      </svg>
    </SelectableViz>
  );
}

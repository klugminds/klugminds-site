import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const ENDPOINTS = [
  { key: 'score', label: 'POST /score', y: 56, svc: 'scoring' },
  { key: 'cases', label: 'GET /cases', y: 82, svc: 'case-api' },
  { key: 'reasons', label: 'GET /reasons', y: 108, svc: 'features' },
] as const;

const SERVICES = [
  { key: 'scoring', label: 'scoring', y: 36 },
  { key: 'case-api', label: 'case-api', y: 70 },
  { key: 'features', label: 'features', y: 104 },
] as const;

const CONFIG: VizConfig = {
  initial: 'score',
  items: {
    score: {
      title: 'POST /score',
      text: 'The inline decision. Latency budget published in the contract, so a consumer knows what it can rely on before it integrates.',
      kv: ['<80 ms p99', 'idempotent'],
      with: ['scoring'],
      stats: [
        ['m-endpoint', 'POST /score'],
        ['m-served', 'scoring'],
        ['m-slo', '<80 ms p99'],
      ],
    },
    cases: {
      title: 'GET /cases',
      text: 'The analyst queue. Pagination and ordering are part of the contract, because that is what breaks first when volume grows.',
      kv: ['cursor paging', 'EV ordered'],
      with: ['case-api'],
      stats: [
        ['m-endpoint', 'GET /cases'],
        ['m-served', 'case-api'],
        ['m-slo', '<300 ms p95'],
      ],
    },
    reasons: {
      title: 'GET /reasons',
      text: 'Ranked reason codes for a scored decision. Versioned separately, so an explainability change never forces a scoring release.',
      kv: ['versioned', 'auditable'],
      with: ['features'],
      stats: [
        ['m-endpoint', 'GET /reasons'],
        ['m-served', 'features'],
        ['m-slo', '<200 ms p95'],
      ],
    },
    scoring: {
      title: 'scoring service',
      text: 'Owns the model boundary. The model behind it can be replaced without a consumer rewrite — that is the whole point of the contract.',
      kv: ['model boundary'],
      with: ['score'],
      stats: [
        ['m-endpoint', 'scoring'],
        ['m-served', '1 endpoint'],
        ['m-slo', '<80 ms p99'],
      ],
    },
    'case-api': {
      title: 'case-api service',
      text: 'Queues, case views, override paths, and the audit trail behind them.',
      kv: ['audit trail'],
      with: ['cases'],
      stats: [
        ['m-endpoint', 'case-api'],
        ['m-served', '1 endpoint'],
        ['m-slo', '<300 ms p95'],
      ],
    },
    features: {
      title: 'features service',
      text: 'Point-in-time-correct feature reads, shared with the training pipeline so serving and training cannot disagree.',
      kv: ['point-in-time'],
      with: ['reasons'],
      stats: [
        ['m-endpoint', 'features'],
        ['m-served', '1 endpoint'],
        ['m-slo', '<200 ms p95'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-endpoint', label: 'Selected' },
  { el: 'm-served', label: 'Served by' },
  { el: 'm-slo', label: 'Published SLO', tone: 'accent' },
];

const SVC_Y = Object.fromEntries(SERVICES.map((s) => [s.key, s.y + 12]));

/** Platform panel: OpenAPI contract between consumer and services. */
export function ContractPanel() {
  return (
    <SelectableViz
      kind="contract"
      title="Contract-first API"
      hint="Select an endpoint"
      config={CONFIG}
      stats={STATS}
      caption="An OpenAPI contract between one consumer and three services, with the published service-level objective for each endpoint."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 360 156"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="api1" />
        <rect
          x="18"
          y="42"
          width="80"
          height="76"
          rx="7"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.16)"
        />
        <text x="58" y="34" textAnchor="middle" className="viz-label viz-label-strong">
          CONSUMER
        </text>
        <rect x="28" y="56" width="60" height="6" rx="3" fill="rgba(255,255,255,0.22)" />
        <rect x="28" y="70" width="44" height="6" rx="3" fill="rgba(255,255,255,0.14)" />
        <rect x="28" y="84" width="52" height="6" rx="3" fill="rgba(255,255,255,0.14)" />
        <path
          className="viz-flow"
          d="M100,80 L134,80"
          fill="none"
          stroke="#66cbd5"
          strokeWidth="1.6"
        />
        <rect
          x="136"
          y="34"
          width="92"
          height="94"
          rx="7"
          fill="#00a5b3"
          opacity="0.1"
          stroke="#00a5b3"
        />
        <text x="182" y="28" textAnchor="middle" className="viz-label viz-label-accent">
          OPENAPI v2
        </text>
        {ENDPOINTS.map((ep) => {
          const sy = SVC_Y[ep.svc];
          return (
            <g key={ep.key} className="viz-hit" data-key={ep.key} aria-label={ep.label}>
              <rect
                className="viz-ring"
                x="140"
                y={ep.y - 11}
                width="84"
                height="22"
                rx="5"
                fill="#66cbd5"
                fillOpacity="0.18"
              />
              <text x="182" y={ep.y + 3} textAnchor="middle" className="viz-label viz-label-strong">
                {ep.label}
              </text>
              <path
                data-edge={`${ep.key}|${ep.svc}`}
                className="viz-flow"
                d={`M230,${ep.y} L262,${sy}`}
                fill="none"
                stroke="rgba(102,203,213,0.4)"
                strokeWidth="1.3"
              />
            </g>
          );
        })}
        {SERVICES.map((svc) => (
          <g key={svc.key} className="viz-hit" data-key={svc.key} aria-label={svc.label}>
            <rect
              className="viz-ring"
              x="260"
              y={svc.y - 4}
              width="84"
              height="32"
              rx="7"
              fill="#66cbd5"
              fillOpacity="0.14"
            />
            <rect
              x="264"
              y={svc.y}
              width="76"
              height="24"
              rx="5"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.18)"
            />
            <text x="302" y={svc.y + 15} textAnchor="middle" className="viz-label viz-label-strong">
              {svc.label}
            </text>
          </g>
        ))}
        <text x="18" y="146" className="viz-label">
          CONSUMER-DRIVEN CONTRACT TESTS RUN IN CI
        </text>
      </svg>
    </SelectableViz>
  );
}

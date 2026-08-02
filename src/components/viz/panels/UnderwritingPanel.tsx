import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

type BandKey = 'bureau' | 'recovered' | 'declined';

const BAND_STYLE: Record<BandKey, { colour: string; opacity: number; label: string }> = {
  bureau: { colour: '#00a5b3', opacity: 0.55, label: 'APPROVED ON BUREAU' },
  recovered: { colour: '#00a5b3', opacity: 0.95, label: 'RECOVERED WITH ALT DATA' },
  declined: { colour: '#ffffff', opacity: 0.16, label: 'STILL DECLINED' },
};

function buildBands(): Record<BandKey, Array<[number, number]>> {
  const bands: Record<BandKey, Array<[number, number]>> = {
    bureau: [],
    recovered: [],
    declined: [],
  };
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 18; c++) {
      const x = 22 + c * 19;
      const y = 40 + r * 19;
      const key: BandKey = r < 2 ? 'bureau' : c >= 11 ? 'recovered' : 'declined';
      bands[key].push([x, y]);
    }
  }
  return bands;
}

const BANDS = buildBands();

const CONFIG: VizConfig = {
  initial: 'recovered',
  items: {
    recovered: {
      title: 'Recovered with alternative data',
      text: 'Applicants the bureau could not price, now approved on consented cash-flow, telco tenure, and utility regularity. This is where the 27% approval lift came from.',
      kv: ['+27% approvals', 'same cut-off'],
      stats: [
        ['m-band', 'Recovered'],
        ['m-share', '22%'],
        ['m-loss', 'unchanged'],
      ],
    },
    bureau: {
      title: 'Approved on the bureau file',
      text: 'The population your existing scorecard already handles well. We do not touch it — a model that reshuffles this group is adding risk for no gain.',
      kv: ['50% of pool', 'left alone'],
      stats: [
        ['m-band', 'Bureau approved'],
        ['m-share', '50%'],
        ['m-loss', 'unchanged'],
      ],
    },
    declined: {
      title: 'Still declined',
      text: 'Thin file and weak alternative signal. Declining these is the correct answer, and the provenance ledger records exactly which inputs drove it.',
      kv: ['28% of pool', 'reasons recorded'],
      stats: [
        ['m-band', 'Still declined'],
        ['m-share', '28%'],
        ['m-loss', 'avoided'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-band', label: 'Band' },
  { el: 'm-share', label: 'Share of pool', tone: 'accent' },
  { el: 'm-loss', label: 'Expected loss' },
];

function BandGroup({ bandKey }: { bandKey: BandKey }) {
  const cells = BANDS[bandKey];
  const { colour, opacity, label } = BAND_STYLE[bandKey];
  const xs = cells.map(([x]) => x);
  const ys = cells.map(([, y]) => y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  return (
    <g className="viz-hit" data-key={bandKey} aria-label={label}>
      <rect
        className="viz-ring"
        x={minX - 4}
        y={minY - 4}
        width={maxX - minX + 21}
        height={maxY - minY + 21}
        rx="6"
        fill="#66cbd5"
        fillOpacity="0.14"
      />
      {cells.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="13"
          height="13"
          rx="3"
          fill={colour}
          fillOpacity={opacity}
        />
      ))}
    </g>
  );
}

/** Fintech panel: applicant pool split by bureau, alt-data recovery, and decline bands. */
export function UnderwritingPanel() {
  return (
    <SelectableViz
      kind="underwriting"
      title="Thin-file recovery"
      hint="Select a band"
      config={CONFIG}
      stats={STATS}
      caption="An applicant pool split into those the bureau approves, those recovered by alternative data, and those still declined."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 380 146"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="uw1" />
        <text x="22" y="30" className="viz-label">
          APPLICANT POOL · 72 SAMPLED
        </text>
        <BandGroup bandKey="bureau" />
        <BandGroup bandKey="recovered" />
        <BandGroup bandKey="declined" />
        <text x="22" y="134" className="viz-label viz-label-accent">
          EXPECTED LOSS UNCHANGED ACROSS ALL THREE BANDS
        </text>
      </svg>
    </SelectableViz>
  );
}

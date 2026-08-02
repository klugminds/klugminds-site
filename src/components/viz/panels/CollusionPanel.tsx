import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const SEATS = [
  { key: 's1', label: 'S1', x: 175, y: 40, colluding: true },
  { key: 's2', label: 'S2', x: 244, y: 78, colluding: false },
  { key: 's3', label: 'S3', x: 244, y: 148, colluding: true },
  { key: 's4', label: 'S4', x: 175, y: 186, colluding: false },
  { key: 's5', label: 'S5', x: 106, y: 148, colluding: true },
  { key: 's6', label: 'S6', x: 106, y: 78, colluding: false },
] as const;

const DUMPS = [
  ['s1', 's3'],
  ['s3', 's5'],
  ['s5', 's1'],
] as const;

const CONFIG: VizConfig = {
  initial: 's1',
  items: {
    s1: {
      title: 'Seat 1 — net receiver',
      text: 'Wins disproportionately from seats 3 and 5 and folds against everyone else. On its own the win rate is unremarkable; against the ring it is the pattern.',
      kv: ['net +£4,180', 'folds vs others'],
      with: ['s3', 's5'],
      stats: [
        ['m-seat', 'Seat 1'],
        ['m-role', 'Receiver'],
        ['m-evidence', 'Chip flow'],
      ],
    },
    s3: {
      title: 'Seat 3 — net feeder',
      text: 'Loses consistently to seat 1 with hands it should have played. Soft play is a behaviour, not a single decision, so it is scored across hands.',
      kv: ['net −£1,960', 'soft play'],
      with: ['s1', 's5'],
      stats: [
        ['m-seat', 'Seat 3'],
        ['m-role', 'Feeder'],
        ['m-evidence', 'Soft play'],
      ],
    },
    s5: {
      title: 'Seat 5 — net feeder',
      text: 'Same signature as seat 3, on a different device but the same subnet and the same session windows.',
      kv: ['net −£2,220', 'same subnet'],
      with: ['s1', 's3'],
      stats: [
        ['m-seat', 'Seat 5'],
        ['m-role', 'Feeder'],
        ['m-evidence', 'Session overlap'],
      ],
    },
    s2: {
      title: 'Seat 2 — unlinked',
      text: 'An ordinary player who happens to be at the table. Keeping the ring boundary tight is what stops an integrity model becoming an accusation machine.',
      kv: ['no shared edges'],
      stats: [
        ['m-seat', 'Seat 2'],
        ['m-role', 'Unlinked'],
        ['m-evidence', 'None'],
      ],
    },
    s4: {
      title: 'Seat 4 — unlinked',
      text: 'No shared device, payment, or timing edge. Scored, cleared, and left alone.',
      kv: ['cleared'],
      stats: [
        ['m-seat', 'Seat 4'],
        ['m-role', 'Unlinked'],
        ['m-evidence', 'None'],
      ],
    },
    s6: {
      title: 'Seat 6 — unlinked',
      text: 'Sits between two ring members and is not part of it. Adjacency is not evidence.',
      kv: ['cleared'],
      stats: [
        ['m-seat', 'Seat 6'],
        ['m-role', 'Unlinked'],
        ['m-evidence', 'None'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-seat', label: 'Seat' },
  { el: 'm-role', label: 'Role in ring', tone: 'signal' },
  { el: 'm-evidence', label: 'Evidence' },
];

const POS = Object.fromEntries(SEATS.map((s) => [s.key, { x: s.x, y: s.y }]));

/** iGaming panel: chip-dumping at one table, six seats. */
export function CollusionPanel() {
  return (
    <SelectableViz
      kind="collusion"
      title="Chip-dumping at one table"
      hint="Select a seat"
      config={CONFIG}
      stats={STATS}
      caption="Six seats at one table, three of them moving chips in one direction, scored as a single case rather than three separate players."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 350 226"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="col1" />
        <ellipse
          cx="175"
          cy="113"
          rx="58"
          ry="46"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.12)"
        />
        <text x="175" y="116" textAnchor="middle" className="viz-label">
          TABLE
        </text>
        {DUMPS.map(([a, b]) => {
          const from = POS[a]!;
          const to = POS[b]!;
          return (
            <path
              key={`${a}|${b}`}
              data-edge={`${a}|${b}`}
              className="viz-flow"
              d={`M${from.x},${from.y} Q175,113 ${to.x},${to.y}`}
              fill="none"
              stroke="rgba(244,113,26,0.6)"
              strokeWidth="1.6"
            />
          );
        })}
        {SEATS.map((seat) => {
          const colour = seat.colluding ? '#f4711a' : '#66cbd5';
          const fill = seat.colluding ? '#3a1406' : '#0d2c65';
          return (
            <g key={seat.key} className="viz-hit" data-key={seat.key} aria-label={seat.label}>
              <circle
                className="viz-ring"
                cx={seat.x}
                cy={seat.y}
                r="19"
                fill={colour}
                fillOpacity="0.18"
              />
              <circle cx={seat.x} cy={seat.y} r="11" fill={fill} stroke={colour} strokeWidth="2" />
              <text
                x={seat.x}
                y={seat.y + 3}
                textAnchor="middle"
                className={seat.colluding ? 'viz-label viz-label-signal' : 'viz-label'}
              >
                {seat.key.toUpperCase()}
              </text>
            </g>
          );
        })}
        <text x="175" y="216" textAnchor="middle" className="viz-label viz-label-signal">
          3 OF 6 SEATS · ONE DEVICE SUBNET · CHIPS FLOW ONE WAY
        </text>
      </svg>
    </SelectableViz>
  );
}

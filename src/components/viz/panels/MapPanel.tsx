import { SelectableViz } from '@/components/viz/SelectableViz';
import { VizBackdrop } from '@/components/viz/VizBackdrop';
import type { VizConfig, VizStat } from '@/components/viz/types';

const NODES = [
  { key: 'india', label: 'BENGALURU', x: 336, y: 128, hub: true },
  { key: 'europe', label: 'EUROPE', x: 176, y: 58, hub: false },
  { key: 'uae', label: 'UAE', x: 258, y: 96, hub: false },
  { key: 'canada', label: 'CANADA', x: 62, y: 76, hub: false },
] as const;

const CONFIG: VizConfig = {
  initial: 'india',
  items: {
    india: {
      title: 'Bengaluru — delivery centre',
      text: 'Engineering, data science, and platform in one place. The engineer on your briefing is the engineer on your project.',
      kv: ['IST', 'delivery hub'],
      with: ['europe', 'uae', 'canada'],
      stats: [
        ['m-region', 'Bengaluru'],
        ['m-overlap', 'Delivery hub'],
        ['m-work', 'Frame → operate'],
      ],
    },
    europe: {
      title: 'Europe',
      text: 'iGaming operators under UKGC and MGA frameworks, plus EU-passported fintechs. Morning overlap covers the whole European working day.',
      kv: ['UKGC / MGA', 'GDPR-aligned'],
      with: ['india'],
      stats: [
        ['m-region', 'Europe'],
        ['m-overlap', '4.5 hours'],
        ['m-work', 'AML · RG · integrity'],
      ],
    },
    uae: {
      title: 'United Arab Emirates',
      text: 'Cross-border marketplaces and payment fraud. Near-full working-day overlap with Bengaluru.',
      kv: ['GST 1.5h offset'],
      with: ['india'],
      stats: [
        ['m-region', 'UAE'],
        ['m-overlap', '7 hours'],
        ['m-work', 'Fraud · ranking'],
      ],
    },
    canada: {
      title: 'Canada',
      text: 'Credit risk and model governance. Bengaluru afternoons cover Canadian mornings, which is where the design reviews sit.',
      kv: ['MRM review'],
      with: ['india'],
      stats: [
        ['m-region', 'Canada'],
        ['m-overlap', '2.5 hours'],
        ['m-work', 'Credit · governance'],
      ],
    },
  },
};

const STATS: VizStat[] = [
  { el: 'm-region', label: 'Region' },
  { el: 'm-overlap', label: 'Daily overlap', tone: 'accent' },
  { el: 'm-work', label: 'Work delivered' },
];

/** About panel: global delivery footprint from Bengaluru. */
export function MapPanel() {
  return (
    <SelectableViz
      kind="map"
      title="Global delivery footprint"
      hint="Select a region"
      config={CONFIG}
      stats={STATS}
      caption="Delivery from Bengaluru with client engagements in Europe, the UAE, and Canada, and the working-day overlap each one has."
    >
      <svg
        className="viz-plot"
        viewBox="0 0 400 176"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <VizBackdrop id="map1" />
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx="200"
            cy="98"
            rx={188 - i * 16}
            ry={72 - i * 16}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        {NODES.filter((n) => !n.hub).map((node, i) => (
          <path
            key={node.key}
            data-edge={`india|${node.key}`}
            className="viz-flow"
            d={`M336,128 Q${(336 + node.x) / 2},${Math.min(node.y, 128) - 34} ${node.x},${node.y}`}
            fill="none"
            stroke="rgba(102,203,213,0.38)"
            strokeWidth="1.5"
            style={{ animationDelay: `-${i * 0.5}s` }}
          />
        ))}
        {NODES.map((node) => {
          const r = node.hub ? 8 : 5.5;
          const colour = node.hub ? '#00a5b3' : '#66cbd5';
          return (
            <g key={node.key} className="viz-hit" data-key={node.key} aria-label={node.label}>
              <circle
                className="viz-ring"
                cx={node.x}
                cy={node.y}
                r={r + 11}
                fill={colour}
                fillOpacity="0.16"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill="#0d2c65"
                stroke={colour}
                strokeWidth="2"
              />
              <text
                x={node.x}
                y={node.y - r - 8}
                textAnchor="middle"
                className={node.hub ? 'viz-label viz-label-accent' : 'viz-label'}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </SelectableViz>
  );
}

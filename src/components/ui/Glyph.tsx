export type GlyphName =
  | 'shield'
  | 'shield-check'
  | 'radar'
  | 'network'
  | 'dice'
  | 'dice-5'
  | 'target'
  | 'wave'
  | 'doc'
  | 'doc-check'
  | 'cloud'
  | 'chart'
  | 'rings'
  | 'eye'
  | 'lock'
  | 'refresh'
  | 'calendar'
  | 'mail';

const PATHS: Record<GlyphName, React.ReactNode> = {
  shield: <path d="M12 3l8 3v6c0 4.5-3.2 7.9-8 9-4.8-1.1-8-4.5-8-9V6l8-3z" />,
  'shield-check': (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.9-8 9-4.8-1.1-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12l5.5-3.2" />
      <path d="M12 12l-4 2.4" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6M12 15v6M4.2 7.5l5.2 3M14.6 13.5l5.2 3" />
    </>
  ),
  dice: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  'dice-5': (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  wave: <path d="M3 14c3-6 6 6 9 0s6-6 9 0" />,
  doc: (
    <>
      <path d="M8 3h8l4 4v14H8z" />
      <path d="M16 3v4h4M11 12h5M11 16h5" />
    </>
  ),
  'doc-check': (
    <path d="M9 12.75l2 2L15 10M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
  ),
  cloud: (
    <path d="M7.6 18.5h9.2a3.6 3.6 0 0 0 .4-7.18A5.2 5.2 0 0 0 7.7 9.3a3.5 3.5 0 0 0-.1 9.2z" />
  ),
  chart: <path d="M4 19h16M7 19v-6m5 6V6m5 13v-9" />,
  rings: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" opacity="0.5" />
      <path d="M12 12l6-4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="1.5" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    </>
  ),
  refresh: <path d="M4 4v5h5M20 20v-5h-5M4.5 15a8 8 0 0 0 14.9 2.5M19.5 9A8 8 0 0 0 4.6 6.5" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

type GlyphProps = {
  name: GlyphName;
  className?: string;
  strokeWidth?: number;
};

/** Line-icon set shared by chips, cards, and buttons across the site. */
export function Glyph({ name, className = 'h-5 w-5', strokeWidth = 1.6 }: GlyphProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}

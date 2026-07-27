import { cn } from '@/lib/cn';
import type { RegionCode } from '@/types/region';

export type { RegionCode };

type RegionFlagProps = {
  code: RegionCode;
  size?: 'default' | 'large';
  className?: string;
};

const sizeClasses = {
  default: 'h-11 w-11 rounded-xl',
  large: 'h-14 w-14 rounded-xl',
} as const;

const labels: Record<RegionCode, string> = {
  in: 'India flag',
  eu: 'Europe flag',
  ae: 'United Arab Emirates flag',
  ca: 'Canada flag',
};

function FlagArt({ code }: { code: RegionCode }) {
  switch (code) {
    case 'in':
      return (
        <>
          <rect width="640" height="160" fill="#FF9933" />
          <rect y="160" width="640" height="160" fill="#FFFFFF" />
          <rect y="320" width="640" height="160" fill="#138808" />
          <circle cx="320" cy="240" r="48" fill="none" stroke="#000080" strokeWidth="8" />
          <circle cx="320" cy="240" r="6" fill="#000080" />
        </>
      );
    case 'eu':
      return (
        <>
          <rect width="640" height="480" fill="#003399" />
          {Array.from({ length: 12 }, (_, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const cx = 320 + Math.cos(angle) * 110;
            const cy = 240 + Math.sin(angle) * 110;
            return <circle key={index} cx={cx} cy={cy} r="18" fill="#FFCC00" />;
          })}
        </>
      );
    case 'ae':
      return (
        <>
          <rect width="640" height="160" fill="#00732F" />
          <rect y="160" width="640" height="160" fill="#FFFFFF" />
          <rect y="320" width="640" height="160" fill="#000000" />
          <rect width="180" height="480" fill="#FF0000" />
        </>
      );
    case 'ca':
      return (
        <>
          <rect width="640" height="480" fill="#FFFFFF" />
          <rect width="160" height="480" fill="#FF0000" />
          <rect x="480" width="160" height="480" fill="#FF0000" />
          <path
            d="M320 118 L350 214 L448 214 L368 272 L398 368 L320 312 L242 368 L272 272 L192 214 L290 214 Z"
            fill="#FF0000"
          />
        </>
      );
    default: {
      const _exhaustive: never = code;
      return _exhaustive;
    }
  }
}

export function RegionFlag({ code, size = 'default', className }: RegionFlagProps) {
  return (
    <div
      className={cn(
        'inline-flex shrink-0 overflow-hidden border border-[var(--section-light-border)] bg-white shadow-sm',
        sizeClasses[size],
        className,
      )}
      role="img"
      aria-label={labels[code]}
    >
      <svg viewBox="0 0 640 480" className="h-full w-full" aria-hidden="true">
        <FlagArt code={code} />
      </svg>
    </div>
  );
}

import { cn } from '@/lib/cn';

type MiniChartProps = {
  variant?: 'bars' | 'line' | 'area';
  className?: string;
};

export function MiniChart({ variant = 'bars', className }: MiniChartProps) {
  if (variant === 'line') {
    return (
      <svg
        viewBox="0 0 120 40"
        className={cn('h-10 w-full', className)}
        aria-hidden="true"
        role="presentation"
      >
        <polyline
          fill="none"
          stroke="var(--teal-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="0,32 20,28 35,18 50,22 65,10 80,14 95,6 120,12"
        />
        <polyline
          fill="none"
          stroke="var(--navy-700)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
          points="0,36 20,34 35,30 50,28 65,24 80,26 95,20 120,22"
        />
      </svg>
    );
  }

  if (variant === 'area') {
    return (
      <svg viewBox="0 0 120 40" className={cn('h-10 w-full', className)} aria-hidden="true">
        <path
          d="M0 36 L0 28 C15 26, 25 18, 40 20 C55 22, 65 8, 80 12 C95 16, 105 6, 120 10 L120 36 Z"
          fill="url(#area-fill)"
          opacity="0.35"
        />
        <polyline
          fill="none"
          stroke="var(--teal-500)"
          strokeWidth="2.5"
          points="0,28 20,26 40,20 60,22 80,12 100,16 120,10"
        />
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal-500)" />
            <stop offset="100%" stopColor="var(--teal-500)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 40" className={cn('h-10 w-full', className)} aria-hidden="true">
      {[8, 14, 22, 18, 28, 24, 32].map((h, i) => (
        <rect
          key={i}
          x={4 + i * 16}
          y={40 - h}
          width="10"
          height={h}
          rx="2"
          fill={i % 2 === 0 ? 'var(--teal-500)' : 'var(--navy-700)'}
          opacity={i % 2 === 0 ? 1 : 0.5}
        />
      ))}
    </svg>
  );
}

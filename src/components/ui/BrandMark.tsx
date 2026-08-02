import { useId } from 'react';

type BrandMarkProps = {
  /** Light-surface gradients by default; inverse swaps to the dark-surface colourway. */
  inverse?: boolean;
  className?: string;
};

/**
 * The Klugminds logo mark. Gradient ids are namespaced with useId so several
 * marks can sit on one page without their defs colliding.
 */
export function BrandMark({ inverse = false, className = 'brand-mark' }: BrandMarkProps) {
  const uid = useId();
  const id = (name: string) => `km-${name}-${uid.replace(/[^a-zA-Z0-9-]/g, '')}`;

  const stops = inverse
    ? {
        body: ['#ffffff', '#dbe7f5'],
        orange: ['#fd8b2c', '#ef5f10'],
        tealA: ['#66d4dc', '#22b3be'],
        tealB: ['#1197a7', '#25b8c2'],
      }
    : {
        body: ['#1d3f80', '#0a1f4d'],
        orange: ['#fb7f21', '#e2530a'],
        tealA: ['#45c8d1', '#19a6b1'],
        tealB: ['#0d8b9b', '#1aa9b3'],
      };

  return (
    <svg className={className} viewBox="0 0 372 282" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id('b')} x1="0" y1="0" x2=".85" y2="1">
          <stop offset="0" stopColor={stops.body[0]} />
          <stop offset="1" stopColor={stops.body[1]} />
        </linearGradient>
        <linearGradient id={id('o')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={stops.orange[0]} />
          <stop offset="1" stopColor={stops.orange[1]} />
        </linearGradient>
        <linearGradient id={id('t1')} x1=".1" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor={stops.tealA[0]} />
          <stop offset="1" stopColor={stops.tealA[1]} />
        </linearGradient>
        <linearGradient id={id('t2')} x1="0" y1="0" x2=".9" y2=".7">
          <stop offset="0" stopColor={stops.tealB[0]} />
          <stop offset="1" stopColor={stops.tealB[1]} />
        </linearGradient>
      </defs>
      <path d="M266 0 L324 121 L247 32 Z" fill={`url(#${id('b')})`} opacity={inverse ? 0.82 : 1} />
      <path d="M247 32 L324 121 L221 77 Z" fill={`url(#${id('o')})`} />
      <path
        d="M156 0 L269 0 L98.1 274.4 A14 14 0 0 1 86.2 281 L30.3 281 A24 24 0 0 1 9.7 244.7 Z"
        fill={`url(#${id('b')})`}
      />
      <path d="M221 127 L371 204 L260 204 Z" fill={`url(#${id('t1')})`} />
      <path d="M260 204 L371 204 L221 280 Z" fill={`url(#${id('t2')})`} />
    </svg>
  );
}

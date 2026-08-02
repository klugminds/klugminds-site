'use client';

import { useState } from 'react';

type ComparisonMode = 'both' | 'old' | 'new';

type ComparisonBlockProps = {
  heading: string;
  eyebrow?: string;
  pairs: readonly (readonly [string, string])[];
};

export function ComparisonBlock({
  heading,
  eyebrow = 'WHY IT LANDS DIFFERENTLY',
  pairs,
}: ComparisonBlockProps) {
  const [mode, setMode] = useState<ComparisonMode>('both');

  return (
    <>
      <div className="max-w-2xl" data-reveal>
        <p className="font-mono-eyebrow t-accent mb-3">{eyebrow}</p>
        <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
          {heading}
        </h2>
      </div>
      <div className="cmp mt-8" data-cmp-group data-mode={mode}>
        <div
          className="cmp-toggle mb-5 flex flex-wrap gap-1.5"
          role="group"
          aria-label="Focus one side of the comparison"
        >
          {(
            [
              ['both', 'Side by side'],
              ['old', 'The usual way'],
              ['new', 'The Klugminds way'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className="rounded-full px-3.5 py-1.5 text-xs font-semibold"
              data-cmp-mode={value}
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mb-3 hidden grid-cols-[1fr_3rem_1fr] lg:grid">
          <p className="font-mono-eyebrow t-muted">THE USUAL WAY</p>
          <span />
          <p className="font-mono-eyebrow t-accent">THE KLUGMINDS WAY</p>
        </div>
        <ol className="space-y-3">
          {pairs.map(([oldWay, newWay], i) => (
            <li key={oldWay} className="cmp-row" data-reveal data-reveal-delay={i || undefined}>
              <div className="cmp-cell cmp-old">
                <span className="cmp-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="sr-only">The usual way: </span>
                {oldWay}
              </div>
              <div className="cmp-arrow" aria-hidden="true">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <div className="cmp-cell cmp-new">
                <span className="sr-only">The Klugminds way: </span>
                {newWay}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

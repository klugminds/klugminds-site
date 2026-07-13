import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
};

export function Section({
  children,
  className,
  id,
  'aria-labelledby': ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('py-[var(--spacing-section)]', className)}
    >
      {children}
    </section>
  );
}

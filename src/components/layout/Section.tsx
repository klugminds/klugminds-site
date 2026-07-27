import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
  variant?: 'default' | 'muted' | 'light';
};

export function Section({
  children,
  className,
  id,
  'aria-labelledby': ariaLabelledBy,
  variant = 'default',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        'py-[var(--spacing-section)] sm:py-20 lg:py-24',
        id && 'scroll-mt-24',
        variant === 'muted' && 'section-highlight',
        variant === 'light' && 'section-light',
        className,
      )}
    >
      {children}
    </section>
  );
}

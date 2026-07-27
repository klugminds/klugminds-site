import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import { HeroVisual } from '@/components/marketing/HeroVisual';
import { PageVisualFrame } from '@/components/marketing/PageVisualFrame';
import type { PageVisual } from '@/config/images/page-visuals';
import { cn } from '@/lib/cn';

type PageHeroProps = {
  announcement?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  caption?: string;
  children?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  size?: 'default' | 'large';
  visual?: PageVisual;
  /** Home: capability panel. Pass `aside` for page-specific panels (e.g. careers). */
  visualVariant?: 'default' | 'capabilities' | 'aside';
  aside?: ReactNode;
};

export function PageHero({
  announcement,
  eyebrow,
  title,
  description,
  caption,
  children,
  className,
  align = 'left',
  size = 'default',
  visual,
  visualVariant = 'default',
  aside,
}: PageHeroProps) {
  const isCenter = align === 'center';
  const isLarge = size === 'large';
  const hasAside =
    isLarge && !isCenter && (visualVariant === 'capabilities' || visualVariant === 'aside' || Boolean(visual));

  return (
    <section
      className={cn(
        'hero-gradient border-border relative overflow-hidden border-b',
        isLarge && 'md:min-h-[min(72vh,680px)] lg:min-h-[min(80vh,760px)]',
        hasAside && (visualVariant === 'capabilities' || visualVariant === 'aside') && 'pb-0',
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-16 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />

      <Container
        className={cn(
          'relative flex flex-col justify-center py-14 sm:py-16 md:py-20',
          isLarge && 'md:min-h-[min(72vh,680px)] lg:min-h-[min(80vh,760px)] lg:py-24',
        )}
      >
        <div
          className={cn(
            'grid items-center gap-8 sm:gap-10',
            hasAside && 'md:grid-cols-2 md:gap-10 lg:gap-14',
          )}
        >
          <div className={cn('min-w-0 max-w-4xl', isCenter && 'mx-auto text-center')}>
            {announcement ? (
              <p className="border-accent-muted/30 text-accent-muted mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium">
                <span aria-hidden="true" className="bg-accent-muted h-1.5 w-1.5 rounded-full" />
                {announcement}
              </p>
            ) : null}
            {eyebrow ? (
              <p className="font-mono-eyebrow text-accent-muted mb-5">{eyebrow}</p>
            ) : null}
            <h1
              className={cn(
                'font-display text-foreground font-bold tracking-tight text-balance',
                isLarge
                  ? 'text-3xl leading-[1.12] sm:text-4xl md:text-5xl lg:text-[length:var(--fs-hero)] lg:leading-[1.1]'
                  : 'text-3xl leading-[1.15] sm:text-4xl md:text-5xl',
              )}
            >
              {title}
            </h1>
            {description ? (
              <p
                className={cn(
                  'text-soft mt-5 max-w-2xl leading-relaxed text-pretty sm:mt-6',
                  isLarge ? 'text-base sm:text-lg md:text-xl' : 'text-base sm:text-lg',
                  isCenter && 'mx-auto',
                )}
              >
                {description}
              </p>
            ) : null}
            {children ? (
              <div className={cn('mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4', isCenter && 'justify-center')}>
                {children}
              </div>
            ) : null}
            {caption ? (
              <p className="font-mono text-muted mt-5 text-xs tracking-wide sm:mt-6">{caption}</p>
            ) : null}
          </div>

          {hasAside ? (
            <div className="min-w-0 pb-6 sm:pb-8 md:pb-0">
              {visualVariant === 'capabilities' ? (
                <HeroVisual />
              ) : visualVariant === 'aside' && aside ? (
                aside
              ) : visual ? (
                <PageVisualFrame visual={visual} priority overlay="dark" />
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

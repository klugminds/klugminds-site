import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

export type CardGlow = 'brand' | 'teal';

const glowClasses: Record<CardGlow, string> = {
  brand: 'bg-[var(--navy-800)]',
  teal: 'bg-[var(--accent-on-light)]',
};

const iconClasses: Record<CardGlow, string> = {
  brand: 'bg-[var(--navy-800)]/10 text-[var(--navy-800)]',
  teal: 'bg-[var(--accent-on-light)]/10 text-accent-on-light',
};

export function cardGlowAt(index: number): CardGlow {
  return index % 2 === 0 ? 'brand' : 'teal';
}

type ContentCardProps<T extends ElementType = 'article'> = {
  as?: T;
  glow?: CardGlow;
  icon?: LucideIcon;
  eyebrow?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
  trailing?: ReactNode;
  /** Flag or custom mark shown instead of a Lucide icon */
  leading?: ReactNode;
  /** Content rendered at the top of the card, above the icon row */
  prepend?: ReactNode;
  children?: ReactNode;
  iconSize?: 'default' | 'large';
  padding?: 'default' | 'large';
  align?: 'left' | 'center';
  layout?: 'vertical' | 'horizontal';
  /** Cap title and description lines so grid cards align evenly */
  clampText?: boolean;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'title'>;

export function ContentCard<T extends ElementType = 'article'>({
  as,
  glow = 'brand',
  icon: Icon,
  eyebrow,
  title,
  description,
  footer,
  trailing,
  leading,
  prepend,
  children,
  iconSize = 'default',
  padding = 'default',
  align = 'left',
  layout = 'vertical',
  clampText = false,
  className,
  ...props
}: ContentCardProps<T>) {
  const Component = as ?? 'article';
  const isHorizontal = layout === 'horizontal';

  return (
    <Component
      className={cn(
        'content-card group relative flex overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-0.5',
        isHorizontal ? 'flex-row items-start gap-4 p-5 sm:gap-5 sm:p-6' : 'flex-col',
        !isHorizontal && (padding === 'large' ? 'p-8 sm:p-10' : 'p-6 sm:p-7'),
        align === 'center' && 'text-center',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-20 blur-2xl',
          glowClasses[glow],
        )}
      />

      {prepend ? <div className="relative mb-4 shrink-0">{prepend}</div> : null}

      {leading || Icon || trailing ? (
        <div
          className={cn(
            'relative flex shrink-0 items-start justify-between gap-3',
            isHorizontal ? 'mb-0' : 'mb-4',
          )}
        >
          {leading ? (
            leading
          ) : Icon ? (
            <div
              className={cn(
                'inline-flex items-center justify-center rounded-xl',
                isHorizontal
                  ? 'h-11 w-11'
                  : iconSize === 'large'
                    ? 'h-14 w-14'
                    : 'h-11 w-11',
                iconClasses[glow],
              )}
            >
              <Icon
                className={
                  isHorizontal ? 'h-5 w-5' : iconSize === 'large' ? 'h-7 w-7' : 'h-5 w-5'
                }
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>
          ) : (
            <span />
          )}
          {trailing}
        </div>
      ) : null}

      <div className={cn('relative min-w-0', isHorizontal ? 'flex-1' : 'flex flex-1 flex-col')}>
        {eyebrow ? (
          <p className="font-mono-eyebrow text-accent-on-light relative">{eyebrow}</p>
        ) : null}

        {title ? (
          <h3
            className={cn(
              'font-display relative font-bold text-[var(--ink)]',
              eyebrow ? 'mt-2 text-xl sm:text-2xl' : isHorizontal ? 'text-base sm:text-lg' : 'text-lg',
              clampText && !isHorizontal && 'line-clamp-3',
            )}
          >
            {title}
          </h3>
        ) : null}

        {description ? (
          <p
            className={cn(
              'relative text-sm leading-relaxed text-[var(--slate-700)] sm:text-base',
              title ? (isHorizontal ? 'mt-2' : 'mt-3') : 'mt-0',
              clampText && !isHorizontal && 'line-clamp-3',
            )}
          >
            {description}
          </p>
        ) : null}

        {children ? <div className="relative">{children}</div> : null}

        {footer ? (
          <div className={cn('relative', isHorizontal ? 'mt-3' : 'mt-auto pt-4')}>{footer}</div>
        ) : null}
      </div>
    </Component>
  );
}

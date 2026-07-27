import { cn } from '@/lib/cn';

type SectionTone = 'dark' | 'light';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
  tone?: SectionTone;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  tone = 'dark',
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  const isLight = tone === 'light';

  return (
    <div className={cn('mb-10 max-w-3xl sm:mb-12', isCenter && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p
          className={cn(
            'font-mono-eyebrow mb-4',
            isLight ? 'text-accent-on-light' : 'text-accent-muted',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          'font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl',
          isLight ? 'text-[var(--section-light-fg)]' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed text-pretty',
            isLight ? 'text-[var(--section-light-muted)]' : 'text-muted',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

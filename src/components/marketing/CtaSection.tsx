import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/cn';

type CtaLink = { label: string; href: string };

type CtaSectionProps = {
  title: string;
  description?: string;
  cta?: CtaLink;
  secondaryCta?: CtaLink;
  className?: string;
  id?: string;
  variant?: 'default' | 'teal' | 'gradient';
};

export function CtaSection({
  title,
  description,
  cta,
  secondaryCta,
  className,
  id,
  variant = 'default',
}: CtaSectionProps) {
  const isGradient = variant === 'teal' || variant === 'gradient';

  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden border-t',
        id && 'scroll-mt-24',
        isGradient ? 'cta-gradient border-[var(--teal-600)]/30' : 'section-gradient border-border',
        className,
      )}
    >
      {!isGradient ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgb(30_79_190/0.18),transparent_55%),radial-gradient(ellipse_at_70%_50%,rgb(58_169_224/0.16),transparent_55%)]" />
      ) : null}
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <h2
          className={cn(
            'font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl',
            isGradient ? 'text-white' : 'text-foreground',
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              'mx-auto mt-5 max-w-xl text-lg leading-relaxed',
              isGradient ? 'text-white/85' : 'text-muted',
            )}
          >
            {description}
          </p>
        ) : null}
        {cta || secondaryCta ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
            {cta ? (
              <ButtonLink
                href={cta.href}
                variant={isGradient ? 'outline' : 'primary'}
                className={
                  isGradient
                    ? 'border-white/35 text-white hover:border-white/60 hover:bg-white/10'
                    : undefined
                }
              >
                {cta.label}
              </ButtonLink>
            ) : null}
            {secondaryCta ? (
              <ButtonLink
                href={secondaryCta.href}
                variant="outline"
                className={
                  isGradient
                    ? 'border-white/35 text-white hover:border-white/60 hover:bg-white/10'
                    : undefined
                }
              >
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

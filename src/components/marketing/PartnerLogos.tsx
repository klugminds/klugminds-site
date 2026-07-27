import Image from 'next/image';
import Link from 'next/link';

import type { Partner } from '@/config/content/home';
import { cn } from '@/lib/cn';

type PartnerLogosProps = {
  eyebrow: string;
  partners: readonly Partner[];
  tone?: 'dark' | 'light';
};

export function PartnerLogos({ eyebrow, partners, tone = 'dark' }: PartnerLogosProps) {
  const isLight = tone === 'light';

  return (
    <div className="text-center">
      <p
        className={cn(
          'font-mono-eyebrow mb-8 sm:mb-10',
          isLight ? 'text-accent-on-light' : 'text-accent-muted',
        )}
      >
        {eyebrow}
      </p>
      <ul className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4 lg:gap-10">
        {partners.map((partner) => {
          const onDarkSurface = partner.logoSurface === 'dark';

          return (
          <li key={partner.name} className="w-full max-w-[200px]">
            <Link
              href={partner.href}
              target={partner.href.startsWith('http') ? '_blank' : undefined}
              rel={partner.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={cn(
                'group flex h-20 w-full items-center justify-center rounded-2xl border px-4 py-3 transition-all duration-200 sm:h-24',
                onDarkSurface
                  ? 'border-[var(--navy-800)] bg-[var(--navy-900)] hover:border-[var(--teal-500)]/40 hover:shadow-[0_12px_32px_rgb(0_165_179/0.2)]'
                  : isLight
                    ? 'border-[var(--section-light-border)] bg-white hover:shadow-[0_12px_32px_rgb(10_31_68/0.08)]'
                    : 'border-border bg-surface/50 hover:bg-surface/80',
              )}
              aria-label={partner.name}
            >
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.logoWidth ?? 160}
                  height={partner.logoHeight ?? 48}
                  sizes="160px"
                  className={cn(
                    'block h-auto max-h-10 w-auto max-w-[140px] object-contain transition-opacity group-hover:opacity-100 sm:max-h-12 sm:max-w-[160px]',
                    onDarkSurface ? 'opacity-95' : 'opacity-80',
                    partner.logoClassName,
                  )}
                />
              ) : (
                <span
                  className={cn(
                    'font-display text-xs font-medium tracking-[0.12em] uppercase sm:text-sm',
                    onDarkSurface || !isLight ? 'text-white/80' : 'text-[var(--slate-700)]',
                  )}
                >
                  {partner.name}
                </span>
              )}
            </Link>
          </li>
          );
        })}
      </ul>
    </div>
  );
}

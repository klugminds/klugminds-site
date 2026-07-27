import Link from 'next/link';

import type { Partner } from '@/config/content/home';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { cn } from '@/lib/cn';

type PartnerMarqueeProps = {
  eyebrow: string;
  title?: string;
  partners: readonly Partner[];
  className?: string;
};

export function PartnerMarquee({ eyebrow, title, partners, className }: PartnerMarqueeProps) {
  const doubled = [...partners, ...partners];

  return (
    <div className={cn('text-center', className)}>
      {title ? (
        <SectionHeader eyebrow={eyebrow} title={title} align="center" className="mx-auto" />
      ) : (
        <p className="font-mono-eyebrow text-accent-muted mb-8 sm:mb-10">{eyebrow}</p>
      )}
      <div className="marquee-mask relative overflow-hidden">
        <ul className="animate-marquee flex w-max items-center gap-8 sm:gap-12">
          {doubled.map((partner, index) => (
            <li key={`${partner.name}-${index}`} className="flex shrink-0 items-center gap-8 sm:gap-12">
              <Link
                href={partner.href}
                target={partner.href.startsWith('http') ? '_blank' : undefined}
                rel={partner.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-display text-muted hover:text-foreground text-sm font-medium tracking-[0.16em] uppercase transition-colors sm:text-base"
              >
                {partner.name}
              </Link>
              <span aria-hidden="true" className="text-border">
                |
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';

import type { FeatureItem } from '@/config/content/home';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { PageVisualFrame } from '@/components/marketing/PageVisualFrame';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import type { PageVisual } from '@/config/images/page-visuals';
import { resolveFeatureIcon } from '@/config/icons/feature-icons';
import { cn } from '@/lib/cn';

type FeatureShowcaseSectionProps = {
  visual?: PageVisual;
  aside?: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  items: readonly FeatureItem[];
  tone?: 'dark' | 'light';
  reverse?: boolean;
  className?: string;
};

export function FeatureShowcaseSection({
  visual,
  aside,
  eyebrow,
  title,
  description,
  items,
  tone = 'light',
  reverse = false,
  className,
}: FeatureShowcaseSectionProps) {
  const isLight = tone === 'light';
  const panelClass = cn(
    'lg:sticky lg:top-24 lg:col-span-5',
    reverse ? 'lg:col-start-8' : 'lg:col-start-1',
  );

  return (
    <div className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} tone={tone} />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        {aside ? (
          <div className={panelClass}>{aside}</div>
        ) : visual ? (
          <PageVisualFrame
            visual={visual}
            overlay={isLight ? 'light' : 'dark'}
            className={cn(
              panelClass,
              isLight ? 'shadow-[0_16px_40px_rgb(13_44_101/0.08)]' : undefined,
            )}
          />
        ) : null}

        <ul
          className={cn(
            'flex flex-col gap-4 sm:gap-5 lg:col-span-7',
            reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-6',
          )}
        >
          {items.map((item, index) => (
            <li key={item.slug ?? item.title}>
              <ContentCard
                glow={cardGlowAt(index)}
                icon={resolveFeatureIcon(item.icon)}
                title={item.title}
                description={item.description}
                layout="horizontal"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

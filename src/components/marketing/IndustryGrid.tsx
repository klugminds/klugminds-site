import Link from 'next/link';

import type { FeatureItem } from '@/config/content/home';
import { resolveIndustryIcon } from '@/config/icons/industry-icons';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { cn } from '@/lib/cn';

type IndustryGridProps = {
  items: readonly FeatureItem[];
  className?: string;
};

export function IndustryGrid({ items, className }: IndustryGridProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3', className)}>
      {items.map((item, index) => (
        <ContentCard
          key={item.title}
          glow={cardGlowAt(index)}
          icon={resolveIndustryIcon(item.title)}
          iconSize="large"
          title={item.title}
          description={item.description}
          className="h-full"
          footer={
            item.href ? (
              <Link
                href={item.href}
                className="text-accent-on-light inline-flex text-sm font-semibold transition-colors hover:text-accent-on-light-hover"
              >
                Explore {item.title} →
              </Link>
            ) : null
          }
        />
      ))}
    </div>
  );
}

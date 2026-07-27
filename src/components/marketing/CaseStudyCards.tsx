import Link from 'next/link';

import type { CaseStudy } from '@/config/content/home';
import { resolveIndustryIcon } from '@/config/icons/industry-icons';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { cn } from '@/lib/cn';

type CaseStudyCardsProps = {
  items: readonly CaseStudy[];
  className?: string;
};

export function CaseStudyCards({ items, className }: CaseStudyCardsProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 xl:grid-cols-4', className)}>
      {items.map((item, index) => (
        <Link key={item.stat + item.industry} href={item.href} className="block h-full">
          <ContentCard
            glow={cardGlowAt(index)}
            icon={resolveIndustryIcon(item.industry)}
            eyebrow={item.industry}
            title={item.stat}
            description={item.context}
            className="h-full [&_h3]:font-mono [&_h3]:text-4xl [&_h3]:text-accent-on-light"
          />
        </Link>
      ))}
    </div>
  );
}

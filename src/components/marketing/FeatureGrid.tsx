import type { FeatureItem } from '@/config/content/home';
import { resolveFeatureIcon } from '@/config/icons/feature-icons';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { cn } from '@/lib/cn';

type FeatureCardProps = {
  item: FeatureItem;
  glowIndex?: number;
  className?: string;
};

export function FeatureCard({ item, glowIndex = 0, className }: FeatureCardProps) {
  const card = (
    <ContentCard
      glow={cardGlowAt(glowIndex)}
      icon={resolveFeatureIcon(item.icon)}
      title={item.title}
      description={item.description}
      className={cn('h-full', className)}
    />
  );

  if (item.slug) {
    return (
      <div id={item.slug} className="scroll-mt-24 h-full">
        {card}
      </div>
    );
  }

  return card;
}

type FeatureGridProps = {
  items: readonly FeatureItem[];
  columns?: 2 | 3;
  className?: string;
};

export function FeatureGrid({ items, columns = 3, className }: FeatureGridProps) {
  const gridClass =
    columns === 2
      ? 'grid gap-4 sm:grid-cols-2 sm:gap-5'
      : 'grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3';

  return (
    <div className={cn(gridClass, className)}>
      {items.map((item, index) => (
        <FeatureCard key={item.slug ?? item.title} item={item} glowIndex={index} />
      ))}
    </div>
  );
}

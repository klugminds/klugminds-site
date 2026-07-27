import { resolveFeatureIcon } from '@/config/icons/feature-icons';
import type { FeatureItem } from '@/config/content/home';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { cn } from '@/lib/cn';

type ProofPointsProps = {
  items: readonly FeatureItem[];
  className?: string;
};

export function ProofPoints({ items, className }: ProofPointsProps) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4', className)}>
      {items.map((item, index) => (
        <ContentCard
          key={item.title}
          glow={cardGlowAt(index)}
          icon={resolveFeatureIcon(item.icon)}
          title={item.title}
          description={item.description}
          className="h-full"
        />
      ))}
    </div>
  );
}

import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { RegionFlag } from '@/components/marketing/RegionFlag';
import type { RegionCode } from '@/types/region';
import { cn } from '@/lib/cn';

export type LocationItem = {
  title: string;
  description: string;
  region: RegionCode;
};

type LocationGridProps = {
  items: readonly LocationItem[];
  columns?: 2 | 3 | 4;
  className?: string;
};

export function LocationGrid({ items, columns = 2, className }: LocationGridProps) {
  const gridClass =
    columns === 4
      ? 'grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4'
      : columns === 3
        ? 'grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3'
        : 'grid gap-4 sm:grid-cols-2 sm:gap-5';

  return (
    <div className={cn(gridClass, className)}>
      {items.map((item, index) => (
        <ContentCard
          key={item.title}
          glow={cardGlowAt(index)}
          leading={<RegionFlag code={item.region} />}
          title={item.title}
          description={item.description}
          className="h-full"
        />
      ))}
    </div>
  );
}

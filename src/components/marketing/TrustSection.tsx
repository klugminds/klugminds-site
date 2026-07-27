import type { FeatureItem } from '@/config/content/home';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { cn } from '@/lib/cn';

type TrustSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly FeatureItem[];
  footnote?: string;
  tone?: 'dark' | 'light';
  className?: string;
};

export function TrustSection({
  eyebrow,
  title,
  description,
  items,
  footnote,
  tone = 'dark',
  className,
}: TrustSectionProps) {
  return (
    <div className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} tone={tone} />
      <FeatureGrid items={items} columns={2} />
      {footnote ? (
        <p
          className={cn(
            'mt-8 max-w-3xl text-sm leading-relaxed',
            tone === 'light' ? 'text-[var(--section-light-muted)]' : 'text-muted',
          )}
        >
          {footnote}
        </p>
      ) : null}
    </div>
  );
}

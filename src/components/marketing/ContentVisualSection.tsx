import type { ReactNode } from 'react';

import { PageVisualFrame } from '@/components/marketing/PageVisualFrame';
import type { PageVisual } from '@/config/images/page-visuals';
import { cn } from '@/lib/cn';

type ContentVisualSectionProps = {
  visual: PageVisual;
  children: ReactNode;
  reverse?: boolean;
  tone?: 'dark' | 'light';
  className?: string;
};

export function ContentVisualSection({
  visual,
  children,
  reverse = false,
  tone = 'dark',
  className,
}: ContentVisualSectionProps) {
  const isLight = tone === 'light';

  return (
    <div
      className={cn(
        'grid items-start gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-14',
        reverse && 'lg:[&>*:first-child]:order-2',
        className,
      )}
    >
      <div className="min-w-0">{children}</div>
      <PageVisualFrame
        visual={visual}
        overlay={isLight ? 'light' : 'dark'}
        className={isLight ? 'shadow-[0_16px_40px_rgb(13_44_101/0.08)]' : undefined}
      />
    </div>
  );
}

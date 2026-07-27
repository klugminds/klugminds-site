import Image from 'next/image';

import type { PageVisual } from '@/config/images/page-visuals';
import { cn } from '@/lib/cn';

type PageVisualFrameProps = {
  visual: PageVisual;
  className?: string;
  priority?: boolean;
  overlay?: 'dark' | 'light' | 'none';
};

export function PageVisualFrame({
  visual,
  className,
  priority = false,
  overlay = 'dark',
}: PageVisualFrameProps) {
  return (
    <figure
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border shadow-[0_20px_50px_rgb(13_44_101/0.15)]',
        overlay === 'none' ? 'border-[var(--section-light-border)]' : 'border-white/10',
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
          className="object-cover"
        />
      </div>
      {overlay !== 'none' ? (
        <div
          className={cn(
            'pointer-events-none absolute inset-0',
            overlay === 'dark'
              ? 'bg-[linear-gradient(180deg,rgb(13_44_101/0.05)_0%,rgb(13_44_101/0.35)_100%)]'
              : 'bg-[linear-gradient(180deg,transparent_60%,rgb(13_44_101/0.12)_100%)]',
          )}
          aria-hidden="true"
        />
      ) : null}
    </figure>
  );
}

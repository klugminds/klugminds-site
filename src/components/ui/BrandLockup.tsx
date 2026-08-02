'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BrandMark } from '@/components/ui/BrandMark';
import { ROUTES } from '@/constants/routes';

type BrandLockupProps = {
  /** `header` sizes the lockup for the nav bar; `panel` is the larger footer card. */
  variant: 'header' | 'panel';
};

/**
 * The full brand lockup — mark, wordmark, and tagline — on the white chip
 * that supplies contrast on any surface.
 */
export function BrandLockup({ variant }: BrandLockupProps) {
  const pathname = usePathname();
  const chipClass =
    variant === 'header' ? 'brand-chip brand-chip--hdr' : 'brand-chip brand-chip--panel';
  const innerClass =
    variant === 'header' ? 'brand brand-chip-inner' : 'brand brand-chip-inner brand-lg';

  const scrollHome = () => {
    if (pathname === ROUTES.home) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link className={chipClass} href={ROUTES.home} onClick={scrollHome}>
      <span className={innerClass}>
        <BrandMark />
        <span className="flex flex-col gap-1">
          <span className="brand-word">
            Klugm<span className="brand-i">i</span>nds
          </span>
          <span className="brand-tag">Think Smart Build Impact</span>
        </span>
      </span>
    </Link>
  );
}

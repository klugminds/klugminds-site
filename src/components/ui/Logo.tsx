import Image from 'next/image';
import Link from 'next/link';

import { siteImages } from '@/config/images';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/cn';

type LogoProps = {
  className?: string;
  /** Nav: compact primary mark. Footer: full primary lockup with tagline. */
  variant?: 'nav' | 'footer';
};

const { logoPrimaryNav, logoPrimary } = siteImages;

export function Logo({ className, variant = 'nav' }: LogoProps) {
  const isFooter = variant === 'footer';

  if (isFooter) {
    return (
      <Link
        href={ROUTES.home}
        className={cn('inline-flex max-w-full shrink-0 items-center', className)}
        aria-label={`${siteConfig.name} home`}
      >
        <Image
          src={logoPrimary.src}
          alt={logoPrimary.alt}
          width={logoPrimary.width}
          height={logoPrimary.height}
          sizes="(max-width: 640px) 280px, 320px"
          className="block h-auto w-full max-w-[280px] rounded-xl sm:max-w-[300px]"
        />
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.home}
      className={cn('inline-flex max-w-full shrink-0 items-center', className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span className="inline-flex items-center justify-center rounded-lg bg-white p-2 shadow-[0_2px_10px_rgb(13_44_101/0.14)] sm:p-2.5">
        <Image
          src={logoPrimaryNav.src}
          alt={logoPrimaryNav.alt}
          width={logoPrimaryNav.width}
          height={logoPrimaryNav.height}
          priority
          sizes="120px"
          className="block h-8 w-auto object-contain sm:h-9"
        />
      </span>
    </Link>
  );
}

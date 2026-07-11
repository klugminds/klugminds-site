import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/cn';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href={ROUTES.home}
      className={cn('text-foreground inline-flex items-center gap-2 font-semibold', className)}
      aria-label={`${siteConfig.name} home`}
    >
      <Image src="/logo.svg" alt="" width={32} height={32} aria-hidden="true" priority />
      <span>{siteConfig.name}</span>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

import { handleNavLinkClick } from '@/lib/nav';

type SiteLinkProps = ComponentProps<typeof Link>;

export function SiteLink({ href, onClick, ...props }: SiteLinkProps) {
  const pathname = usePathname();
  const resolvedHref = typeof href === 'string' ? href : (href.pathname ?? '/');

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        if (typeof resolvedHref === 'string') {
          handleNavLinkClick(event, resolvedHref, pathname);
        }
        onClick?.(event);
      }}
    />
  );
}

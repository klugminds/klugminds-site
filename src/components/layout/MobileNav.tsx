'use client';

import { useSyncExternalStore, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ButtonLink } from '@/components/ui/ButtonLink';
import type { NavLink } from '@/config/content/navigation';
import { cn } from '@/lib/cn';
import {
  getHashSnapshot,
  getServerHashSnapshot,
  handleNavLinkClick,
  isNavLinkActive,
  subscribeToHash,
} from '@/lib/nav';

type MobileNavProps = {
  links: NavLink[];
  cta: NavLink;
};

export function MobileNav({ links, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="text-foreground border-border bg-surface/80 inline-flex h-10 w-10 items-center justify-center rounded-lg border"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          className="border-border bg-background/98 absolute inset-x-0 top-full z-50 border-b px-[var(--spacing-container)] py-6 shadow-2xl backdrop-blur-md"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const active = isNavLinkActive(pathname, link.href, hash);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-surface/80 text-accent-muted font-semibold'
                        : 'text-foreground hover:text-accent-muted',
                    )}
                    aria-current={active ? 'page' : undefined}
                    onClick={(event) => {
                      handleNavLinkClick(event, link.href, pathname);
                      setOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4">
            <ButtonLink
              href={cta.href}
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {cta.label}
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </div>
  );
}

type DesktopNavProps = {
  links: NavLink[];
  cta: NavLink;
};

export function DesktopNav({ links, cta }: DesktopNavProps) {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);

  return (
    <div className="hidden items-center gap-4 lg:flex lg:gap-8">
      <ul className="flex items-center gap-1">
        {links.map((link) => {
          const active = isNavLinkActive(pathname, link.href, hash);
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  'rounded-lg px-2.5 py-2 text-sm font-medium transition-colors lg:px-3',
                  active
                    ? 'text-accent-muted bg-accent/10 font-semibold'
                    : 'text-muted hover:text-foreground',
                )}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => handleNavLinkClick(event, link.href, pathname)}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ButtonLink href={cta.href} className="shrink-0 px-4 py-2 text-xs whitespace-nowrap lg:px-5 lg:py-2.5 lg:text-sm">
        {cta.label}
      </ButtonLink>
    </div>
  );
}

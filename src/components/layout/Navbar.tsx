'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { NavIcon } from '@/components/layout/NavIcon';
import { BrandLockup } from '@/components/ui/BrandLockup';
import { CommandPaletteShortcut } from '@/components/ui/CommandPaletteShortcut';
import { SearchIcon } from '@/components/ui/SearchIcon';
import { ctaNavLink, megaMenus } from '@/config/content/navigation';
import { openBriefing } from '@/lib/briefing';
import { openCommandPalette } from '@/lib/command-palette';

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const MEGA_CLOSE_DELAY_MS = 140;

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      className="mega-chev h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** Which mega-menu owns the current page, for the active-trigger highlight. */
function activeMenuIndex(pathname: string): number {
  return megaMenus.findIndex((menu) =>
    menu.items
      .concat(menu.footer ? [{ ...menu.footer, description: '', icon: 'link' }] : [])
      .some(({ href }) => {
        const path = href.split('#')[0] ?? href;
        return path !== '/' && pathname.startsWith(path);
      }),
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [openMega, setOpenMega] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = activeMenuIndex(pathname);

  const clearMegaCloseTimer = () => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current);
      megaCloseTimer.current = null;
    }
  };

  // Close everything on navigation (deferred — avoids setState during commit).
  useEffect(() => {
    clearMegaCloseTimer();
    queueMicrotask(() => {
      setOpenMega(null);
      setMobileOpen(false);
      setMobileSub(null);
    });
  }, [pathname]);

  useEffect(() => () => clearMegaCloseTimer(), []);

  // Escape, outside click, and scroll all close an open mega panel.
  useEffect(() => {
    if (openMega === null) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMega(null);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMega(null);
      }
    };
    const onScroll = () => setOpenMega(null);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [openMega]);

  const hoverOpen = (index: number) => {
    if (!window.matchMedia(FINE_POINTER_QUERY).matches) {
      return;
    }
    clearMegaCloseTimer();
    setOpenMega(index);
  };
  const hoverClose = () => {
    if (!window.matchMedia(FINE_POINTER_QUERY).matches) {
      return;
    }
    clearMegaCloseTimer();
    megaCloseTimer.current = setTimeout(() => setOpenMega(null), MEGA_CLOSE_DELAY_MS);
  };

  const onCtaClick = (event: React.MouseEvent) => {
    event.preventDefault();
    openBriefing();
  };

  const onOpenSearch = () => {
    setOpenMega(null);
    setMobileOpen(false);
    setMobileSub(null);
    openCommandPalette();
  };

  return (
    <header
      ref={headerRef}
      id="site-header"
      className="border-border/60 sticky top-0 z-40 border-b bg-[var(--navy-900)]/95 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="relative flex h-16 min-h-16 items-center justify-between gap-3 lg:h-[4.75rem]"
          aria-label="Main navigation"
        >
          <div className="min-w-0 shrink-0">
            <BrandLockup variant="header" />
          </div>

          {/* Desktop mega-nav */}
          <div className="hidden items-center gap-3 lg:flex lg:gap-5">
            <ul className="flex items-center gap-1">
              {megaMenus.map((menu, index) => (
                <li
                  key={menu.label}
                  className={`mega${openMega === index ? 'is-open' : ''}`}
                  onPointerEnter={() => hoverOpen(index)}
                  onPointerLeave={hoverClose}
                >
                  <button
                    type="button"
                    className={`mega-trigger inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors lg:px-3 ${
                      activeIndex === index ? 't-fg' : 'text-muted hover:t-fg'
                    }`}
                    aria-expanded={openMega === index}
                    aria-controls={`mega-${index}`}
                    aria-haspopup="true"
                    onClick={() => setOpenMega(openMega === index ? null : index)}
                  >
                    {menu.label}
                    <Chevron />
                  </button>
                  <div
                    id={`mega-${index}`}
                    className="mega-panel mega-panel--std"
                    role="group"
                    aria-label={menu.label}
                    onPointerEnter={clearMegaCloseTimer}
                    onPointerLeave={hoverClose}
                  >
                    <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-[0_24px_60px_rgb(8_20_45/0.22)]">
                      <div className="grid gap-1 sm:grid-cols-2">
                        {menu.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-[#f1f6fa]"
                            onClick={() => setOpenMega(null)}
                          >
                            <span className="mt-0.5 shrink-0 text-[#007a85]">
                              <NavIcon icon={item.icon} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-bold text-[#0d2c65] transition-colors group-hover:text-[#007a85]">
                                {item.label}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-[#334155]">
                                {item.description}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-5 border-t border-[#e2e8f0] pt-4">
                        <Link
                          href={menu.footer.href}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#007a85] hover:text-[#00838f]"
                          onClick={() => setOpenMega(null)}
                        >
                          {menu.footer.label} <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="v4-search"
              aria-label="Search the site"
              onClick={onOpenSearch}
            >
              <SearchIcon />
              <span>Search</span>
              <CommandPaletteShortcut />
            </button>
            <a
              href={ctaNavLink.href}
              onClick={onCtaClick}
              data-magnet="4"
              className="btn-glow border-accent-interactive bg-accent-interactive text-accent-foreground hover:bg-accent-on-light-hover shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap shadow-[0_0_28px_rgb(0_122_133/0.35)] transition-all"
            >
              {ctaNavLink.label}
            </a>
          </div>

          {/* Mobile search + menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              className="t-fg border-border bg-surface/80 inline-flex h-10 w-10 items-center justify-center rounded-lg border"
              aria-label="Search the site"
              onClick={onOpenSearch}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="t-fg border-border bg-surface/80 inline-flex h-10 w-10 items-center justify-center rounded-lg border"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div id="mobile-menu" className={`lg:hidden${mobileOpen ? 'is-open' : ''}`}>
          <button type="button" className="v4-search-mobile" onClick={onOpenSearch}>
            <SearchIcon />
            <span>Search solutions, services, pages…</span>
            <CommandPaletteShortcut />
          </button>
          <ul className="flex flex-col pt-1 pb-3">
            {megaMenus.map((menu, index) => (
              <li key={menu.label} className="border-b border-white/5">
                <button
                  type="button"
                  className="m-sub-trigger text-muted hover:t-fg flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium"
                  aria-expanded={mobileSub === index}
                  aria-controls={`m-sub-${index}`}
                  onClick={() => setMobileSub(mobileSub === index ? null : index)}
                >
                  {menu.label}
                  <Chevron />
                </button>
                <ul
                  id={`m-sub-${index}`}
                  className={`m-sub pb-2 pl-3${mobileSub === index ? '' : 'hidden'}`}
                >
                  <li>
                    <Link
                      className="t-accent block rounded-lg px-3 py-2 text-sm font-semibold"
                      href={menu.footer.href}
                    >
                      {menu.footer.label} →
                    </Link>
                  </li>
                  {menu.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        className="text-muted hover:t-fg block rounded-lg px-3 py-2 text-sm hover:bg-white/5"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <a
            href={ctaNavLink.href}
            onClick={onCtaClick}
            className="border-accent-interactive bg-accent-interactive text-accent-foreground mb-4 inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-sm font-semibold"
          >
            {ctaNavLink.label}
          </a>
        </div>
      </div>
    </header>
  );
}

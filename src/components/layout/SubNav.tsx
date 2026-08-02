'use client';

import { useEffect, useRef } from 'react';

type SubNavLink = {
  /** In-page anchor, e.g. `#catalogue`. */
  href: string;
  label: string;
};

type SubNavProps = {
  links: readonly SubNavLink[];
  lead?: string;
};

/**
 * The "On this page" sticky sub-nav with a scroll spy: the link whose section
 * has most recently crossed the line just under the nav carries aria-current.
 */
export function SubNav({ links, lead = 'On this page' }: SubNavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) {
      return;
    }
    const anchors = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    const targets = anchors.flatMap((a) => {
      const el = document.getElementById(a.getAttribute('href')?.slice(1) ?? '');
      return el ? [{ a, el }] : [];
    });
    if (!targets.length) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = (nav.getBoundingClientRect().bottom || 0) + 24;
      let current = targets[0];
      targets.forEach((t) => {
        if (t.el.getBoundingClientRect().top <= line) {
          current = t;
        }
      });
      targets.forEach((t) => {
        if (t === current) {
          t.a.setAttribute('aria-current', 'true');
        } else {
          t.a.removeAttribute('aria-current');
        }
      });
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav ref={navRef} className="v4-subnav" aria-label="On this page">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="v4-subnav-in">
          <span className="v4-sn-lead">{lead}</span>
          {links.map((link) => (
            <a key={link.href} className="v4-sn" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

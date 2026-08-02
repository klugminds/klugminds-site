'use client';

import { ctaNavLink } from '@/config/content/navigation';
import { openBriefing } from '@/lib/briefing';

/** Footer CTA — opens the briefing wizard, mailto without JS. */
export function FooterBriefingLink() {
  return (
    <a
      href={ctaNavLink.href}
      onClick={(event) => {
        event.preventDefault();
        openBriefing();
      }}
      className="t-accent mt-4 inline-flex text-sm font-medium transition-colors hover:text-white"
    >
      Book a briefing →
    </a>
  );
}

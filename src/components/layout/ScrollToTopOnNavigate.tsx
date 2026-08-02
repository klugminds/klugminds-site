'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

/** Scroll to top on every client navigation unless the URL carries a hash. */
export function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
}

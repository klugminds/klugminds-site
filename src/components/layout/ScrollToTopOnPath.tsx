'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type ScrollToTopOnPathProps = {
  path: string;
};

/** Reset scroll when landing on a path without a hash (avoids browser restoring a prior anchor scroll). */
export function ScrollToTopOnPath({ path }: ScrollToTopOnPathProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === path && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, path]);

  return null;
}

'use client';

import dynamic from 'next/dynamic';

const GlobalOverlays = dynamic(
  () => import('@/components/overlays/GlobalOverlays').then((mod) => mod.GlobalOverlays),
  { ssr: false },
);

const CookieConsent = dynamic(
  () => import('@/components/layout/CookieConsent').then((mod) => mod.CookieConsent),
  { ssr: false },
);

/** Overlays and consent UI — loaded after first paint to keep the critical path lean. */
export function DeferredLayoutExtras() {
  return (
    <>
      <GlobalOverlays />
      <CookieConsent />
    </>
  );
}

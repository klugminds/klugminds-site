'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { readCookieConsent, writeCookieConsent } from '@/lib/cookie-consent';
import { cn } from '@/lib/cn';

function subscribeNoop() {
  return () => {};
}

export function CookieConsent() {
  const [dismissed, setDismissed] = useState(false);
  const dialogId = 'cookie-consent-dialog';

  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  const needsConsent = useSyncExternalStore(
    subscribeNoop,
    () => readCookieConsent() === null,
    () => false,
  );
  const visible = mounted && needsConsent && !dismissed;

  const saveConsent = useCallback(() => {
    writeCookieConsent('essential');
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const acceptButton = document.querySelector<HTMLButtonElement>(
      `#${dialogId} [data-cookie-accept]`,
    );
    acceptButton?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        saveConsent();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible, saveConsent, dialogId]);

  if (!mounted || !visible) {
    return null;
  }

  return (
    <div
      id={dialogId}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t border-[var(--section-light-border)]',
        'bg-white/95 shadow-[0_-12px_40px_rgba(13,44,101,0.14)] backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 lg:max-w-3xl">
          <p
            id="cookie-consent-title"
            className="font-display text-base font-semibold text-[var(--ink)] sm:text-lg"
          >
            We value your privacy
          </p>
          <p
            id="cookie-consent-description"
            className="mt-1 text-sm leading-relaxed text-[var(--slate-700)]"
          >
            We use essential cookies to run this site and remember your preference. We do not use
            optional analytics cookies at this time. Read our{' '}
            <Link
              href={ROUTES.cookies}
              className="text-accent-on-light font-medium underline-offset-2 hover:underline"
            >
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link
              href={ROUTES.privacy}
              className="text-accent-on-light font-medium underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <Button type="button" data-cookie-accept onClick={saveConsent}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}

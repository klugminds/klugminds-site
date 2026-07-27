export const COOKIE_CONSENT_STORAGE_KEY = 'klugminds-cookie-consent';

export type CookieConsentLevel = 'essential' | 'all';

export type CookieConsentRecord = {
  level: CookieConsentLevel;
  updatedAt: string;
};

export function parseCookieConsent(value: string | null): CookieConsentRecord | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as CookieConsentRecord;
    if (parsed.level !== 'essential' && parsed.level !== 'all') {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function readCookieConsent(): CookieConsentRecord | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return parseCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
}

export function writeCookieConsent(level: CookieConsentLevel): CookieConsentRecord {
  const record: CookieConsentRecord = {
    level,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
  return record;
}

export function hasAnalyticsConsent(record: CookieConsentRecord | null): boolean {
  return record?.level === 'all';
}

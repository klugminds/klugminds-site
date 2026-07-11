const DEFAULT_SITE_URL = 'https://klugminds.ai';

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return url.replace(/\/$/, '');
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function isIndexingAllowed(): boolean {
  const configuredValue = process.env.NEXT_PUBLIC_ALLOW_INDEXING;

  if (configuredValue !== undefined) {
    return configuredValue === 'true';
  }

  return process.env.VERCEL_ENV === 'production';
}

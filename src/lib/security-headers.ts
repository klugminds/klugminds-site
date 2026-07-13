const CANONICAL_ORIGIN = 'https://www.klugminds.ai';

/** Cloudflare Web Analytics (when enabled in Cloudflare dashboard). */
const CLOUDFLARE_INSIGHTS_SCRIPT = 'https://static.cloudflareinsights.com';
const CLOUDFLARE_INSIGHTS_CONNECT = 'https://cloudflareinsights.com';

/**
 * Content-Security-Policy for the static marketing site.
 * 'unsafe-inline' for script/style is required by Next.js App Router output today.
 */
export const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${CLOUDFLARE_INSIGHTS_SCRIPT}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${CLOUDFLARE_INSIGHTS_CONNECT}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ');

export const securityHeaders: Array<{ key: string; value: string }> = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Access-Control-Allow-Origin', value: CANONICAL_ORIGIN },
];

export const strictTransportSecurity = {
  key: 'Strict-Transport-Security',
  value: 'max-age=63072000; includeSubDomains; preload',
} as const;

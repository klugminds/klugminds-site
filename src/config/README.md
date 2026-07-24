# Config

Application configuration (static identity — no URLs).

## Contents

- [site.ts](site.ts) — site name, tagline, SEO keywords, alternate names
- [company.ts](company.ts) — GSTIN, legal name, registration date helpers

URLs are **never** stored here. Use [../lib/site-url.ts](../lib/site-url.ts) and `NEXT_PUBLIC_SITE_URL`.

## Related Documents

- [../lib/metadata.ts](../lib/metadata.ts)
- [../.env.example](../.env.example)

## Future Topics

- Feature flags
- Environment-specific config split

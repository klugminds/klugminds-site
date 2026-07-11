# 0002. Next.js Website Stack

- **Status:** accepted
- **Date:** 2026-07-11
- **Deciders:** Klugminds founding team

## Context

Klugminds needs a public company website in the `klugminds-site` repository alongside internal documentation. The site must be production-ready, TypeScript-first, and scalable for future features (blog, auth, CMS, dashboard).

## Decision

We will build the company website with:

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS variables + `@theme`)
- **ESLint + Prettier + Husky + lint-staged**
- **GitHub Actions** CI (lint, type-check, build)

Site URLs are read from `NEXT_PUBLIC_SITE_URL` via `lib/site-url.ts` with production-safe default `https://klugminds.ai`.

## Consequences

### Positive

- Modern, well-supported stack with strong SEO and performance defaults
- App Router supports static homepage and future dynamic features
- Strict TypeScript catches errors early
- CI enforces quality on every PR

### Negative

- Team must maintain Next.js upgrade path
- Monorepo mixes website code with `docs/` until a future split

## Related Documentation

- [README.md](../../README.md) — setup and scripts
- [docs/engineering/README.md](../engineering/README.md)
- [docs/architecture/README.md](../architecture/README.md)

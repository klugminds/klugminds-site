# Klugminds Website — Agent Context

> Dense reference for AI sessions. Humans: [README.md](README.md) · Entry: [AGENTS.md](AGENTS.md)

## Snapshot

| Key      | Value                                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Repo     | `klugminds-site` (public)                                                                                                   |
| Handbook | `klugminds-handbook` (private) — [github.com/klugminds/klugminds-handbook](https://github.com/klugminds/klugminds-handbook) |
| Phase    | **Website foundation** — V4 marketing site live (28 static routes)                                                          |
| Stack    | Next 16, React 19, TypeScript 6 strict, Tailwind v4, V4 motion/viz layer                                                    |
| URL      | `NEXT_PUBLIC_SITE_URL` via [src/lib/site-url.ts](src/lib/site-url.ts) — never hardcode elsewhere                            |

## Agent rules (summary)

1. No new pages/features unless explicitly requested
2. No secrets; `.env.local` for local dev only
3. URLs only through `getSiteUrl()` / `absoluteUrl()`
4. New dirs under `src/` → README.md
5. Documentation and ADRs belong in `klugminds-handbook`, not this repo
6. **Minimize tokens:** [AGENTS.md](AGENTS.md) routing

## Website paths

`src/app/` · `src/components/` · `src/lib/` · `src/config/` · `src/styles/` · `public/`

Route constants: [src/constants/routes.ts](src/constants/routes.ts). Redirects: `/products` → `/solutions`, `/blog` → `/insights`.

## Open decisions

Hosting and CMS choices are tracked in `klugminds-handbook` → `docs/decisions/`.

## Local dev

```bash
npm install && npm run dev
```

Requires `.env.local` with `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

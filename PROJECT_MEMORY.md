# Klugminds Website — Agent Context

> Dense reference for AI sessions. Humans: [README.md](README.md) · Entry: [AGENTS.md](AGENTS.md)

## Snapshot

| Key      | Value                                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| Repo     | `klugminds-site` (public)                                                                                                   |
| Handbook | `klugminds-handbook` (private) — [github.com/klugminds/klugminds-handbook](https://github.com/klugminds/klugminds-handbook) |
| Phase    | **Website foundation** — Next.js 15 app + placeholder homepage                                                              |
| Stack    | Next 15, React 19, TS strict, Tailwind v4                                                                                   |
| URL      | `NEXT_PUBLIC_SITE_URL` via [lib/site-url.ts](lib/site-url.ts) — never hardcode elsewhere                                    |

## Agent rules (summary)

1. No new pages/features unless explicitly requested
2. No secrets; `.env.local` for local dev only
3. URLs only through `getSiteUrl()` / `absoluteUrl()`
4. New dirs → README.md
5. Documentation and ADRs belong in `klugminds-handbook`, not this repo
6. **Minimize tokens:** [AGENTS.md](AGENTS.md) routing

## Website paths

`app/` · `components/` · `features/` · `lib/` · `config/` · `styles/` · `public/`

## Open decisions

Hosting and CMS choices are tracked in `klugminds-handbook` → `docs/decisions/`.

## Local dev

```bash
npm install && npm run dev
```

Requires `.env.local` with `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

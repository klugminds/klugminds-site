# Validation prompt (referenced by `/validate`, `/pentest`, `/standards`)

Use via **slash commands** in Cursor chat — see [../commands/README.md](../commands/README.md). Not for every push.

---

## Agent instructions

You are validating the Klugminds public website (`klugminds-site`) **because the user requested it in chat**. Run checks, report **PASS** / **FAIL** / **N/A**, and fix **FAIL** items you can in-repo.

### Context

- Stack: Next.js 16, React 19, TypeScript strict, Tailwind v4
- Canonical URL: `https://www.klugminds.ai` via `src/lib/site-url.ts` only
- Security headers: `src/lib/security-headers.ts` + `next.config.ts` (includes Cloudflare Web Analytics when proxied)
- Handbook (private): `klugminds-handbook` for ADRs/policies

### 1. Coding standards

```bash
npm run validate
```

Also confirm:

- [ ] No secrets or real `.env` values in diff
- [ ] URLs via `getSiteUrl()` / `absoluteUrl()` — no hardcoded domains in components
- [ ] Imports at top of file
- [ ] New directories have `README.md`
- [ ] Exhaustive `switch` with `never` default for unions/enums
- [ ] `CHANGELOG.md` updated if user-facing or security-notable
- [ ] Diff scope matches the request

Reference: `CONTRIBUTING.md`, `.cursor/rules/`, `eslint.config.ts`

### 2. Security / lightweight pentest

**Repository**

- [ ] Grep for secrets (`password`, `api_key`, `token`, `BEGIN PRIVATE KEY`, etc.)
- [ ] No unsafe `dangerouslySetInnerHTML` with user/request data
- [ ] New API routes have auth/rate-limit consideration
- [ ] `npm audit` — no unmitigated high/critical

**Deployed site** (`DEPLOY_URL`)

```bash
curl -sI DEPLOY_URL/
curl -sI DEPLOY_URL/.env
curl -sI DEPLOY_URL/.git/config
curl -sI DEPLOY_URL/package.json
curl -s DEPLOY_URL/robots.txt
```

Headers on `/`:

- [ ] `Content-Security-Policy`
- [ ] `Strict-Transport-Security` (production)
- [ ] `X-Frame-Options: DENY` or CSP `frame-ancestors 'none'`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy`, `Permissions-Policy`
- [ ] No `X-Powered-By`
- [ ] `Access-Control-Allow-Origin` is `https://www.klugminds.ai` (not `*`)

Sensitive paths → **404** or **403**: `/.env`, `/.git/config`, `/package.json`

Canonical: `robots.txt` / `sitemap.xml` use `https://www.klugminds.ai`; production indexing allowed.

### 3. Report format

```markdown
## Validation summary

| Area             | Result    | Notes |
| ---------------- | --------- | ----- |
| Coding standards | PASS/FAIL |       |
| Security headers | PASS/FAIL |       |
| Exposure probes  | PASS/FAIL |       |
| Canonical URLs   | PASS/FAIL |       |

### Failures

- ...

### Fixes applied

- ...

### Follow-ups (human / dashboard)

- ...
```

Fix reasonable **FAIL** items in-repo. Do not block the user’s workflow unless they asked for validation.

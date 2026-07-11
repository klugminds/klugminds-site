# Klugminds Website

**Public company website for [Klugminds](https://klugminds.ai).**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## About

Next.js 15 company website — placeholder homepage today, foundation for blog, auth, CMS, and dashboard features. Internal company documentation lives in the private [klugminds-handbook](https://github.com/klugminds/klugminds-handbook) repository.

## Technology stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 15 (App Router)                    |
| UI         | React 19                                   |
| Language   | TypeScript (strict)                        |
| Styling    | Tailwind CSS v4 (CSS variables + `@theme`) |
| Quality    | ESLint, Prettier, Husky, lint-staged       |
| CI         | GitHub Actions                             |
| Containers | Docker (development + production)          |

## Quick start

### Prerequisites

- Node.js 24+ ([.nvmrc](.nvmrc))
- npm

### Setup

```bash
git clone https://github.com/klugminds/klugminds-site.git
cd klugminds-site
npm install
```

Copy environment file for **local development**:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ALLOW_INDEXING=false
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## NPM scripts

| Script                 | Description              |
| ---------------------- | ------------------------ |
| `npm run dev`          | Start development server |
| `npm run build`        | Production build         |
| `npm run start`        | Start production server  |
| `npm run lint`         | Run ESLint               |
| `npm run lint:fix`     | Fix ESLint issues        |
| `npm run type-check`   | TypeScript check         |
| `npm run format`       | Format with Prettier     |
| `npm run format:check` | Check formatting         |
| `npm run clean`        | Remove `.next` and `out` |

## Project structure

```
app/           Next.js App Router (routes, metadata, SEO)
components/    Reusable UI (layout, ui, seo)
features/      Feature modules (future: blog, auth, CMS)
hooks/         Custom React hooks
lib/           Utilities (site-url, metadata, cn)
services/      API clients (future)
types/         Shared TypeScript types
utils/         General utilities
config/        Static site config (no URLs)
constants/     Route constants
styles/        Global CSS and design tokens
public/        Static assets
```

## Environment variables

| Variable                     | Development             | Production             |
| ---------------------------- | ----------------------- | ---------------------- |
| `NEXT_PUBLIC_SITE_URL`       | `http://localhost:3000` | `https://klugminds.ai` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false`                 | `true`                 |

All absolute URLs use `getSiteUrl()` from [lib/site-url.ts](lib/site-url.ts). Default fallback: `https://klugminds.ai`.

## Deployment

### Vercel (recommended)

1. Import this repository in Vercel (public repo or personal account).
2. Set `NEXT_PUBLIC_SITE_URL=https://klugminds.ai` and `NEXT_PUBLIC_ALLOW_INDEXING=true`.
3. Connect `klugminds.ai` DNS to Vercel.

### Production Docker

Multi-stage build with Next.js `standalone` output. Final image contains compiled server and static assets only — no TypeScript source or dev dependencies. Nginx sits in front as a reverse proxy.

```bash
docker compose -f docker-compose.prod.yml up --build
```

Open [http://localhost:8080](http://localhost:8080).

| File                                               | Purpose                                     |
| -------------------------------------------------- | ------------------------------------------- |
| [Dockerfile.prod](Dockerfile.prod)                 | Multi-stage production build                |
| [docker-compose.prod.yml](docker-compose.prod.yml) | nginx + app stack                           |
| [nginx/nginx.conf](nginx/nginx.conf)               | Reverse proxy, rate limit, security headers |
| [Dockerfile](Dockerfile)                           | Dev only — `npm run dev` with hot reload    |

### Docker (development)

```bash
docker compose up
```

## Related repositories

| Repository           | Visibility | Purpose                |
| -------------------- | ---------- | ---------------------- |
| `klugminds-site`     | Public     | This website           |
| `klugminds-handbook` | Private    | Internal documentation |

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) · AI context: [AGENTS.md](AGENTS.md)

## License

[MIT License](LICENSE)

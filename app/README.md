# App

Next.js App Router — routes, layouts, and metadata.

## Navigation

| Item            | Path                                     |
| --------------- | ---------------------------------------- |
| Homepage        | [page.tsx](page.tsx)                     |
| Root layout     | [layout.tsx](layout.tsx)                 |
| Site config     | [../config/site.ts](../config/site.ts)   |
| Metadata helper | [../lib/metadata.ts](../lib/metadata.ts) |

## Purpose

The `app/` directory defines all routes and server-side metadata for the Klugminds website. Only the homepage exists in this foundation phase.

## Routes

| File                  | URL                     | Description                                 |
| --------------------- | ----------------------- | ------------------------------------------- |
| `page.tsx`            | `/`                     | Placeholder homepage                        |
| `robots.ts`           | `/robots.txt`           | Crawler rules (noindex when not production) |
| `sitemap.ts`          | `/sitemap.xml`          | Sitemap (homepage only)                     |
| `manifest.ts`         | `/manifest.webmanifest` | PWA manifest                                |
| `icon.tsx`            | `/icon`                 | Favicon (generated)                         |
| `opengraph-image.tsx` | `/opengraph-image`      | OG image (generated)                        |

## Related Documents

- [../components/README.md](../components/README.md) — UI components
- [../lib/site-url.ts](../lib/site-url.ts) — URL helpers
- [klugminds-handbook → engineering](https://github.com/klugminds/klugminds-handbook/blob/main/docs/engineering/README.md) — engineering practices

## Future Topics

- Additional marketing pages (`/about`, `/contact`)
- Blog routes under `app/blog/`
- API routes under `app/api/` when needed

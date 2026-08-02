# App

Next.js App Router — routes, layouts, and metadata.

## Navigation

| Item            | Path                                             |
| --------------- | ------------------------------------------------ |
| Homepage        | [page.tsx](page.tsx)                             |
| Root layout     | [layout.tsx](layout.tsx)                         |
| Site config     | [../config/site.ts](../config/site.ts)           |
| Metadata helper | [../lib/metadata.ts](../lib/metadata.ts)         |
| Route constants | [../constants/routes.ts](../constants/routes.ts) |

## Purpose

The `app/` directory defines all routes and server-side metadata for the Klugminds website.

## Routes

| Path                    | File                         | Description                                 |
| ----------------------- | ---------------------------- | ------------------------------------------- |
| `/`                     | `page.tsx`                   | Homepage                                    |
| `/solutions`            | `solutions/page.tsx`         | Solutions hub                               |
| `/solutions/[slug]`     | `solutions/[slug]/page.tsx`  | Solution detail (4 slugs)                   |
| `/services`             | `services/page.tsx`          | Services hub                                |
| `/services/[slug]`      | `services/[slug]/page.tsx`   | Service detail (4 slugs)                    |
| `/industries`           | `industries/page.tsx`        | Industries + hash anchors                   |
| `/approach`             | `approach/page.tsx`          | Delivery approach                           |
| `/insights`             | `insights/page.tsx`          | Field notes                                 |
| `/about`                | `about/page.tsx`             | About                                       |
| `/careers`              | `careers/page.tsx`           | Careers                                     |
| `/contact`              | `contact/page.tsx`           | Contact + briefing                          |
| `/legal`                | `legal/page.tsx`             | Legal entity & GST                          |
| `/privacy`              | `privacy/page.tsx`           | Privacy policy                              |
| `/cookies`              | `cookies/page.tsx`           | Cookie policy                               |
| `/robots.txt`           | `robots.ts`                  | Crawler rules (noindex when not production) |
| `/sitemap.xml`          | `sitemap.ts`                 | All marketing routes                        |
| `/manifest.webmanifest` | `manifest.ts`                | PWA manifest                                |
| `/icon`, `/apple-icon`  | `icon.png`, `apple-icon.png` | Favicons                                    |
| `/opengraph-image.jpg`  | `opengraph-image.jpg`        | OG image                                    |

Redirects (see [next.config.ts](../../next.config.ts)): `/products` → `/solutions`, `/blog` → `/insights`.

## Related Documents

- [../components/README.md](../components/README.md) — UI components
- [../lib/site-url.ts](../lib/site-url.ts) — URL helpers
- [klugminds-handbook → engineering](https://github.com/klugminds/klugminds-handbook/blob/main/docs/engineering/README.md) — engineering practices

## Future Topics

- API routes under `app/api/` when needed
- CMS integration (decision in handbook)

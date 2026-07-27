# Static assets

## Images

| Path                         | Usage                                      |
| ---------------------------- | ------------------------------------------ |
| `images/logo.png`            | Full wordmark — source for icon generation |
| `images/logo-icon.png`       | Navbar mark (white + teal on transparent)  |
| `images/logo-mark-color.png` | Colored mark (navy + teal on transparent)  |
| `images/favicon.png`         | Primary favicon (512px app icon)           |
| `images/icons/`              | Full favicon size set + app icon master    |

Regenerate navbar icons: `python scripts/generate-icons.py`  
Regenerate favicons: `python scripts/generate-favicons.py`

Add new images in `src/config/images.ts` with `src`, `alt`, `width`, `height`, and `displayHeight`. Use the `SiteImage` component for consistent rendering via `next/image`.

## Partner logos

Partner logos live in `images/partners/`. Regenerate from official sites:

```bash
python scripts/fetch-partner-logos.py
```

Partner metadata is configured in `src/config/content/home.ts`.

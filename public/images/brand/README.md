# Brand assets

**Put your official Klugminds logo files here.** This folder is the single source of truth for brand identity on the site.

## Primary files to add or replace

| File                        | When to use                                            | Shown on                                                 |
| --------------------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| **`logo-primary.png`**      | Full lockup (mark + wordmark + tagline) on white/light | Footer                                                   |
| **`logo-primary-nav.png`**  | Compact mark for the header / navbar                   |
| **`logo-nav.png`**          | Horizontal wordmark (alternate header asset)           |
| **`logo-transparent.png`**  | Full lockup on transparent background                  | Dark sections, OG images                                 |
| **`mark-color-source.png`** | Master mark for generating navbar tiles                | Run `python scripts/generate-icons.py` after updating    |
| **`favicon-source.png`**    | Square favicon master (1024×1024 recommended)          | Run `python scripts/generate-favicons.py` after updating |

## After you drop in new files

1. Replace the PNG(s) above with your official exports (keep the same filenames).
2. If dimensions changed, update widths/heights in [`src/config/images.ts`](../../../src/config/images.ts).
3. Regenerate derived icons if you changed the mark or favicon:
   ```bash
   python scripts/generate-icons.py
   python scripts/generate-favicons.py
   ```

## Do not use for the primary logo

- `public/images/logo.png` — legacy source for old icon script only
- `public/images/logo-icon.png` — generated navbar tile, not the primary lockup
- `public/images/partners/` — partner logos only

## Handbook

Full brand guidelines (colours, clear space, usage rules) live in the private **klugminds-handbook** repo under `docs/branding/` — not in this public site repo.

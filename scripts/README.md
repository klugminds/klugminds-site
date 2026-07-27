"""
Generate Klugminds navbar icon assets from the brand mark reference.

**Primary source:** `public/images/brand/mark-color-source.png`  
(navy ribbon + teal arrow — the official colored mark)

```bash
python scripts/generate-icons.py
python scripts/generate-favicons.py
```

## Outputs (`generate-icons.py`)

| File                                   | Use                                        |
| -------------------------------------- | ------------------------------------------ |
| `public/images/logo-icon.png`          | Navbar — white rounded tile + colored mark |
| `public/images/logo-mark-color.png`    | Colored mark on white (flat)               |
| `public/images/icons/nav-tile-512.png` | Navbar tile master                         |
| `public/images/icons/nav-mark-512.png` | Navbar mark master                         |

## Outputs (`generate-favicons.py`)

| File                                   | Use                         |
| -------------------------------------- | --------------------------- |
| `src/app/icon.png`                     | Browser favicon             |
| `src/app/apple-icon.png`               | iOS home screen             |
| `public/images/favicon.png`            | Primary favicon (512px)     |
| `public/images/icons/favicon-*.png`    | PWA manifest sizes (512–16) |
| `public/images/icons/app-icon-512.png` | App icon master             |

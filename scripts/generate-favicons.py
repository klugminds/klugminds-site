"""Generate favicon and app icon sizes from public/images/brand/favicon-source.png."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'public' / 'images' / 'brand' / 'favicon-source.png'
ICONS_DIR = ROOT / 'public' / 'images' / 'icons'

FAVICON_SIZES = (512, 192, 96, 64, 32, 16)

NEXT_APP_OUTS = (
    (ROOT / 'src' / 'app' / 'icon.png', 192),
    (ROOT / 'src' / 'app' / 'apple-icon.png', 180),
)


def resize_icon(source: Image.Image, size: int) -> Image.Image:
    return source.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f'Missing favicon source: {SOURCE}')

    ICONS_DIR.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE).convert('RGBA')

    for size in FAVICON_SIZES:
        dest = ICONS_DIR / f'favicon-{size}.png'
        resize_icon(source, size).save(dest)
        print(f'wrote {dest}')

    master = resize_icon(source, 512)
    master.save(ROOT / 'public' / 'images' / 'favicon.png')
    master.save(ICONS_DIR / 'app-icon-512.png')
    print(f'wrote {ROOT / "public" / "images" / "favicon.png"}')
    print(f'wrote {ICONS_DIR / "app-icon-512.png"}')

    for dest, size in NEXT_APP_OUTS:
        resize_icon(source, size).save(dest)
        print(f'wrote {dest}')


if __name__ == '__main__':
    main()

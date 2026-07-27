"""
Generate Klugminds icon assets from the brand mark reference.

Primary source: public/images/brand/mark-color-source.png
  (navy ribbon + teal arrow on white — the official colored mark)

Outputs:
  - Favicon / app icons: colored mark on white square with safe padding
  - Navbar mark: white tile with colored mark (matches header lockup)
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
LOGO_SRC = ROOT / 'public' / 'images' / 'logo.png'
MARK_SRC = ROOT / 'public' / 'images' / 'brand' / 'mark-color-source.png'
ICONS_DIR = ROOT / 'public' / 'images' / 'icons'

WHITE = (255, 255, 255)
INK_THRESHOLD = 245
MIN_INK_PER_ROW = 40
GAP_INK_MAX = 20
GAP_MIN_ROWS = 12
MARK_SCALE = 0.84
NAV_MARK_SCALE = 0.72
NAV_TILE_SCALE = 0.48
TILE_RADIUS_RATIO = 0.16


def is_ink_pixel(rgba: tuple[int, int, int, int]) -> bool:
    red, green, blue, alpha = rgba
    if alpha < 16:
        return False
    return not (red > INK_THRESHOLD and green > INK_THRESHOLD and blue > INK_THRESHOLD)


def content_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    pixels = image.load()
    width, height = image.size
    min_x, min_y, max_x, max_y = width, height, 0, 0
    found = False

    for y in range(height):
        for x in range(width):
            if not is_ink_pixel(pixels[x, y]):
                continue
            found = True
            min_x = min(min_x, x)
            min_y = min(min_y, y)
            max_x = max(max_x, x)
            max_y = max(max_y, y)

    if not found:
        return (0, 0, width, height)

    return (min_x, min_y, max_x + 1, max_y + 1)


def row_ink_count(image: Image.Image, y: int) -> int:
    pixels = image.load()
    width, _ = image.size
    return sum(1 for x in range(width) if is_ink_pixel(pixels[x, y]))


def find_icon_vertical_bounds(image: Image.Image) -> tuple[int, int]:
    _, height = image.size
    row_counts = [row_ink_count(image, y) for y in range(height)]

    icon_top = next((y for y, count in enumerate(row_counts) if count >= MIN_INK_PER_ROW), 0)

    icon_bottom = icon_top
    gap_rows = 0

    for y in range(icon_top, height):
        if row_counts[y] <= GAP_INK_MAX:
            gap_rows += 1
            if gap_rows >= GAP_MIN_ROWS:
                break
            continue

        gap_rows = 0
        icon_bottom = y

    return icon_top, icon_bottom + 1


def build_mark_from_logo() -> Image.Image:
    image = Image.open(LOGO_SRC).convert('RGBA')
    width, _ = image.size
    icon_top, icon_bottom = find_icon_vertical_bounds(image)
    icon_region = image.crop((0, icon_top, width, icon_bottom))
    mark = icon_region.crop(content_bbox(icon_region))

    mark_width, mark_height = mark.size
    pad_left = int(mark_width * 0.12)
    pad_top = int(mark_height * 0.14)
    pad_right = int(mark_width * 0.3)
    pad_bottom = int(mark_height * 0.14)
    canvas = Image.new(
        'RGBA',
        (mark_width + pad_left + pad_right, mark_height + pad_top + pad_bottom),
        (255, 255, 255, 255),
    )
    canvas.paste(mark, (pad_left, pad_top), mark)
    return canvas


def load_mark() -> Image.Image:
    if not MARK_SRC.exists():
        raise FileNotFoundError(f'Missing mark source: {MARK_SRC}')
    return Image.open(MARK_SRC).convert('RGBA')


def pad_mark_asymmetric(mark: Image.Image) -> Image.Image:
    width, height = mark.size
    pad_left = int(width * 0.08)
    pad_top = int(height * 0.1)
    pad_right = max(int(width * 0.24), 40)
    pad_bottom = int(height * 0.1)
    canvas = Image.new(
        'RGBA',
        (width + pad_left + pad_right, height + pad_top + pad_bottom),
        (0, 0, 0, 0),
    )
    canvas.paste(mark, (pad_left, pad_top), mark)
    return canvas


def rounded_square(size: int, color: tuple[int, int, int], radius: int) -> Image.Image:
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=(*color, 255))
    return canvas


def compose_mark(
    mark: Image.Image,
    size: int,
    *,
    scale: float,
    background: tuple[int, int, int] | None,
) -> Image.Image:
    if background is None:
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    else:
        canvas = Image.new('RGBA', (size, size), (*background, 255))

    inner = int(size * scale)
    ratio = max(mark.size[0] / inner, mark.size[1] / inner)
    scaled = mark.resize(
        (max(1, int(mark.size[0] / ratio)), max(1, int(mark.size[1] / ratio))),
        Image.Resampling.LANCZOS,
    )
    offset = ((size - scaled.size[0]) // 2, (size - scaled.size[1]) // 2)
    canvas.paste(scaled, offset, scaled)
    return canvas


def compose_icon(
    mark: Image.Image,
    size: int,
    *,
    background: tuple[int, int, int],
    scale: float,
    rounded: bool,
) -> Image.Image:
    if rounded:
        radius = max(4, int(size * TILE_RADIUS_RATIO))
        canvas = rounded_square(size, background, radius)
    else:
        canvas = Image.new('RGBA', (size, size), (*background, 255))

    mark_layer = compose_mark(mark, size, scale=scale, background=None)
    canvas.alpha_composite(mark_layer)
    return canvas


def resize_icon(image: Image.Image, size: int) -> Image.Image:
    return image.resize((size, size), Image.Resampling.LANCZOS)


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format='PNG', optimize=True)


def main() -> None:
    mark = load_mark()
    print(f'loaded mark {mark.size[0]}x{mark.size[1]} from {MARK_SRC.name}')

    nav_mark = compose_mark(mark, 512, scale=NAV_MARK_SCALE, background=None)
    nav_tile = compose_icon(
        mark,
        512,
        background=WHITE,
        scale=NAV_TILE_SCALE,
        rounded=True,
    )
    mark_only = compose_mark(mark, 512, scale=MARK_SCALE, background=WHITE)

    save_png(nav_tile, ICONS_DIR / 'nav-tile-512.png')
    save_png(nav_mark, ICONS_DIR / 'nav-mark-512.png')
    save_png(mark_only, ICONS_DIR / 'mark-color-512.png')

    save_png(nav_tile, ROOT / 'public' / 'images' / 'logo-icon.png')
    save_png(nav_mark, ROOT / 'public' / 'images' / 'logo-mark-nav.png')
    save_png(mark_only, ROOT / 'public' / 'images' / 'logo-mark-color.png')

    print(f'wrote navbar icons to {ICONS_DIR}')
    print('Favicons: run python scripts/generate-favicons.py')


if __name__ == '__main__':
    main()

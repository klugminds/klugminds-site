"""Fetch MilagroIT logo from milagroit.com."""

from __future__ import annotations

from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'images' / 'partners' / 'milagroit.png'
LOGO_URL = 'https://www.milagroit.com/images/logo1.png'
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; KlugmindsSiteBot/1.0)',
    'Accept': 'image/*,*/*',
}


def main() -> None:
    response = requests.get(LOGO_URL, headers=HEADERS, timeout=20)
    response.raise_for_status()
    content_type = response.headers.get('content-type', '')
    if 'image' not in content_type:
        raise SystemExit(f'Unexpected content type: {content_type}')
    OUT.write_bytes(response.content)
    print(f'saved {OUT} ({len(response.content)} bytes) from {LOGO_URL}')


if __name__ == '__main__':
    main()

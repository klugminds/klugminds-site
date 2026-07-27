"""Fetch partner logos from official sites into public/images/partners/."""

from __future__ import annotations

import re
from pathlib import Path
from urllib.parse import urljoin

import requests

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'images' / 'partners'
OUT.mkdir(parents=True, exist_ok=True)

HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; KlugmindsSiteBot/1.0)'}

PARTNERS = {
    'mgt': 'https://mgt.eu/',
    'milagroit': 'https://www.milagroit.com/',
    'curious-code': 'https://curiouscodetech.com/',
    'wizardtales': 'https://wizardtales.com/',
    'velocious': 'https://www.velocioussolutions.in/',
}

# Known fallbacks when HTML scrape fails
FALLBACKS = {
    'wizardtales': 'https://i.tracxn.com/logo/company/61ddebd15b64459ef44aa7b72248b?format=png&height=200&width=200',
    'milagroit': 'https://www.milagroit.com/images/logo1.png',
}


def find_logo_urls(html: str, base: str) -> list[str]:
    patterns = [
        r'src=["\']([^"\']*logo[^"\']*)["\']',
        r'href=["\']([^"\']*logo[^"\']*)["\']',
        r'content=["\']([^"\']*logo[^"\']*)["\']',
        r'src=["\']([^"\']*brand[^"\']*)["\']',
    ]
    urls: list[str] = []
    for pattern in patterns:
        for match in re.findall(pattern, html, flags=re.I):
            url = urljoin(base, match)
            if url not in urls:
                urls.append(url)
    return urls


def download(url: str, dest: Path) -> bool:
    try:
        response = requests.get(url, headers=HEADERS, timeout=20)
        response.raise_for_status()
        content_type = response.headers.get('content-type', '')
        if 'image' not in content_type and not url.endswith(('.png', '.jpg', '.jpeg', '.svg', '.webp')):
            return False
        dest.write_bytes(response.content)
        print(f'  saved {dest.name} ({len(response.content)} bytes) from {url[:80]}')
        return True
    except Exception as error:  # noqa: BLE001
        print(f'  failed {url[:80]}: {error}')
        return False


def main() -> None:
    for slug, site_url in PARTNERS.items():
        print(f'\n{slug}:')
        dest = OUT / f'{slug}.png'
        if slug in FALLBACKS and download(FALLBACKS[slug], dest):
            continue

        try:
            response = requests.get(site_url, headers=HEADERS, timeout=20)
            response.raise_for_status()
        except Exception as error:  # noqa: BLE001
            print(f'  site error: {error}')
            if slug in FALLBACKS:
                download(FALLBACKS[slug], dest)
            continue

        candidates = find_logo_urls(response.text, site_url)
        favicon = urljoin(site_url, '/favicon.ico')
        candidates.append(favicon)

        saved = False
        for candidate in candidates:
            ext = '.svg' if candidate.lower().endswith('.svg') else '.png'
            target = OUT / f'{slug}{ext}'
            if download(candidate, target):
                if ext == '.svg' and not dest.exists():
                    dest = target
                saved = True
                break

        if not saved and slug in FALLBACKS:
            download(FALLBACKS[slug], dest)


if __name__ == '__main__':
    main()

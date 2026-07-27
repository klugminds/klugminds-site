import requests
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'public' / 'images' / 'partners'
headers = {'User-Agent': 'Mozilla/5.0'}

urls = [
    'https://www.velocious.ai/favicon.ico',
    'https://www.velocious.ai/logo.png',
    'https://velocioustech.com/wp-content/uploads/2023/05/cropped-Velocious-Logo-1-192x192.png',
]
for url in urls:
    try:
        r = requests.get(url, headers=headers, timeout=20, verify=False)
        print(url, r.status_code, r.headers.get('content-type'), len(r.content))
        if r.status_code == 200 and len(r.content) > 500:
            ext = '.png' if 'png' in url else '.ico'
            (OUT / f'velocious{ext}').write_bytes(r.content)
    except Exception as e:
        print('err', e)

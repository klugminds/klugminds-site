"""Generate favicon and app icon sizes from public/images/brand/favicon.svg.

Requires Node dependencies installed once:
  npm install --no-save @resvg/resvg-js sharp

Then run:
  node scripts/generate-favicons.mjs
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MJS = ROOT / 'scripts' / 'generate-favicons.mjs'


def main() -> None:
    if not MJS.exists():
        raise SystemExit(f'Missing generator: {MJS}')

    result = subprocess.run(['node', str(MJS)], cwd=ROOT, check=False)
    raise SystemExit(result.returncode)


if __name__ == '__main__':
    main()

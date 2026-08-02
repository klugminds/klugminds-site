/** One-off favicon rasterizer — run via: node scripts/generate-favicons.mjs */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'public', 'images', 'brand', 'favicon.svg');
const ICONS_DIR = join(ROOT, 'public', 'images', 'icons');

const FAVICON_SIZES = [512, 192, 96, 64, 32, 16];
const NEXT_APP_OUTS = [
  [join(ROOT, 'src', 'app', 'icon.png'), 192],
  [join(ROOT, 'src', 'app', 'apple-icon.png'), 180],
];

async function renderPng(size) {
  const svg = readFileSync(SOURCE);
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: '#081f4a',
  });
  return resvg.render().asPng();
}

async function writePng(dest, buffer) {
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buffer);
  console.log(`wrote ${dest}`);
}

async function resizePng(buffer, size) {
  return sharp(buffer).resize(size, size).png().toBuffer();
}

async function main() {
  const master = await renderPng(512);

  await writePng(join(ROOT, 'public', 'images', 'brand', 'icon-512.png'), master);

  for (const size of FAVICON_SIZES) {
    const out = size === 512 ? master : await resizePng(master, size);
    await writePng(join(ICONS_DIR, `favicon-${size}.png`), out);
  }

  await writePng(join(ROOT, 'public', 'images', 'favicon.png'), master);
  await writePng(join(ICONS_DIR, 'app-icon-512.png'), master);

  for (const [dest, size] of NEXT_APP_OUTS) {
    await writePng(dest, await resizePng(master, size));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

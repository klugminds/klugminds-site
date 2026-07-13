import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafafa',
        color: '#0f172a',
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700 }}>{siteConfig.name}</div>
      <div style={{ fontSize: 32, marginTop: 16, color: '#64748b' }}>{siteConfig.tagline}</div>
    </div>,
    { ...size },
  );
}

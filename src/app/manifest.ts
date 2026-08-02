import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getSiteUrl } from '@/lib/site-url';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.seoDescription,
    start_url: getSiteUrl(),
    display: 'standalone',
    background_color: '#081f4a',
    theme_color: '#0d2c65',
    icons: [
      {
        src: '/images/brand/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

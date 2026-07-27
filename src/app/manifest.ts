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
    background_color: '#0a1f44',
    theme_color: '#00a79d',
    icons: [
      {
        src: '/images/icons/favicon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/icons/favicon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icons/favicon-96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/images/icons/favicon-64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/images/icons/favicon-32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/images/icons/favicon-16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
  };
}

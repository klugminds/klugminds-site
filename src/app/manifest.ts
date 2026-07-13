import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getSiteUrl } from '@/lib/site-url';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: getSiteUrl(),
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

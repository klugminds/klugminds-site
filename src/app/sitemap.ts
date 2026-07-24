import type { MetadataRoute } from 'next';

import { ROUTES } from '@/constants/routes';
import { absoluteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl(ROUTES.home),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl(ROUTES.legal),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}

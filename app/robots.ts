import type { MetadataRoute } from 'next';

import { absoluteUrl, isIndexingAllowed } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = isIndexingAllowed();

  return {
    rules: allowIndexing ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}

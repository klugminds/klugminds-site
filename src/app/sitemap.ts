import type { MetadataRoute } from 'next';

import { ROUTES } from '@/constants/routes';
import { absoluteUrl } from '@/lib/site-url';

const marketingRoutes = [
  ROUTES.home,
  ROUTES.products,
  ROUTES.services,
  ROUTES.industries,
  ROUTES.approach,
  ROUTES.insights,
  ROUTES.about,
  ROUTES.careers,
  ROUTES.legal,
  ROUTES.privacy,
  ROUTES.cookies,
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return marketingRoutes.map((route, index) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === ROUTES.home ? 'weekly' : 'monthly',
    priority: route === ROUTES.home ? 1 : index < 8 ? 0.8 : 0.6,
  }));
}

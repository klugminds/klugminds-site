import type { MetadataRoute } from 'next';

import {
  ROUTES,
  SERVICE_SLUGS,
  serviceRoute,
  SOLUTION_SLUGS,
  solutionRoute,
} from '@/constants/routes';
import { absoluteUrl } from '@/lib/site-url';

const marketingRoutes: string[] = [
  ROUTES.home,
  ROUTES.solutions,
  ...SOLUTION_SLUGS.map(solutionRoute),
  ROUTES.services,
  ...SERVICE_SLUGS.map(serviceRoute),
  ROUTES.industries,
  ROUTES.approach,
  ROUTES.insights,
  ROUTES.about,
  ROUTES.careers,
  ROUTES.contact,
  ROUTES.legal,
  ROUTES.privacy,
  ROUTES.cookies,
];

const lowPriorityRoutes = new Set<string>([ROUTES.legal, ROUTES.privacy, ROUTES.cookies]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return marketingRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === ROUTES.home ? 'weekly' : 'monthly',
    priority: route === ROUTES.home ? 1 : lowPriorityRoutes.has(route) ? 0.5 : 0.8,
  }));
}

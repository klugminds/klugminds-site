import { mailtoLinks } from '@/lib/mailto';

/** Default briefing mailto with pre-filled subject and body. */
export const CONTACT_MAILTO = mailtoLinks.briefing();

export const ROUTES = {
  home: '/',
  solutions: '/solutions',
  services: '/services',
  industries: '/industries',
  approach: '/approach',
  insights: '/insights',
  about: '/about',
  careers: '/careers',
  contact: '/contact',
  legal: '/legal',
  privacy: '/privacy',
  cookies: '/cookies',
} as const;

/** The financial-crime solution catalogue — one page per model. */
export const SOLUTION_SLUGS = [
  'fraud-detection',
  'aml-monitoring',
  'igaming-integrity',
  'responsible-gaming',
] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

export function solutionRoute(slug: SolutionSlug): string {
  return `${ROUTES.solutions}/${slug}`;
}

/** The four engineering practices — one page per practice. */
export const SERVICE_SLUGS = ['ai-ml', 'devsecops', 'full-stack', 'data-strategy'] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export function serviceRoute(slug: ServiceSlug): string {
  return `${ROUTES.services}/${slug}`;
}

/** Industries page section anchor (e.g. fintech, igaming). */
export function industryAnchor(id: string): string {
  return `${ROUTES.industries}#${id}`;
}

/** Insights page post anchor for case studies and field notes. */
export function insightAnchor(slug: string): string {
  return `${ROUTES.insights}#${slug}`;
}

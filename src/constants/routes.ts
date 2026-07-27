import { mailtoLinks } from '@/lib/mailto';

/** Default briefing mailto with pre-filled subject and body. */
export const CONTACT_MAILTO = mailtoLinks.briefing();

export const ROUTES = {
  home: '/',
  products: '/products',
  services: '/services',
  industries: '/industries',
  approach: '/approach',
  insights: '/insights',
  about: '/about',
  careers: '/careers',
  legal: '/legal',
  privacy: '/privacy',
  cookies: '/cookies',
  contact: '/about#contact',
} as const;

/** Industries page section anchor (e.g. fintech, igaming). */
export function industryAnchor(id: string): string {
  return `${ROUTES.industries}#${id}`;
}

/** Insights page post anchor for case studies and field notes. */
export function insightAnchor(slug: string): string {
  return `${ROUTES.insights}#${slug}`;
}

/** Products page family or product anchor. */
export function productAnchor(id: string): string {
  return `${ROUTES.products}#${id}`;
}

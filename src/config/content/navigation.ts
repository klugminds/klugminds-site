import { CONTACT_MAILTO, industryAnchor, ROUTES } from '@/constants/routes';

export type NavLink = {
  label: string;
  href: string;
};

export const mainNavLinks: NavLink[] = [
  { label: 'Products', href: ROUTES.products },
  { label: 'Services', href: ROUTES.services },
  { label: 'Industries', href: ROUTES.industries },
  { label: 'Approach', href: ROUTES.approach },
  { label: 'Insights', href: ROUTES.insights },
  { label: 'Careers', href: ROUTES.careers },
  { label: 'About', href: ROUTES.about },
  { label: 'Contact', href: ROUTES.contact },
];

export const footerSolutionsLinks: NavLink[] = [
  { label: 'Products', href: ROUTES.products },
  { label: 'Services', href: ROUTES.services },
  { label: 'Industries', href: ROUTES.industries },
];

export const footerIndustryLinks: NavLink[] = [
  { label: 'Fintech', href: industryAnchor('fintech') },
  { label: 'iGaming', href: industryAnchor('igaming') },
  { label: 'E-commerce', href: industryAnchor('ecommerce') },
  { label: 'Logistics', href: industryAnchor('logistics') },
  { label: 'Healthcare', href: industryAnchor('healthcare') },
];

export const footerCompanyLinks: NavLink[] = [
  { label: 'About', href: ROUTES.about },
  { label: 'Approach', href: ROUTES.approach },
  { label: 'Insights', href: ROUTES.insights },
  { label: 'Careers', href: ROUTES.careers },
  { label: 'Contact', href: ROUTES.contact },
];

/** Header CTA — opens email to start a briefing. */
export const ctaNavLink: NavLink = {
  label: 'Book a briefing →',
  href: CONTACT_MAILTO,
};

/** Footer contact CTA — opens email (actionable from any page). */
export const footerContactLink: NavLink = {
  label: 'Book a briefing →',
  href: CONTACT_MAILTO,
};

export const footerLegalLinks: NavLink[] = [
  { label: 'Privacy', href: ROUTES.privacy },
  { label: 'Cookies', href: ROUTES.cookies },
  { label: 'Legal & GST', href: ROUTES.legal },
];

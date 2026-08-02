import {
  CONTACT_MAILTO,
  industryAnchor,
  ROUTES,
  serviceRoute,
  solutionRoute,
} from '@/constants/routes';

export type NavLink = {
  label: string;
  href: string;
};

/** Icon keys resolved to SVGs in the header component. */
export type NavIconKey =
  | 'shield-check'
  | 'radar'
  | 'dice'
  | 'eye'
  | 'sparks'
  | 'network'
  | 'lock'
  | 'cloud'
  | 'layers'
  | 'document'
  | 'compass'
  | 'link';

export type MegaMenuItem = {
  label: string;
  description: string;
  href: string;
  icon: NavIconKey;
};

export type MegaMenu = {
  label: string;
  items: MegaMenuItem[];
  footer: NavLink;
};

/** The five-dropdown header: Solutions, Services, Industries, Resources, Company. */
export const megaMenus: MegaMenu[] = [
  {
    label: 'Solutions',
    items: [
      {
        label: 'Fraud Detection Suite',
        description: 'Real-time scoring on device, behavioural, and graph signals.',
        href: solutionRoute('fraud-detection'),
        icon: 'shield-check',
      },
      {
        label: 'AML Monitoring',
        description: 'Scenarios plus supervised scoring, triaged by expected value.',
        href: solutionRoute('aml-monitoring'),
        icon: 'radar',
      },
      {
        label: 'iGaming Integrity',
        description: 'Bonus abuse, multi-accounting, and collusion, scored as a network.',
        href: solutionRoute('igaming-integrity'),
        icon: 'dice',
      },
      {
        label: 'Responsible Gaming',
        description: 'Escalating-harm detection with a graded response playbook.',
        href: solutionRoute('responsible-gaming'),
        icon: 'eye',
      },
    ],
    footer: { label: 'View all solutions', href: ROUTES.solutions },
  },
  {
    label: 'Services',
    items: [
      {
        label: 'AI, Data Science & ML',
        description: 'Discovery through production.',
        href: serviceRoute('ai-ml'),
        icon: 'sparks',
      },
      {
        label: 'Agentic AI',
        description: 'Agents for risk operations, with guardrails.',
        href: `${serviceRoute('ai-ml')}#agentic-ai`,
        icon: 'network',
      },
      {
        label: 'DevSecOps & Platform',
        description: 'CI/CD security and observability.',
        href: serviceRoute('devsecops'),
        icon: 'lock',
      },
      {
        label: 'Cloud & Landing Zones',
        description: 'AWS, Azure, and GCP, placed per workload.',
        href: `${serviceRoute('devsecops')}#cloud`,
        icon: 'cloud',
      },
      {
        label: 'Full-Stack Engineering',
        description: 'The application around the model.',
        href: serviceRoute('full-stack'),
        icon: 'layers',
      },
      {
        label: 'Data Strategy',
        description: 'Platform, quality, and lineage.',
        href: serviceRoute('data-strategy'),
        icon: 'document',
      },
    ],
    footer: { label: 'View all services', href: ROUTES.services },
  },
  {
    label: 'Industries',
    items: [
      {
        label: 'Fintech',
        description: 'Credit, fraud, AML, KYC.',
        href: industryAnchor('fintech'),
        icon: 'shield-check',
      },
      {
        label: 'iGaming',
        description: 'Integrity, RG, payment fraud.',
        href: industryAnchor('igaming'),
        icon: 'dice',
      },
      {
        label: 'E-commerce',
        description: 'Ranking, pricing, forecasting.',
        href: industryAnchor('ecommerce'),
        icon: 'layers',
      },
      {
        label: 'Logistics',
        description: 'Routing, ETAs, capacity.',
        href: industryAnchor('logistics'),
        icon: 'compass',
      },
      {
        label: 'Healthcare',
        description: 'Document intelligence, forecasting.',
        href: industryAnchor('healthcare'),
        icon: 'document',
      },
    ],
    footer: { label: 'View all industries', href: ROUTES.industries },
  },
  {
    label: 'Resources',
    items: [
      {
        label: 'Insights',
        description: 'Field notes from the people doing the work.',
        href: ROUTES.insights,
        icon: 'document',
      },
      {
        label: 'Approach',
        description: 'Four movements, each with an exit gate.',
        href: ROUTES.approach,
        icon: 'compass',
      },
    ],
    footer: { label: 'Go to Insights', href: ROUTES.insights },
  },
  {
    label: 'Company',
    items: [
      {
        label: 'About',
        description: 'One senior team, one delivery centre.',
        href: ROUTES.about,
        icon: 'sparks',
      },
      {
        label: 'Careers',
        description: 'Senior roles only, and the pod you would sit in.',
        href: ROUTES.careers,
        icon: 'network',
      },
      {
        label: 'Contact',
        description: 'A reply within one working day.',
        href: ROUTES.contact,
        icon: 'link',
      },
      {
        label: 'Trust & legal',
        description: 'Privacy, cookies, and the registered entity.',
        href: ROUTES.legal,
        icon: 'shield-check',
      },
    ],
    footer: { label: 'About Klugminds', href: ROUTES.about },
  },
];

/** Footer column: the work. */
export const footerWorkLinks: NavLink[] = [
  { label: 'Solutions', href: ROUTES.solutions },
  { label: 'Services', href: ROUTES.services },
  { label: 'Industries', href: ROUTES.industries },
  { label: 'Approach', href: ROUTES.approach },
];

/** Footer column: the company. */
export const footerCompanyLinks: NavLink[] = [
  { label: 'About', href: ROUTES.about },
  { label: 'Insights', href: ROUTES.insights },
  { label: 'Careers', href: ROUTES.careers },
  { label: 'Contact', href: ROUTES.contact },
];

/** Header CTA — opens the briefing wizard (mailto fallback without JS). */
export const ctaNavLink: NavLink = {
  label: 'Book a briefing',
  href: CONTACT_MAILTO,
};

export const footerLegalLinks: NavLink[] = [
  { label: 'Privacy', href: ROUTES.privacy },
  { label: 'Cookies', href: ROUTES.cookies },
  { label: 'Legal & GST', href: ROUTES.legal },
];

import type { FeatureIconKey } from '@/config/icons/feature-icons';
import { CONTACT_MAILTO, industryAnchor, insightAnchor, ROUTES } from '@/constants/routes';
import { mailtoLinks } from '@/lib/mailto';
import { siteConfig } from '@/config/site';

export type FeatureItem = {
  title: string;
  description: string;
  href?: string;
  icon?: FeatureIconKey;
  slug?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type Partner = {
  name: string;
  href: string;
  description?: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoClassName?: string;
  /** Use when the logo asset is designed for dark backgrounds (e.g. white SVG). */
  logoSurface?: 'dark';
};

export type CaseStudy = {
  stat: string;
  industry: string;
  context: string;
  href: string;
};

export const homeContent = {
  hero: {
    eyebrow: 'PRODUCTION-GRADE AI',
    title: 'AI systems that ship, scale, and stay reliable in production.',
    description:
      'Klugminds designs, builds, and operates production-grade machine learning for financial services, iGaming, e-commerce, logistics, and healthcare. Global delivery from India — engagements live across Europe, the UAE, and Canada.',
    primaryCta: { label: 'Find your industry →', href: '#industries' },
    secondaryCta: { label: 'Book a briefing →', href: CONTACT_MAILTO },
  },
  credibility: {
    text: 'Practitioner-led delivery for regulated industries — fraud, AML, credit risk, and iGaming integrity. Every product ships with explainability, monitoring, and governance documentation.',
  },
  twoWays: {
    eyebrow: 'WHAT KLUGMINDS DOES',
    title: 'Two ways to move faster with AI.',
    products: {
      title: 'Klugminds Products',
      subtitle: 'Ready-to-deploy models',
      description:
        'Ten hardened models for fraud, iGaming integrity, AML, credit risk, churn, and logistics. Each ships with explainability, monitoring, and an audit trail — weeks to production, not quarters.',
      stat: '10 models · 4 families',
      cta: { label: 'Browse the catalogue →', href: '/products' },
    },
    services: {
      title: 'Klugminds Services',
      subtitle: 'Custom engagements, delivered end-to-end',
      description:
        'When off-the-shelf models are not enough — AI and ML consulting, full-stack engineering around the model, and DevSecOps to run it safely. One senior team from discovery through operations.',
      stat: '4 practices · 1 team',
      cta: { label: 'Scope an engagement →', href: '/services' },
    },
  },
  industries: {
    id: 'industries',
    eyebrow: 'INDUSTRIES WE KNOW COLD',
    title: 'Specialists, not generalists.',
    items: [
      {
        title: 'Fintech',
        description:
          'Underwriting for the underbanked, real-time fraud, AML that clears backlogs instead of creating them.',
        href: industryAnchor('fintech'),
      },
      {
        title: 'iGaming',
        description:
          'Payment fraud, bonus abuse, collusion, and responsible-gaming controls for licensed operators.',
        href: industryAnchor('igaming'),
      },
      {
        title: 'E-commerce',
        description:
          'Recommendation and ranking, dynamic pricing, payment and return-fraud protection.',
        href: industryAnchor('ecommerce'),
      },
      {
        title: 'Logistics',
        description:
          'Route optimisation, ETA precision, demand forecasting for warehouse and fleet.',
        href: industryAnchor('logistics'),
      },
      {
        title: 'Healthcare',
        description:
          'Document intelligence, patient risk stratification, operational forecasting — built for HIPAA-grade environments.',
        href: industryAnchor('healthcare'),
      },
    ] satisfies FeatureItem[],
  },
  proofPoints: {
    eyebrow: 'WHY THE WORK HOLDS UP',
    title: 'Engineering commitments, not adjectives.',
    items: [
      {
        title: 'Explainable by default',
        icon: 'explain',
        description:
          'Every scoring model ships with reason codes a regulator, a case reviewer, and a customer can understand.',
      },
      {
        title: 'Audit-ready architecture',
        icon: 'fileCheck',
        description:
          'Versioned data, versioned features, versioned models. Every decision reproducible for the life of the file.',
      },
      {
        title: 'Secure from the first commit',
        icon: 'lock',
        description:
          "DevSecOps isn't a phase we add later. Threat modelling, SBOMs, and secret scanning are wired into day one.",
      },
      {
        title: 'Operated, not abandoned',
        icon: 'operate',
        description:
          'We stay after go-live. Drift monitoring, retraining cadence, on-call runbooks — the parts most teams skip.',
      },
    ] satisfies FeatureItem[],
  },
  caseStudies: {
    eyebrow: 'SELECTED CLIENT OUTCOMES',
    title: 'Measured results from production deployments.',
    description:
      'Anonymised outcomes from client engagements. Methodology and full write-ups on Insights.',
    items: [
      {
        stat: '3.4×',
        industry: 'European neobank · Fintech',
        context:
          'AML case throughput up 3.4× in ninety days — clearing a two-year alert backlog without additional headcount.',
        href: insightAnchor('european-neobank-aml-backlog'),
      },
      {
        stat: '61%',
        industry: 'UAE marketplace · E-commerce',
        context: 'Chargeback fraud losses down 61% without adding a single review analyst.',
        href: insightAnchor('uae-marketplace-chargeback-fraud'),
      },
      {
        stat: '4×',
        industry: 'European iGaming operator',
        context:
          'Player-risk model surfacing 4× more responsible-gaming interventions than the previous rules engine.',
        href: insightAnchor('european-igaming-rg-interventions'),
      },
      {
        stat: '27%',
        industry: 'Indian NBFC · Fintech',
        context:
          'Approval rate on underbanked segment up 27% at unchanged expected loss — model passed MRM review at first submission.',
        href: insightAnchor('indian-nbfc-alt-credit'),
      },
    ] satisfies CaseStudy[],
  },
  partners: {
    eyebrow: 'DELIVERY EXPERIENCE',
    items: [
      { name: 'MGT', href: 'https://mgt.eu/' },
      { name: 'MilagroIT', href: 'https://www.milagroit.com/' },
      { name: 'Curious Code Technologies', href: 'https://curiouscodetech.com/' },
      { name: 'WizardTales', href: 'https://wizardtales.com/' },
      { name: 'Velocious Solutions', href: 'https://www.linkedin.com/company/velocious-solutions/' },
    ] satisfies Partner[],
  },
  footprint: {
    eyebrow: 'GLOBAL FOOTPRINT',
    title: 'Delivered from India. Trusted across four continents.',
    regions: [
      { label: 'India', detail: 'Delivery hub', region: 'in' },
      { label: 'Europe', detail: 'Client base', region: 'eu' },
      { label: 'UAE', detail: 'Client base', region: 'ae' },
      { label: 'Canada', detail: 'Client base', region: 'ca' },
    ],
    caption:
      'Senior engineers on client calls — timezone overlap for Europe, the UAE, and Canada.',
  },
  contact: {
    title: 'Book a briefing with our team.',
    description:
      `Share your use case and timeline — we respond within one business day. For open roles, email ${siteConfig.careersEmail}.`,
    primaryCta: { label: siteConfig.contactEmail, href: mailtoLinks.enquiry() },
    secondaryCta: { label: 'Team & locations', href: ROUTES.contact },
  },
} as const;

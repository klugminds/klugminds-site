import type { FeatureItem } from '@/config/content/home';
import { mailtoLinks } from '@/lib/mailto';

export const servicesContent = {
  hero: {
    eyebrow: 'KLUGMINDS SERVICES',
    title: 'Custom work, delivered by people who ship for a living.',
    description:
      'The Klugminds services practice is small on purpose. We staff every engagement with senior engineers and scientists — no bench, no pyramid, no hand-off from a partner who won the work to a team who has never seen it.',
  },
  practices: {
    eyebrow: 'FOUR PRACTICES, ONE TEAM',
    title: 'The engineering depth behind the products.',
    items: [
      {
        title: 'AI, Data Science & Machine Learning',
        icon: 'brain',
        description:
          'From problem-framing through production. Discovery, feasibility, custom model development, feature-store design, validation, fairness testing, and governance documentation for regulated deployments.',
      },
      {
        title: 'Full-Stack Product Engineering',
        icon: 'code',
        description:
          'Web and mobile front-ends, backend services in Python, Node.js, Go, and Java. API design that reviewers can read — OpenAPI-first, versioned, and instrumented from the first endpoint.',
      },
      {
        title: 'DevSecOps & Platform Engineering',
        icon: 'shieldCheck',
        description:
          'Cloud architecture for AWS, Azure, and GCP. CI/CD with SAST, DAST, SCA, secret scanning, and SBOM generation. Kubernetes platform engineering and observability that survives an incident.',
      },
      {
        title: 'Data Strategy & Architecture',
        icon: 'datastore',
        description:
          'Data platform design, data-quality frameworks, master and reference data programmes, and governance operating models that pass audit without slowing delivery to a crawl.',
      },
    ] satisfies FeatureItem[],
  },
  staffing: {
    eyebrow: 'HOW WE STAFF',
    title: 'Senior-led from day one.',
    description:
      'Every engagement is led by a named engagement lead and a technical architect who owns the design. Delivery pods are sized to the work — often four to eight people for full builds, smaller for focused pilots. The engineers on your briefing are the engineers on the project: no shadow teams, no bait-and-switch.',
  },
  commercial: {
    eyebrow: 'COMMERCIAL MODELS',
    title: 'Honest work, honestly priced.',
    items: [
      {
        title: 'Fixed-scope, fixed-price',
        icon: 'fileCheck',
        description:
          'For problems with clear boundaries — a pilot, a migration, a specific integration.',
      },
      {
        title: 'Time-and-materials with a ceiling',
        icon: 'timer',
        description:
          'For discovery-heavy work where the shape reveals itself as we go, but the budget still has to hold.',
      },
      {
        title: 'Outcome-based, capped upside',
        icon: 'target',
        description: "When we're confident enough in the lift that we'll price part of the fee against it.",
      },
      {
        title: 'Managed operations',
        icon: 'operate',
        description:
          'Monthly retainer for post-deployment operations, drift response, and quarterly model reviews.',
      },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: 'Start with a senior-led briefing.',
    cta: { label: 'Book a briefing →', href: mailtoLinks.briefingServices() },
  },
} as const;

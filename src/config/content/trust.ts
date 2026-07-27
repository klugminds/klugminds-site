import type { FeatureItem } from '@/config/content/home';

export const trustContent = {
  eyebrow: 'TRUST & SECURITY',
  title: 'Built for teams that answer to regulators.',
  description:
    'Klugminds is a specialist firm — not a slide deck factory. We document how models are built, how data is handled, and how decisions are reproduced when audit asks.',
  items: [
    {
      title: 'Security in the delivery pipeline',
      icon: 'shieldCheck',
      description:
        'Threat modelling before the first sprint. SAST, DAST, dependency scanning, and secret detection on every merge. SBOMs for production releases.',
    },
    {
      title: 'Data handling by agreement',
      icon: 'lock',
      description:
        'Client data stays in agreed environments. We do not train on your production data without explicit written consent. GDPR-aligned processing for EU engagements.',
    },
    {
      title: 'Model governance documentation',
      icon: 'fileCheck',
      description:
        'Versioned data, features, and models. Validation reports, reason-code design, and monitoring plans your model-risk and compliance teams can review.',
    },
    {
      title: 'Production rollout discipline',
      icon: 'deploy',
      description:
        'Shadow scoring, canary releases, and rollback criteria before full traffic. Runbooks and retraining triggers agreed before go-live.',
    },
    {
      title: 'Named senior engineers',
      icon: 'users',
      description:
        'The engineer on your briefing is the engineer on your project. No bait-and-switch from sales to a junior bench.',
    },
    {
      title: 'Global delivery, regulated clients',
      icon: 'globe',
      description:
        'Delivery from Bengaluru with timezone overlap for Europe, the UAE, and Canada. Data residency and subprocessors scoped per engagement.',
    },
  ] satisfies FeatureItem[],
  footnote:
    'Security certifications and DPAs are addressed during vendor onboarding for each engagement. Ask us for our standard security questionnaire responses.',
} as const;

import type { GlyphName } from '@/components/ui/Glyph';
import { solutionRoute } from '@/constants/routes';

export const solutionsContent = {
  hero: {
    chip: {
      badge: '4 models',
      text: 'Explainable, monitored, audit-ready',
      href: '#catalogue',
    },
    title: 'Models we have already built. Ready for your data.',
    description:
      'Four production systems for the financial-crime problems that recur in every regulated operator — each with a reference architecture, an explainability layer, and a monitoring plane.',
    primaryCta: { label: 'Browse the catalogue →', href: '#catalogue' },
    briefingLabel: 'Book a briefing',
  },

  subNav: [
    { href: '#catalogue', label: 'Catalogue' },
    { href: '#stack', label: 'What ships' },
    { href: '#engage', label: 'How buying works' },
  ],

  catalogue: {
    eyebrow: 'SOLUTIONS CATALOGUE',
    title: 'One family. Four models.',
    lede: 'Financial crime, scored four ways. Open a model to see it working, or watch the film first.',
    cards: [
      {
        href: solutionRoute('fraud-detection'),
        icon: 'shield-check',
        title: 'Fraud Detection Suite',
        text: 'Real-time scoring on device, behavioural, and graph signals.',
      },
      {
        href: solutionRoute('aml-monitoring'),
        icon: 'rings',
        title: 'AML Monitoring',
        text: 'Scenarios plus supervised scoring, triaged by expected value.',
      },
      {
        href: solutionRoute('igaming-integrity'),
        icon: 'dice-5',
        title: 'iGaming Integrity',
        text: 'Bonus abuse, multi-accounting, and collusion, scored as a network.',
      },
      {
        href: solutionRoute('responsible-gaming'),
        icon: 'eye',
        title: 'Responsible Gaming',
        text: 'Escalating-harm detection with a graded response playbook.',
      },
    ] satisfies Array<{ href: string; icon: GlyphName; title: string; text: string }>,
    cardCta: 'Explore',
  },

  stack: {
    eyebrow: 'WHAT SHIPS WITH EVERY SOLUTION',
    title: 'A production system, not a notebook.',
    lede: 'Every model arrives as a full stack. Select a layer to see what it covers and who owns it after go-live.',
  },

  engage: {
    eyebrow: 'HOW BUYING WORKS',
    title: 'Three engagement shapes.',
    lede: 'You can stop after any of them.',
    cards: [
      {
        title: 'Pilot — 6 to 8 weeks',
        text: 'One model, one segment, one measurable outcome. Fixed price, success criteria agreed in writing.',
      },
      {
        title: 'Deploy — 10 to 14 weeks',
        text: 'Production integration, monitoring, governance sign-off, and analyst training.',
      },
      {
        title: 'Operate — ongoing',
        text: 'Drift response, quarterly retraining, and a named engineer as your contact.',
      },
    ],
  },

  closing: {
    title: 'Request a solution briefing.',
    text: 'A walkthrough with the engineer who built the model, not a slide from a business-development lead.',
    ctaLabel: 'Book a briefing',
  },
} as const;

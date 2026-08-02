import { mailtoLinks } from '@/lib/mailto';

export const insightsContent = {
  hero: {
    eyebrow: 'INSIGHTS',
    title: 'Numbers that survived contact with production.',
    description:
      'Four anonymised engagements, with the measured before and after. Select one to read what the problem actually was.',
  },
  disclaimer:
    'Client figures are anonymised and reflect measured production results, not guarantees.',
  fieldNotes: {
    eyebrow: 'FIELD NOTES',
    title: 'Essays from the engineers doing the work.',
    lede: 'One every second Thursday. No re-summarised industry news.',
    items: [
      {
        category: 'Governance & Risk',
        title: 'Why your AML model is not the problem — your alert taxonomy is.',
        excerpt:
          'Supervised scoring rarely fails in isolation. It fails because the labels were never clean.',
      },
      {
        category: 'Modelling',
        title: 'Explainability is a product surface, not a compliance line item.',
        excerpt: 'Reason codes your reviewers, your customers, and your regulator can all read.',
      },
      {
        category: 'Delivery',
        title: 'The last-mile ETA problem is a social problem.',
        excerpt: 'Why models that beat benchmarks lose to models that respect driver behaviour.',
      },
      {
        category: 'iGaming integrity',
        title: 'Bonus abuse is a graph problem before it is a rules problem.',
        excerpt: 'What to instrument before you train your first collusion model.',
      },
    ],
  },
  cta: {
    title: 'Subscribe to Field Notes.',
    description: 'One essay every second Thursday, from the people who built the thing.',
    cta: { label: 'Subscribe', href: mailtoLinks.fieldNotes() },
  },
} as const;

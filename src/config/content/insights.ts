import { mailtoLinks } from '@/lib/mailto';

export type InsightAuthor = {
  name: string;
  role: string;
};

export type CaseStudyPost = {
  slug: string;
  type: 'case-study';
  industry: string;
  title: string;
  excerpt: string;
  problem: string;
  outcome: string;
  publishedAt: string;
};

export type FieldNotePost = {
  slug: string;
  type: 'field-note';
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: InsightAuthor;
};

export type InsightPost = CaseStudyPost | FieldNotePost;

export const insightsContent = {
  hero: {
    eyebrow: 'INSIGHTS',
    title: 'Numbers that survived contact with production.',
    description:
      'Success stories are named-outcome case studies from our client engagements. Field notes are essays from the engineers and scientists on our teams.',
  },
  caseStudies: {
    eyebrow: 'FEATURED SUCCESS STORIES',
    title: 'Client outcomes from the field.',
    items: [
      {
        slug: 'european-neobank-aml-backlog',
        type: 'case-study',
        industry: 'Fintech · digital banking · EU passporting',
        title: 'European neobank clears a two-year AML alert backlog',
        excerpt:
          'Alert throughput up 3.4× in ninety days. Suspicious Activity Report conversion rate up 21%. Backlog cleared in four months without additional headcount.',
        problem:
          'An analyst team of nineteen was six thousand alerts behind. The regulator had noticed. Adding headcount was not on the table.',
        outcome:
          'Alert throughput up 3.4× in ninety days. SAR conversion rate up 21%. Model has passed two independent validations since.',
        publishedAt: '2026-07-26',
      },
      {
        slug: 'uae-marketplace-chargeback-fraud',
        type: 'case-study',
        industry: 'E-commerce · cross-border · Middle East and Africa',
        title: 'UAE marketplace cuts chargeback fraud by 61%',
        excerpt:
          'Chargeback losses down 61% over two quarters. False-positive rate down 34%. Review-analyst headcount held flat while transaction volume grew 40%.',
        problem:
          'Chargeback losses were compounding month-on-month; the existing rules engine had become a maze that nobody was willing to prune.',
        outcome:
          'Chargeback losses down 61% over two quarters. False-positive rate down 34%. Transaction volume grew 40% with flat analyst headcount.',
        publishedAt: '2026-07-25',
      },
      {
        slug: 'european-igaming-rg-interventions',
        type: 'case-study',
        industry: 'iGaming · online casino and sportsbook',
        title: 'European iGaming operator surfaces 4× more RG interventions',
        excerpt:
          'Actionable RG interventions up 4× versus the previous rules engine. Twelve high-risk cases escalated to human outreach in the first month.',
        problem:
          "The operator's responsible-gaming controls were rule-based, triggered late, and rarely produced actionable interventions.",
        outcome:
          'Actionable RG interventions up 4×. Twelve high-risk cases escalated to human outreach in the first month.',
        publishedAt: '2026-07-24',
      },
      {
        slug: 'indian-nbfc-alt-credit',
        type: 'case-study',
        industry: 'Fintech · consumer lending · India',
        title: 'Indian NBFC extends credit to the underbanked with alt-data',
        excerpt:
          'Approval rate on the target segment up 27% at unchanged expected loss. Model passed internal MRM review at first submission.',
        problem:
          'A large addressable segment had thin bureau files. The client had a strong hypothesis that alternative data could price it — but no defensible way to prove it.',
        outcome:
          'Approval rate up 27% at unchanged expected loss. Model passed internal MRM review at first submission.',
        publishedAt: '2026-07-23',
      },
    ] satisfies CaseStudyPost[],
  },
  disclaimer:
    'Outcomes are anonymised and drawn from client engagements. Metrics reflect measured production results; client names and identifying details are withheld. Figures should not be treated as guarantees for future work.',
  fieldNotes: {
    eyebrow: 'FIELD NOTES',
    title: 'Essays from the engineers doing the work.',
    items: [
      {
        slug: 'aml-alert-taxonomy',
        type: 'field-note',
        category: 'Governance & Risk',
        title: 'Why your AML model is not the problem — your alert taxonomy is.',
        excerpt:
          'An essay on why supervised risk scoring rarely fails in isolation. It fails because the labels were never clean.',
        publishedAt: '2026-07-22',
        readTimeMinutes: 8,
        author: { name: 'Klugminds Data Practice', role: 'AI & model governance' },
      },
      {
        slug: 'explainability-product-surface',
        type: 'field-note',
        category: 'Modelling',
        title: 'Explainability is a product surface, not a compliance line item.',
        excerpt:
          'How to design reason codes your case reviewers, your customers, and your regulator can all read.',
        publishedAt: '2026-07-21',
        readTimeMinutes: 7,
        author: { name: 'Klugminds Engineering', role: 'Applied AI' },
      },
      {
        slug: 'last-mile-eta-social-problem',
        type: 'field-note',
        category: 'Delivery',
        title: 'The last-mile ETA problem is a social problem.',
        excerpt:
          'Why the models that beat benchmarks lose to the models that respect driver behaviour.',
        publishedAt: '2026-07-20',
        readTimeMinutes: 6,
        author: { name: 'Klugminds Logistics Practice', role: 'Operations intelligence' },
      },
      {
        slug: 'bonus-abuse-graph-signals',
        type: 'field-note',
        category: 'iGaming integrity',
        title: 'Bonus abuse is a graph problem before it is a rules problem.',
        excerpt:
          'Why single-account heuristics miss promo farming — and what to instrument before you train your first collusion model.',
        publishedAt: '2026-07-19',
        readTimeMinutes: 9,
        author: { name: 'Klugminds Integrity Practice', role: 'Fraud & player risk' },
      },
    ] satisfies FieldNotePost[],
  },
  cta: {
    title: 'Subscribe to Field Notes.',
    description:
      'One essay every second Thursday. No newsletter algorithm chum, no re-summarised industry news.',
    cta: { label: 'Subscribe →', href: mailtoLinks.fieldNotes() },
  },
} as const;

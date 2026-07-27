import type { FeatureItem, ProcessStep } from '@/config/content/home';
import { mailtoLinks } from '@/lib/mailto';

export const approachContent = {
  hero: {
    eyebrow: 'OUR APPROACH',
    title: 'A delivery model built for models that have to work.',
    description:
      'Most AI projects fail long before they reach a production incident. They fail in the first fortnight, when the wrong problem gets framed, the wrong success metric gets chosen, or the wrong stakeholder is left out of the room.',
  },
  engagement: {
    eyebrow: 'THE FIVE PHASES',
    title: 'From the first discovery call to the tenth quarterly model review.',
    description:
      'The Klugminds approach is designed to make early failures visible — and cheap to correct.',
    steps: [
      {
        step: '01',
        title: 'Frame',
        description:
          'Two to four weeks. Co-author a decision document: what decision does this model change, who acts on the output, and what does the counterfactual look like on the same data?',
      },
      {
        step: '02',
        title: 'Design',
        description:
          'Three to six weeks. Build the data pipeline, feature store, and a deliberately unambitious baseline model. Governance, explainability, and monitoring plans agreed with your model-risk function.',
      },
      {
        step: '03',
        title: 'Deliver',
        description:
          'Six to twelve weeks. Build, tune, validate, and stress-test. Deployment is staged: shadow mode, then canary, then measured rollout.',
      },
      {
        step: '04',
        title: 'Deploy',
        description:
          'Two to four weeks. Runbooks, retraining triggers, model-retirement conditions, and a live monitoring plane. Your team shadows ours — and vice versa.',
      },
      {
        step: '05',
        title: 'Operate & Optimise',
        description:
          'Ongoing. Drift monitoring, quarterly model reviews, and candid recommendations on whether to keep, rebuild, or retire.',
      },
    ] satisfies ProcessStep[],
  },
  principles: {
    eyebrow: 'THE PRINCIPLES BENEATH THE PHASES',
    title: 'What we will not compromise on.',
    summary:
      'Non-negotiable engineering standards carried through every phase — from the first discovery call to the quarterly model review.',
    items: [
      {
        title: 'Explainable by default',
        icon: 'explain',
        description:
          'If we cannot explain why the model made a decision, we do not ship the model.',
      },
      {
        title: 'Audit-ready architecture',
        icon: 'fileCheck',
        description:
          'Every input, feature, model version, and decision is versioned and reproducible.',
      },
      {
        title: 'Secure from the first commit',
        icon: 'lock',
        description:
          'Threat modelling before the first sprint. SAST, DAST, SCA, and secret scanning on every merge.',
      },
      {
        title: 'Operated, not abandoned',
        icon: 'operate',
        description:
          'We stay after go-live because that is where value is realised or lost.',
      },
      {
        title: 'Small, senior teams',
        icon: 'users',
        description:
          'Pods are sized to the work — often four to eight for full builds, smaller for focused pilots. Deliberately senior: we would rather staff two people who can make the decision than five who need permission.',
      },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: 'Walk through our delivery model with an engagement lead.',
    cta: { label: 'Book a briefing →', href: mailtoLinks.briefingApproach() },
  },
} as const;

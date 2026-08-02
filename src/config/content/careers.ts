import { siteConfig } from '@/config/site';
import { mailtoLinks } from '@/lib/mailto';

export const careersContent = {
  hero: {
    eyebrow: 'CAREERS',
    title: 'Build the model. Deploy the model. Own the outcome.',
    description:
      'For engineers tired of proofs-of-concept that never reach production. If the monitoring plane is the part you like, we should talk.',
    ctaLabel: 'Send your application →',
    ctaHref: mailtoLinks.careers(),
  },
  working: {
    eyebrow: 'WHAT WORKING HERE LOOKS LIKE',
    title: 'Ship. Own. Stay honest.',
    items: [
      {
        title: 'You will ship',
        description: 'A stalled prototype is our failure, not yours.',
      },
      {
        title: 'You will own the outcome',
        description: 'Build a model and you are on its incident bridge six months later.',
      },
      {
        title: 'You will sit with senior people',
        description: 'The client call, the design review, the model committee — from day one.',
      },
      {
        title: 'You will be paid to be honest',
        description: 'Telling a client to stop is high-leverage here, not a career risk.',
      },
    ],
  },
  roles: {
    eyebrow: 'ROLES WE HIRE FOR',
    title: 'Practitioners who have shipped.',
    items: [
      {
        title: 'Machine Learning Engineers',
        description: 'Classical ML, graph learning, applied LLM. One model in production, minimum.',
      },
      {
        title: 'Data Scientists',
        description: 'Statistics fluency over framework fashion.',
      },
      {
        title: 'Data Engineers',
        description: 'Streaming pipelines, lakehouse, feature stores.',
      },
      {
        title: 'Full-Stack Engineers',
        description: 'React, Next.js, Python, Go. Operator workflows.',
      },
      {
        title: 'DevSecOps & Platform',
        description: 'Kubernetes, Terraform, CI/CD security.',
      },
      {
        title: 'Delivery & Engagement Leads',
        description: 'Engineers who grew into running the project too.',
      },
    ],
  },
  pod: {
    eyebrow: 'HOW A POD IS SHAPED',
    title: 'Four to eight people, deliberately senior.',
    lede: 'Delivery centre in Bengaluru; engagements across Europe, the UAE, and Canada. Select a seat to see what it owns — including the one you would be sitting in. Hybrid: in-office for design reviews, remote for deep work.',
  },
  offer: {
    eyebrow: 'WHAT WE OFFER',
    title: 'Compensation and support that match the work.',
    items: [
      {
        title: 'Market-plus pay',
        description: 'Benchmarked against Bengaluru senior tech, not IT services.',
      },
      {
        title: 'Performance participation',
        description: 'A good project is a good year for the whole pod.',
      },
      {
        title: 'A learning budget that gets spent',
        description: 'Reviewed annually, not gate-kept.',
      },
      {
        title: 'Real leave',
        description: 'Twenty-eight days, and a firm expectation that you take them.',
      },
    ],
  },
  cta: {
    title: 'Interested in joining?',
    description: 'Send an unsolicited application — we read every one, and we reply.',
    ctaLabel: siteConfig.careersEmail,
    ctaHref: mailtoLinks.careers(),
  },
} as const;

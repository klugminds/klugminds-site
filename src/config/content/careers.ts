import type { FeatureItem } from '@/config/content/home';
import type { RegionCode } from '@/types/region';
import { mailtoLinks } from '@/lib/mailto';
import { siteConfig } from '@/config/site';

type LocationItem = {
  title: string;
  description: string;
  region: RegionCode;
};

export const careersContent = {
  hero: {
    eyebrow: 'CAREERS',
    title: 'Build the model. Deploy the model. Own the outcome.',
    description:
      'Klugminds is a place for engineers and scientists who are tired of shipping proofs-of-concept that never make it to production. If the data pipeline, monitoring plane, and quiet second week of go-live are the parts of the job you like, we should talk.',
  },
  culture: {
    eyebrow: 'WHAT WORKING HERE LOOKS LIKE',
    title: 'Ship. Own. Stay honest.',
    items: [
      {
        title: 'You will ship',
        icon: 'pilot',
        description:
          'Every engagement we take on is designed to go into production. If a project stalls between prototype and deploy, it is our failure and we treat it as one.',
      },
      {
        title: 'You will own the outcome',
        icon: 'target',
        description:
          'The engineer who builds a model at Klugminds is on the incident bridge if it misbehaves at three in the morning six months later.',
      },
      {
        title: 'You will work with senior people',
        icon: 'users',
        description:
          'Our pods are small and deliberately senior. From day one, you will be in the client conversation, the design review, and the model committee.',
      },
      {
        title: 'You will be paid to be honest',
        icon: 'honest',
        description:
          'Some of the highest-leverage moments of your career here will be telling a client to stop, or telling a colleague their model is not ready.',
      },
    ] satisfies FeatureItem[],
  },
  roles: {
    eyebrow: 'ROLES WE HIRE FOR',
    title: 'Practitioners who have shipped.',
    items: [
      {
        title: 'Machine Learning Engineers',
        icon: 'brain',
        description:
          'Classical ML, deep learning, graph learning, and applied LLM work. Strong preference for candidates who have taken at least one model to production.',
      },
      {
        title: 'Data Scientists',
        icon: 'chart',
        description:
          'Model design, validation, fairness testing, and governance documentation. Applied statistics fluency matters more than framework fashion.',
      },
      {
        title: 'Data Engineers',
        icon: 'datastore',
        description:
          'Batch and streaming pipelines, lakehouse design, and feature-store engineering.',
      },
      {
        title: 'Full-Stack Engineers',
        icon: 'code',
        description: 'React, Next.js, Python, Node.js, Go. Operator workflows and public products.',
      },
      {
        title: 'DevSecOps & Platform Engineers',
        icon: 'shieldCheck',
        description:
          'Kubernetes, Terraform, CI/CD security, and cloud architecture. Comfortable owning both cost and threat model.',
      },
      {
        title: 'Delivery & Engagement Leads',
        icon: 'briefcase',
        description:
          'For engineers who have grown into running the project as well as building it.',
      },
    ] satisfies FeatureItem[],
  },
  locations: {
    eyebrow: 'WHERE THE WORK HAPPENS',
    title: 'India delivery. Global engagements.',
    description:
      'Our delivery centre is in Bengaluru, with client-facing engagements across Europe, the UAE, and Canada. Hybrid model — in-office for design reviews and model committees; remote for deep work.',
    items: [
      { title: 'Bengaluru', description: 'Delivery centre', region: 'in' },
      { title: 'Europe', description: 'Client engagements', region: 'eu' },
      { title: 'UAE', description: 'Client engagements', region: 'ae' },
      { title: 'Canada', description: 'Client engagements', region: 'ca' },
    ] satisfies LocationItem[],
  },
  benefits: {
    eyebrow: 'WHAT WE OFFER',
    title: 'Compensation and support that match the work.',
    items: [
      {
        title: 'Market-plus compensation',
        icon: 'wallet',
        description: 'Benchmarked against Bengaluru senior tech pay, not generic IT services pay.',
      },
      {
        title: 'Performance participation',
        icon: 'growth',
        description: 'A share of engagement-level outcomes, so a good project is a good year for the pod.',
      },
      {
        title: 'A learning budget that gets spent',
        icon: 'learning',
        description: 'For books, conferences, courses, and certifications. Reviewed annually, not gate-kept.',
      },
      {
        title: 'Real leave',
        icon: 'calendar',
        description: 'Twenty-eight days plus public holidays, and a firm expectation that you take them.',
      },
    ] satisfies FeatureItem[],
  },
  cta: {
    title: 'Interested in joining?',
    description: 'Send us an unsolicited application — we read every one, and we reply.',
    cta: { label: `Email ${siteConfig.careersEmail}`, href: mailtoLinks.careers() },
  },
} as const;

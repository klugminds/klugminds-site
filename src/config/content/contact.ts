import { ROUTES } from '@/constants/routes';
import { siteConfig } from '@/config/site';
import { companyConfig } from '@/config/company';

export const CONTACT_TOPICS = [
  'Fraud detection',
  'AML monitoring',
  'iGaming integrity',
  'Responsible gaming',
  'Agentic AI',
  'Cloud & platform',
  'Data strategy',
  'Careers',
  'Something else',
] as const;

export const CONTACT_REGIONS = [
  'United Kingdom',
  'European Union',
  'United Arab Emirates',
  'India',
  'Canada',
  'United States',
  'Elsewhere',
] as const;

export const contactContent = {
  hero: {
    eyebrow: 'Contact',
    title: { lead: 'Tell us what you are trying to ', lit: 'decide', tail: '.' },
    description:
      'Not what you want to buy. The decision behind it is the part we are useful about, and it is the fastest route to an honest answer about whether we can help.',
    facts: [
      { label: 'Reply time', value: 'One working day' },
      { label: 'Who replies', value: 'A senior engineer' },
      { label: 'Delivery centre', value: 'Bengaluru, India' },
    ],
  },

  routing: [
    {
      icon: 'mail' as const,
      title: 'New engagement',
      text: 'Scoping, briefings, and anything commercial. A senior engineer replies, not a mailbox rota.',
      email: siteConfig.contactEmail,
    },
    {
      icon: 'network' as const,
      title: 'Careers',
      text: 'Senior roles only. Send the work you are proud of rather than a covering letter.',
      email: siteConfig.careersEmail,
    },
    {
      icon: 'doc' as const,
      title: 'Media & partnerships',
      text: 'Press, speaking, and platform partnerships. Put "press" in the subject line.',
      email: siteConfig.contactEmail,
    },
  ],

  form: {
    eyebrow: 'Write to us',
    title: 'Six fields, and one that actually matters.',
    lede: 'The message box is the one we read first. A specific sentence about what is not working beats a paragraph about your industry.',
    disclaimer:
      'This site has no form backend, by design. Pressing send composes the message in your own mail client, so you can see exactly what leaves your machine before it does.',
    placeholder:
      'Our rules engine blocks 48% of card fraud and reviews 9% of volume. The review team is at capacity and the board has asked for a number by October.',
  },

  aside: {
    steps: [
      {
        title: 'A reply within one working day',
        text: ', from the engineer whose practice it lands in.',
      },
      {
        title: 'Forty-five minutes',
        text: ', if it looks like something we can help with. No deck.',
      },
      {
        title: 'A two-week framing brief',
        text: ', fixed fee, with the option to stop there.',
      },
    ],
    overlap: [
      { region: 'Europe', hours: '4.5 h overlap' },
      { region: 'United Arab Emirates', hours: '7 h overlap' },
      { region: 'Canada & US East', hours: '2.5 h overlap' },
      { region: 'India', hours: 'Full day' },
    ],
    overlapNote:
      'A message sent before you finish your day is normally answered before you start the next one.',
    entity: {
      name: companyConfig.legalName,
      location: 'Bengaluru, Karnataka, India',
      gstin: companyConfig.gstin,
      links: [
        { label: 'Privacy', href: ROUTES.privacy },
        { label: 'Cookies', href: ROUTES.cookies },
        { label: 'Legal & GST', href: ROUTES.legal },
      ],
    },
  },

  faq: {
    eyebrow: 'Before you write',
    title: 'Four things people ask first.',
    lede: 'If your question is not here, it is a good question — send it.',
    items: [
      {
        question: 'How quickly do you reply?',
        answer:
          'One working day, from Bengaluru. Our day overlaps a full European afternoon, the whole UAE working day, and the first part of the Canadian morning — so a message sent before you finish is usually answered before you start again.',
      },
      {
        question: 'What happens on a briefing call?',
        answer:
          'Forty-five minutes with the engineer who would do the work. You describe the decision you want to improve; we say what we would look at first, what would make it hard, and whether we are the right team. There is no deck and nothing to sign.',
      },
      {
        question: 'Can you work with our data where it already is?',
        answer:
          'Usually, yes. Most engagements start inside your cloud account with a landing zone we do not own, and the data contract is written before anything is copied. If data cannot leave a jurisdiction, that constraint shapes the architecture rather than the paperwork.',
      },
      {
        question: 'Do you take on work you think will fail?',
        answer:
          'No, and the two-week framing engagement exists so that answer can be given early and cheaply. Some briefs end with us saying the decision is not worth a model yet, or that a rules change would get most of the value for a fraction of the cost.',
      },
    ],
  },

  closing: {
    title: 'Prefer a walkthrough?',
    text: 'The briefing wizard takes three steps and ends with a review of exactly what will be sent.',
    ctaLabel: 'Book a briefing',
  },
} as const;

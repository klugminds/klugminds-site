import type { FeatureItem } from '@/config/content/home';
import { mailtoLinks } from '@/lib/mailto';
import { siteConfig } from '@/config/site';

export const aboutContent = {
  hero: {
    eyebrow: 'ABOUT KLUGMINDS',
    title: 'A specialist AI firm, built to last a decade.',
    description:
      'Klugminds was founded in 2026 by practitioners who spent years building fraud, AML, credit, and iGaming risk systems inside banks, operators, and marketplaces — and who kept seeing the same failure mode: a vendor delivers a prototype, someone else deploys it badly, the model drifts, and nobody can answer the regulator.',
  },
  story: {
    eyebrow: 'OUR STORY',
    title: 'One team from frame to operate.',
    description:
      'Klugminds began with practitioners who had spent their careers building risk, fraud, and decisioning models inside banks, gaming operators, and marketplaces — and who kept encountering the same failure mode. A vendor would deliver a beautiful prototype. Someone else would deploy it, badly. The model would drift. The regulator would ask a question the vendor could no longer answer. We built Klugminds so the team that designs the model also ships it, documents it, and stays for operations.',
  },
  operations: {
    eyebrow: 'WHERE WE OPERATE',
    title: 'Headquartered in India. Trusted globally.',
    hq: 'India — with our delivery centre in Bengaluru. Engineering, data-science, and platform teams working timezone-friendly hours with clients across four continents.',
    footprint:
      'Europe, the United Arab Emirates, and Canada — with active engagements in fintech, iGaming, e-commerce, logistics, and healthcare. Client engagements are led by senior Klugminds engineers.',
  },
  values: {
    eyebrow: 'WHAT WE STAND FOR',
    title: 'Principles that shape every engagement.',
    items: [
      {
        title: 'Depth over breadth',
        icon: 'depth',
        description:
          'We would rather be the best partner in five industries than an average one in twenty.',
      },
      {
        title: 'Honest work, honestly priced',
        icon: 'pricing',
        description:
          'We publish the shape of our engagements, we quote firmly, and we do not run the "discovery is free" pattern.',
      },
      {
        title: 'Regulator-friendly by default',
        icon: 'regulator',
        description:
          'Every model we ship is built with the assumption that a regulator, an auditor, or a court will one day ask how it made a decision.',
      },
      {
        title: 'The engineer is the product',
        icon: 'engineer',
        description:
          'Our differentiation is not our stack or our slide template. It is the specific person on the client call.',
      },
      {
        title: 'A ten-year horizon',
        icon: 'horizon',
        description:
          'We are not building Klugminds to be sold in three years. That freedom shapes how we invest, whom we hire, and what we say yes to.',
      },
    ] satisfies FeatureItem[],
  },
  contact: {
    eyebrow: 'CONTACT',
    title: 'Get in touch.',
    emails: [
      {
        label: 'New engagements',
        email: siteConfig.contactEmail,
        href: mailtoLinks.newEngagement(),
      },
      { label: 'Careers', email: siteConfig.careersEmail, href: mailtoLinks.careers() },
    ],
    locations: {
      delivery: 'Bengaluru',
      clients: 'Europe · United Arab Emirates · Canada · India',
    },
  },
  cta: {
    title: 'Ready to scope an engagement?',
    cta: { label: 'Book a briefing →', href: mailtoLinks.briefing() },
  },
} as const;

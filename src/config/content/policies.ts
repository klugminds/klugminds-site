import { companyConfig } from '@/config/company';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';

export const policyLastUpdated = '2026-07-26';

export type PolicySection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export const privacyPolicy = {
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} collects, uses, and protects personal information when you visit klugminds.com or contact us.`,
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      paragraphs: [
        `${siteConfig.name} is operated by ${companyConfig.legalName} ("Klugminds", "we", "us"). Our registered office is in ${companyConfig.registeredOffice}. Our delivery centre is in ${siteConfig.locations.delivery.join(', ')}.`,
        `For privacy enquiries, contact us at ${siteConfig.contactEmail}.`,
      ],
    },
    {
      id: 'scope',
      title: 'What this policy covers',
      paragraphs: [
        'This policy applies to visitors of our public website, people who contact us by email, and candidates who apply for roles. It does not cover client engagements governed by separate contracts and data-processing agreements.',
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      paragraphs: ['We collect only what we need to operate the website and respond to enquiries:'],
      bullets: [
        'Contact details you send us voluntarily (for example name, email address, company, and message content).',
        'Technical data generated when you browse the site, such as IP address, browser type, device type, referring URL, and pages viewed.',
        'Cookie and consent preferences stored in your browser (see our Cookie Policy).',
        'Careers correspondence you send to our careers inbox.',
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How we use information',
      paragraphs: ['We use personal information to:'],
      bullets: [
        'Operate, secure, and improve the website.',
        'Respond to enquiries, briefing requests, and job applications.',
        'Meet legal, tax, and regulatory obligations.',
        'Maintain aggregated, server-side metrics for security and performance where strictly necessary.',
      ],
    },
    {
      id: 'legal-bases',
      title: 'Legal bases for processing',
      paragraphs: [
        'Where applicable law requires a legal basis — including for visitors in the European Economic Area, United Kingdom, and Canada — we rely on:',
      ],
      bullets: [
        'Legitimate interests to operate a secure public website and respond to business enquiries.',
        'Consent for non-essential cookies when we introduce them in the future.',
        'Contractual necessity when you ask us to scope or deliver services.',
        'Legal obligation where we must retain records for tax or compliance purposes.',
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep information',
      paragraphs: [
        'Website server logs are retained for a limited period needed for security and troubleshooting, then deleted or aggregated.',
        'Enquiry and careers correspondence is kept for as long as needed to manage the relationship and meet legal obligations, typically up to seven years for business records unless a longer period is required by law.',
        'Cookie consent records are stored in your browser for up to twelve months unless you clear them sooner.',
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing and processors',
      paragraphs: [
        'We do not sell personal information. We share data only with service providers that help us run the website and business — such as hosting, email, and infrastructure providers — under contracts that require appropriate safeguards.',
        'We may disclose information if required by law, court order, or to protect our rights, users, or the public.',
      ],
    },
    {
      id: 'international-transfers',
      title: 'International transfers',
      paragraphs: [
        'We are based in India and serve clients globally. If you contact us from outside India, your information may be processed in India and in the countries where our infrastructure providers operate. We use appropriate safeguards where required by applicable law.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      paragraphs: [
        'Depending on where you live, you may have rights to access, correct, delete, restrict, or object to certain processing of your personal information, and to withdraw consent where processing is consent-based.',
        `To exercise these rights, email ${siteConfig.contactEmail}. We will respond within the timeframe required by applicable law.`,
      ],
    },
    {
      id: 'security',
      title: 'Security',
      paragraphs: [
        'We apply technical and organisational measures appropriate to the information we hold, including access controls, encryption in transit, and security headers on the website. No method of transmission over the internet is completely secure.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      paragraphs: [
        'Our website and services are directed at businesses and professionals. We do not knowingly collect personal information from children.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      paragraphs: [
        'We may update this policy from time to time. The "Last updated" date at the top of this page will change when we do. Material changes will be reflected on this website.',
      ],
    },
  ] satisfies PolicySection[],
} as const;

export const cookiePolicy = {
  title: 'Cookie Policy',
  description: `How ${siteConfig.name} uses cookies and similar technologies on klugminds.com, and how you can manage your preferences.`,
  sections: [
    {
      id: 'what-are-cookies',
      title: 'What are cookies?',
      paragraphs: [
        'Cookies are small text files stored on your device when you visit a website. They help the site work reliably and remember your preferences.',
      ],
    },
    {
      id: 'how-we-use-cookies',
      title: 'How we use cookies',
      paragraphs: [
        'We use a minimal set of cookies. At present, only essential cookies are in use — to remember your cookie preference and support site security.',
      ],
    },
    {
      id: 'cookie-categories',
      title: 'Cookie categories',
      paragraphs: ['The table below lists cookies that may be set when you use this website.'],
    },
    {
      id: 'managing-preferences',
      title: 'Managing your preferences',
      paragraphs: [
        'When you first visit the site, you can acknowledge this notice. Your preference is stored so we do not ask again on every visit. You can clear site data in your browser to reset it.',
        'Most browsers also let you block or delete cookies through their settings. Blocking essential cookies may affect how parts of the site work.',
      ],
    },
    {
      id: 'third-party',
      title: 'Third-party services',
      paragraphs: [
        'Our website is delivered through infrastructure providers that may set strictly necessary security or performance cookies (for example bot management or load balancing). We do not currently use optional analytics cookies on this site.',
      ],
    },
    {
      id: 'contact',
      title: 'Questions',
      paragraphs: [
        `If you have questions about this Cookie Policy, contact ${siteConfig.contactEmail}. For broader privacy matters, see our Privacy Policy.`,
      ],
    },
  ] satisfies PolicySection[],
  cookies: [
    {
      name: 'klugminds-cookie-consent',
      purpose: 'Stores your cookie preference so we do not ask again on every visit.',
      category: 'Essential',
      duration: '12 months',
    },
    {
      name: '__cf_bm / __cflb (if set)',
      purpose: 'Cloudflare security and performance cookies used to protect the website.',
      category: 'Essential',
      duration: 'Session to 30 minutes',
    },
  ] as const,
} as const;

export const policyRelatedLinks = [
  { label: 'Privacy Policy', href: ROUTES.privacy },
  { label: 'Cookie Policy', href: ROUTES.cookies },
  { label: 'Legal & GST', href: ROUTES.legal },
] as const;

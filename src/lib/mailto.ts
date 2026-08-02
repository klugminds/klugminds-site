import { siteConfig } from '@/config/site';

type MailtoOptions = {
  to?: string;
  subject: string;
  body?: string;
};

/** CRLF line breaks — better compatibility with Outlook and desktop mail clients. */
const br = '\r\n';

const BRIEFING_BODY = [
  'Hello Klugminds team,',
  '',
  'I would like to schedule a briefing call with a senior engineer on your team.',
  '',
  'Name:',
  'Company:',
  'Role / title:',
  'Topic / use case:',
  'Engagement stage:',
  'Desired outcome:',
  'Preferred start:',
  '',
  'Kind regards,',
  '',
].join(br);

const ENQUIRY_BODY = [
  'Hello Klugminds team,',
  '',
  'I would like to get in touch regarding a potential engagement.',
  '',
  'Name:',
  'Company:',
  'Role / title:',
  'Topic:',
  'Message:',
  '',
  'Kind regards,',
  '',
].join(br);

const CAREERS_BODY = [
  'Hello,',
  '',
  'I am interested in career opportunities at Klugminds.',
  '',
  'Name:',
  'Role / area of interest:',
  'LinkedIn profile:',
  '',
  'Thank you,',
  '',
].join(br);

const FIELD_NOTES_BODY = [
  'Hello,',
  '',
  'Please add me to the Field Notes mailing list.',
  '',
  'Name:',
  'Company:',
  '',
  'Thank you,',
  '',
].join(br);

/**
 * Build a mailto URL with RFC 6068-safe encoding.
 * Uses encodeURIComponent (%20) instead of URLSearchParams (+) so Outlook
 * renders spaces correctly in the subject and body.
 */
export function buildMailto({
  to = siteConfig.contactEmail,
  subject,
  body,
}: MailtoOptions): string {
  const query: string[] = [];

  if (subject) {
    query.push(`subject=${encodeURIComponent(subject)}`);
  }

  if (body) {
    query.push(`body=${encodeURIComponent(body)}`);
  }

  return query.length > 0 ? `mailto:${to}?${query.join('&')}` : `mailto:${to}`;
}

/** Pre-filled mailto links for common contact intents. */
export const mailtoLinks = {
  briefing: () =>
    buildMailto({
      subject: 'Klugminds briefing request',
      body: BRIEFING_BODY,
    }),
  briefingProducts: () =>
    buildMailto({
      subject: 'Klugminds product briefing',
      body: BRIEFING_BODY,
    }),
  briefingServices: () =>
    buildMailto({
      subject: 'Klugminds services enquiry',
      body: BRIEFING_BODY,
    }),
  briefingIndustries: () =>
    buildMailto({
      subject: 'Klugminds industry briefing',
      body: BRIEFING_BODY,
    }),
  briefingApproach: () =>
    buildMailto({
      subject: 'Klugminds delivery briefing',
      body: BRIEFING_BODY,
    }),
  enquiry: () =>
    buildMailto({
      subject: 'Klugminds enquiry',
      body: ENQUIRY_BODY,
    }),
  newEngagement: () =>
    buildMailto({
      subject: 'Klugminds new engagement',
      body: ENQUIRY_BODY,
    }),
  careers: () =>
    buildMailto({
      to: siteConfig.careersEmail,
      subject: 'Klugminds careers enquiry',
      body: CAREERS_BODY,
    }),
  fieldNotes: () =>
    buildMailto({
      subject: 'Klugminds Field Notes subscription',
      body: FIELD_NOTES_BODY,
    }),
} as const;

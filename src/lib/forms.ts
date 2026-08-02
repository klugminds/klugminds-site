import { siteConfig } from '@/config/site';
import { getSiteUrl } from '@/lib/site-url';

/** Ordered label/value pairs collected from a form, in authoring order. */
export type FormPair = {
  label: string;
  value: string;
};

export type MailTemplate = 'briefing' | 'enquiry';

/** CRLF — better compatibility with Outlook and desktop mail clients. */
const LINE = '\r\n';

/**
 * Per-field validation rules, mirrored from the V4 reference. A rule returns
 * an empty string when the value passes, or the message to show.
 */
export const validators = {
  text: (v: string) => (v.trim().length >= 2 ? '' : 'Please fill this in.'),
  name: (v: string) => (v.trim().length >= 2 ? '' : 'Please give us a name we can use.'),
  email: (v: string) =>
    /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) ? '' : 'That does not look like a work email.',
  select: (v: string) => (v ? '' : 'Please choose one.'),
  message: (v: string) =>
    v.trim().length >= 12 ? '' : 'A sentence or two is plenty — 12 characters minimum.',
} as const;

export type ValidatorRule = keyof typeof validators;

const MULTILINE_LABELS = new Set(['Desired outcome', 'Message']);

function pairLine(pair: FormPair): string {
  if (!MULTILINE_LABELS.has(pair.label)) {
    return `${pair.label}: ${pair.value}`;
  }

  const lines = pair.value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length <= 1) {
    return `${pair.label}: ${pair.value.trim()}`;
  }

  return `${pair.label}:${LINE}${lines.map((line) => `  ${line}`).join(LINE)}`;
}

function linesForLabels(pairs: FormPair[], labels: readonly string[]): string[] {
  const order = new Map(labels.map((label, index) => [label, index]));
  return pairs
    .filter((pair) => order.has(pair.label))
    .sort((a, b) => (order.get(a.label) ?? 0) - (order.get(b.label) ?? 0))
    .map(pairLine);
}

function signOffName(pairs: FormPair[]): string {
  return pairs.find((pair) => pair.label === 'Name')?.value.trim() ?? '';
}

/**
 * Plain-text email body with a consistent, professional structure.
 * Mail clients only receive text — sections and spacing carry the layout.
 */
export function formatMailBody(pairs: FormPair[], template: MailTemplate): string {
  const name = signOffName(pairs);
  const lines: string[] = ['Hello Klugminds team,', ''];

  switch (template) {
    case 'briefing': {
      const engagement = linesForLabels(pairs, [
        'Topic(s)',
        'Engagement stage',
        'Desired outcome',
        'Referred from',
      ]);
      const contact = linesForLabels(pairs, [
        'Name',
        'Email',
        'Company',
        'Role',
        'Engineering team size',
        'Preferred start',
      ]);

      lines.push(
        'I would like to schedule a briefing call with a senior engineer on your team.',
        'Please find my details below.',
        '',
        'BRIEFING REQUEST',
        '--------------',
        '',
      );

      if (engagement.length) {
        lines.push('Engagement', ...engagement, '');
      }
      if (contact.length) {
        lines.push('Contact', ...contact, '');
      }
      break;
    }
    case 'enquiry': {
      const enquiry = linesForLabels(pairs, ['Topic', 'Message']);
      const contact = linesForLabels(pairs, ['Name', 'Email', 'Company', 'Region']);

      lines.push(
        'I would like to get in touch regarding a potential engagement.',
        'Please find my details below.',
        '',
        'WEBSITE ENQUIRY',
        '---------------',
        '',
      );

      if (enquiry.length) {
        lines.push('Enquiry', ...enquiry, '');
      }
      if (contact.length) {
        lines.push('Contact', ...contact, '');
      }
      break;
    }
    default: {
      const exhaustive: never = template;
      return exhaustive;
    }
  }

  lines.push(
    '---',
    `Submitted via ${siteConfig.name} (${getSiteUrl()}).`,
    'Please reply to this message to continue the conversation.',
    '',
    'Kind regards,',
    name || '[Your name]',
  );

  return lines.join(LINE);
}

/**
 * Compose the collected answers into a mailto URL. This site has no form
 * backend; the message is handed to the reader's own mail client so they can
 * see exactly what leaves their machine.
 */
export function composeMail(
  to: string,
  subject: string,
  pairs: FormPair[],
  template: MailTemplate,
): string {
  const body = formatMailBody(pairs, template);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Plain-text rendering of the same message, for the clipboard copy. */
export function pairsToText(pairs: FormPair[], template: MailTemplate): string {
  return formatMailBody(pairs, template);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export const DEFAULT_FORM_TO = siteConfig.contactEmail;

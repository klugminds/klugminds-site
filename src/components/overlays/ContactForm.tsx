'use client';

import { useState } from 'react';

import { Glyph } from '@/components/ui/Glyph';
import { CONTACT_REGIONS, CONTACT_TOPICS, contactContent } from '@/config/content/contact';
import { siteConfig } from '@/config/site';
import { composeMail, copyText, pairsToText, validators, type FormPair } from '@/lib/forms';
import { toast } from '@/lib/toast';

type FieldKey = 'name' | 'email' | 'company' | 'topic' | 'message';

type FormState = {
  name: string;
  email: string;
  company: string;
  region: string;
  topic: string;
  message: string;
  pot: string;
};

const EMPTY: FormState = {
  name: '',
  email: '',
  company: '',
  region: '',
  topic: '',
  message: '',
  pot: '',
};

function collectPairs(data: FormState): FormPair[] {
  const pairs: FormPair[] = [
    { label: 'Name', value: data.name.trim() },
    { label: 'Email', value: data.email.trim() },
    { label: 'Company', value: data.company.trim() },
  ];
  if (data.region) pairs.push({ label: 'Region', value: data.region });
  pairs.push({ label: 'Topic', value: data.topic });
  pairs.push({ label: 'Message', value: data.message.trim() });
  return pairs;
}

/**
 * Contact page form — validates, composes a mailto URL, and copies the text.
 * No backend; the reader sends from their own mail client.
 */
export function ContactForm() {
  const [data, setData] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [done, setDone] = useState<{ note: string; mailUrl: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    if (key in errors) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<FieldKey, string>> = {};
    const nameMsg = validators.name(data.name);
    if (nameMsg) next.name = nameMsg;
    const emailMsg = validators.email(data.email);
    if (emailMsg) next.email = emailMsg;
    const companyMsg = validators.text(data.company);
    if (companyMsg) next.company = companyMsg;
    const topicMsg = validators.select(data.topic);
    if (topicMsg) next.topic = topicMsg;
    const messageMsg = validators.message(data.message);
    if (messageMsg) next.message = messageMsg;
    setErrors(next);
    return Object.values(next).every((v) => !v);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (data.pot || busy || !validate()) {
      return;
    }
    setBusy(true);
    const pairs = collectPairs(data);
    const company = data.company.trim();
    const url = composeMail(
      siteConfig.contactEmail,
      company ? `Klugminds website enquiry — ${company}` : 'Klugminds website enquiry',
      pairs,
      'enquiry',
    );
    await new Promise((resolve) => setTimeout(resolve, 400));
    setBusy(false);
    window.location.href = url;
    const copied = await copyText(pairsToText(pairs, 'enquiry'));
    setDone({
      note: copied
        ? 'A copy is on your clipboard too, in case your mail client did not open.'
        : 'If your mail client did not open, use the button below.',
      mailUrl: url,
    });
    toast('Message prepared', 'Press send in your mail client to deliver it.');
  };

  const { form } = contactContent;
  const count = data.message.length;

  if (done) {
    return (
      <div className="v4-card p-8 text-center">
        <div
          className="v4-done-mark mx-auto"
          style={{ color: '#007a85', background: 'rgb(0 165 179 / .1)' }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display t-fg mt-4 text-xl font-bold">Your message is ready to send</h3>
        <p className="t-muted mx-auto mt-2 max-w-sm text-sm">{done.note}</p>
        <p className="mt-6">
          <a className="v4-btn v4-btn--primary" href={done.mailUrl}>
            <span>
              <Glyph name="mail" className="h-[15px] w-[15px]" strokeWidth={1.7} />
            </span>
            <span>Open it again</span>
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="mt-9" onSubmit={(event) => void onSubmit(event)} noValidate>
      <div className="v4-form-grid v4-form-grid--2">
        <div className={`v4-field${errors.name ? 'is-invalid' : ''}`}>
          <label htmlFor="c-name">
            Name
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="c-name"
            className="v4-input"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            value={data.name}
            onChange={(e) => set('name', e.target.value)}
          />
          <p className="v4-err">
            <span>{errors.name ?? 'Please give us a name we can use.'}</span>
          </p>
        </div>
        <div className={`v4-field${errors.email ? 'is-invalid' : ''}`}>
          <label htmlFor="c-email">
            Work email
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="c-email"
            className="v4-input"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
          />
          <p className="v4-err">
            <span>{errors.email ?? 'That does not look like a work email.'}</span>
          </p>
        </div>
        <div className={`v4-field${errors.company ? 'is-invalid' : ''}`}>
          <label htmlFor="c-company">
            Company
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="c-company"
            className="v4-input"
            type="text"
            name="company"
            autoComplete="organization"
            placeholder="Company name"
            value={data.company}
            onChange={(e) => set('company', e.target.value)}
          />
          <p className="v4-err">
            <span>{errors.company ?? 'Please fill this in.'}</span>
          </p>
        </div>
        <div className="v4-field">
          <label htmlFor="c-region">Where are you based?</label>
          <select
            id="c-region"
            className="v4-select"
            name="region"
            value={data.region}
            onChange={(e) => set('region', e.target.value)}
          >
            <option value="">Select…</option>
            {CONTACT_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className={`v4-field v4-col-2${errors.topic ? 'is-invalid' : ''}`}>
          <label htmlFor="c-topic">
            What is it about?
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="c-topic"
            className="v4-select"
            name="topic"
            value={data.topic}
            onChange={(e) => set('topic', e.target.value)}
          >
            <option value="">Select…</option>
            {CONTACT_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <p className="v4-err">
            <span>{errors.topic ?? 'Please choose one.'}</span>
          </p>
        </div>
        <div className={`v4-field v4-col-2${errors.message ? 'is-invalid' : ''}`}>
          <label htmlFor="c-message">
            What are you trying to decide?
            <span className="req" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id="c-message"
            className="v4-textarea"
            name="message"
            rows={6}
            maxLength={1400}
            placeholder={form.placeholder}
            value={data.message}
            onChange={(e) => set('message', e.target.value)}
          />
          <p className="v4-err">
            <span>{errors.message ?? 'A sentence or two is plenty.'}</span>
          </p>
          <p className="v4-hint">
            <span className="v4-count">{count}/1400</span>
            Specifics help. Numbers help most.
          </p>
        </div>
      </div>

      <div className="v4-pot" aria-hidden="true">
        <label htmlFor="c-pot">Leave this empty</label>
        <input
          id="c-pot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.pot}
          onChange={(e) => set('pot', e.target.value)}
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" className="v4-btn v4-btn--primary" data-magnet="5" disabled={busy}>
          <span className="v4-btn-label">{busy ? 'Preparing…' : 'Send message'}</span>
          <span className="v4-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <p className="t-muted max-w-sm text-xs leading-relaxed">{form.disclaimer}</p>
      </div>
    </form>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';

import { Overlay } from '@/components/overlays/Overlay';
import { siteConfig } from '@/config/site';
import { OPEN_BRIEFING_EVENT, type OpenBriefingDetail } from '@/lib/briefing';
import { composeMail, copyText, pairsToText, validators, type FormPair } from '@/lib/forms';
import { cn } from '@/lib/cn';
import { toast } from '@/lib/toast';

const TOPICS = [
  'Fraud detection',
  'AML monitoring',
  'iGaming integrity',
  'Responsible gaming',
  'Agentic AI',
  'Cloud & platform',
  'Data strategy',
  'Something else',
];

const STAGES = [
  { value: 'Exploring', note: 'No timeline yet — we are mapping the problem.' },
  { value: 'Scoping', note: 'A budget exists and we want a delivery plan.' },
  { value: 'Replacing', note: 'Something is in production and it is not working.' },
];

const TEAM_SIZES = ['Under 50', '50–500', '500–5,000', '5,000+'];
const TIMINGS = ['This month', 'This quarter', 'Next quarter', 'Researching'];

const STEP_LABELS = ['Problem', 'You', 'Review'] as const;

type WizardData = {
  topics: string[];
  stage: string;
  outcome: string;
  name: string;
  email: string;
  company: string;
  role: string;
  size: string;
  when: string;
  topicContext: string;
  pot: string;
};

type ErrorKey = 'stage' | 'outcome' | 'name' | 'email' | 'company';

const EMPTY_DATA: WizardData = {
  topics: [],
  stage: '',
  outcome: '',
  name: '',
  email: '',
  company: '',
  role: '',
  size: '',
  when: '',
  topicContext: '',
  pot: '',
};

function collectPairs(data: WizardData): FormPair[] {
  const pairs: FormPair[] = [];
  if (data.topics.length) pairs.push({ label: 'Topic(s)', value: data.topics.join(', ') });
  if (data.stage) pairs.push({ label: 'Engagement stage', value: data.stage });
  if (data.outcome.trim()) pairs.push({ label: 'Desired outcome', value: data.outcome.trim() });
  if (data.name.trim()) pairs.push({ label: 'Name', value: data.name.trim() });
  if (data.email.trim()) pairs.push({ label: 'Email', value: data.email.trim() });
  if (data.company.trim()) pairs.push({ label: 'Company', value: data.company.trim() });
  if (data.role.trim()) pairs.push({ label: 'Role', value: data.role.trim() });
  if (data.size) pairs.push({ label: 'Engineering team size', value: data.size });
  if (data.when) pairs.push({ label: 'Preferred start', value: data.when });
  if (data.topicContext) pairs.push({ label: 'Referred from', value: data.topicContext });
  return pairs;
}

function FieldError({ message }: { message?: string }) {
  return (
    <p className="v4-err">
      <span>{message || 'Please check this field.'}</span>
    </p>
  );
}

/**
 * The three-step briefing wizard. Validates each step, reviews exactly what
 * will be sent, then composes the message in the reader's own mail client and
 * copies it to the clipboard — this site stores nothing.
 */
export function BriefingWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(EMPTY_DATA);
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [busy, setBusy] = useState(false);
  const [doneState, setDoneState] = useState<{ note: string; mailUrl: string } | null>(null);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenBriefingDetail>).detail;
      if (detail?.topic) {
        setData((current) => ({ ...current, topicContext: detail.topic ?? '' }));
      }
      setOpen(true);
    };
    window.addEventListener(OPEN_BRIEFING_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BRIEFING_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const set = <K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    if (key in errors) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const toggleTopic = (topic: string) => {
    setData((current) => ({
      ...current,
      topics: current.topics.includes(topic)
        ? current.topics.filter((t) => t !== topic)
        : [...current.topics, topic],
    }));
  };

  const validateStep = (index: number): boolean => {
    const next: Partial<Record<ErrorKey, string>> = {};
    if (index === 0) {
      if (!data.stage) next.stage = 'Please choose one.';
      const outcomeMsg = validators.message(data.outcome);
      if (outcomeMsg) next.outcome = outcomeMsg;
    }
    if (index === 1) {
      const nameMsg = validators.name(data.name);
      if (nameMsg) next.name = nameMsg;
      const emailMsg = validators.email(data.email);
      if (emailMsg) next.email = emailMsg;
      const companyMsg = validators.text(data.company);
      if (companyMsg) next.company = companyMsg;
    }
    setErrors(next);
    return Object.values(next).every((v) => !v);
  };

  const goNext = () => {
    if (!validateStep(step)) {
      return;
    }
    setStep((current) => Math.min(current + 1, STEP_LABELS.length - 1));
  };
  const goBack = () => setStep((current) => Math.max(current - 1, 0));

  const sendRequest = async () => {
    if (!validateStep(step) || data.pot || busy) {
      return;
    }
    setBusy(true);
    const pairs = collectPairs(data);
    const company = data.company.trim();
    const url = composeMail(
      siteConfig.contactEmail,
      company ? `Klugminds briefing request — ${company}` : 'Klugminds briefing request',
      pairs,
      'briefing',
    );
    await new Promise((resolve) => setTimeout(resolve, 700));
    setBusy(false);

    window.location.href = url;
    const copied = await copyText(pairsToText(pairs, 'briefing'));
    setDoneState({
      note: copied
        ? 'A copy is on your clipboard too, in case your mail client did not open.'
        : 'If your mail client did not open, use the button below.',
      mailUrl: url,
    });
    toast('Briefing request prepared', 'Press send in your mail client to deliver it.');
  };

  // Enter advances rather than submitting a half-filled wizard.
  const onPanelKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' || doneState) {
      return;
    }
    const target = event.target as HTMLElement;
    if (target.tagName === 'TEXTAREA') {
      return;
    }
    event.preventDefault();
    if (step === STEP_LABELS.length - 1) {
      void sendRequest();
    } else {
      goNext();
    }
  };

  const recapPairs = collectPairs(data);

  return (
    <Overlay
      open={open}
      onClose={close}
      place="center"
      labelledBy="v4-briefing-t"
      panelClassName="v4-wiz"
    >
      <div onKeyDown={onPanelKeyDown}>
        {doneState ? (
          <div className="v4-done">
            <div className="v4-done-mark">
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
            <h3>Your briefing request is ready</h3>
            <p>{doneState.note}</p>
            <p style={{ marginTop: '1.25rem' }}>
              <a className="v4-btn v4-btn--primary" href={doneState.mailUrl}>
                <span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span>Open it again</span>
              </a>
            </p>
          </div>
        ) : (
          <>
            <div className="v4-wiz-head">
              <div>
                <p className="v4-badge v4-badge--cool">
                  45 minutes · senior engineer, not a salesperson
                </p>
                <h2 id="v4-briefing-t" className="mt-2">
                  Book a briefing
                </h2>
                <p>
                  Tell us what you are trying to decide. We will bring the two or three things we
                  would look at first, and say plainly whether we are the right team.
                </p>
              </div>
              <button type="button" className="v4-x" aria-label="Close" onClick={close}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="v4-wiz-meter" aria-hidden="true">
              {STEP_LABELS.map((label, index) => (
                <span key={label} className="contents">
                  {index > 0 ? <span className="v4-wiz-rule" /> : null}
                  <span
                    className="v4-wiz-dot"
                    {...(index === step ? { 'data-on': '' } : {})}
                    {...(index < step ? { 'data-done': '' } : {})}
                  >
                    <i>{index + 1}</i>
                    {label}
                  </span>
                </span>
              ))}
            </div>

            <div className="v4-wiz-body">
              {step === 0 ? (
                <section className="v4-wiz-step" aria-label="Step 1 of 3">
                  <div className="v4-field">
                    <p className="v4-lbl" id="lbl-topic">
                      What is it about?
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </p>
                    <div className="v4-chips" role="group" aria-labelledby="lbl-topic">
                      {TOPICS.map((topic) => (
                        <label key={topic} className="v4-chip">
                          <input
                            type="checkbox"
                            name="topic"
                            value={topic}
                            checked={data.topics.includes(topic)}
                            onChange={() => toggleTopic(topic)}
                          />
                          <span>{topic}</span>
                        </label>
                      ))}
                    </div>
                    <p className="v4-hint">
                      Pick as many as apply. It only decides who joins the call.
                    </p>
                  </div>
                  <div
                    className={cn('v4-field', errors.stage && 'is-bad')}
                    style={{ marginTop: '1.125rem' }}
                  >
                    <p className="v4-lbl" id="lbl-stage">
                      Where are you with it?
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </p>
                    <div
                      className="v4-radios v4-radios--3"
                      role="radiogroup"
                      aria-labelledby="lbl-stage"
                    >
                      {STAGES.map((stage) => (
                        <label key={stage.value} className="v4-radio">
                          <input
                            type="radio"
                            name="stage"
                            value={stage.value}
                            checked={data.stage === stage.value}
                            onChange={() => set('stage', stage.value)}
                          />
                          <span>
                            <b>{stage.value}</b>
                            <small>{stage.note}</small>
                          </span>
                        </label>
                      ))}
                    </div>
                    <FieldError message={errors.stage} />
                  </div>
                  <div
                    className={cn('v4-field', errors.outcome && 'is-bad')}
                    style={{ marginTop: '1.125rem' }}
                  >
                    <label htmlFor="bw-what">
                      In a sentence, what would a good outcome look like?
                      <span className="req" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="bw-what"
                      className="v4-textarea"
                      rows={3}
                      maxLength={600}
                      value={data.outcome}
                      onChange={(event) => set('outcome', event.target.value)}
                      aria-invalid={Boolean(errors.outcome)}
                      placeholder="We block card fraud on rules and the false-positive rate is unmanageable. We want a model in front of the rules by Q4."
                    />
                    <FieldError message={errors.outcome} />
                    <p className="v4-hint">
                      <span className="v4-count">{data.outcome.length}/600</span>
                      The more specific this is, the more useful the call.
                    </p>
                  </div>
                </section>
              ) : null}

              {step === 1 ? (
                <section className="v4-wiz-step" aria-label="Step 2 of 3">
                  <div className="v4-form-grid v4-form-grid--2">
                    <div className={cn('v4-field', errors.name && 'is-bad')}>
                      <label htmlFor="bw-name">
                        Name
                        <span className="req" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="bw-name"
                        className="v4-input"
                        type="text"
                        autoComplete="name"
                        value={data.name}
                        onChange={(event) => set('name', event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        placeholder="Jane Doe"
                      />
                      <FieldError message={errors.name} />
                    </div>
                    <div className={cn('v4-field', errors.email && 'is-bad')}>
                      <label htmlFor="bw-email">
                        Work email
                        <span className="req" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="bw-email"
                        className="v4-input"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(event) => set('email', event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        placeholder="jane@company.com"
                      />
                      <FieldError message={errors.email} />
                    </div>
                    <div className={cn('v4-field', errors.company && 'is-bad')}>
                      <label htmlFor="bw-co">
                        Company
                        <span className="req" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="bw-co"
                        className="v4-input"
                        type="text"
                        autoComplete="organization"
                        value={data.company}
                        onChange={(event) => set('company', event.target.value)}
                        aria-invalid={Boolean(errors.company)}
                        placeholder="Company name"
                      />
                      <FieldError message={errors.company} />
                    </div>
                    <div className="v4-field">
                      <label htmlFor="bw-role">Role</label>
                      <input
                        id="bw-role"
                        className="v4-input"
                        type="text"
                        value={data.role}
                        onChange={(event) => set('role', event.target.value)}
                        placeholder="Head of Risk"
                      />
                    </div>
                    <div className="v4-field">
                      <label htmlFor="bw-size">Engineering team size</label>
                      <select
                        id="bw-size"
                        className="v4-select"
                        value={data.size}
                        onChange={(event) => set('size', event.target.value)}
                      >
                        <option value="">Select…</option>
                        {TEAM_SIZES.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="v4-field">
                      <label htmlFor="bw-when">When would you want to start?</label>
                      <select
                        id="bw-when"
                        className="v4-select"
                        value={data.when}
                        onChange={(event) => set('when', event.target.value)}
                      >
                        <option value="">Select…</option>
                        {TIMINGS.map((timing) => (
                          <option key={timing} value={timing}>
                            {timing}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="v4-pot" aria-hidden="true">
                    <label htmlFor="bw-pot">Leave this empty</label>
                    <input
                      id="bw-pot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={data.pot}
                      onChange={(event) => set('pot', event.target.value)}
                    />
                  </div>
                </section>
              ) : null}

              {step === 2 ? (
                <section className="v4-wiz-step" aria-label="Step 3 of 3">
                  <p className="v4-badge v4-badge--cool">Check and send</p>
                  <dl className="v4-done-recap" style={{ marginTop: '.875rem' }}>
                    {recapPairs.length ? (
                      recapPairs.map((pair) => (
                        <div key={pair.label}>
                          <dt>{pair.label}</dt>
                          <dd>{pair.value}</dd>
                        </div>
                      ))
                    ) : (
                      <div>
                        <dt>Nothing yet</dt>
                        <dd>Step back and add a line about the problem.</dd>
                      </div>
                    )}
                  </dl>
                  <p className="v4-hint" style={{ marginTop: '1rem' }}>
                    We reply within one working day. Nothing here is stored on this site — pressing
                    send composes the message in your own mail client, so you can see exactly what
                    leaves your machine.
                  </p>
                </section>
              ) : null}
            </div>

            <div className="v4-wiz-foot">
              {step > 0 ? (
                <button type="button" className="v4-btn v4-btn--ghost" onClick={goBack}>
                  Back
                </button>
              ) : null}
              <span className="v4-wiz-note">Enter ↵ to continue</span>
              <span style={{ flex: 1 }} />
              {step < STEP_LABELS.length - 1 ? (
                <button type="button" className="v4-btn v4-btn--primary" onClick={goNext}>
                  <span className="v4-btn-label">Continue</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className="v4-btn v4-btn--primary"
                  onClick={() => void sendRequest()}
                  {...(busy ? { 'data-busy': '1' } : {})}
                >
                  {busy ? <span className="v4-spin" /> : null}
                  <span className="v4-btn-label">Send request</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { MapPanel } from '@/components/viz/panels/MapPanel';
import { aboutContent } from '@/config/content/about';
import { pageImages } from '@/config/images';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'About';
const pageDescription = aboutContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.about,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const PRINCIPLE_ICONS = [
  <svg
    key="depth"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none" />
  </svg>,
  <svg
    key="pricing"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 21V4m0 1.5h10l-2.2 3 2.2 3H6" />
  </svg>,
  <svg
    key="regulator"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l8 3v6c0 4.5-3.2 7.9-8 9-4.8-1.1-8-4.5-8-9V6l8-3z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
  </svg>,
  <svg
    key="engineer"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v4M12 17v4M4.2 6.2l2.8 2.8M17 15l2.8 2.8M3 12h4M17 12h4M4.2 17.8L7 15M17 9l2.8-2.8"
    />
  </svg>,
  <svg
    key="horizon"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 9.5l-1.6 4.6-4.6 1.6 1.6-4.6z" />
  </svg>,
];

const TRUST_ICONS = [
  <svg
    key="security"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <rect
      x="4.5"
      y="10.5"
      width="15"
      height="9.5"
      rx="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
  </svg>,
  <svg
    key="data"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3h8l4 4v14H8zM16 3v4h4M11 12h5M11 16h5"
    />
  </svg>,
  <svg
    key="governance"
    aria-hidden="true"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75l2 2L15 10M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
    />
  </svg>,
];

const TRUST_ITEMS = [
  {
    title: 'Security in the pipeline',
    description:
      'Threat modelling before the first sprint. Scanning on every merge. SBOMs per release.',
  },
  {
    title: 'Data handling by agreement',
    description:
      'Client data stays in agreed environments. We do not train on your production data without written consent.',
  },
  {
    title: 'Model governance',
    description:
      'Versioned data, features, and models, with validation reports your compliance team can review.',
  },
];

export default function AboutPage() {
  const { hero, operations, values, contact, cta } = aboutContent;

  return (
    <>
      <JsonLd pathname={ROUTES.about} pageTitle={pageTitle} pageDescription={pageDescription} />

      <section
        className="hero-gradient b-line relative overflow-hidden border-b py-14 sm:py-20"
        id="hero"
      >
        <div className="hero-weave" aria-hidden="true" />
        <div className={`${CONTAINER} relative`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <p className="font-mono-eyebrow t-accent mb-4">{hero.eyebrow}</p>
              <KineticHeading
                as="h1"
                className="font-display t-fg text-3xl leading-[1.12] font-bold tracking-tight text-balance sm:text-4xl lg:text-[length:var(--text-fs-h1)]"
              >
                {hero.title}
              </KineticHeading>
              <p
                className="t-muted mt-6 max-w-xl text-[length:var(--text-fs-lede)] text-pretty"
                data-reveal
                data-reveal-delay="1"
              >
                Founded in 2026 by practitioners who spent years building fraud, AML, credit, and
                iGaming risk systems inside banks and operators — and kept seeing the same failure:
                a vendor delivers a prototype, someone else deploys it badly, and nobody can answer
                the regulator.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal data-reveal-delay="2">
                <BriefingButton topic="About hero" />
                <Link className="v4-btn v4-btn--ghost" href="#contact">
                  <span>Contact</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <div data-clip className="media-frame aspect-[4/3] sm:aspect-[3/2]">
                <Image
                  src={pageImages.about.src}
                  alt={pageImages.about.alt}
                  width={1600}
                  height={1067}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <div className="max-w-2xl" data-reveal>
                <p className="font-mono-eyebrow t-accent mb-3">{operations.eyebrow}</p>
                <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                  One team from frame to operate.
                </h2>
                <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
                  The industry keeps splitting one job into three vendors — frame, build, run — with
                  nobody accountable when it drifts. We do all three, so the people who designed the
                  model are still answering for it a year later.
                </p>
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="1">
              <MapPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="section-light b-line border-y py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{values.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {values.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              And the commitments underneath them.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.items.map((item, i) => (
              <div
                key={item.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="bg-chip t-accent mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg">
                  {PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length]}
                </span>
                <h3 className="font-display t-fg text-sm font-bold">{item.title}</h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="bg-chip t-accent mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg">
                  {TRUST_ICONS[i]}
                </span>
                <h3 className="font-display t-fg text-sm font-bold">{item.title}</h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="t-muted mt-8 max-w-3xl text-xs leading-relaxed">
            Security certifications and DPAs are addressed during vendor onboarding for each
            engagement. Ask us for our standard security questionnaire responses.
          </p>
        </div>
      </section>

      <section className="section-white b-line scroll-mt-24 border-b py-16 sm:py-20" id="contact">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{contact.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {contact.title}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contact.emails.map((item, i) => (
              <div
                key={item.email}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <p className="t-accent text-xs font-semibold tracking-wider uppercase">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  className="font-display t-fg hover:t-accent mt-2 inline-flex items-center gap-1.5 text-lg font-bold"
                >
                  {item.email} <span aria-hidden="true">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stage calm className="py-16 sm:py-20">
        <div className={`${CONTAINER} relative`}>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div data-reveal>
              <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                {cta.title}
              </h2>
            </div>
            <div data-reveal data-reveal-delay="1">
              <BriefingButton topic="About closing" label="Book a briefing" />
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

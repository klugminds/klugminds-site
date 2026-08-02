import type { Metadata } from 'next';

import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { DriftPanel } from '@/components/viz/panels/DriftPanel';
import { StepperPanel } from '@/components/viz/panels/StepperPanel';
import { approachContent } from '@/config/content/approach';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Approach';
const pageDescription =
  'The Klugminds delivery model: five phases from framing to operating, and the engineering principles we will not compromise on.';

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.approach,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const PRINCIPLE_ICONS = [
  <svg
    key="shield"
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
    key="audit"
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
    key="lock"
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
    key="refresh"
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
      d="M4 4v5h5M20 20v-5h-5M4.5 15a8 8 0 0 0 14.9 2.5M19.5 9A8 8 0 0 0 4.6 6.5"
    />
  </svg>,
  <svg
    key="compass"
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

export default function ApproachPage() {
  const { hero, principles, operate, cta } = approachContent;

  return (
    <>
      <JsonLd pathname={ROUTES.approach} pageTitle={pageTitle} pageDescription={pageDescription} />

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
                {hero.description}
              </p>
              <div className="mt-8" data-reveal data-reveal-delay="2">
                <BriefingButton topic="Approach hero" />
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <StepperPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-3xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{principles.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {principles.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {principles.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {principles.items.map((item, i) => (
              <div
                key={item.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="bg-chip t-accent mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg">
                  {PRINCIPLE_ICONS[i]}
                </span>
                <h3 className="font-display t-fg text-sm font-bold">{item.title}</h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light b-line border-y py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0" data-reveal>
              <p className="font-mono-eyebrow t-accent mb-3">{operate.eyebrow}</p>
              <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                {operate.title}
              </h2>
              <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
                {operate.lede}
              </p>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="1">
              <DriftPanel />
            </div>
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
              <BriefingButton topic="Approach closing" label="Book a briefing" />
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

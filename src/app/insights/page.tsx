import type { Metadata } from 'next';

import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { Glyph } from '@/components/ui/Glyph';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { OutcomesPanel } from '@/components/viz/panels/OutcomesPanel';
import { insightsContent } from '@/config/content/insights';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Insights';
const pageDescription =
  'Client outcomes and field notes from Klugminds production AI engagements in fintech, iGaming, e-commerce, and logistics.';

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.insights,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function InsightsPage() {
  const { hero, fieldNotes, disclaimer, cta } = insightsContent;

  return (
    <>
      <JsonLd pathname={ROUTES.insights} pageTitle={pageTitle} pageDescription={pageDescription} />

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
                <BriefingButton topic="Insights hero" />
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <OutcomesPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{fieldNotes.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {fieldNotes.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {fieldNotes.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fieldNotes.items.map((note, i) => (
              <div
                key={note.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <p className="t-accent text-xs font-semibold tracking-wider uppercase">
                  {note.category}
                </p>
                <h3 className="font-display t-fg mt-2 text-base font-bold">{note.title}</h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{note.excerpt}</p>
                <span className="t-muted mt-4 inline-flex items-center gap-1.5 text-xs font-medium">
                  Full essay coming soon
                </span>
              </div>
            ))}
          </div>
          <p className="t-muted mt-8 text-xs">{disclaimer}</p>
        </div>
      </section>

      <Stage calm className="py-16 sm:py-20">
        <div className={`${CONTAINER} relative`}>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div data-reveal>
              <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                {cta.title}
              </h2>
              <p className="t-muted mt-3 max-w-xl text-sm leading-relaxed">{cta.description}</p>
            </div>
            <div data-reveal data-reveal-delay="1">
              <a className="v4-btn v4-btn--primary" href={cta.cta.href}>
                <span>
                  <Glyph name="mail" className="h-[15px] w-[15px]" strokeWidth={1.7} />
                </span>
                <span>{cta.cta.label}</span>
                <span className="v4-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

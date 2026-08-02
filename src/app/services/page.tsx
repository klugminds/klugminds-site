import type { Metadata } from 'next';
import Link from 'next/link';

import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { Glyph } from '@/components/ui/Glyph';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { OrbitPanel } from '@/components/viz/panels/OrbitPanel';
import { servicesContent } from '@/config/content/services';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Services';
const pageDescription =
  'Senior-led AI, agentic AI, data science, full-stack engineering, DevSecOps, cloud, and data-strategy services for regulated industries.';

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.services,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function ServicesPage() {
  const { hero, practices, flagships, agentic, commercial, metric, fieldNotes, closing } =
    servicesContent;

  return (
    <>
      <JsonLd pathname={ROUTES.services} pageTitle={pageTitle} pageDescription={pageDescription} />

      <section
        className="hero-gradient b-line relative overflow-hidden border-b py-14 sm:py-20"
        id="hero"
      >
        <div className="hero-weave" aria-hidden="true" />
        <div className={`${CONTAINER} relative`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <p className="font-mono-eyebrow t-accent mb-4" data-reveal>
                {hero.eyebrow}
              </p>
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
              <div className="mt-8 flex flex-wrap gap-3" data-reveal data-reveal-delay="2">
                <BriefingButton topic={hero.briefingTopic} />
                <Link
                  className="border-foreground/25 t-fg hover:border-foreground/45 hover:bg-foreground/5 inline-flex items-center justify-center rounded-full border bg-transparent px-6 py-3 text-sm font-semibold transition-all duration-200"
                  href={hero.secondaryCta.href}
                  data-magnet="4"
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <OrbitPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{practices.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {practices.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {practices.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {practices.cards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                className="content-card group v4-spot flex flex-col rounded-xl p-6"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="bg-chip t-accent inline-flex h-9 w-9 items-center justify-center rounded-lg">
                  <Glyph name={card.icon} className="h-4 w-4" />
                </span>
                <h3 className="font-display t-fg group-hover:t-accent mt-4 text-lg font-bold transition-colors">
                  {card.title}
                </h3>
                <p className="t-muted mt-2 text-sm leading-relaxed">{card.text}</p>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span key={tag} className="cap-tag">
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="t-accent mt-4 inline-flex items-center gap-1 text-xs font-semibold">
                  Explore <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light b-line scroll-mt-24 border-y py-16 sm:py-20" id="flagships">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{flagships.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {flagships.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {flagships.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {flagships.cards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                className="content-card group v4-spot flex flex-col rounded-2xl p-6 sm:p-7"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="flex items-center gap-3">
                  <span className="bg-chip t-accent inline-flex h-11 w-11 items-center justify-center rounded-xl">
                    <Glyph name={card.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="font-display t-fg group-hover:t-accent block text-lg font-bold transition-colors sm:text-xl">
                      {card.title}
                    </span>
                    <span className="font-mono-eyebrow t-muted mt-1 block">{card.subtitle}</span>
                  </span>
                </span>
                <span className="t-muted mt-4 block text-sm leading-relaxed">{card.text}</span>
                <span className="mt-5 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span key={tag} className="cap-tag">
                      {tag}
                    </span>
                  ))}
                </span>
                <span className="t-accent mt-5 inline-flex items-center gap-1 text-xs font-semibold">
                  {card.cta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{agentic.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {agentic.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {agentic.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agentic.cards.map((card, i) => (
              <div
                key={card.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="bg-chip t-accent mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg">
                  <Glyph name={card.icon} className="h-4 w-4" />
                </span>
                <h3 className="font-display t-fg text-sm font-bold">{card.title}</h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8" data-reveal>
            <Link
              data-magnet="4"
              className="btn-glow border-accent-interactive bg-accent-interactive text-accent-foreground hover:border-accent-on-light-hover hover:bg-accent-on-light-hover inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold shadow-[0_0_28px_rgb(0_122_133/0.35)] transition-all duration-200"
              href={agentic.cta.href}
            >
              {agentic.cta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{commercial.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {commercial.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {commercial.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {commercial.cards.map((card, i) => (
              <div
                key={card.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <h3 className="font-display t-fg text-sm font-bold">{card.title}</h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light b-line border-y py-16 sm:py-20">
        <div className={CONTAINER}>
          <div
            className="metric-callout mt-8 grid items-center gap-8 rounded-2xl p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:gap-14"
            data-reveal
          >
            <div className="min-w-0">
              <p className="font-mono-eyebrow t-accent mb-3">{metric.eyebrow}</p>
              <h3 className="font-display t-fg text-xl font-bold sm:text-2xl">{metric.title}</h3>
              <p className="t-muted mt-3 max-w-xl text-sm leading-relaxed">{metric.text}</p>
              <Link
                href={metric.link.href}
                className="t-accent hover:t-fg mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                {metric.link.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="metric-callout-figure shrink-0">
              <p className="font-display t-accent text-5xl font-bold sm:text-6xl">
                {metric.figure}
              </p>
              <p className="t-fg mt-2 text-sm font-semibold">{metric.figureLabel}</p>
              <p className="t-muted mt-1 max-w-[16rem] text-xs leading-relaxed">
                {metric.figureNote}
              </p>
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fieldNotes.notes.map((note, i) => (
              <Link
                key={note.title}
                href={fieldNotes.href}
                className="res-card content-card group v4-spot flex flex-col overflow-hidden rounded-xl"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="res-band" aria-hidden="true">
                  <span className="res-kind">Field note</span>
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="font-display t-fg group-hover:t-accent text-sm font-bold transition-colors">
                    {note.title}
                  </span>
                  <span className="t-muted mt-1.5 text-xs leading-relaxed">{note.text}</span>
                  <span className="t-accent mt-4 inline-flex items-center gap-1 text-xs font-semibold">
                    {fieldNotes.noteCta} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Stage calm className="py-16 sm:py-20">
        <div className={`${CONTAINER} relative`}>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div data-reveal>
              <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                {closing.title}
              </h2>
            </div>
            <div data-reveal data-reveal-delay="1">
              <BriefingButton topic={closing.topic} />
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

import { KineticHeading } from '@/components/motion/KineticHeading';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { CommandPaletteCue } from '@/components/ui/CommandPaletteCue';
import { Glyph } from '@/components/ui/Glyph';
import { GovernanceTrailPanel } from '@/components/viz/panels/GovernanceTrailPanel';
import { RiskGraphPanel } from '@/components/viz/panels/RiskGraphPanel';
import { homeContent } from '@/config/content/home';
import { siteConfig } from '@/config/site';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = `${siteConfig.name} — ${siteConfig.tagline}`;
const pageDescription = siteConfig.seoDescription;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.home,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function HomePage() {
  const { hero, capabilities, solutions, governance, impact, fieldNotes, closing } = homeContent;

  return (
    <>
      <JsonLd pathname={ROUTES.home} pageTitle={pageTitle} pageDescription={pageDescription} />

      {/* Hero — the lit stage with the signal field and the risk graph. */}
      <Stage id="hero" aurora net className="b-line border-b">
        <div className="v4-shell relative pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <p className="v4-eyebrow">
                <b aria-hidden="true" />
                {hero.eyebrow}
              </p>

              <KineticHeading
                as="h1"
                className="font-display mt-6 text-4xl leading-[1.06] font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-[length:var(--text-fs-hero)]"
              >
                {hero.title.lead}
                <span className="v4-lit">{hero.title.lit}</span>
                {hero.title.tail}
              </KineticHeading>

              <p
                className="mt-6 max-w-xl text-[length:var(--text-fs-lede)] text-pretty text-white/70"
                data-reveal
              >
                {hero.description}
              </p>

              <div
                className="mt-9 flex flex-wrap items-center gap-3"
                data-reveal
                data-reveal-delay="1"
              >
                <BriefingButton topic="Home hero" />
                <Link
                  className="v4-btn v4-btn--ghost"
                  href={hero.secondaryCta.href}
                  data-magnet="4"
                >
                  <span>{hero.secondaryCta.label}</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>

              <dl
                className="mt-10 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3"
                data-reveal
                data-reveal-delay="2"
              >
                {hero.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono-eyebrow text-white/45">{fact.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-white/85">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <CommandPaletteCue />
            </div>

            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <div className="v4-brackets">
                <RiskGraphPanel />
              </div>
              <div className="v4-glass mt-4 grid grid-cols-3 gap-2 p-3">
                {hero.glassStrip.map((item) => (
                  <div key={item.label}>
                    <p className="font-mono-eyebrow text-white/45">{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Stage>

      {/* Capability chips. */}
      <section className="section-white b-line border-b py-14 sm:py-16">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="v4-head" data-reveal>
              <p className="font-mono-eyebrow t-accent">{capabilities.eyebrow}</p>
              <KineticHeading as="h2" className="mt-3 text-[length:var(--text-fs-h2)]">
                {capabilities.title}
              </KineticHeading>
            </div>
            <p
              className="t-muted max-w-md text-sm leading-relaxed"
              data-reveal
              data-reveal-delay="1"
            >
              {capabilities.aside}
            </p>
          </div>
          <ul className="mt-9 flex flex-wrap gap-2.5" data-reveal data-reveal-delay="1">
            {capabilities.chips.map((chip) => (
              <li key={chip.label} className="v4-mq-item">
                <Glyph name={chip.icon} className="h-3.5 w-3.5" />
                {chip.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The four solutions. */}
      <section className="section-light b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{solutions.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {solutions.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {solutions.lede}
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.cards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                className="content-card group v4-spot flex flex-col rounded-2xl p-6"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="bg-chip t-accent inline-flex h-11 w-11 items-center justify-center rounded-2xl">
                  <Glyph name={card.icon} />
                </span>
                <h3 className="font-display t-fg group-hover:t-accent mt-4 text-base font-bold transition-colors">
                  {card.title}
                </h3>
                <p className="t-muted mt-2 text-sm leading-relaxed">{card.text}</p>
                <span className="t-accent mt-4 inline-flex items-center gap-1 text-xs font-semibold">
                  {solutions.cardCta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8" data-reveal data-reveal-delay="1">
            <Link
              data-magnet="4"
              className="btn-glow border-accent-interactive bg-accent-interactive text-accent-foreground hover:border-accent-on-light-hover hover:bg-accent-on-light-hover inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold shadow-[0_0_28px_rgb(0_122_133/0.35)] transition-all duration-200"
              href={solutions.cta.href}
            >
              {solutions.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Governance — copy beside the decision-trail panel, four cards below. */}
      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <div className="max-w-2xl" data-reveal>
                <p className="font-mono-eyebrow t-accent mb-3">{governance.eyebrow}</p>
                <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                  {governance.title}
                </h2>
                <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
                  {governance.lede}
                </p>
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="1">
              <GovernanceTrailPanel />
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {governance.cards.map((card, i) => (
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
        </div>
      </section>

      {/* Proof wall. */}
      <section id="impact" className="section-light b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="v4-head" data-reveal>
              <p className="font-mono-eyebrow t-accent">{impact.eyebrow}</p>
              <KineticHeading as="h2" className="mt-3">
                {impact.title}
              </KineticHeading>
              <p>{impact.lede}</p>
            </div>
            <Link
              className="v4-btn v4-btn--ghost"
              href={impact.cta.href}
              data-reveal
              data-reveal-delay="1"
            >
              <span>{impact.cta.label}</span>
              <span className="v4-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="v4-wall mt-10">
            {impact.proofs.map((proof, i) => (
              <article
                key={proof.sector}
                className="v4-proof v4-spot"
                data-reveal
                data-reveal-delay={i}
              >
                <p className="v4-proof-top">
                  {proof.sector}
                  <span>{proof.org}</span>
                </p>
                <h3>{proof.heading}</h3>
                <p className="v4-proof-fig">
                  {proof.figure}
                  <em>{proof.unit}</em>
                </p>
                <p>{proof.text}</p>
                <p>
                  <Link
                    className="t-accent inline-flex items-center gap-1.5 text-sm font-semibold"
                    href={proof.link.href}
                  >
                    {proof.link.label}{' '}
                    <span className="v4-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </p>
              </article>
            ))}
          </div>

          <p className="t-muted mt-6 text-xs">{impact.footnote}</p>
        </div>
      </section>

      {/* Field notes. */}
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

      {/* Calm closing band. */}
      <Stage calm className="py-16 sm:py-24">
        <div className="v4-shell relative">
          <div className="v4-rim">
            <div className="v4-glass v4-spot grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
              <div>
                <p className="v4-eyebrow">
                  <b aria-hidden="true" />
                  {closing.eyebrow}
                </p>
                <KineticHeading
                  as="h2"
                  className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  {closing.title}
                </KineticHeading>
                <p className="mt-4 max-w-xl text-white/70">{closing.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <BriefingButton topic="Home closing band" />
                  <Link
                    className="v4-btn v4-btn--ghost"
                    href={closing.secondaryCta.href}
                    data-magnet="4"
                  >
                    <span>
                      <Glyph name="mail" className="h-[15px] w-[15px]" strokeWidth={1.7} />
                    </span>
                    <span>{closing.secondaryCta.label}</span>
                  </Link>
                </div>
                <p className="v4-sig mt-8">
                  {closing.signature.map((item) => (
                    <span key={item} className="contents">
                      <span>{item}</span>
                      <span>·</span>
                    </span>
                  ))}
                  <span>
                    {closing.signatureOverlap.prefix}{' '}
                    {closing.signatureOverlap.regions.map((region, i) => (
                      <span key={region} className="contents">
                        <b>{region}</b>
                        {i < closing.signatureOverlap.regions.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
              <dl className="grid content-start gap-3">
                {closing.cards.map((card) => (
                  <div key={card.label} className="v4-card v4-spot border-white/12 p-4">
                    <dt className="font-mono-eyebrow text-white/45">{card.label}</dt>
                    <dd className="mt-1.5 text-sm text-white/80">
                      {card.text}{' '}
                      <Link
                        className="t-accent mt-2 inline-flex items-center gap-1.5 font-semibold"
                        href={card.link.href}
                      >
                        {card.link.label}{' '}
                        <span className="v4-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

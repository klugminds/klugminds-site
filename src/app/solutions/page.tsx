import type { Metadata } from 'next';
import Link from 'next/link';

import { SubNav } from '@/components/layout/SubNav';
import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { Glyph } from '@/components/ui/Glyph';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { CataloguePanel } from '@/components/viz/panels/CataloguePanel';
import { StackPanel } from '@/components/viz/panels/StackPanel';
import { solutionsContent } from '@/config/content/solutions';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Solutions';
const pageDescription =
  'Four production financial-crime models — fraud detection, AML monitoring, iGaming integrity, and responsible gaming — each with a reference architecture, explainability layer, and monitoring plane.';

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.solutions,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function SolutionsPage() {
  const { hero, subNav, catalogue, stack, engage, closing } = solutionsContent;

  return (
    <>
      <JsonLd pathname={ROUTES.solutions} pageTitle={pageTitle} pageDescription={pageDescription} />

      <section
        className="hero-gradient b-line relative overflow-hidden border-b py-14 sm:py-20"
        id="hero"
      >
        <div className="hero-weave" aria-hidden="true" />
        <div className={`${CONTAINER} relative`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <Link
                href={hero.chip.href}
                className="cap-chip mb-6 inline-flex items-center gap-2.5 rounded-full border py-1 pr-3.5 pl-1 text-sm"
                data-reveal
              >
                <span className="bg-accent-interactive inline-flex rounded-full px-2 py-0.5 text-[0.625rem] font-bold tracking-wide text-white uppercase">
                  {hero.chip.badge}
                </span>
                <span className="t-muted">{hero.chip.text}</span>
              </Link>

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
                <Link
                  data-magnet="4"
                  className="btn-glow border-accent-interactive bg-accent-interactive text-accent-foreground hover:border-accent-on-light-hover hover:bg-accent-on-light-hover inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold shadow-[0_0_28px_rgb(0_122_133/0.35)] transition-all duration-200"
                  href={hero.primaryCta.href}
                >
                  {hero.primaryCta.label}
                </Link>
                <BriefingButton topic="Solutions hero" label={hero.briefingLabel} />
              </div>
            </div>

            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <CataloguePanel />
            </div>
          </div>
        </div>
      </section>

      <SubNav links={subNav} />

      <section className="section-white b-line scroll-mt-24 border-b py-16 sm:py-20" id="catalogue">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{catalogue.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {catalogue.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {catalogue.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {catalogue.cards.map((card, i) => (
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
                <h3 className="font-display t-fg group-hover:t-accent mt-4 text-lg font-bold transition-colors">
                  {card.title}
                </h3>
                <p className="t-muted mt-2 text-sm leading-relaxed">{card.text}</p>
                <span className="t-accent mt-4 inline-flex items-center gap-1 text-xs font-semibold">
                  {catalogue.cardCta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="section-light b-line border-y py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0" data-reveal>
              <p className="font-mono-eyebrow t-accent mb-3">{stack.eyebrow}</p>
              <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                {stack.title}
              </h2>
              <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
                {stack.lede}
              </p>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="1">
              <StackPanel />
            </div>
          </div>
        </div>
      </section>

      <section id="engage" className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{engage.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {engage.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {engage.lede}
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {engage.cards.map((card, i) => (
              <div
                key={card.title}
                className="content-card v4-spot rounded-2xl p-6"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <h3 className="font-display t-fg text-base font-bold">{card.title}</h3>
                <p className="t-muted mt-2 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stage calm className="py-16 sm:py-20">
        <div className="v4-shell relative">
          <div className="v4-rim">
            <div className="v4-glass v4-spot flex flex-col items-start justify-between gap-8 p-6 sm:p-10 md:flex-row md:items-center">
              <div data-reveal>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                  {closing.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
                  {closing.text}
                </p>
              </div>
              <div data-reveal data-reveal-delay="1">
                <BriefingButton topic="Solutions closing" label={closing.ctaLabel} />
              </div>
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

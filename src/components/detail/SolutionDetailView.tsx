import Link from 'next/link';

import { Checklist } from '@/components/detail/Checklist';
import { ComparisonBlock } from '@/components/detail/ComparisonBlock';
import { DetailBreadcrumb } from '@/components/detail/DetailBreadcrumb';
import { NumberedCards } from '@/components/detail/NumberedCards';
import { DemoPlayer } from '@/components/demo/DemoPlayer';
import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { Stage } from '@/components/stage/Stage';
import { VizPanel } from '@/components/viz/panels';
import { SOLUTION_DEMOS } from '@/config/content/demos';
import {
  SOLUTION_PARENT,
  solutionRelatedHref,
  type SolutionDetail,
} from '@/config/content/product-details';
import { ROUTES } from '@/constants/routes';

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

type SolutionDetailViewProps = {
  detail: SolutionDetail;
};

export function SolutionDetailView({ detail }: SolutionDetailViewProps) {
  const demo = SOLUTION_DEMOS[detail.slug];

  return (
    <>
      <section
        className="hero-gradient b-line relative overflow-hidden border-b py-14 sm:py-20"
        id="hero"
      >
        <div className="hero-weave" aria-hidden="true" />
        <div className="bg-brand/20 animate-float-slow pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-accent/15 animate-float-slower pointer-events-none absolute top-1/3 -left-16 h-56 w-56 rounded-full blur-3xl" />
        <div className={`${CONTAINER} relative`}>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <DetailBreadcrumb
                crumbs={[
                  { label: 'Home', href: ROUTES.home },
                  SOLUTION_PARENT,
                  { label: detail.title },
                ]}
              />
              <p className="font-mono-eyebrow t-accent mb-4">{detail.family}</p>
              <KineticHeading
                as="h1"
                className="font-display t-fg text-3xl leading-[1.12] font-bold tracking-tight text-balance sm:text-4xl lg:text-[length:var(--text-fs-h1)]"
              >
                {detail.title}
              </KineticHeading>
              <p
                className="t-muted mt-6 max-w-xl text-[length:var(--text-fs-lede)] text-pretty"
                data-reveal
                data-reveal-delay="1"
              >
                {detail.lede}
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal data-reveal-delay="2">
                <BriefingButton topic={detail.title} />
                <Link className="v4-btn v4-btn--ghost" href={ROUTES.solutions}>
                  <span>All solutions</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <VizPanel kind={detail.graphic} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-10 sm:py-12">
        <div className={CONTAINER}>
          <div className="grid gap-8 sm:grid-cols-3">
            {detail.outcomes.map((outcome, i) => (
              <div key={outcome.label} data-reveal data-reveal-delay={i || undefined}>
                <p className="font-display t-accent text-3xl font-bold sm:text-4xl">
                  {outcome.value}
                </p>
                <p className="t-fg mt-1.5 text-sm font-semibold">{outcome.label}</p>
                <p className="t-muted mt-1 text-xs leading-relaxed">{outcome.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light b-line border-y py-16 sm:py-20">
        <div className={CONTAINER}>
          {detail.graphic2 ? (
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="min-w-0">
                <p className="font-mono-eyebrow t-accent mb-3">{detail.capabilities.eyebrow}</p>
                <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl">
                  {detail.capabilities.heading}
                </h2>
                <p className="t-muted mt-4 text-base leading-relaxed">
                  {detail.capabilities.intro}
                </p>
                <div className="mt-7">
                  <Checklist items={detail.capabilities.items} />
                </div>
              </div>
              <div className="min-w-0" data-reveal data-reveal-delay="1">
                <VizPanel kind={detail.graphic2} />
              </div>
            </div>
          ) : (
            <>
              <div className="max-w-3xl" data-reveal>
                <p className="font-mono-eyebrow t-accent mb-3">{detail.capabilities.eyebrow}</p>
                <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl">
                  {detail.capabilities.heading}
                </h2>
                <p className="t-muted mt-4 text-base leading-relaxed">
                  {detail.capabilities.intro}
                </p>
              </div>
              <NumberedCards items={detail.capabilities.items} />
            </>
          )}
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <ComparisonBlock heading={detail.comparison.heading} pairs={detail.comparison.pairs} />
        </div>
      </section>

      <section id="demo" className="v4-cine b-line border-y">
        <div className="v4-cine-media">
          <DemoPlayer {...demo} autoplay background />
        </div>
        <div className="v4-cine-body">
          <div className={CONTAINER}>
            <div className="v4-cine-copy" data-reveal>
              <p className="v4-eyebrow">
                <b aria-hidden="true" />
                Watch it work
              </p>
              <KineticHeading
                as="h2"
                className="font-display mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              >
                {demo.posterTitle}
              </KineticHeading>
              <p className="mt-4 text-pretty text-white/75">{demo.posterBody}</p>
              <p className="mt-4 text-xs leading-relaxed text-white/50">
                It plays as you read. Captions are real text and can be turned off; every figure is
                illustrative, the same rule the interactive panels follow.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <BriefingButton topic={demo.title} label="See it on your own data" />
                <Link className="v4-btn v4-btn--ghost" href={ROUTES.solutions}>
                  <span>All four models</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl">
              Related solutions
            </h2>
            <Link href={ROUTES.solutions} className="t-accent hover:t-fg text-sm font-semibold">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.related.map((item, i) => (
              <Link
                key={item.slug}
                href={solutionRelatedHref(item.slug)}
                className="content-card group v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <h3 className="font-display t-fg group-hover:t-accent text-sm font-bold transition-colors">
                  {item.title}
                </h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{item.text}</p>
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
                {detail.ctaHeading}
              </h2>
              <p className="t-muted mt-3 max-w-xl text-sm leading-relaxed">
                Thirty minutes with the engineer who builds it — not a business-development lead.
              </p>
            </div>
            <div data-reveal data-reveal-delay="1">
              <BriefingButton topic={detail.title} />
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

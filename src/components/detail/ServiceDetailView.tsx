import Link from 'next/link';

import { ComparisonBlock } from '@/components/detail/ComparisonBlock';
import { DetailBreadcrumb } from '@/components/detail/DetailBreadcrumb';
import { EngagementGrid } from '@/components/detail/EngagementGrid';
import { NumberedCards } from '@/components/detail/NumberedCards';
import { TopicExplorer } from '@/components/detail/TopicExplorer';
import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { Stage } from '@/components/stage/Stage';
import { VizPanel } from '@/components/viz/panels';
import {
  ENGAGEMENT_DELIVERABLES,
  SERVICE_PARENT,
  serviceRelatedHref,
  type ServiceDetail,
} from '@/config/content/product-details';
import { ROUTES } from '@/constants/routes';

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

type ServiceDetailViewProps = {
  detail: ServiceDetail;
};

export function ServiceDetailView({ detail }: ServiceDetailViewProps) {
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
                  SERVICE_PARENT,
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
                <Link className="v4-btn v4-btn--ghost" href={ROUTES.services}>
                  <span>All services</span>
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
          <div className="max-w-3xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{detail.capabilities.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl">
              {detail.capabilities.heading}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed">{detail.capabilities.intro}</p>
          </div>
          <NumberedCards items={detail.capabilities.items} />
        </div>
      </section>

      {detail.sections?.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="section-light b-line scroll-mt-24 border-y py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="max-w-3xl" data-reveal>
              <p className="font-mono-eyebrow t-accent mb-3">{section.eyebrow}</p>
              <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                {section.heading}
              </h2>
              <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
                {section.lede}
              </p>
            </div>
            <TopicExplorer id={section.id} label={section.label} topics={section.topics} />
          </div>
        </section>
      ))}

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <ComparisonBlock heading={detail.comparison.heading} pairs={detail.comparison.pairs} />
        </div>
      </section>

      {detail.extra ? (
        <section className="section-light b-line border-b py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl" data-reveal>
              <p className="font-mono-eyebrow t-accent mb-3">{detail.extra.eyebrow}</p>
              <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                {detail.extra.heading}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {detail.extra.rows.map((row, i) => (
                <div
                  key={row.title}
                  className="content-card v4-spot rounded-xl p-5"
                  data-reveal
                  data-reveal-delay={i || undefined}
                >
                  <h3 className="font-display t-fg text-sm font-bold">{row.title}</h3>
                  <p className="t-muted mt-1.5 text-xs leading-relaxed">{row.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">WHAT IT SHIPS WITH</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              Six things every engagement leaves behind.
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed">
              Whichever practice you start with, this is the deliverable list.
            </p>
          </div>
          <EngagementGrid items={ENGAGEMENT_DELIVERABLES} />
        </div>
      </section>

      <section className="section-light b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl">
              Related services
            </h2>
            <Link href={ROUTES.services} className="t-accent hover:t-fg text-sm font-semibold">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {detail.related.map((item, i) => (
              <Link
                key={item.slug}
                href={serviceRelatedHref(item.slug)}
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

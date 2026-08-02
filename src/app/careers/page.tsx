import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { KineticHeading } from '@/components/motion/KineticHeading';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { PodPanel } from '@/components/viz/panels/PodPanel';
import { careersContent } from '@/config/content/careers';
import { pageImages } from '@/config/images';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Careers';
const pageDescription =
  'Join Klugminds — senior-led AI, data, and engineering roles building production machine learning for regulated industries, delivered from Bengaluru.';

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.careers,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const CARD_ICONS = [
  <svg
    key="flag"
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
  <svg
    key="eye"
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
      d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>,
];

export default function CareersPage() {
  const { hero, working, roles, pod, offer, cta } = careersContent;

  return (
    <>
      <JsonLd pathname={ROUTES.careers} pageTitle={pageTitle} pageDescription={pageDescription} />

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
                <Link className="v4-btn v4-btn--primary" href={hero.ctaHref}>
                  <span>{hero.ctaLabel}</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <div data-clip className="media-frame aspect-[4/3] sm:aspect-[3/2]">
                <Image
                  src={pageImages.careers.src}
                  alt={pageImages.careers.alt}
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
          <div className="max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{working.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {working.title}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {working.items.map((item, i) => (
              <div
                key={item.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
                <span className="bg-chip t-accent mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg">
                  {CARD_ICONS[i]}
                </span>
                <h3 className="font-display t-fg text-sm font-bold">{item.title}</h3>
                <p className="t-muted mt-1.5 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 max-w-2xl" data-reveal>
            <p className="font-mono-eyebrow t-accent mb-3">{roles.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {roles.title}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.items.map((item, i) => (
              <div
                key={item.title}
                className="content-card v4-spot rounded-xl p-5"
                data-reveal
                data-reveal-delay={i || undefined}
              >
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
            <div className="min-w-0">
              <div className="max-w-2xl" data-reveal>
                <p className="font-mono-eyebrow t-accent mb-3">{pod.eyebrow}</p>
                <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                  {pod.title}
                </h2>
                <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
                  {pod.lede}
                </p>
              </div>
              <div className="mt-14 max-w-2xl" data-reveal>
                <p className="font-mono-eyebrow t-accent mb-3">{offer.eyebrow}</p>
                <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
                  {offer.title}
                </h2>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {offer.items.map((item, i) => (
                  <div
                    key={item.title}
                    className="content-card v4-spot rounded-xl p-5"
                    data-reveal
                    data-reveal-delay={i || undefined}
                  >
                    <h3 className="font-display t-fg text-sm font-bold">{item.title}</h3>
                    <p className="t-muted mt-1.5 text-xs leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="1">
              <PodPanel />
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
              <p className="t-muted mt-3 max-w-xl text-sm leading-relaxed">{cta.description}</p>
            </div>
            <div data-reveal data-reveal-delay="1">
              <Link className="v4-btn v4-btn--primary" href={cta.ctaHref}>
                <span>{cta.ctaLabel}</span>
                <span className="v4-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { IndustryExplorer } from '@/components/detail/IndustryExplorer';
import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { industriesContent } from '@/config/content/industries';
import { pageImages } from '@/config/images';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Industries';
const pageDescription =
  'Specialist AI delivery for fintech, iGaming, e-commerce, logistics, and healthcare — fraud, AML, credit risk, and operational models built by practitioners who know the domain.';

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.industries,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function IndustriesPage() {
  const { hero, explorer, cta } = industriesContent;

  return (
    <>
      <JsonLd
        pathname={ROUTES.industries}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />

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
              <div className="mt-8 flex flex-wrap gap-3" data-reveal data-reveal-delay="2">
                <BriefingButton topic="Industries hero" />
                <Link className="v4-btn v4-btn--ghost" href={ROUTES.solutions}>
                  <span>See the solutions</span>
                  <span className="v4-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </div>
            <div className="min-w-0" data-reveal data-reveal-delay="2">
              <div data-clip className="media-frame aspect-[4/3] sm:aspect-[3/2]">
                <Image
                  src={pageImages.industries.src}
                  alt={pageImages.industries.alt}
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
            <p className="font-mono-eyebrow t-accent mb-3">{explorer.eyebrow}</p>
            <h2 className="font-display t-fg text-2xl font-bold tracking-tight sm:text-3xl lg:text-[length:var(--text-fs-h2)]">
              {explorer.title}
            </h2>
            <p className="t-muted mt-4 text-base leading-relaxed sm:text-[length:var(--text-fs-lede)]">
              {explorer.lede}
            </p>
          </div>
          <IndustryExplorer label="Industries" industries={explorer.tabs} />
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
              <BriefingButton topic="Industries closing" />
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

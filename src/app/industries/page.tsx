import type { Metadata } from 'next';

import { CtaSection } from '@/components/marketing/CtaSection';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { ContentVisualSection } from '@/components/marketing/ContentVisualSection';
import { IndustryGrid } from '@/components/marketing/IndustryGrid';
import { PageHero } from '@/components/marketing/PageHero';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { industriesContent } from '@/config/content/industries';
import { resolveIndustryIcon } from '@/config/icons/industry-icons';
import { industryPageVisual, pageVisuals, type IndustryVisualId } from '@/config/images/page-visuals';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Industries';
const pageDescription = industriesContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.industries,
  title: pageTitle,
  description: pageDescription,
});

export default function IndustriesPage() {
  const { hero, industries, domains, cta } = industriesContent;

  return (
    <>
      <JsonLd
        pathname={ROUTES.industries}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visual={pageVisuals.industries.hero}
      />

      <Section>
        <Container>
          <SectionHeader title={domains.title} description={domains.description} />
          <IndustryGrid items={domains.items} />
        </Container>
      </Section>

      {industries.map((industry, index) => (
        <Section key={industry.id} id={industry.id} variant={index % 2 === 0 ? 'muted' : 'default'}>
          <Container>
            <ContentVisualSection
              visual={industryPageVisual(industry.id as IndustryVisualId)}
              reverse={index % 2 === 1}
            >
              <SectionHeader title={industry.title} description={industry.problemShape} />
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h3 className="font-mono-eyebrow text-accent-muted">What we build here</h3>
                  <ul className="text-muted mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
                    {industry.builds.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-accent-muted mt-1">
                          ▲
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ContentCard
                  glow={cardGlowAt(index + 1)}
                  icon={resolveIndustryIcon(industry.title)}
                  eyebrow="Why clients choose Klugminds"
                  description={industry.whyUs}
                />
              </div>
              {industry.regulatoryContext || industry.integrations ? (
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  {industry.regulatoryContext ? (
                    <ContentCard
                      glow="brand"
                      eyebrow="Regulatory context"
                      description={industry.regulatoryContext}
                    />
                  ) : null}
                  {industry.integrations ? (
                    <div>
                      <h3 className="font-mono-eyebrow text-accent-muted">How it fits your stack</h3>
                      <ul className="text-muted mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
                        {industry.integrations.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden="true" className="text-accent-muted mt-1">
                              ▲
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </ContentVisualSection>
          </Container>
        </Section>
      ))}

      <CtaSection
        title={cta.title}
        description={cta.description}
        cta={cta.cta}
        variant="gradient"
      />
    </>
  );
}

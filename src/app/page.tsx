import type { Metadata } from 'next';

import { CaseStudyCards } from '@/components/marketing/CaseStudyCards';
import { CredibilityStrip } from '@/components/marketing/CredibilityStrip';
import { CtaSection } from '@/components/marketing/CtaSection';
import { ContentVisualSection } from '@/components/marketing/ContentVisualSection';
import { GlobalFootprint } from '@/components/marketing/GlobalFootprint';
import { IndustryGrid } from '@/components/marketing/IndustryGrid';
import { PageHero } from '@/components/marketing/PageHero';
import { PartnerMarquee } from '@/components/marketing/PartnerMarquee';
import { ProofPoints } from '@/components/marketing/ProofPoints';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { TwoWaysSection } from '@/components/marketing/TwoWaysSection';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { homeContent } from '@/config/content/home';
import { pageVisuals } from '@/config/images/page-visuals';
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

export default function HomePage() {
  const {
    hero,
    credibility,
    twoWays,
    industries,
    proofPoints,
    caseStudies,
    footprint,
    partners,
    contact,
  } = homeContent;

  return (
    <>
      <JsonLd pathname={ROUTES.home} pageTitle={pageTitle} pageDescription={pageDescription} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visualVariant="capabilities"
      >
        <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
        <ButtonLink href={hero.secondaryCta.href} variant="outline">
          {hero.secondaryCta.label}
        </ButtonLink>
      </PageHero>

      <CredibilityStrip text={credibility.text} />

      <Section variant="light" className="border-t border-[var(--section-light-border)]">
        <Container>
          <TwoWaysSection
            eyebrow={twoWays.eyebrow}
            title={twoWays.title}
            products={twoWays.products}
            services={twoWays.services}
          />
        </Container>
      </Section>

      <Section variant="muted" id={industries.id}>
        <Container>
          <SectionHeader
            eyebrow={industries.eyebrow}
            title={industries.title}
            align="center"
            className="mx-auto"
          />
          <IndustryGrid items={industries.items} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow={proofPoints.eyebrow}
            title={proofPoints.title}
            align="center"
            className="mx-auto"
          />
          <ProofPoints items={proofPoints.items} />
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <PartnerMarquee eyebrow={partners.eyebrow} partners={partners.items} />
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <SectionHeader
            eyebrow={caseStudies.eyebrow}
            title={caseStudies.title}
            description={caseStudies.description}
            align="center"
            tone="light"
            className="mx-auto"
          />
          <CaseStudyCards items={caseStudies.items} />
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <ContentVisualSection visual={pageVisuals.home.delivery} reverse>
            <SectionHeader
              eyebrow={footprint.eyebrow}
              title={footprint.title}
              className="mb-6 sm:mb-8"
            />
            <GlobalFootprint regions={footprint.regions} caption={footprint.caption} />
          </ContentVisualSection>
        </Container>
      </Section>

      <CtaSection
        id="contact"
        title={contact.title}
        description={contact.description}
        cta={contact.primaryCta}
        secondaryCta={contact.secondaryCta}
        variant="gradient"
      />
    </>
  );
}

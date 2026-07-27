import type { Metadata } from 'next';

import { CtaSection } from '@/components/marketing/CtaSection';
import { ContentVisualSection } from '@/components/marketing/ContentVisualSection';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { PageHero } from '@/components/marketing/PageHero';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { servicesContent } from '@/config/content/services';
import { pageVisuals } from '@/config/images/page-visuals';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Services';
const pageDescription = servicesContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.services,
  title: pageTitle,
  description: pageDescription,
});

export default function ServicesPage() {
  const { hero, practices, staffing, commercial, cta } = servicesContent;

  return (
    <>
      <JsonLd pathname={ROUTES.services} pageTitle={pageTitle} pageDescription={pageDescription} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visual={pageVisuals.services.hero}
      />

      <Section>
        <Container>
          <SectionHeader eyebrow={practices.eyebrow} title={practices.title} />
          <FeatureGrid items={practices.items} columns={2} />
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <ContentVisualSection visual={pageVisuals.services.delivery} reverse>
            <SectionHeader
              eyebrow={staffing.eyebrow}
              title={staffing.title}
              description={staffing.description}
            />
          </ContentVisualSection>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow={commercial.eyebrow}
            title={commercial.title}
          />
          <FeatureGrid items={commercial.items} columns={2} />
        </Container>
      </Section>

      <CtaSection title={cta.title} cta={cta.cta} variant="gradient" />
    </>
  );
}

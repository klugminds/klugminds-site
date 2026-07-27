import type { Metadata } from 'next';

import { CareersHeroVisual } from '@/components/marketing/CareersHeroVisual';
import { CtaSection } from '@/components/marketing/CtaSection';
import { ContentVisualSection } from '@/components/marketing/ContentVisualSection';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { LocationGrid } from '@/components/marketing/LocationGrid';
import { PageHero } from '@/components/marketing/PageHero';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { careersContent } from '@/config/content/careers';
import { pageVisuals } from '@/config/images/page-visuals';
import { mailtoLinks } from '@/lib/mailto';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Careers';
const pageDescription = careersContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.careers,
  title: pageTitle,
  description: pageDescription,
});

export default function CareersPage() {
  const { hero, culture, roles, locations, benefits, cta } = careersContent;

  return (
    <>
      <JsonLd pathname={ROUTES.careers} pageTitle={pageTitle} pageDescription={pageDescription} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visualVariant="aside"
        aside={
          <CareersHeroVisual roles={roles.items} locationsDescription={locations.description} />
        }
      >
        <ButtonLink href={mailtoLinks.careers()}>{cta.cta.label}</ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader eyebrow={culture.eyebrow} title={culture.title} />
          <FeatureGrid items={culture.items} columns={2} />
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <SectionHeader eyebrow={roles.eyebrow} title={roles.title} />
          <FeatureGrid items={roles.items} columns={2} />
        </Container>
      </Section>

      <Section>
        <Container>
          <ContentVisualSection visual={pageVisuals.careers.culture}>
            <SectionHeader
              eyebrow={locations.eyebrow}
              title={locations.title}
              description={locations.description}
            />
            <LocationGrid items={locations.items} columns={2} className="mt-6" />
          </ContentVisualSection>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <SectionHeader eyebrow={benefits.eyebrow} title={benefits.title} />
          <FeatureGrid items={benefits.items} columns={2} />
        </Container>
      </Section>

      <CtaSection
        title={cta.title}
        description={cta.description}
        cta={cta.cta}
        variant="gradient"
      />
    </>
  );
}

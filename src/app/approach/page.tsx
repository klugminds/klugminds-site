import type { Metadata } from 'next';

import { CtaSection } from '@/components/marketing/CtaSection';
import { PageHero } from '@/components/marketing/PageHero';
import { PrinciplesSection } from '@/components/marketing/PrinciplesSection';
import { ProcessSteps } from '@/components/marketing/ProcessSteps';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { approachContent } from '@/config/content/approach';
import { pageVisuals } from '@/config/images/page-visuals';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Approach';
const pageDescription = approachContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.approach,
  title: pageTitle,
  description: pageDescription,
});

export default function ApproachPage() {
  const { hero, engagement, principles, cta } = approachContent;

  return (
    <>
      <JsonLd pathname={ROUTES.approach} pageTitle={pageTitle} pageDescription={pageDescription} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visual={pageVisuals.approach.hero}
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow={engagement.eyebrow}
            title={engagement.title}
            description={engagement.description}
          />
          <ProcessSteps steps={engagement.steps} />
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <PrinciplesSection
            eyebrow={principles.eyebrow}
            title={principles.title}
            summary={principles.summary}
            items={principles.items}
          />
        </Container>
      </Section>

      <CtaSection title={cta.title} cta={cta.cta} variant="gradient" />
    </>
  );
}

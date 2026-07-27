import type { Metadata } from 'next';

import { CaseStudyCard, FieldNoteCard } from '@/components/marketing/InsightCard';
import { CtaSection } from '@/components/marketing/CtaSection';
import { ContentVisualSection } from '@/components/marketing/ContentVisualSection';
import { PageHero } from '@/components/marketing/PageHero';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { insightsContent } from '@/config/content/insights';
import { pageVisuals } from '@/config/images/page-visuals';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Insights';
const pageDescription = insightsContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.insights,
  title: pageTitle,
  description: pageDescription,
});

export default function InsightsPage() {
  const { hero, caseStudies, fieldNotes, disclaimer, cta } = insightsContent;

  return (
    <>
      <JsonLd pathname={ROUTES.insights} pageTitle={pageTitle} pageDescription={pageDescription} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visual={pageVisuals.insights.hero}
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow={caseStudies.eyebrow}
            title={caseStudies.title}
          />
          <p className="text-muted mx-auto mt-4 max-w-3xl text-sm leading-relaxed">{disclaimer}</p>
          <div className="mt-8 space-y-6">
            {caseStudies.items.map((post, index) => (
              <CaseStudyCard key={post.slug} post={post} featured={index === 0} glowIndex={index} />
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <ContentVisualSection visual={pageVisuals.insights.research} reverse>
            <SectionHeader eyebrow={fieldNotes.eyebrow} title={fieldNotes.title} />
          </ContentVisualSection>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {fieldNotes.items.map((post, index) => (
              <FieldNoteCard key={post.slug} post={post} glowIndex={index} />
            ))}
          </div>
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

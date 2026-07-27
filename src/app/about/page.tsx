import type { Metadata } from 'next';
import { Briefcase, Building2, Globe2, Mail } from 'lucide-react';

import { ContentVisualSection } from '@/components/marketing/ContentVisualSection';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { CtaSection } from '@/components/marketing/CtaSection';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { PageHero } from '@/components/marketing/PageHero';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { TrustSection } from '@/components/marketing/TrustSection';
import { Container } from '@/components/layout/Container';
import { ScrollToTopOnPath } from '@/components/layout/ScrollToTopOnPath';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { aboutContent } from '@/config/content/about';
import { trustContent } from '@/config/content/trust';
import { pageVisuals } from '@/config/images/page-visuals';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'About';
const pageDescription = aboutContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.about,
  title: pageTitle,
  description: pageDescription,
});

export default function AboutPage() {
  const { hero, story, operations, values, contact, cta } = aboutContent;

  return (
    <>
      <ScrollToTopOnPath path={ROUTES.about} />
      <JsonLd pathname={ROUTES.about} pageTitle={pageTitle} pageDescription={pageDescription} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visual={pageVisuals.about.hero}
      />

      <Section>
        <Container>
          <ContentVisualSection visual={pageVisuals.about.story} tone="dark">
            <SectionHeader eyebrow={story.eyebrow} title={story.title} description={story.description} />
          </ContentVisualSection>
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <ContentVisualSection visual={pageVisuals.about.operations} reverse>
            <SectionHeader eyebrow={operations.eyebrow} title={operations.title} />
            <div className="grid gap-6 lg:grid-cols-2">
              <ContentCard
                glow="brand"
                icon={Building2}
                eyebrow="Headquarters and delivery"
                description={operations.hq}
              />
              <ContentCard
                glow="teal"
                icon={Globe2}
                eyebrow="Client footprint"
                description={operations.footprint}
              />
            </div>
          </ContentVisualSection>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow={values.eyebrow} title={values.title} />
          <FeatureGrid items={values.items} columns={2} />
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <TrustSection
            eyebrow={trustContent.eyebrow}
            title={trustContent.title}
            description={trustContent.description}
            items={trustContent.items}
            footnote={trustContent.footnote}
          />
        </Container>
      </Section>

      <Section variant="muted" id="contact">
        <Container>
          <SectionHeader eyebrow={contact.eyebrow} title={contact.title} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {contact.emails.map((item, index) => (
              <li key={item.email} className="h-full">
                <ContentCard
                  as="a"
                  href={item.href}
                  glow={cardGlowAt(index)}
                  icon={item.label === 'Careers' ? Briefcase : Mail}
                  eyebrow={item.label}
                  title={item.email}
                  footer={
                    <span className="text-accent-on-light text-sm font-semibold transition-colors group-hover:text-accent-on-light-hover">
                      Send email →
                    </span>
                  }
                  className="block h-full cursor-pointer no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-on-light focus-visible:ring-offset-2"
                />
              </li>
            ))}
          </ul>
          <p className="text-muted mt-6 text-sm">
            Delivery centres: {contact.locations.delivery}
            <br />
            Client engagements: {contact.locations.clients}
          </p>
        </Container>
      </Section>

      <CtaSection title={cta.title} cta={cta.cta} variant="gradient" />
    </>
  );
}

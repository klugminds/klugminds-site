import type { Metadata } from 'next';

import { CtaSection } from '@/components/marketing/CtaSection';
import { FeatureGrid } from '@/components/marketing/FeatureGrid';
import { FeatureShowcaseSection } from '@/components/marketing/FeatureShowcaseSection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductCatalog } from '@/components/marketing/ProductCatalog';
import { ProductsHeroVisual } from '@/components/marketing/ProductsHeroVisual';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { productsContent } from '@/config/content/products';
import { pageVisuals } from '@/config/images/page-visuals';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Products';
const pageDescription = productsContent.hero.description;

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.products,
  title: pageTitle,
  description: pageDescription,
});

export default function ProductsPage() {
  const { hero, families, shipsWith, buying, cta } = productsContent;
  const totalProducts = families.items.reduce((count, family) => count + family.products.length, 0);

  return (
    <>
      <JsonLd pathname={ROUTES.products} pageTitle={pageTitle} pageDescription={pageDescription} />
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        size="large"
        visualVariant="aside"
        aside={<ProductsHeroVisual families={families.items} totalProducts={totalProducts} />}
      />

      <Section>
        <Container>
          <ProductCatalog
            eyebrow="PRODUCT CATALOGUE"
            title={families.title}
            description={families.description}
            families={families.items}
          />
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <FeatureShowcaseSection
            visual={pageVisuals.products.platform}
            eyebrow={shipsWith.eyebrow}
            title={shipsWith.title}
            items={shipsWith.items}
            tone="light"
          />
        </Container>
      </Section>

      <Section variant="muted">
        <Container>
          <SectionHeader
            eyebrow={buying.eyebrow}
            title={buying.title}
            description={buying.description}
          />
          <FeatureGrid items={buying.items} columns={3} />
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

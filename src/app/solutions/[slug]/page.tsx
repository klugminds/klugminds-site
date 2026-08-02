import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SolutionDetailView } from '@/components/detail/SolutionDetailView';
import { JsonLd } from '@/components/seo/JsonLd';
import { getSolutionDetail } from '@/config/content/product-details';
import { SOLUTION_SLUGS, type SolutionSlug, solutionRoute } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getSolutionDetail(slug);
  if (!detail) {
    return {};
  }
  return createMetadata({
    pathname: solutionRoute(slug as SolutionSlug),
    title: detail.title,
    description: detail.meta,
  });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getSolutionDetail(slug);
  if (!detail) {
    notFound();
  }

  return (
    <>
      <JsonLd
        pathname={solutionRoute(detail.slug)}
        pageTitle={detail.title}
        pageDescription={detail.meta}
      />
      <SolutionDetailView detail={detail} />
    </>
  );
}

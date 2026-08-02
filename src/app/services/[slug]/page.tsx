import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ServiceDetailView } from '@/components/detail/ServiceDetailView';
import { JsonLd } from '@/components/seo/JsonLd';
import { getServiceDetail } from '@/config/content/product-details';
import { SERVICE_SLUGS, type ServiceSlug, serviceRoute } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) {
    return {};
  }
  return createMetadata({
    pathname: serviceRoute(slug as ServiceSlug),
    title: detail.title,
    description: detail.meta,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) {
    notFound();
  }

  return (
    <>
      <JsonLd
        pathname={serviceRoute(detail.slug)}
        pageTitle={detail.title}
        pageDescription={detail.meta}
      />
      <ServiceDetailView detail={detail} />
    </>
  );
}

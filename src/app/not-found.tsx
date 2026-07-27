import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-24 text-center sm:py-32">
      <p className="font-mono-eyebrow text-accent-muted">404</p>
      <h1 className="font-display text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Page not found
      </h1>
      <p className="text-muted mt-4 max-w-md text-base leading-relaxed">
        The page you are looking for does not exist or may have moved. Try one of the links below.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href={ROUTES.home}>Back to home</ButtonLink>
        <ButtonLink href={ROUTES.products} variant="outline">
          Browse products
        </ButtonLink>
        <Link
          href={ROUTES.contact}
          className="text-accent-muted hover:text-foreground text-sm font-semibold transition-colors"
        >
          Contact us →
        </Link>
      </div>
    </Container>
  );
}

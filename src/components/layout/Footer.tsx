import { CompanyLegal } from '@/components/layout/CompanyLegal';
import { Container } from '@/components/layout/Container';
import { siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <Container>
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <p className="text-muted text-sm">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <CompanyLegal />
        </div>
      </Container>
    </footer>
  );
}

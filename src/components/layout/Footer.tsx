import { siteConfig } from '@/config/site';
import { Container } from '@/components/layout/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface border-t">
      <Container>
        <div className="flex h-16 items-center justify-center">
          <p className="text-muted text-sm">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/layout/Container';

export function Navbar() {
  return (
    <header className="border-border bg-surface border-b">
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
          <Logo />
        </nav>
      </Container>
    </header>
  );
}

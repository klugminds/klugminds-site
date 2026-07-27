import { Container } from '@/components/layout/Container';
import { DesktopNav, MobileNav } from '@/components/layout/MobileNav';
import { Logo } from '@/components/ui/Logo';
import { ctaNavLink, mainNavLinks } from '@/config/content/navigation';

export function Navbar() {
  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <Container>
        <nav
          className="relative flex h-16 min-h-16 items-center justify-between gap-3 lg:h-[4.5rem]"
          aria-label="Main navigation"
        >
          <div className="min-w-0 shrink-0">
            <Logo />
          </div>
          <DesktopNav links={mainNavLinks} cta={ctaNavLink} />
          <MobileNav links={mainNavLinks} cta={ctaNavLink} />
        </nav>
      </Container>
    </header>
  );
}

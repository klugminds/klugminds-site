import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Montserrat } from 'next/font/google';

import { BackToTop } from '@/components/layout/BackToTop';
import { ScrollToTopOnNavigate } from '@/components/layout/ScrollToTopOnNavigate';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { MotionEffects } from '@/components/motion/MotionEffects';
import { GlobalOverlays } from '@/components/overlays/GlobalOverlays';
import { siteConfig } from '@/config/site';
import { createMetadata } from '@/lib/metadata';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = createMetadata({
  pathname: '/',
  title: siteConfig.name,
  description: siteConfig.seoDescription,
});

/**
 * Progressive-enhancement gate: several V4 styles hide content until JS adds
 * the visible state ([data-reveal], [data-clip], kinetic type). The classes are
 * added by script so a no-JS visitor gets the plain, fully readable page.
 */
const bootstrapScript = `document.documentElement.classList.add('js','v4');document.body.classList.add('page-ready');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
        <ScrollToTopOnNavigate />
        <a
          href="#main-content"
          className="focus:bg-accent focus:text-accent-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <GlobalOverlays />
        <MotionEffects />
        <CookieConsent />
      </body>
    </html>
  );
}

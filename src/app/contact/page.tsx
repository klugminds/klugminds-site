import type { Metadata } from 'next';
import Link from 'next/link';

import { ContactForm } from '@/components/overlays/ContactForm';
import { KineticHeading } from '@/components/motion/KineticHeading';
import { BriefingButton } from '@/components/ui/BriefingButton';
import { CopyBadge } from '@/components/ui/CopyBadge';
import { Glyph } from '@/components/ui/Glyph';
import { JsonLd } from '@/components/seo/JsonLd';
import { Stage } from '@/components/stage/Stage';
import { contactContent } from '@/config/content/contact';
import { ROUTES } from '@/constants/routes';
import { createMetadata } from '@/lib/metadata';

const pageTitle = 'Contact';
const pageDescription =
  'Tell us what you are trying to decide. A senior engineer replies within one working day — from Bengaluru, with overlap across Europe, the UAE, and North America.';

export const metadata: Metadata = createMetadata({
  pathname: ROUTES.contact,
  title: pageTitle,
  description: pageDescription,
});

const CONTAINER = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

export default function ContactPage() {
  const { hero, routing, form, aside, faq, closing } = contactContent;

  return (
    <>
      <JsonLd pathname={ROUTES.contact} pageTitle={pageTitle} pageDescription={pageDescription} />

      <Stage id="hero" aurora net className="b-line border-b">
        <div className="v4-shell relative py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <p className="v4-eyebrow">
                <b aria-hidden="true" />
                {hero.eyebrow}
              </p>
              <KineticHeading
                as="h1"
                className="font-display mt-6 text-4xl leading-[1.07] font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-[length:var(--text-fs-h1)]"
              >
                {hero.title.lead}
                <span className="v4-lit">{hero.title.lit}</span>
                {hero.title.tail}
              </KineticHeading>
              <p
                className="mt-6 max-w-xl text-[length:var(--text-fs-lede)] text-pretty text-white/70"
                data-reveal
              >
                {hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal data-reveal-delay="1">
                <a className="v4-btn v4-btn--primary" href="#form" data-magnet="5">
                  <span>
                    <Glyph name="mail" className="h-[15px] w-[15px]" strokeWidth={1.7} />
                  </span>
                  <span>Write to us</span>
                </a>
                <BriefingButton
                  topic="Contact page"
                  label="Book a briefing instead"
                  className="v4-btn v4-btn--ghost"
                />
              </div>
              <dl
                className="mt-10 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3"
                data-reveal
                data-reveal-delay="2"
              >
                {hero.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono-eyebrow text-white/45">{fact.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-white/85">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="grid min-w-0 content-start gap-3" data-reveal data-reveal-delay="2">
              {routing.map((card, i) => (
                <div
                  key={card.title}
                  className="v4-card v4-spot p-5"
                  data-reveal
                  data-reveal-delay={i || undefined}
                >
                  <span className="t-accent">
                    <Glyph name={card.icon} className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="t-fg mt-3 text-base font-bold">{card.title}</h3>
                  <p className="t-muted mt-1.5 text-sm leading-relaxed">{card.text}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <a className="t-accent text-sm font-semibold" href={`mailto:${card.email}`}>
                      {card.email}
                    </a>
                    <CopyBadge value={card.email} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Stage>

      <section id="form" className="section-white b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div className="min-w-0">
              <div className="v4-head" data-reveal>
                <p className="font-mono-eyebrow t-accent">{form.eyebrow}</p>
                <KineticHeading as="h2" className="mt-3">
                  {form.title}
                </KineticHeading>
                <p>{form.lede}</p>
              </div>
              <ContactForm />
            </div>

            <aside className="min-w-0">
              <div className="v4-card v4-spot p-5" data-reveal>
                <p className="font-mono-eyebrow t-accent">What happens next</p>
                <ol className="mt-4 grid gap-4">
                  {aside.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="v4-idx">{String(i + 1).padStart(2, '0')}</span>
                      <span className="t-muted text-sm leading-relaxed">
                        <b className="t-fg">{step.title}</b>
                        {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="v4-card v4-spot mt-3 p-5" data-reveal data-reveal-delay="1">
                <p className="font-mono-eyebrow t-accent">Working hours that overlap yours</p>
                <dl className="mt-4 grid gap-2.5 text-sm">
                  {aside.overlap.map((row, i) => (
                    <div
                      key={row.region}
                      className={`flex items-baseline justify-between gap-3${i < aside.overlap.length - 1 ? 'b-line border-b pb-2.5' : ''}`}
                    >
                      <dt className="t-muted">{row.region}</dt>
                      <dd className="t-fg font-mono text-xs">{row.hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="t-muted mt-4 text-xs leading-relaxed">{aside.overlapNote}</p>
              </div>

              <div className="v4-card v4-spot mt-3 p-5" data-reveal data-reveal-delay="2">
                <p className="font-mono-eyebrow t-accent">The registered entity</p>
                <p className="t-fg mt-3 text-sm font-semibold">{aside.entity.name}</p>
                <p className="t-muted mt-1.5 text-sm leading-relaxed">{aside.entity.location}</p>
                <p className="t-muted mt-3 font-mono text-xs">GSTIN {aside.entity.gstin}</p>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {aside.entity.links.map((link) => (
                    <Link key={link.href} className="t-accent font-semibold" href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-light b-line border-b py-16 sm:py-20">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <div className="v4-head" data-reveal>
              <p className="font-mono-eyebrow t-accent">{faq.eyebrow}</p>
              <KineticHeading as="h2" className="mt-3">
                {faq.title}
              </KineticHeading>
              <p>{faq.lede}</p>
            </div>
            <div className="v4-faq" data-reveal data-reveal-delay="1">
              {faq.items.map((item) => (
                <details key={item.question} data-faq>
                  <summary>{item.question}</summary>
                  <div className="a">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Stage calm className="py-16 sm:py-20">
        <div className="v4-shell relative">
          <div className="v4-rim">
            <div className="v4-glass v4-spot flex flex-col items-start justify-between gap-8 p-6 sm:p-10 md:flex-row md:items-center">
              <div data-reveal>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {closing.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
                  {closing.text}
                </p>
              </div>
              <div data-reveal data-reveal-delay="1">
                <BriefingButton topic="Contact closing" label={closing.ctaLabel} />
              </div>
            </div>
          </div>
        </div>
      </Stage>
    </>
  );
}

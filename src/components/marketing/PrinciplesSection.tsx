import type { FeatureItem } from '@/config/content/home';
import { resolveFeatureIcon } from '@/config/icons/feature-icons';
import { SectionHeader } from '@/components/marketing/SectionHeader';
import { cn } from '@/lib/cn';

type PrinciplesSectionProps = {
  eyebrow: string;
  title: string;
  summary?: string;
  items: readonly FeatureItem[];
  className?: string;
};

export function PrinciplesSection({
  eyebrow,
  title,
  summary,
  items,
  className,
}: PrinciplesSectionProps) {
  return (
    <div className={cn('grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16', className)}>
      <div className="lg:col-span-4 lg:sticky lg:top-28">
        <SectionHeader eyebrow={eyebrow} title={title} className="mb-0 max-w-none" />

        <div
          className="relative mt-8 hidden overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-transparent p-6 backdrop-blur-sm lg:block"
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[rgb(0_165_179/0.2)] blur-3xl"
          />
          <p className="font-mono-eyebrow text-accent-muted relative">
            {String(items.length).padStart(2, '0')} principles
          </p>
          {summary ? (
            <p className="relative mt-3 text-sm leading-relaxed text-muted">{summary}</p>
          ) : null}
          <ol className="relative mt-6 space-y-2.5">
            {items.map((item, index) => (
              <li
                key={item.title}
                className="flex items-center gap-3 text-sm text-muted/90"
              >
                <span className="font-mono text-[0.7rem] font-medium tracking-wider text-accent-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 truncate">{item.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ol className="flex flex-col gap-3 sm:gap-4 lg:col-span-8">
        {items.map((item, index) => {
          const Icon = resolveFeatureIcon(item.icon);
          const number = String(index + 1).padStart(2, '0');

          return (
            <li key={item.title}>
              <article
                className="group card-surface relative flex gap-4 overflow-hidden rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(0_165_179/0.45)] sm:gap-5 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[rgb(0_165_179/0.7)] to-[rgb(24_74_146/0.35)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                <div className="flex shrink-0 flex-col items-center gap-2 pt-0.5 sm:gap-3">
                  <span className="font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-accent-muted">
                    {number}
                  </span>
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(0_165_179/0.14)] text-accent-muted ring-1 ring-[rgb(0_165_179/0.2)] transition-colors duration-200 group-hover:bg-[rgb(0_165_179/0.22)]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {item.description}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

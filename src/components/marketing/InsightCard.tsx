import Link from 'next/link';
import { BookOpen, Gamepad2, LineChart, Rocket, Scale, type LucideIcon } from 'lucide-react';

import type { CaseStudyPost, FieldNotePost } from '@/config/content/insights';
import { resolveIndustryIcon } from '@/config/icons/industry-icons';
import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { insightAnchor } from '@/constants/routes';
import { cn } from '@/lib/cn';
import { formatInsightDate } from '@/lib/format-date';

const categoryIcons: Record<string, LucideIcon> = {
  'Governance & Risk': Scale,
  Modelling: LineChart,
  Delivery: Rocket,
  'iGaming integrity': Gamepad2,
};

function InsightMeta({ label, date }: { label: string; date: string }) {
  return (
    <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--slate-500)]">
      <span className="font-mono-eyebrow text-[0.65rem] text-accent-on-light">{label}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{formatInsightDate(date)}</time>
    </p>
  );
}

type CaseStudyCardProps = {
  post: CaseStudyPost;
  featured?: boolean;
  glowIndex?: number;
};

export function CaseStudyCard({ post, featured = false, glowIndex = 0 }: CaseStudyCardProps) {
  return (
    <article id={post.slug} className="scroll-mt-24">
      <InsightMeta label="Case study" date={post.publishedAt} />
      <ContentCard
        glow={cardGlowAt(glowIndex)}
        icon={resolveIndustryIcon(post.industry)}
        eyebrow={post.industry}
        title={post.title}
        description={post.excerpt}
        padding={featured ? 'large' : 'default'}
        className={cn(featured && 'lg:p-10')}
      >
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-mono-eyebrow text-[0.65rem] text-accent-on-light">The problem</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--slate-700)]">{post.problem}</p>
          </div>
          <div>
            <p className="font-mono-eyebrow text-[0.65rem] text-accent-on-light">The outcome</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--slate-700)]">{post.outcome}</p>
          </div>
        </div>
      </ContentCard>
    </article>
  );
}

type FieldNoteCardProps = {
  post: FieldNotePost;
  glowIndex?: number;
};

export function FieldNoteCard({ post, glowIndex = 0 }: FieldNoteCardProps) {
  const Icon = categoryIcons[post.category] ?? BookOpen;

  return (
    <article id={post.slug} className="scroll-mt-24 h-full">
      <Link href={insightAnchor(post.slug)} className="group block h-full no-underline">
        <ContentCard
          glow={cardGlowAt(glowIndex)}
          icon={Icon}
          clampText
          prepend={
            <p className="font-mono-eyebrow text-[0.65rem] text-accent-on-light">
              Field note
              <span aria-hidden="true"> · </span>
              <time dateTime={post.publishedAt}>{formatInsightDate(post.publishedAt)}</time>
            </p>
          }
          eyebrow={post.category}
          title={post.title}
          description={post.excerpt}
          footer={
            <div className="flex flex-col gap-1 text-xs text-[var(--slate-500)]">
              <span className="min-w-0">
                {post.author.name}
                <span aria-hidden="true"> · </span>
                {post.readTimeMinutes} min read
              </span>
              <span className="text-accent-on-light font-semibold transition-colors group-hover:text-accent-on-light-hover">
                Read essay →
              </span>
            </div>
          }
          className="h-full transition-shadow group-hover:shadow-[0_12px_40px_rgb(10_31_68/0.1)]"
        />
      </Link>
    </article>
  );
}

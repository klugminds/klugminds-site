import { Glyph, type GlyphName } from '@/components/ui/Glyph';

type EngagementItem = {
  icon: GlyphName;
  title: string;
  text: string;
};

type EngagementGridProps = {
  items: readonly EngagementItem[];
};

export function EngagementGrid({ items }: EngagementGridProps) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="content-card v4-spot rounded-2xl p-6"
          data-reveal
          data-reveal-delay={i || undefined}
        >
          <span className="bg-chip t-accent inline-flex h-11 w-11 items-center justify-center rounded-2xl">
            <Glyph name={item.icon} />
          </span>
          <h3 className="font-display t-fg mt-4 text-base font-bold">{item.title}</h3>
          <p className="t-muted mt-2 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

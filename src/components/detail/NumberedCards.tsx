type NumberedCardsProps = {
  items: readonly string[];
};

export function NumberedCards({ items }: NumberedCardsProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={item}
          className="content-card v4-spot rounded-xl p-5"
          data-reveal
          data-reveal-delay={i || undefined}
        >
          <span className="font-mono-eyebrow t-accent mb-2 block">
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="t-muted text-sm leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );
}

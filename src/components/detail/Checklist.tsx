type ChecklistProps = {
  items: readonly string[];
};

export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="t-muted flex gap-3 text-sm leading-relaxed">
          <span className="t-accent mt-0.5 shrink-0">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

import type { PolicySection } from '@/config/content/policies';

type PolicySectionsProps = {
  sections: readonly PolicySection[];
};

export function PolicySections({ sections }: PolicySectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
          <h2
            id={`${section.id}-heading`}
            className="font-display t-fg text-xl font-semibold tracking-tight"
          >
            {section.title}
          </h2>
          <div className="t-muted mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="list-disc space-y-2 pl-5">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}

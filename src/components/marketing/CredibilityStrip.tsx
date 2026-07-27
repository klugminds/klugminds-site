type CredibilityStripProps = {
  text: string;
};

export function CredibilityStrip({ text }: CredibilityStripProps) {
  return (
    <section className="border-border border-b bg-[var(--navy-900)] py-10 sm:py-12">
      <p className="text-soft mx-auto max-w-4xl px-4 text-center text-sm leading-relaxed sm:px-6 sm:text-base">
        {text}
      </p>
    </section>
  );
}

interface WhyNowSectionProps {
  content?: {
    whyNowTagline?: string | null;
    whyNowHeading?: string | null;
    whyNowParagraph1?: string | null;
    whyNowParagraph2?: string | null;
    whyNowParagraph3?: string | null;
  } | null;
}

export function WhyNowSection({ content }: WhyNowSectionProps) {
  const tagline = content?.whyNowTagline ?? 'The Time Is Now';
  const heading = content?.whyNowHeading ?? 'Before Their Voices Are Lost Forever';
  const p1 = content?.whyNowParagraph1 ?? 'The remaining Kagnew Battalion veterans are aging quickly. Many can no longer speak. Each day we wait, we risk losing their firsthand accounts — forever.';
  const p2 = content?.whyNowParagraph2 ?? 'This documentary will, for the first time, tell the Korean War through three perspectives: the Ethiopian Kagnew soldiers, the Korean fighters, and the American servicemen — revealing a shared history that has never been fully seen or heard.';
  const p3 = content?.whyNowParagraph3 ?? 'This is our last chance to preserve their legacy. Stories of courage and sacrifice that must not be forgotten.';

  return (
    <section id="why-now" className="bg-kagnew-whynow py-24 md:py-32 px-6">
      <div className="max-w-[680px] mx-auto text-center">
        <p className="scroll-fade font-space-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
          {tagline}
        </p>
        <h2 className="scroll-fade font-chivo text-3xl md:text-[42px] font-extrabold text-foreground leading-tight mb-8">
          {heading}
        </h2>
      </div>
      <div className="max-w-[680px] mx-auto">
        <div className="scroll-fade font-source-serif text-base leading-relaxed space-y-6 text-left" style={{ color: 'rgba(255,255,255,0.75)' }}>
          <p>{p1}</p>
          <p>{p2}</p>
          <p>{p3}</p>
        </div>
      </div>
    </section>
  );
}

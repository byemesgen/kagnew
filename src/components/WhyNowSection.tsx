const timelineNodes = [
  { year: '1951', label: 'Ethiopia Deploys', pulse: false },
  { year: '1953', label: 'Armistice Signed', pulse: false },
  { year: '2025', label: 'Last Survivors', pulse: true },
];

export function WhyNowSection() {
  return (
    <section id="why-now" className="bg-kagnew-whynow py-24 md:py-32 px-6">
      <div className="max-w-[680px] mx-auto text-center">
        <p className="scroll-fade font-space-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
          The Time Is Now
        </p>
        <h2 className="scroll-fade font-chivo text-3xl md:text-[42px] font-extrabold text-foreground leading-tight mb-8">
          Before Their Voices Are Lost Forever
        </h2>
        <div className="scroll-fade font-source-serif text-base text-foreground/75 leading-relaxed space-y-6 text-left mb-16">
          <p>
            The remaining Kagnew Battalion veterans are aging quickly. Many can no longer speak. Each
            day we wait, we risk losing their firsthand accounts — forever.
          </p>
          <p>
            This documentary will, for the first time, tell the Korean War through three perspectives:
            the Ethiopian Kagnew soldiers, the Korean fighters, and the American servicemen — revealing
            a shared history that has never been fully seen or heard.
          </p>
          <p>
            This is our last chance to preserve their legacy. Stories of courage and sacrifice that
            must not be forgotten.
          </p>
        </div>

        {/* Timeline */}
        <div className="scroll-fade relative flex items-center justify-between max-w-md mx-auto">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/40 -translate-y-1/2" />
          
          {timelineNodes.map((node) => (
            <div key={node.year} className="relative flex flex-col items-center z-10">
              <span className="font-space-mono text-[10px] uppercase tracking-wider text-kagnew-muted mb-3">
                {node.label}
              </span>
              <div
                className={`w-3 h-3 rounded-full bg-primary ${node.pulse ? 'animate-pulse-dot' : ''}`}
              />
              <span className="font-space-mono text-xs text-primary mt-3">{node.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

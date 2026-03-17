const timelineNodes = [
  { label: 'Conflict Begins', date: 'June 25, 1950', desc: 'North Korea invades South Korea' },
  { label: 'UN Intervention', date: 'September 1950', desc: 'U.S.-led UN forces enter the war' },
  { label: 'Ethiopia Deploys', date: 'May 1951', desc: 'First Kagnew Battalion arrives in Korea' },
  { label: 'Kagnew in Combat', date: '1951–1953', desc: 'Ethiopian troops fight in 250+ battles alongside UN forces' },
  { label: 'Major Engagements', date: '1952', desc: 'Kagnew Battalion fights in key battles including Old Baldy' },
  { label: 'Armistice Signed', date: 'July 27, 1953', desc: 'Korean Armistice Agreement signed, war ends' },
  { label: 'Kagnew Legacy Continues', date: '1954–1965', desc: 'Additional Ethiopian rotations remain in Korea post-war' },
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
      </div>

      <div className="scroll-fade relative w-full overflow-x-auto pb-4 scrollbar-thin">
        <div className="relative flex items-start min-w-max px-8 py-4 mx-auto" style={{ width: 'fit-content' }}>
          {/* Connecting line */}
          <div className="absolute top-[3.25rem] left-8 right-8 h-px bg-primary/40" />

          {timelineNodes.map((node, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center z-10"
              style={{ width: '180px' }}
            >
              <span className="font-space-mono text-[10px] uppercase tracking-wider text-primary mb-3 text-center px-2">
                {node.label}
              </span>
              <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
              <span className="font-space-mono text-xs text-foreground mt-3">{node.date}</span>
              <span className="font-source-serif text-[11px] text-foreground/60 mt-1 text-center leading-snug px-2">
                {node.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
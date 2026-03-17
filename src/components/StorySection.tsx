const stats = [
  { number: '6,037', label: 'Ethiopian soldiers deployed' },
  { number: '253', label: 'Battles fought — zero prisoners taken' },
  { number: '~200', label: 'Survivors still living today' },
];

export function StorySection() {
  return (
    <section id="story" className="bg-kagnew-story py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="scroll-fade grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat) => (
            <div key={stat.number} className="border-t border-primary/40 pt-6 text-center md:text-left">
              <p className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="font-source-serif text-sm text-kagnew-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column text */}
        <div className="scroll-fade flex flex-col md:flex-row gap-8 md:gap-16 mb-20">
          <div className="md:w-1/3">
            <p className="font-space-mono text-xs uppercase tracking-[0.25em] text-primary">
              The Kagnew Battalion
            </p>
          </div>
          <div className="md:w-2/3 font-source-serif text-foreground/80 leading-relaxed space-y-6 text-base">
            <p>
              In 1951, Emperor Haile Selassie dispatched thousands of soldiers — drawn from his elite
              Imperial Bodyguard, the Kebur Zabagna — to fight alongside American-led UN forces in
              Korea. They were the Kagnew Battalions, and they became one of the most decorated units
              of the entire war.
            </p>
            <p>
              Six thousand Ethiopians crossed the world to fight for the freedom of people they had
              never met. They suffered 121 killed and 536 wounded in battle. Not a single soldier was
              ever captured.
            </p>
            <p>
              This was the only time in history that an African nation voluntarily sent its own
              soldiers to fight outside the continent. Their valor is extraordinary. Their story is
              almost entirely unknown.
            </p>
          </div>
        </div>

        {/* Blockquote */}
        <blockquote className="scroll-fade border-l-4 border-primary pl-6 md:pl-10 max-w-3xl mx-auto">
          <p className="font-playfair text-lg md:text-xl italic text-foreground/90 leading-relaxed mb-4">
            "We were the best fighters. The three Ethiopian battalions fought 253 battles, and no
            Ethiopian soldier was taken prisoner in the Korean War. That was our Ethiopian motto:
            'Never be captured on the war field.'"
          </p>
          <cite className="font-space-mono text-xs uppercase tracking-[0.2em] text-primary not-italic">
            — Captain Mamo Habtewold, 81 · Lieutenant, 3rd Kagnew Battalion
          </cite>
        </blockquote>
      </div>
    </section>
  );
}

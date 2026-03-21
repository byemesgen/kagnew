import { useRef, useState, useEffect, useCallback } from 'react';

const stats = [
  { number: '6,037', label: 'Ethiopian soldiers deployed' },
  { number: '253', label: 'Battles fought — zero prisoners taken' },
  { number: '0', label: 'Ethiopian soldier casualties' },
  { number: '~200', label: 'Survivors still living today' },
];

const timelineNodes = [
  { label: 'Conflict Begins', date: 'June 25, 1950', desc: 'North Korea invades South Korea' },
  { label: 'UN Intervention', date: 'September 1950', desc: 'U.S.-led UN forces enter the war' },
  { label: 'Ethiopia Deploys', date: 'May 1951', desc: 'First Kagnew Battalion arrives in Korea' },
  { label: 'Kagnew in Combat', date: '1951–1953', desc: 'Ethiopian troops fight in 250+ battles alongside UN forces' },
  { label: 'Major Engagements', date: '1952', desc: 'Kagnew Battalion fights in key battles including Old Baldy' },
  { label: 'Armistice Signed', date: 'July 27, 1953', desc: 'Korean Armistice Agreement signed, war ends' },
  { label: 'Kagnew Legacy Continues', date: '1954–1965', desc: 'Additional Ethiopian rotations remain in Korea post-war' },
];

export function StorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0 });

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 360;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragState.current = { startX: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const onPointerUp = () => setIsDragging(false);

  return (
    <section id="story" className="bg-kagnew-story py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Stats */}
        <div className="scroll-fade grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
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
      </div>

      {/* Timeline — full viewport width */}
      <div className="scroll-fade relative w-full mb-20">
        <div
          onClick={() => scroll('left')}
          className={`absolute left-0 top-0 bottom-0 w-[30%] z-20 cursor-w-resize ${canScrollLeft ? '' : 'pointer-events-none'}`}
          aria-label="Scroll timeline left"
        />
        <div
          onClick={() => scroll('right')}
          className={`absolute right-0 top-0 bottom-0 w-[30%] z-20 cursor-e-resize ${canScrollRight ? '' : 'pointer-events-none'}`}
          aria-label="Scroll timeline right"
        />
        <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-kagnew-story to-transparent transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-kagnew-story to-transparent transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none snap-x snap-mandatory"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="relative flex min-w-max py-4 mx-auto" style={{ width: 'fit-content' }}>
            <div className="absolute left-0 right-0 h-px" style={{ backgroundColor: 'rgba(201, 168, 76, 0.4)', top: 'calc(50% - 2px)' }} />
            {timelineNodes.map((node, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center z-10 snap-center w-[80vw] md:w-[360px] flex-shrink-0"
              >
                <span className="font-space-mono text-sm uppercase tracking-wider text-primary mb-3 text-center px-2">
                  {node.label}
                </span>
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <span className="font-space-mono text-sm text-foreground mt-3">{node.date}</span>
                <span className="font-source-serif text-sm mt-1 text-center leading-snug px-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {node.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
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

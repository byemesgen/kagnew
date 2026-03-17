import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    el.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' });
  };

  // Drag-to-scroll handlers
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
    <section id="why-now" className="bg-kagnew-whynow py-24 md:py-32 px-6">
      <div className="max-w-[680px] mx-auto text-center">
        <p className="scroll-fade font-space-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
          The Time Is Now
        </p>
        <h2 className="scroll-fade font-chivo text-3xl md:text-[42px] font-extrabold text-foreground leading-tight mb-8">
          Before Their Voices Are Lost Forever
        </h2>
      </div>

      {/* Timeline — now above the quote */}
      <div className="scroll-fade relative w-full mb-16">
        {/* Invisible click zones — left 30% and right 30% */}
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

        {/* Edge fades */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-kagnew-whynow to-transparent transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-kagnew-whynow to-transparent transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-4 px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="relative flex items-start min-w-max px-8 py-4 mx-auto" style={{ width: 'fit-content' }}>
            {/* Connecting line */}
            <div className="absolute top-[3.25rem] left-8 right-8 h-px" style={{ backgroundColor: 'rgba(201, 168, 76, 0.4)' }} />

            {timelineNodes.map((node, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center z-10"
                style={{ width: '360px' }}
              >
                <span className="font-space-mono text-[10px] uppercase tracking-wider text-primary mb-3 text-center px-2">
                  {node.label}
                </span>
                <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                <span className="font-space-mono text-xs text-foreground mt-3">{node.date}</span>
                <span className="font-source-serif text-[11px] mt-1 text-center leading-snug px-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {node.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[680px] mx-auto">
        <div className="scroll-fade font-source-serif text-base leading-relaxed space-y-6 text-left" style={{ color: 'rgba(255,255,255,0.75)' }}>
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
      </div>
    </section>
  );
}

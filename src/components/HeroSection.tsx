export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center film-grain overflow-hidden">
      
      {/* Vimeo background video */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://player.vimeo.com/video/1174479651?h=a948535b08&background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
          style={{ border: 'none' }}
          allow="autoplay; fullscreen"
          title="KAGNEW background video" />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/[0.78]" />
        {/* Radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(42 52% 54% / 0.06) 0%, transparent 70%)'
          }} />
        
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p
          className="inline-block font-space-mono text-xs uppercase tracking-[0.35em] text-primary bg-background/80 border border-primary/30 rounded-full px-5 py-1.5 mb-6 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.2s' }}>
          
          A Documentary Film · In Production
        </p>
        <h1
          className="font-chivo text-[44px] md:text-[72px] font-extrabold text-foreground leading-[1.05] mb-4 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.4s' }}>
          
          KAGNEW
        </h1>
        <p
          className="font-source-serif text-lg md:text-[22px] italic text-foreground/70 mb-6 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.6s' }}>
          
          The Untold Story of Ethiopia's Warriors in Korea
        </p>
        <p
          className="font-source-serif text-base text-foreground/60 max-w-[540px] mx-auto mb-10 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.8s' }}>
          
          In 1951, Emperor Haile Selassie sent Ethiopia's finest soldiers to a war most of the world
          has forgotten. No African nation had ever done this before. Their story has never been fully
          told — until now.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '1s' }}>
          
          <a
            href="#contact"
            className="font-space-mono text-sm uppercase tracking-[0.1em] bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity">
            
            Stay Informed
          </a>
          <a
            href="#contact"
            className="font-space-mono text-sm uppercase tracking-[0.1em] border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all group relative"
            title="Teaser coming soon">
            
            Donate
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center">
          <div className="w-px h-10 bg-primary/40 animate-pulse-line" />
        </div>
      </div>
    </section>);

}
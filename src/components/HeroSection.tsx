export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center film-grain overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(42 52% 54% / 0.06) 0%, hsl(30 27% 3%) 70%)',
      }}
    >
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p
          className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-6 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.2s' }}
        >
          A Documentary Film · In Production
        </p>
        <h1
          className="font-playfair text-[44px] md:text-[72px] font-bold text-foreground leading-[1.05] mb-4 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.4s' }}
        >
          KAGNEW
        </h1>
        <p
          className="font-source-serif text-lg md:text-[22px] italic text-foreground/70 mb-6 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.6s' }}
        >
          The Untold Story of Ethiopia's Warriors in Korea
        </p>
        <p
          className="font-source-serif text-base text-foreground/60 max-w-[540px] mx-auto mb-10 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '0.8s' }}
        >
          In 1951, Emperor Haile Selassie sent Ethiopia's finest soldiers to a war most of the world
          has forgotten. No African nation had ever done this before. Their story has never been fully
          told — until now.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-up-in"
          style={{ animationDelay: '1s' }}
        >
          <a
            href="#contact"
            className="font-space-mono text-sm uppercase tracking-[0.1em] bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity"
          >
            Stay Informed
          </a>
          <a
            href="#contact"
            className="font-space-mono text-sm uppercase tracking-[0.1em] border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all group relative"
            title="Teaser coming soon"
          >
            Watch Teaser
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center">
          <div className="w-px h-10 bg-primary/40 animate-pulse-line" />
        </div>
      </div>
    </section>
  );
}

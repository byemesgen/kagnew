export function ContactSection() {
  return (
    <section id="contact" className="bg-kagnew-contact py-24 md:py-32 px-6">
      <div className="max-w-[520px] mx-auto text-center">
        <p className="scroll-fade font-space-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
          Stay Informed
        </p>
        <h2 className="scroll-fade font-chivo text-3xl md:text-[38px] font-extrabold text-foreground leading-tight mb-4">
          Be Part of This Story
        </h2>
        <p className="scroll-fade font-source-serif text-base text-foreground/60 mb-10">
          Sign up to receive updates on the film's progress, screening announcements, and ways to
          support the preservation of this history.
        </p>

        <form
          className="scroll-fade flex flex-col sm:flex-row gap-3 mb-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-kagnew-card border border-primary/30 text-foreground placeholder:text-kagnew-muted px-4 py-3 font-source-serif text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="font-space-mono text-sm uppercase tracking-[0.1em] bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Notify Me
          </button>
        </form>
        <p className="scroll-fade font-space-mono text-[10px] text-kagnew-muted mb-16">
          No spam. Only updates that matter.
        </p>

        <hr className="gold-rule mb-8" />

        <p className="font-space-mono text-[11px] text-kagnew-muted tracking-wider">
          © 2025 KAGNEW DOCUMENTARY — ALL RIGHTS RESERVED
        </p>
      </div>
    </section>
  );
}

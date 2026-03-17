import { useState, useEffect } from 'react';
import kagnewLogo from '@/assets/kagnew-logo.svg';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Why Now', href: '#why-now' },
  { label: 'Filmmakers', href: '#filmmakers' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[rgba(8,8,6,0.92)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center">
            <img src={kagnewLogo} alt="Kagnew" className="h-5" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-space-mono text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-space-mono text-xs uppercase tracking-[0.15em] border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Stay Informed
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px bg-primary transition-transform ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
            <span className={`w-6 h-px bg-primary transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-primary transition-transform ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-space-mono text-sm uppercase tracking-[0.25em] text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-space-mono text-sm uppercase tracking-[0.15em] border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Stay Informed
          </a>
        </div>
      )}
    </>
  );
}

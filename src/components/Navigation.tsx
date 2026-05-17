import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import kagnewLogo from '@/assets/kagnew-logo.svg';

const navLinks = [
  { label: 'Story', hash: '#story' },
  { label: 'Why Now', hash: '#why-now' },
  { label: 'Filmmakers', hash: '#filmmakers' },
  { label: 'Blog', hash: '/blog', isPage: true },
  { label: 'Contact', hash: '#contact' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((hash: string, isPage?: boolean) => {
    setMenuOpen(false);
    if (isPage) {
      navigate(hash);
      return;
    }
    if (location.pathname === '/') {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/' + hash);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[rgba(8,8,6,0.92)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => handleNavClick('#hero')} className="flex items-center">
            <img src={kagnewLogo} alt="Kagnew" className="h-5" />
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleNavClick(link.hash, link.isPage)}
                className="font-space-mono text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="font-space-mono text-xs uppercase tracking-[0.15em] border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Stay Informed
            </button>
          </div>

          {/* Mobile hamburger */}
          {!menuOpen && (
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden relative z-50 flex flex-col items-center justify-center gap-1.5 w-10 h-10"
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-primary" />
              <span className="block h-0.5 w-6 bg-primary" />
              <span className="block h-0.5 w-6 bg-primary" />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-background backdrop-blur-md flex flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.hash}
                onClick={() => handleNavClick(link.hash, link.isPage)}
                className="font-space-mono text-sm uppercase tracking-[0.25em] text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="font-space-mono text-sm uppercase tracking-[0.15em] border border-primary text-primary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Stay Informed
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed top-4 right-4 z-[60] grid h-11 w-11 place-items-center overflow-visible"
            aria-label="Close menu"
          >
            <span className="absolute block h-0.5 w-7 rotate-45 bg-primary" />
            <span className="absolute block h-0.5 w-7 -rotate-45 bg-primary" />
          </button>
        </>
      )}
    </>
  );
}

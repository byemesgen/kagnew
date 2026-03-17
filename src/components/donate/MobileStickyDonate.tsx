import { useEffect, useState } from 'react';

export function MobileStickyDonate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('donate-hero');
    const form = document.getElementById('donation-form');
    if (!hero || !form) return;

    const handleScroll = () => {
      const pastHero = window.scrollY > hero.offsetTop + hero.offsetHeight;
      const atForm = window.scrollY + window.innerHeight > form.offsetTop;
      setShow(pastHero && !atForm);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTap = () => {
    const form = document.getElementById('donation-form');
    form?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const input = document.getElementById('donor-name') as HTMLInputElement | null;
      input?.focus();
    }, 600);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden animate-fade-up-in">
      <button
        onClick={handleTap}
        className="w-full bg-primary text-primary-foreground font-space-mono text-sm uppercase tracking-[0.15em] py-3.5 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
      >
        Donate Now
      </button>
    </div>
  );
}

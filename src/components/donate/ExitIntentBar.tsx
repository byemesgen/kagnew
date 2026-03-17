import { useEffect, useState } from 'react';

export function ExitIntentBar() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('kagnew_exit_dismissed')) {
      setDismissed(true);
      return;
    }

    let lastScrollY = window.scrollY;
    const formEl = document.getElementById('donation-form');

    const handleScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < lastScrollY;
      const pastForm = formEl ? currentY > formEl.offsetTop + formEl.offsetHeight : currentY > 800;

      if (isScrollingUp && pastForm && !dismissed) {
        setShow(true);
      }
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem('kagnew_exit_dismissed', '1');
  };

  const handleCTA = () => {
    const form = document.getElementById('donation-form');
    form?.scrollIntoView({ behavior: 'smooth' });
    handleDismiss();
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-primary-foreground px-4 py-3 flex items-center justify-center gap-4 animate-fade-up-in shadow-lg">
      <p className="font-source-serif text-sm font-semibold">
        This story needs you.
      </p>
      <button
        onClick={handleCTA}
        className="font-space-mono text-xs uppercase tracking-widest bg-primary-foreground text-primary px-4 py-2 rounded hover:opacity-90 transition-opacity"
      >
        Support KAGNEW →
      </button>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

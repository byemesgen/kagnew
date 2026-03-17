import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-kagnew-gold/20 bg-background py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-space-mono text-xs tracking-wider text-kagnew-muted">
        <span>© {new Date().getFullYear()} Bem LLC. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link
            to="/privacy"
            className="text-kagnew-muted hover:text-kagnew-gold transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-kagnew-gold/30">·</span>
          <Link
            to="/terms"
            className="text-kagnew-muted hover:text-kagnew-gold transition-colors"
          >
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}

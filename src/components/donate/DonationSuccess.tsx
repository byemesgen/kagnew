interface DonationSuccessProps {
  name: string;
  email: string;
  amount: number;
  isAnonymous: boolean;
  isRecurring: boolean;
}

export function DonationSuccess({ name, email, amount, isAnonymous, isRecurring }: DonationSuccessProps) {
  const shareText = encodeURIComponent(
    "I just supported KAGNEW — a documentary about Ethiopian soldiers who never lost a prisoner in the Korean War. Join me:"
  );
  const shareUrl = encodeURIComponent("https://kagnew.lovable.app/donate");

  return (
    <div className="text-center max-w-lg mx-auto">
      {/* Gold accent line */}
      <div className="w-12 h-px bg-primary mx-auto mb-8" />

      <h2 className="font-source-serif text-3xl md:text-4xl text-foreground mb-4">
        You're part of this story now.
      </h2>

      <p className="font-source-serif text-lg text-primary mb-2">
        {isAnonymous ? 'Anonymous Friend' : name}
      </p>
      <p className="font-source-serif text-2xl text-foreground font-semibold mb-2">
        ${amount.toFixed(0)}{isRecurring && <span className="text-lg text-muted-foreground">/mo</span>}
      </p>
      {isRecurring && (
        <p className="font-space-mono text-xs uppercase tracking-widest text-primary/80 mb-4">
          Monthly Supporter
        </p>
      )}

      <p className="font-source-serif text-sm text-muted-foreground mb-10">
        A receipt has been sent to{' '}
        <span className="text-foreground">{email}</span>
      </p>

      {/* Share buttons */}
      <div className="flex items-center justify-center gap-4">
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-space-mono text-xs uppercase tracking-widest border border-border text-foreground/70 px-5 py-2.5 rounded hover:border-primary hover:text-primary transition-colors"
        >
          Share on X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-space-mono text-xs uppercase tracking-widest border border-border text-foreground/70 px-5 py-2.5 rounded hover:border-primary hover:text-primary transition-colors"
        >
          Share on Facebook
        </a>
      </div>

      <div className="w-12 h-px bg-primary mx-auto mt-10" />
    </div>
  );
}

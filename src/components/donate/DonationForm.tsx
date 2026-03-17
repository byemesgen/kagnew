import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TrustSignals } from '@/components/donate/TrustSignals';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

interface DonationFormProps {
  selectedTier: string | null;
  amountCents: number;
  onSuccess: (data: { name: string; email: string; amount: number; isAnonymous: boolean }) => void;
}

export function DonationForm({ selectedTier, amountCents, onSuccess }: DonationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedTier || amountCents <= 0) {
      setError('Please select a donation tier.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount_cents: amountCents,
          currency: 'usd',
          donor_name: name.trim(),
          donor_email: email.trim(),
          is_anonymous: !displayName,
          display_name: displayName,
          display_amount: displayAmount,
          message: message.trim() || null,
          tier: selectedTier,
          is_recurring: false,
        },
      });

      if (fnError) throw new Error(fnError.message);

      // TODO: When Stripe is enabled, use the clientSecret to confirm payment
      const { error: confirmError } = await supabase.functions.invoke('confirm-donation', {
        body: {
          donationId: data.donationId,
          paymentIntentId: data.paymentIntentId || 'pending_stripe_setup',
        },
      });

      if (confirmError) throw new Error(confirmError.message);

      onSuccess({
        name: displayName ? name.trim() : 'Anonymous Friend',
        email: email.trim(),
        amount: amountCents / 100,
        isAnonymous: !displayName,
        isRecurring,
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const amountLabel = isRecurring
    ? `$${(amountCents / 100).toFixed(0)}/mo`
    : `$${(amountCents / 100).toFixed(0)}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="donor-name" className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
            Full Name
          </Label>
          <Input
            id="donor-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
        <div>
          <Label htmlFor="donor-email" className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
            Email Address
          </Label>
          <Input
            id="donor-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      {/* Stripe Payment Element placeholder */}
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground">
          💳 Payment Element
        </p>
        <p className="font-source-serif text-sm text-foreground/50 mt-2 italic">
          {isRecurring ? 'Stripe subscription will be connected here' : 'Stripe integration will be connected here'}
        </p>
      </div>

      {/* Opt-in checkboxes */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="display-name"
            checked={displayName}
            onCheckedChange={(checked) => {
              setDisplayName(!!checked);
              if (!checked) setDisplayAmount(false);
            }}
            className="mt-0.5"
          />
          <div>
            <Label htmlFor="display-name" className="font-source-serif text-sm text-foreground cursor-pointer">
              Add my name to the KAGNEW Donor Wall
            </Label>
            <p className="font-source-serif text-xs text-muted-foreground mt-0.5">
              Your name will appear on our public donor page
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="display-amount"
            checked={displayAmount}
            onCheckedChange={(checked) => setDisplayAmount(!!checked)}
            disabled={!displayName}
            className="mt-0.5"
          />
          <div className={!displayName ? 'opacity-40' : ''}>
            <Label htmlFor="display-amount" className="font-source-serif text-sm text-foreground cursor-pointer">
              Display my donation amount alongside my name
            </Label>
            <p className="font-source-serif text-xs text-muted-foreground mt-0.5">
              Only visible if you've chosen to appear on the donor wall
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="donor-message" className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
          Leave a message for the filmmakers (optional)
        </Label>
        <textarea
          id="donor-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Why does this story matter to you?"
          rows={3}
          className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background resize-none"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3">
          <p className="font-source-serif text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Trust signals */}
      <TrustSignals />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !selectedTier || amountCents <= 0}
        className="w-full bg-primary text-primary-foreground font-space-mono text-sm uppercase tracking-[0.15em] py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing…' : `Support KAGNEW — ${amountLabel}`}
      </button>
    </form>
  );
}

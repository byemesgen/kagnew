import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TrustSignals } from '@/components/donate/TrustSignals';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface DonationFormProps {
  selectedTier: string | null;
  amountCents: number;
  onSuccess: (data: { name: string; email: string; amount: number; isAnonymous: boolean }) => void;
}

// Inner component that uses Stripe hooks — must be inside <Elements>
function StripePaymentStep({
  donationId,
  paymentIntentId,
  amountCents,
  onSuccess,
  onBack,
  donorDisplayName,
  donorEmail,
  isAnonymous,
}: {
  donationId: string;
  paymentIntentId: string;
  amountCents: number;
  onSuccess: () => void;
  onBack: () => void;
  donorDisplayName: string;
  donorEmail: string;
  isAnonymous: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    try {
      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed. Please try again.');
        return;
      }

      if (paymentIntent?.status !== 'succeeded') {
        setError('Payment was not completed. Please try again.');
        return;
      }

      // Verify and record on our backend
      const { error: confirmError } = await supabase.functions.invoke('confirm-donation', {
        body: { donationId, paymentIntentId: paymentIntent.id },
      });

      if (confirmError) throw new Error(confirmError.message);

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="font-space-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline"
      >
        ← Back
      </button>

      <div className="rounded-lg border border-border bg-card p-6">
        <PaymentElement />
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3">
          <p className="font-source-serif text-sm text-destructive">{error}</p>
        </div>
      )}

      <TrustSignals />

      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full bg-primary text-primary-foreground font-space-mono text-sm uppercase tracking-[0.15em] py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing…' : `Donate $${(amountCents / 100).toFixed(0)}`}
      </button>
    </form>
  );
}

export function DonationForm({ selectedTier, amountCents, onSuccess }: DonationFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 2 state
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [donationId, setDonationId] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const handleContinue = async (e: React.FormEvent) => {
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
      if (!data.clientSecret) throw new Error('Failed to initialize payment.');

      setClientSecret(data.clientSecret);
      setDonationId(data.donationId);
      setPaymentIntentId(data.paymentIntentId);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    onSuccess({
      name: displayName ? name.trim() : 'Anonymous Friend',
      email: email.trim(),
      amount: amountCents / 100,
      isAnonymous: !displayName,
    });
  };

  const amountLabel = `$${(amountCents / 100).toFixed(0)}`;

  // Step 2: Payment
  if (clientSecret && donationId && paymentIntentId) {
    return (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'night',
            variables: {
              colorPrimary: '#c9a84c',
              colorBackground: '#1a1a16',
              colorText: '#f5f0e8',
              colorDanger: '#e55353',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              borderRadius: '6px',
            },
          },
        }}
      >
        <StripePaymentStep
          donationId={donationId}
          paymentIntentId={paymentIntentId}
          amountCents={amountCents}
          onSuccess={handlePaymentSuccess}
          onBack={() => setClientSecret(null)}
          donorDisplayName={displayName ? name : 'Anonymous Friend'}
          donorEmail={email}
          isAnonymous={!displayName}
        />
      </Elements>
    );
  }

  // Step 1: Donor info
  return (
    <form onSubmit={handleContinue} className="space-y-6">
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

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3">
          <p className="font-source-serif text-sm text-destructive">{error}</p>
        </div>
      )}

      <TrustSignals />

      <button
        type="submit"
        disabled={loading || !selectedTier || amountCents <= 0}
        className="w-full bg-primary text-primary-foreground font-space-mono text-sm uppercase tracking-[0.15em] py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? 'Setting up payment…' : `Continue — ${amountLabel}`}
      </button>
    </form>
  );
}

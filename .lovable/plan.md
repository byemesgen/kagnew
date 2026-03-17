

## Donation Page for KAGNEW — Phase 1 Plan

### Overview

Build a cinematic `/donate` page with Stripe payment processing, a `donations` table in the database, and an edge function to create PaymentIntents. The page matches the existing dark/gold aesthetic.

### Prerequisites

**Stripe must be enabled first.** The Lovable Stripe integration will be activated to collect the Stripe secret key and expose Stripe tools/context. This is required before any code can be written.

### 1. Enable Stripe Integration

Use the Stripe enable tool. This collects the secret key and unlocks Stripe-specific tooling.

### 2. Install `@stripe/react-stripe-js` and `@stripe/stripe-js`

Add these as dependencies for the client-side Stripe Elements integration.

### 3. Create `donations` Table (Migration)

```sql
CREATE TABLE public.donations (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       timestamptz NOT NULL DEFAULT now(),
  stripe_payment_id text,
  amount_cents     integer NOT NULL,
  currency         text NOT NULL DEFAULT 'usd',
  donor_name       text,
  donor_email      text,
  is_anonymous     boolean DEFAULT false,
  display_name     boolean DEFAULT false,
  display_amount   boolean DEFAULT false,
  message          text,
  status           text NOT NULL DEFAULT 'pending',
  tier             text
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public donations)
CREATE POLICY "Anyone can insert donations"
  ON public.donations FOR INSERT TO public
  WITH CHECK (true);

-- Only completed, opted-in donations are publicly readable (for donor wall later)
CREATE POLICY "Public can read display donations"
  ON public.donations FOR SELECT TO public
  USING (status = 'completed' AND display_name = true);
```

### 4. Create Edge Function: `create-payment-intent`

**`supabase/functions/create-payment-intent/index.ts`**

- Accepts: `{ amount_cents, currency, donor_name, donor_email, is_anonymous, display_name, display_amount, message, tier }`
- Creates a Stripe PaymentIntent with the amount
- Inserts a `pending` donation row in the database
- Returns `{ clientSecret, donationId }` to the client
- On the client, after `stripe.confirmPayment` succeeds, a second call (or the same edge function with an update endpoint) marks the donation as `completed` and stores `stripe_payment_id`

A second edge function **`confirm-donation`** will handle updating the donation status after payment confirmation:
- Accepts: `{ donationId, paymentIntentId }`
- Verifies the PaymentIntent status with Stripe
- Updates the donation row to `completed` with the `stripe_payment_id`

Config in `supabase/config.toml`:
```toml
[functions.create-payment-intent]
verify_jwt = false

[functions.confirm-donation]
verify_jwt = false
```

### 5. Add React Router

The app currently renders a single-page layout without routing. Add `react-router-dom` (already in dependencies) with:
- `/` → existing `App` layout (home)
- `/donate` → new `DonatePage`

Update `main.tsx` to use `BrowserRouter`, and create a router setup.

### 6. Create Donate Page Components

**`src/pages/DonatePage.tsx`** — Main page component:
- Navigation bar (reuse existing `Navigation`)
- Hero banner with cinematic copy: "Every Story Needs a Witness. Be One."
- Tier selector cards
- Donation form
- Success state

**`src/components/donate/TierSelector.tsx`** — Tier cards:
- 5 tiers (Supporter $25, Advocate $50, Producer $100, Executive $250, Custom)
- Gold border on selected card (#C9A84C)
- Hover: slight translateY(-2px) + border glow
- Custom tier has an input field for amount

**`src/components/donate/DonationForm.tsx`** — Form with Stripe Elements:
- Full Name, Email inputs (styled to match site)
- Stripe PaymentElement
- Donor wall checkbox + display amount checkbox (disabled when name unchecked)
- Optional message textarea
- "Support KAGNEW" CTA button (gold bg, dark text, full-width, rounded)
- Inline error handling

**`src/components/donate/DonationSuccess.tsx`** — Success card:
- "You're part of this story now."
- Donor name or "Anonymous Friend"
- Amount display
- Receipt email notice
- Twitter/X and Facebook share buttons with pre-filled text

### 7. Update Hero "Donate" Button

Change the existing "Donate" link in `HeroSection.tsx` from `href="#contact"` to link to `/donate`.

### Design Details

- Background: `#1A1A2E` for the donate page (or use existing `bg-background` #0C0A07 to stay consistent — will use the site's existing dark palette)
- Gold accent: `#C9A84C` (already `--primary`)
- Fonts: Source Serif 4, Space Mono, Chivo (already configured)
- Mobile-first responsive layout
- No page reload on submit — all in-page state transitions

### Technical Details

- Stripe publishable key will be stored in code (it's public)
- Stripe secret key stored as a Supabase secret (via Stripe enable tool)
- Edge functions use `stripe` npm package from esm.sh
- Payment flow: client calls `create-payment-intent` → gets `clientSecret` → `stripe.confirmPayment()` → calls `confirm-donation` → shows success


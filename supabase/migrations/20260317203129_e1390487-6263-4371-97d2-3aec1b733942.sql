
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

CREATE POLICY "Anyone can insert donations"
  ON public.donations FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Public can read display donations"
  ON public.donations FOR SELECT TO public
  USING (status = 'completed' AND display_name = true);

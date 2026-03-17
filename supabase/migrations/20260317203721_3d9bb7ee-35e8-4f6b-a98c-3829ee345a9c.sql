
ALTER TABLE public.donations ADD COLUMN is_recurring boolean DEFAULT false;
ALTER TABLE public.donations ADD COLUMN stripe_subscription_id text;


-- Simple key-value config table
CREATE TABLE public.site_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read config (progress bar needs it)
CREATE POLICY "Public can read config" ON public.site_config
  FOR SELECT USING (true);

-- Only admins can update
CREATE POLICY "Admins can update config" ON public.site_config
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert config" ON public.site_config
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Seed the default goal
INSERT INTO public.site_config (key, value) VALUES ('fundraising_goal_cents', '15000000');

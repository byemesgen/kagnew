
CREATE TABLE public.email_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anonymous) to insert
CREATE POLICY "Anyone can submit their email"
ON public.email_signups
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can read signups"
ON public.email_signups
FOR SELECT
TO authenticated
USING (true);

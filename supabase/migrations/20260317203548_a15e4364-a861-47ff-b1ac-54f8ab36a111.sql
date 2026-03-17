
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;

CREATE OR REPLACE FUNCTION public.get_completed_donation_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::integer FROM public.donations WHERE status = 'completed';
$$;

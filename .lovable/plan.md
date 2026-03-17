

## Phase 2 — Donor Wall

### New Component: `src/components/donate/DonorWall.tsx`

A self-contained component that:

1. **Fetches donors** from `donations` table where `status = 'completed' AND display_name = true` ordered by `created_at DESC`
2. **Subscribes to Supabase realtime** on the `donations` table for `INSERT` and `UPDATE` events — when a new completed+display_name row appears, prepend it to the list
3. **Running total** at the top: query count of all completed donations (not just display_name=true) — shows "[X] people have invested in this story"
4. **Card grid**: responsive wrapping grid (CSS columns or grid, not a leaderboard). Each card has:
   - Dark bg `#16213E`, gold left border (`border-l-2 border-primary`)
   - Name (or "Anonymous Friend" if `is_anonymous`)
   - Amount only if `display_amount = true`, otherwise omitted entirely
   - Message truncated to 120 chars with "..."
   - Relative timestamp using a simple helper (e.g. `formatDistanceToNow` from `date-fns`)
   - Fade-in animation on mount
5. **Empty state**: italic invitation text "Be the first to have your name on this wall."

### Database Changes

Enable realtime on the donations table:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
```

### RLS Note

The existing SELECT policy already covers the query (`status = 'completed' AND display_name = true`), so no policy changes needed. The running total count query will also go through this policy — it will only count visible-on-wall donors. To count ALL completed donors (including those not on the wall), we'll use a database function with `SECURITY DEFINER` that counts `status = 'completed'` rows.

```sql
CREATE OR REPLACE FUNCTION public.get_completed_donation_count()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*)::integer FROM public.donations WHERE status = 'completed';
$$;
```

### Integration into DonatePage

Add `<DonorWall />` below the donation form (visible whether or not the form/success state is showing). It sits outside the success/form conditional so it's always visible on `/donate`.

### Dependencies

- `date-fns` (already likely available, will check — if not, add it)


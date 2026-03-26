

## Plan: Remove Realtime Subscription from Donor Wall

Replace the Supabase realtime channel subscription in `DonorWall.tsx` with a simple fetch-on-load pattern.

### Changes

**File: `src/components/donate/DonorWall.tsx`**
- Remove the `supabase.channel('donor-wall')` subscription and `supabase.removeChannel()` cleanup
- Keep only the two fetch calls (`fetchDonors`, `fetchCount`) inside `useEffect`, firing once on mount


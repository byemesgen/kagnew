

## Plan: Email Signup with Lovable Cloud + Email Notifications

Lovable Cloud is not yet enabled on this project. Here's what we'll build:

### Step 1 — Enable Lovable Cloud
Activate Cloud to get a Supabase backend with database, edge functions, and email capabilities.

### Step 2 — Create `email_signups` table
A simple table with:
- `id` (uuid, primary key)
- `email` (text, unique)
- `created_at` (timestamptz)

RLS policy: allow anonymous inserts, restrict reads to authenticated/admin only.

### Step 3 — Create edge function `notify-signup`
An edge function that:
1. Inserts the email into `email_signups`
2. Sends you a notification email with the submitted address (using Supabase's built-in email/SMTP via Resend)

### Step 4 — Update `ContactSection.tsx`
- Add state for email input and submission status
- On submit, call the edge function via `supabase.functions.invoke('notify-signup', { body: { email } })`
- Show success/error feedback to the user

### Step 5 — Email notification to you
I'll need your email address to send notifications to. The edge function will send a simple transactional email each time someone signs up, containing the subscriber's email and timestamp.

### Technical details
- Supabase client will be initialized in `src/integrations/supabase/client.ts`
- Edge function at `supabase/functions/notify-signup/index.ts` with CORS headers and JWT verification disabled (public form)
- The `email` column will have a unique constraint to prevent duplicates
- You can view/export all collected emails from the Cloud tab → Database → `email_signups` table as CSV


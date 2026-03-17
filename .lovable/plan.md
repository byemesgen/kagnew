

## Plan: Add Password Reset Flow to Admin Login

Since the account was created with the wrong password, we need two things:

### 1. Add "Forgot Password?" link to AdminLogin page
- Add a `'reset'` mode alongside existing `'login'` and `'signup'` modes
- In reset mode, show only the email field and a "Send Reset Link" button
- Call `supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/admin/reset-password' })`
- Show confirmation message after sending

### 2. Create `/admin/reset-password` page
- New page at `src/pages/AdminResetPassword.tsx`
- Listens for the `PASSWORD_RECOVERY` event from `supabase.auth.onAuthStateChange`
- Shows a "New Password" form with confirmation field
- Calls `supabase.auth.updateUser({ password })` to set the new password
- On success, redirects to `/admin/login`

### 3. Add route in `src/main.tsx`
- Register `/admin/reset-password` as a public route (not behind `AdminRoute`)

### Styling
- Match the existing admin login page styling (same fonts, spacing, input styles)


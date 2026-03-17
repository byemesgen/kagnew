import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AdminResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery event or hash params
    const hash = window.location.hash;
    if (hash.includes('type=recovery')) {
      setReady(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-3">
            KAGNEW Admin
          </p>
          <h1 className="font-source-serif text-3xl text-foreground">Password Updated</h1>
          <p className="font-source-serif text-sm text-muted-foreground">
            Your password has been reset. You can now sign in.
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            className="w-full bg-primary text-primary-foreground font-space-mono text-sm uppercase tracking-[0.15em] py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center space-y-4">
          <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-3">
            KAGNEW Admin
          </p>
          <h1 className="font-source-serif text-3xl text-foreground">Invalid Link</h1>
          <p className="font-source-serif text-sm text-muted-foreground">
            This password reset link is invalid or has expired.
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            className="font-space-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-3">
            KAGNEW Admin
          </p>
          <h1 className="font-source-serif text-3xl text-foreground">Set New Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3">
              <p className="font-source-serif text-sm text-destructive">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-space-mono text-sm uppercase tracking-[0.15em] py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {loading ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

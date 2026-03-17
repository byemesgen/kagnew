import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [resetSent, setResetSent] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin/donations', { replace: true });
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('role', 'admin')
      .maybeSingle();

    if (!roles) {
      await supabase.auth.signOut();
      setError('You do not have admin access. Please contact the site administrator.');
      setLoading(false);
      return;
    }

    navigate('/admin/donations', { replace: true });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signupError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();
    setSignupSuccess(true);
    setLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setResetSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-3">
            KAGNEW Admin
          </p>
          <h1 className="font-source-serif text-3xl text-foreground">
            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
          </h1>
          </h1>
        </div>

        {signupSuccess ? (
          <div className="text-center space-y-4">
            <p className="font-source-serif text-foreground">
              Account created! An administrator will grant you access shortly.
            </p>
            <button
              onClick={() => { setMode('login'); setSignupSuccess(false); }}
              className="font-space-mono text-xs uppercase tracking-widest text-primary hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-5">
              <div>
                <label className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                  Password
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
                {loading
                  ? (mode === 'login' ? 'Signing in…' : 'Creating account…')
                  : (mode === 'login' ? 'Sign In' : 'Create Account')
                }
              </button>
            </form>

            <p className="text-center mt-6 font-source-serif text-sm text-muted-foreground">
              {mode === 'login' ? (
                <>
                  Need an account?{' '}
                  <button onClick={() => { setMode('signup'); setError(null); }} className="text-primary hover:underline">
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button onClick={() => { setMode('login'); setError(null); }} className="text-primary hover:underline">
                    Sign in
                  </button>
                </>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  children: React.ReactNode;
}

export function AdminRoute({ children }: Props) {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login', { replace: true });
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('role', 'admin')
        .maybeSingle();

      if (!roles) {
        await supabase.auth.signOut();
        navigate('/admin/login', { replace: true });
        return;
      }

      setStatus('authorized');
    };

    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin/login', { replace: true });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground">
          Loading…
        </p>
      </div>
    );
  }

  if (status === 'unauthorized') return null;

  return <>{children}</>;
}

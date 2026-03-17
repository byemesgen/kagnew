import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function FundraisingProgress() {
  const [raisedCents, setRaisedCents] = useState(0);
  const [goalCents, setGoalCents] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const [donationsRes, configRes] = await Promise.all([
        supabase.from('donations').select('amount_cents').eq('status', 'completed'),
        supabase.from('site_config').select('value').eq('key', 'fundraising_goal_cents').single(),
      ]);

      if (donationsRes.data) {
        setRaisedCents(donationsRes.data.reduce((sum, d) => sum + d.amount_cents, 0));
      }
      if (configRes.data) {
        setGoalCents(parseInt(configRes.data.value, 10));
      }
      setLoaded(true);
    };
    fetch();
  }, []);

  if (!loaded || goalCents <= 0) return null;

  const pct = Math.min((raisedCents / goalCents) * 100, 100);
  const raised = (raisedCents / 100).toLocaleString();
  const goal = (goalCents / 100).toLocaleString();
  const almostThere = pct >= 75;

  return (
    <div className="mb-12">
      <p className="font-source-serif text-sm text-foreground/70 text-center mb-3">
        <span className="text-primary font-semibold">${raised}</span> raised toward our{' '}
        <span className="text-foreground">${goal}</span> production goal
      </p>
      <div className="w-full h-2 rounded-full bg-card border border-border overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: loaded ? `${pct}%` : '0%' }}
        />
      </div>
      {almostThere && (
        <p className="font-space-mono text-[10px] uppercase tracking-widest text-primary text-center mt-2 animate-fade-up-in">
          Almost there — help us cross the finish line
        </p>
      )}
    </div>
  );
}

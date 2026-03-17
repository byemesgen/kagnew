import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const GOAL_CENTS = 150_000_00; // $150,000

export function FundraisingProgress() {
  const [raisedCents, setRaisedCents] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('donations')
        .select('amount_cents')
        .eq('status', 'completed');
      if (data) {
        setRaisedCents(data.reduce((sum, d) => sum + d.amount_cents, 0));
      }
      setLoaded(true);
    };
    fetch();
  }, []);

  if (!loaded) return null;

  const pct = Math.min((raisedCents / GOAL_CENTS) * 100, 100);
  const raised = (raisedCents / 100).toLocaleString();
  const goal = (GOAL_CENTS / 100).toLocaleString();
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

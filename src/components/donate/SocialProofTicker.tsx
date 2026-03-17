import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface RecentDonor {
  donor_name: string | null;
  is_anonymous: boolean | null;
  created_at: string;
}

export function SocialProofTicker() {
  const [donors, setDonors] = useState<RecentDonor[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('donations')
        .select('donor_name, is_anonymous, created_at')
        .eq('status', 'completed')
        .eq('display_name', true)
        .order('created_at', { ascending: false })
        .limit(5);
      if (data) setDonors(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (donors.length < 3) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % donors.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [donors]);

  if (donors.length < 3) return null;

  const d = donors[activeIndex];
  const name = d.is_anonymous ? 'Anonymous Friend' : (d.donor_name || 'Anonymous Friend');
  const timeAgo = formatDistanceToNow(new Date(d.created_at), { addSuffix: true });

  return (
    <div className="mb-8 flex justify-center">
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
        <p className="font-source-serif text-xs text-foreground/70">
          <span className="text-foreground">{name}</span>
          {' '}just supported KAGNEW · {timeAgo}
        </p>
      </div>
    </div>
  );
}

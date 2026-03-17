import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface Donor {
  id: string;
  donor_name: string | null;
  is_anonymous: boolean | null;
  display_amount: boolean | null;
  amount_cents: number;
  message: string | null;
  created_at: string;
  is_recurring: boolean | null;
}

function getTierBadge(amountCents: number): { label: string; color: string } | null {
  const dollars = amountCents / 100;
  if (dollars >= 1000) return { label: 'Patron', color: 'text-primary font-semibold' };
  if (dollars >= 500) return { label: 'Gold', color: 'text-primary' };
  if (dollars >= 100) return { label: 'Silver', color: 'text-foreground/60' };
  if (dollars >= 1) return { label: 'Bronze', color: 'text-amber-700' };
  return null;
}

const tierIcons: Record<string, string> = {
  Patron: '★',
  Gold: '◆',
  Silver: '◈',
  Bronze: '◇',
};

export function DonorWall() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    const { data } = await supabase
      .from('donations')
      .select('id, donor_name, is_anonymous, display_amount, amount_cents, message, created_at, is_recurring')
      .eq('status', 'completed')
      .eq('display_name', true)
      .order('created_at', { ascending: false });

    if (data) setDonors(data);
  };

  const fetchCount = async () => {
    const { data } = await supabase.rpc('get_completed_donation_count');
    if (typeof data === 'number') setTotalCount(data);
  };

  useEffect(() => {
    Promise.all([fetchDonors(), fetchCount()]).then(() => setLoading(false));

    const channel = supabase
      .channel('donor-wall')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'donations' },
        () => {
          fetchDonors();
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatAmount = (cents: number) => {
    return `$${(cents / 100).toLocaleString()}`;
  };

  const truncateMessage = (msg: string) => {
    if (msg.length <= 120) return msg;
    return msg.slice(0, 120).trimEnd() + '…';
  };

  if (loading) return null;

  return (
    <section className="mt-20 pt-16 border-t border-foreground/10">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-3">
          The Wall
        </p>
        {totalCount > 0 ? (
          <h2 className="font-source-serif text-2xl md:text-3xl text-foreground">
            <span className="text-primary">{totalCount}</span>{' '}
            {totalCount === 1 ? 'person has' : 'people have'} invested in this story
          </h2>
        ) : (
          <h2 className="font-source-serif text-2xl md:text-3xl text-foreground">
            The Donor Wall
          </h2>
        )}
      </div>

      {/* Grid or empty state */}
      {donors.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-source-serif text-lg italic text-foreground/50">
            Be the first to have your name on this wall.
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence>
            {donors.map((donor) => {
              const badge = getTierBadge(donor.amount_cents);
              return (
                <motion.div
                  key={donor.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid rounded-lg border-l-2 border-primary p-5"
                  style={{ backgroundColor: 'hsl(224 45% 16%)' }}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-source-serif text-sm text-foreground font-semibold">
                      {donor.is_anonymous ? 'Anonymous Friend' : donor.donor_name || 'Anonymous Friend'}
                    </p>
                    {badge && (
                      <span className={`font-space-mono text-[10px] uppercase tracking-wider ${badge.color}`}>
                        {tierIcons[badge.label]} {badge.label}
                      </span>
                    )}
                  </div>

                  {/* Badges row */}
                  <div className="flex items-center gap-2 mt-1.5">
                    {donor.display_amount && (
                      <span className="font-space-mono text-xs text-primary">
                        {formatAmount(donor.amount_cents)}
                      </span>
                    )}
                    {donor.is_recurring && (
                      <span className="font-space-mono text-[10px] uppercase tracking-wider text-primary/80 border border-primary/30 rounded-full px-2 py-0.5">
                        Monthly Supporter
                      </span>
                    )}
                  </div>

                  {donor.message && (
                    <p className="font-source-serif text-xs text-foreground/60 mt-3 leading-relaxed">
                      "{truncateMessage(donor.message)}"
                    </p>
                  )}

                  <p className="font-space-mono text-[10px] text-foreground/30 mt-3">
                    {formatDistanceToNow(new Date(donor.created_at), { addSuffix: true })}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

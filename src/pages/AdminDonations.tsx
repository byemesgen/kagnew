import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { format, parseISO, isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

interface Donation {
  id: string;
  created_at: string;
  donor_name: string | null;
  donor_email: string | null;
  amount_cents: number;
  currency: string;
  tier: string | null;
  is_recurring: boolean | null;
  display_name: boolean | null;
  status: string;
  stripe_payment_id: string | null;
  stripe_subscription_id: string | null;
  is_anonymous: boolean | null;
  display_amount: boolean | null;
  message: string | null;
  admin_notes: string | null;
}

export default function AdminDonations() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [wallOnly, setWallOnly] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Goal settings
  const [goalDollars, setGoalDollars] = useState('');
  const [goalSaving, setGoalSaving] = useState(false);
  const [goalSaved, setGoalSaved] = useState(false);

  const fetchDonations = async () => {
    const { data } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setDonations(data as Donation[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonations();
    // Fetch goal
    supabase
      .from('site_config')
      .select('value')
      .eq('key', 'fundraising_goal_cents')
      .single()
      .then(({ data }) => {
        if (data) setGoalDollars((parseInt(data.value, 10) / 100).toString());
      });
  }, []);

  const filtered = useMemo(() => {
    return donations.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (tierFilter !== 'all' && d.tier !== tierFilter) return false;
      if (wallOnly && !d.display_name) return false;
      if (dateFrom) {
        const from = startOfDay(parseISO(dateFrom));
        if (isBefore(parseISO(d.created_at), from)) return false;
      }
      if (dateTo) {
        const to = endOfDay(parseISO(dateTo));
        if (isAfter(parseISO(d.created_at), to)) return false;
      }
      return true;
    });
  }, [donations, statusFilter, tierFilter, wallOnly, dateFrom, dateTo]);

  const stats = useMemo(() => {
    const completed = filtered.filter((d) => d.status === 'completed');
    const totalRaised = completed.reduce((s, d) => s + d.amount_cents, 0);
    const avgGift = completed.length > 0 ? totalRaised / completed.length : 0;
    const recurringMRR = completed
      .filter((d) => d.is_recurring)
      .reduce((s, d) => s + d.amount_cents, 0);
    return {
      totalRaised,
      donorCount: completed.length,
      avgGift,
      recurringMRR,
    };
  }, [filtered]);

  const tiers = useMemo(() => {
    const set = new Set(donations.map((d) => d.tier).filter(Boolean));
    return Array.from(set) as string[];
  }, [donations]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleExportCSV = () => {
    const headers = ['Date', 'Donor Name', 'Email', 'Amount', 'Tier', 'Recurring', 'Wall Opt-in', 'Status', 'Stripe ID'];
    const rows = filtered.map((d) => [
      format(parseISO(d.created_at), 'yyyy-MM-dd HH:mm'),
      d.donor_name || '',
      d.donor_email || '',
      `$${(d.amount_cents / 100).toFixed(2)}`,
      d.tier || '',
      d.is_recurring ? 'Yes' : 'No',
      d.display_name ? 'Yes' : 'No',
      d.status,
      d.stripe_payment_id || d.stripe_subscription_id || '',
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kagnew-donations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpdateNotes = async (id: string) => {
    const notes = editingNotes[id] ?? '';
    await supabase.from('donations').update({ admin_notes: notes }).eq('id', id);
    setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, admin_notes: notes } : d)));
  };

  const handleToggleWall = async (id: string, current: boolean) => {
    await supabase.from('donations').update({ display_name: !current }).eq('id', id);
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, display_name: !current } : d))
    );
  };

  const fmt = (cents: number) => `$${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const statusBadge = (s: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-900/40 text-green-400',
      pending: 'bg-yellow-900/40 text-yellow-400',
      failed: 'bg-red-900/40 text-red-400',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-space-mono uppercase ${colors[s] || 'bg-card text-muted-foreground'}`}>
        {s}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary">KAGNEW Admin</p>
          <h1 className="font-source-serif text-xl text-foreground">Donations</h1>
        </div>
        <button
          onClick={handleLogout}
          className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Raised', value: fmt(stats.totalRaised) },
            { label: 'Donors', value: stats.donorCount.toString() },
            { label: 'Avg Gift', value: fmt(Math.round(stats.avgGift)) },
            { label: 'Recurring MRR', value: fmt(stats.recurringMRR) },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-lg p-4">
              <p className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="font-source-serif text-2xl text-primary mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-card border border-border text-foreground text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Tier</label>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-card border border-border text-foreground text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">All</option>
              {tiers.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-card border border-border text-foreground text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-card border border-border text-foreground text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer py-2">
            <input
              type="checkbox"
              checked={wallOnly}
              onChange={(e) => setWallOnly(e.target.checked)}
              className="accent-primary"
            />
            <span className="font-space-mono text-xs text-muted-foreground">Wall opt-ins only</span>
          </label>
          <button
            onClick={handleExportCSV}
            className="ml-auto font-space-mono text-xs uppercase tracking-widest border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                {['Date', 'Donor', 'Email', 'Amount', 'Tier', 'Recurring', 'Wall', 'Status', 'Stripe ID'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-space-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <>
                  <tr
                    key={d.id}
                    onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
                    className="border-b border-border/50 hover:bg-card/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-space-mono text-xs text-foreground/70">
                      {format(parseISO(d.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-4 py-3 text-foreground">{d.donor_name || '—'}</td>
                    <td className="px-4 py-3 text-foreground/70">{d.donor_email || '—'}</td>
                    <td className="px-4 py-3 text-primary font-semibold">{fmt(d.amount_cents)}</td>
                    <td className="px-4 py-3 capitalize">{d.tier || '—'}</td>
                    <td className="px-4 py-3">{d.is_recurring ? '✓' : '—'}</td>
                    <td className="px-4 py-3">{d.display_name ? '✓' : '—'}</td>
                    <td className="px-4 py-3">{statusBadge(d.status)}</td>
                    <td className="px-4 py-3 font-space-mono text-xs text-foreground/50 truncate max-w-[120px]">
                      {d.stripe_payment_id || d.stripe_subscription_id || '—'}
                    </td>
                  </tr>
                  {expandedId === d.id && (
                    <tr key={`${d.id}-detail`} className="bg-card/30">
                      <td colSpan={9} className="px-6 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left: Details */}
                          <div className="space-y-3">
                            <h3 className="font-space-mono text-xs uppercase tracking-widest text-primary">
                              Donation Details
                            </h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-muted-foreground">Amount:</span> {fmt(d.amount_cents)} {d.currency.toUpperCase()}</p>
                              <p><span className="text-muted-foreground">Status:</span> {d.status}</p>
                              <p><span className="text-muted-foreground">Tier:</span> {d.tier || 'N/A'}</p>
                              <p><span className="text-muted-foreground">Recurring:</span> {d.is_recurring ? 'Yes' : 'No'}</p>
                              <p><span className="text-muted-foreground">Anonymous:</span> {d.is_anonymous ? 'Yes' : 'No'}</p>
                              <p><span className="text-muted-foreground">Display Amount:</span> {d.display_amount ? 'Yes' : 'No'}</p>
                              {d.message && (
                                <div>
                                  <p className="text-muted-foreground mb-1">Message:</p>
                                  <p className="italic text-foreground/80 bg-card rounded p-3 border border-border">
                                    "{d.message}"
                                  </p>
                                </div>
                              )}
                              {(d.stripe_payment_id || d.stripe_subscription_id) && (
                                <p>
                                  <span className="text-muted-foreground">Stripe:</span>{' '}
                                  <a
                                    href={`https://dashboard.stripe.com/${d.stripe_subscription_id ? 'subscriptions' : 'payments'}/${d.stripe_subscription_id || d.stripe_payment_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline hover:opacity-80"
                                  >
                                    {d.stripe_subscription_id || d.stripe_payment_id}
                                  </a>
                                </p>
                              )}
                            </div>

                            {/* Wall override toggle */}
                            <div className="flex items-center gap-3 pt-2">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!d.display_name}
                                  onChange={() => handleToggleWall(d.id, !!d.display_name)}
                                  className="accent-primary"
                                />
                                <span className="font-space-mono text-xs text-muted-foreground">
                                  Show on Donor Wall
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* Right: Notes */}
                          <div className="space-y-3">
                            <h3 className="font-space-mono text-xs uppercase tracking-widest text-primary">
                              Internal Notes
                            </h3>
                            <textarea
                              value={editingNotes[d.id] ?? d.admin_notes ?? ''}
                              onChange={(e) =>
                                setEditingNotes((prev) => ({ ...prev, [d.id]: e.target.value }))
                              }
                              placeholder="Add internal notes about this donation…"
                              rows={5}
                              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            />
                            <button
                              onClick={() => handleUpdateNotes(d.id)}
                              className="font-space-mono text-xs uppercase tracking-widest bg-primary text-primary-foreground px-4 py-2 rounded hover:opacity-90 transition-opacity"
                            >
                              Save Notes
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground italic">
                    No donations match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

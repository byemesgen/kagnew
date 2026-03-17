export function TrustSignals() {
  const signals = [
    { icon: '🔒', label: 'Secure payment via Stripe' },
    { icon: '📧', label: 'Instant receipt by email' },
    { icon: '🎬', label: '100% goes to production' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4">
      {signals.map((s) => (
        <div key={s.label} className="flex items-center gap-1.5">
          <span className="text-sm">{s.icon}</span>
          <span className="font-space-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

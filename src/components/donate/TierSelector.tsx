interface TierDef {
  id: string;
  name: string;
  amount: number;
  descriptionOnce: string;
  descriptionMonthly: string;
}

const TIERS: TierDef[] = [
  { id: 'supporter', name: 'Supporter', amount: 25, descriptionOnce: 'Help us reach the next veteran', descriptionMonthly: 'A monthly commitment to keep us filming' },
  { id: 'advocate', name: 'Advocate', amount: 50, descriptionOnce: 'Fund a day of archival research', descriptionMonthly: 'Fund ongoing archival research' },
  { id: 'producer', name: 'Producer', amount: 100, descriptionOnce: 'Put a crew member on set for a day', descriptionMonthly: 'A monthly crew day' },
  { id: 'executive', name: 'Executive', amount: 250, descriptionOnce: 'Fund an interview shoot day', descriptionMonthly: 'Sustain the entire production' },
];

interface TierSelectorProps {
  selectedTier: string | null;
  customAmount: string;
  isRecurring: boolean;
  onSelectTier: (tier: string, amountCents: number) => void;
  onCustomAmountChange: (value: string) => void;
  onRecurringChange: (recurring: boolean) => void;
}

export function TierSelector({ selectedTier, customAmount, isRecurring, onSelectTier, onCustomAmountChange, onRecurringChange }: TierSelectorProps) {
  return (
    <div className="space-y-8">
      {/* Pill toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-border p-1 bg-card">
          <button
            type="button"
            onClick={() => onRecurringChange(false)}
            className={`px-6 py-2 rounded-full font-space-mono text-xs uppercase tracking-widest transition-all duration-300 ${
              !isRecurring
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            One-time
          </button>
          <button
            type="button"
            onClick={() => onRecurringChange(true)}
            className={`px-6 py-2 rounded-full font-space-mono text-xs uppercase tracking-widest transition-all duration-300 ${
              isRecurring
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => onSelectTier(tier.id, tier.amount * 100)}
            className={`group relative flex flex-col items-center text-center p-5 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
              selectedTier === tier.id
                ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(201,168,76,0.15)]'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-[0_0_15px_rgba(201,168,76,0.08)]'
            }`}
          >
            <span className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {tier.name}
            </span>
            <span className="font-source-serif text-2xl text-primary font-semibold mb-2">
              ${tier.amount}{isRecurring && <span className="text-sm">/mo</span>}
            </span>
            <span className="font-source-serif text-xs text-foreground/50 italic leading-snug">
              {isRecurring ? tier.descriptionMonthly : tier.descriptionOnce}
            </span>
          </button>
        ))}

        {/* Custom tier */}
        <button
          type="button"
          onClick={() => {
            const cents = Math.round(parseFloat(customAmount || '0') * 100);
            onSelectTier('custom', cents);
          }}
          className={`group relative flex flex-col items-center text-center p-5 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
            selectedTier === 'custom'
              ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(201,168,76,0.15)]'
              : 'border-border bg-card hover:border-primary/50 hover:shadow-[0_0_15px_rgba(201,168,76,0.08)]'
          }`}
        >
          <span className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Custom
          </span>
          <div className="flex items-center gap-1 mb-2">
            <span className="font-source-serif text-2xl text-primary font-semibold">$</span>
            <input
              type="number"
              min="1"
              placeholder="0"
              value={customAmount}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                onCustomAmountChange(e.target.value);
                const cents = Math.round(parseFloat(e.target.value || '0') * 100);
                if (cents > 0) onSelectTier('custom', cents);
              }}
              className="w-16 bg-transparent border-b border-primary/40 text-center font-source-serif text-2xl text-primary font-semibold outline-none focus:border-primary placeholder:text-primary/30"
            />
            {isRecurring && <span className="font-source-serif text-sm text-primary">/mo</span>}
          </div>
          <span className="font-source-serif text-xs text-foreground/50 italic leading-snug">
            Name your contribution
          </span>
        </button>
      </div>
    </div>
  );
}

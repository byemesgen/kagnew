const DEFAULT_TIERS = [
  { id: 'supporter', name: 'Supporter', amount: 25, description: 'Help us reach the next veteran' },
  { id: 'advocate', name: 'Advocate', amount: 50, description: 'Fund a day of archival research' },
  { id: 'producer', name: 'Producer', amount: 100, description: 'Put a crew member on set for a day' },
  { id: 'executive', name: 'Executive', amount: 250, description: 'Fund an interview shoot day' },
];

interface TierSelectorProps {
  selectedTier: string | null;
  customAmount: string;
  onSelectTier: (tier: string, amountCents: number) => void;
  onCustomAmountChange: (value: string) => void;
  tiers?: Array<{ id: string; name: string; amount: number; description?: string | null }>;
}

export function TierSelector({ selectedTier, customAmount, onSelectTier, onCustomAmountChange, tiers }: TierSelectorProps) {
  const activeTiers = (tiers && tiers.length > 0) ? tiers : DEFAULT_TIERS;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {activeTiers.map((tier) => (
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
            ${tier.amount}
          </span>
          <span className="font-source-serif text-xs text-foreground/50 italic leading-snug">
            {tier.description}
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
        className={`group relative flex flex-col items-center text-center p-5 rounded-lg border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer col-span-2 sm:col-span-1 ${
          selectedTier === 'custom'
            ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(201,168,76,0.15)]'
            : 'border-border bg-card hover:border-primary/50 hover:shadow-[0_0_15px_rgba(201,168,76,0.08)]'
        }`}
      >
        <span className="font-space-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Custom
        </span>
        <div className="flex items-center gap-1 mb-2">
          <span className="font-source-serif text-xl text-primary font-semibold">$</span>
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
            className="w-24 bg-transparent border-b border-primary/40 text-center font-source-serif text-xl text-primary font-semibold outline-none focus:border-primary placeholder:text-primary/30"
          />
        </div>
        <span className="font-source-serif text-xs text-foreground/50 italic leading-snug">
          Name your contribution
        </span>
      </button>
    </div>
  );
}

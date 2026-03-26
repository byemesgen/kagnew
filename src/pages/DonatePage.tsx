import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { TierSelector } from '@/components/donate/TierSelector';
import { DonationForm } from '@/components/donate/DonationForm';
import { DonationSuccess } from '@/components/donate/DonationSuccess';
import { DonorWall } from '@/components/donate/DonorWall';
import { FundraisingProgress } from '@/components/donate/FundraisingProgress';
import { SocialProofTicker } from '@/components/donate/SocialProofTicker';
import { ExitIntentBar } from '@/components/donate/ExitIntentBar';
import { MobileStickyDonate } from '@/components/donate/MobileStickyDonate';
import { Footer } from '@/components/Footer';

export default function DonatePage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [amountCents, setAmountCents] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [successData, setSuccessData] = useState<{
    name: string;
    email: string;
    amount: number;
    isAnonymous: boolean;
  } | null>(null);

  const handleSelectTier = (tier: string, cents: number) => {
    setSelectedTier(tier);
    setAmountCents(cents);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {successData ? (
            <DonationSuccess {...successData} />
          ) : (
            <>
              {/* Hero copy */}
              <div id="donate-hero" className="text-center mb-14">
                <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-4">
                  Support the Film
                </p>
                <h1 className="font-source-serif text-4xl md:text-5xl text-foreground mb-4">
                  Every Story Needs a Witness.
                  <br />
                  <span className="italic text-primary">Be One.</span>
                </h1>
                <p className="font-source-serif text-base text-foreground/60 max-w-xl mx-auto">
                  Your contribution directly funds production — archival research, veteran interviews, 
                  and bringing this untold chapter of history to screens worldwide.
                </p>
              </div>

              {/* Fundraising progress */}
              <FundraisingProgress />

              {/* Tier selector */}
              <div className="mb-12">
                <TierSelector
                  selectedTier={selectedTier}
                  customAmount={customAmount}
                  onSelectTier={handleSelectTier}
                  onCustomAmountChange={setCustomAmount}
                />
              </div>

              {/* Social proof ticker */}
              <SocialProofTicker />

              {/* Donation form */}
              <div id="donation-form">
                <DonationForm
                  selectedTier={selectedTier}
                  amountCents={amountCents}
                  onSuccess={setSuccessData}
                />
              </div>
            </>
          )}

          {/* Donor Wall — always visible */}
          <DonorWall />
        </div>
      </main>

      {/* Conversion overlays */}
      <ExitIntentBar />
      <MobileStickyDonate />
      <Footer />
    </div>
  );
}

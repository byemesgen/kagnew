import { useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { WhyNowSection } from './components/WhyNowSection';
import { FilmmakersSection } from './components/FilmmakersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useScrollFadeIn } from './hooks/useScrollFadeIn';
import client from '../tina/__generated__/client';

type SiteData = Awaited<ReturnType<typeof client.queries.siteContent>>;

export default function App() {
  useScrollFadeIn();
  const [tinaData, setTinaData] = useState<SiteData | null>(null);

  useEffect(() => {
    client.queries
      .siteContent({ relativePath: 'main.json' })
      .then(setTinaData)
      .catch(() => {}); // fall back to hardcoded content on error
  }, []);

  const { data } = useTina(
    tinaData ?? {
      query: '',
      variables: {},
      data: { siteContent: null },
    }
  );

  const content = data?.siteContent;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection content={content} />
        <hr className="gold-rule" />
        <StorySection content={content} />
        <hr className="gold-rule" />
        <WhyNowSection />
        <hr className="gold-rule" />
        <FilmmakersSection />
        <hr className="gold-rule" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

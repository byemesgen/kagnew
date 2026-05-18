import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { WhyNowSection } from './components/WhyNowSection';
import { FilmmakersSection } from './components/FilmmakersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useScrollFadeIn } from './hooks/useScrollFadeIn';
import { useTinaSiteContent } from './hooks/useTinaSiteContent';

export default function App() {
  useScrollFadeIn();
  const content = useTinaSiteContent();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection content={content} />
        <hr className="gold-rule" />
        <StorySection content={content} />
        <hr className="gold-rule" />
        <WhyNowSection content={content} />
        <hr className="gold-rule" />
        <FilmmakersSection content={content} />
        <hr className="gold-rule" />
        <ContactSection content={content} />
      </main>
      <Footer />
    </div>
  );
}

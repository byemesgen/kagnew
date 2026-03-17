import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { WhyNowSection } from './components/WhyNowSection';
import { FilmmakersSection } from './components/FilmmakersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { useScrollFadeIn } from './hooks/useScrollFadeIn';

export default function App() {
  useScrollFadeIn();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <hr className="gold-rule" />
        <StorySection />
        <hr className="gold-rule" />
        <WhyNowSection />
        <hr className="gold-rule" />
        <FilmmakersSection />
        <hr className="gold-rule" />
        <ContactSection />
      </main>
    </div>
  );
}

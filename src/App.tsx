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

const TINA_API_URL =
  'https://content.tinajs.io/2.4/content/d61bf053-244c-4ef8-8ee9-6fa6175fa836/github/main';
const TINA_TOKEN = '761a857b34dad1296432c653da5ae35e840a515f';

const SITE_CONTENT_QUERY = `
  query getSiteContent($relativePath: String!) {
    siteContent(relativePath: $relativePath) {
      heroTagline
      heroSubtitle
      heroDescription
      heroVideoUrl
      heroFallbackImage
      timelineItems {
        label
        date
        desc
      }
      storyParagraph1
      storyParagraph2
      storyParagraph3
    }
  }
`;

const SITE_CONTENT_VARIABLES = { relativePath: 'main.json' };

type SiteContent = {
  heroTagline?: string | null;
  heroSubtitle?: string | null;
  heroDescription?: string | null;
  heroVideoUrl?: string | null;
  heroFallbackImage?: string | null;
  timelineItems?: Array<{ label: string; date: string; desc?: string | null }> | null;
  storyParagraph1?: string | null;
  storyParagraph2?: string | null;
  storyParagraph3?: string | null;
};

export default function App() {
  useScrollFadeIn();

  const [tinaProps, setTinaProps] = useState<{
    query: string;
    variables: Record<string, string>;
    data: { siteContent: SiteContent };
  }>({
    query: SITE_CONTENT_QUERY,
    variables: SITE_CONTENT_VARIABLES,
    data: { siteContent: {} },
  });

  useEffect(() => {
    fetch(TINA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': TINA_TOKEN,
      },
      body: JSON.stringify({
        query: SITE_CONTENT_QUERY,
        variables: SITE_CONTENT_VARIABLES,
      }),
    })
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.siteContent) {
          setTinaProps({
            query: SITE_CONTENT_QUERY,
            variables: SITE_CONTENT_VARIABLES,
            data: { siteContent: data.siteContent },
          });
        }
      })
      .catch(() => {}); // silently fall back to hardcoded defaults
  }, []);

  const { data } = useTina(tinaProps);
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

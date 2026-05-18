import { useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';

const TINA_API_URL =
  'https://content.tinajs.io/2.4/content/d61bf053-244c-4ef8-8ee9-6fa6175fa836/github/main';
const TINA_TOKEN = '761a857b34dad1296432c653da5ae35e840a515f';

export type SiteContent = {
  heroTagline?: string | null;
  heroSubtitle?: string | null;
  heroDescription?: string | null;
  heroVideoUrl?: string | null;
  heroFallbackImage?: string | null;
  stats?: Array<{ number: string; label: string }> | null;
  storyParagraph1?: string | null;
  storyParagraph2?: string | null;
  storyParagraph3?: string | null;
  timelineItems?: Array<{ label: string; date: string; desc?: string | null }> | null;
  blockquoteText?: string | null;
  blockquoteCitation?: string | null;
  whyNowTagline?: string | null;
  whyNowHeading?: string | null;
  whyNowParagraph1?: string | null;
  whyNowParagraph2?: string | null;
  whyNowParagraph3?: string | null;
  filmmakers?: Array<{ photo?: string | null; name: string; title: string; bio?: string | null; email?: string | null }> | null;
  contactTagline?: string | null;
  contactHeading?: string | null;
  contactDescription?: string | null;
  donateTagline?: string | null;
  donateHeading?: string | null;
  donateHeadingItalic?: string | null;
  donateDescription?: string | null;
  tiers?: Array<{ id: string; name: string; amount: number; description?: string | null }> | null;
};

const SITE_CONTENT_QUERY = `
  query getSiteContent($relativePath: String!) {
    siteContent(relativePath: $relativePath) {
      heroTagline heroSubtitle heroDescription heroVideoUrl heroFallbackImage
      stats { number label }
      storyParagraph1 storyParagraph2 storyParagraph3
      timelineItems { label date desc }
      blockquoteText blockquoteCitation
      whyNowTagline whyNowHeading
      whyNowParagraph1 whyNowParagraph2 whyNowParagraph3
      filmmakers { photo name title bio email }
      contactTagline contactHeading contactDescription
      donateTagline donateHeading donateHeadingItalic donateDescription
      tiers { id name amount description }
    }
  }
`;

const VARIABLES = { relativePath: 'main.json' };

export function useTinaSiteContent() {
  const [tinaProps, setTinaProps] = useState<{
    query: string;
    variables: Record<string, string>;
    data: { siteContent: SiteContent };
  }>({
    query: SITE_CONTENT_QUERY,
    variables: VARIABLES,
    data: { siteContent: {} },
  });

  useEffect(() => {
    fetch(TINA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-KEY': TINA_TOKEN },
      body: JSON.stringify({ query: SITE_CONTENT_QUERY, variables: VARIABLES }),
    })
      .then((r) => r.json())
      .then(({ data }) => {
        if (data?.siteContent) {
          setTinaProps({ query: SITE_CONTENT_QUERY, variables: VARIABLES, data: { siteContent: data.siteContent } });
        }
      })
      .catch(() => {});
  }, []);

  const { data } = useTina(tinaProps);
  return data?.siteContent ?? {};
}

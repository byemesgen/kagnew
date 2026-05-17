import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const modules = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) meta[key.trim()] = rest.join(':').trim().replace(/^>-\s*/, '');
  });
  return { meta, body: match[2] };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<{ meta: Record<string, string>; body: string } | null>(null);

  useEffect(() => {
    const key = `/content/blog/${slug}.md`;
    const raw = modules[key] as string | undefined;
    if (!raw) {
      navigate('/blog', { replace: true });
      return;
    }
    setPost(parseFrontmatter(raw));
  }, [slug, navigate]);

  if (!post) return null;

  const { meta, body } = post;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="font-space-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline mb-10 inline-block"
        >
          ← All Posts
        </Link>

        {meta.heroImage && (
          <img
            src={meta.heroImage}
            alt={meta.title}
            className="w-full h-64 object-cover mb-10"
          />
        )}

        <p className="font-space-mono text-xs text-primary/70 uppercase tracking-widest mb-4">
          {meta.date ? new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          {meta.author ? ` · ${meta.author}` : ''}
        </p>

        <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-10">
          {meta.title}
        </h1>

        <article className="prose prose-invert prose-lg max-w-none font-source-serif
          prose-headings:font-playfair prose-headings:text-foreground
          prose-p:text-foreground/80 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-primary prose-blockquote:text-foreground/70
          prose-strong:text-foreground prose-hr:border-primary/20">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
}

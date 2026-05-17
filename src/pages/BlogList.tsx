import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  heroImage?: string;
}

// Statically import all markdown files from content/blog
const modules = import.meta.glob('/content/blog/*.md', { eager: true, query: '?raw', import: 'default' });

function parseFrontmatter(raw: string): { meta: Record<string, string>; slug: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { meta: {}, slug: '' };
  const meta: Record<string, string> = {};
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) meta[key.trim()] = rest.join(':').trim().replace(/^>-\s*/, '');
  });
  return { meta, slug: '' };
}

export default function BlogList() {
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    const parsed: PostMeta[] = Object.entries(modules).map(([path, raw]) => {
      const slug = path.replace('/content/blog/', '').replace('.md', '');
      const { meta } = parseFrontmatter(raw as string);
      return {
        slug,
        title: meta.title || slug,
        date: meta.date || '',
        author: meta.author,
        excerpt: meta.excerpt,
        heroImage: meta.heroImage,
      };
    });
    parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(parsed);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <p className="font-space-mono text-xs uppercase tracking-[0.35em] text-primary mb-4">
          Latest Updates
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl text-foreground mb-16">Blog</h1>

        {posts.length === 0 && (
          <p className="font-source-serif text-foreground/60">No posts yet. Check back soon.</p>
        )}

        <div className="space-y-14">
          {posts.map((post) => (
            <article key={post.slug} className="border-t border-primary/20 pt-10">
              {post.heroImage && (
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-56 object-cover mb-6"
                />
              )}
              <p className="font-space-mono text-xs text-primary/70 uppercase tracking-widest mb-3">
                {post.date ? new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                {post.author ? ` · ${post.author}` : ''}
              </p>
              <h2 className="font-playfair text-2xl md:text-3xl text-foreground mb-3">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="font-source-serif text-foreground/70 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              )}
              <Link
                to={`/blog/${post.slug}`}
                className="font-space-mono text-xs uppercase tracking-[0.2em] text-primary hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

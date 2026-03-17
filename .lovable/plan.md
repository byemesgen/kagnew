

## Plan: Transform into Cinematic "KAGNEW" Coming Soon Documentary Site

This is a complete redesign — replacing the current multi-component portfolio site with a single-page cinematic documentary coming soon site.

### What Gets Deleted
All existing section components: `Hero.tsx`, `Portfolio.tsx`, `Awards.tsx`, `About.tsx`, `Services.tsx`, `Team.tsx`, `Contact.tsx`, `Footer.tsx`, `GlassCard.tsx`, `AnimationShowcase.tsx`. The current `App.tsx` and `App.css` will be fully rewritten.

### What Gets Created / Rewritten

**1. Global Styles (`src/index.css`)**
- Replace Google Font import with Playfair Display, Source Serif 4, Space Mono
- Override CSS variables for the dark cinematic palette: `#0C0A07` bg, `#C9A84C` gold, `#FFFFFF` text, `#8A8070` muted, `#1A1712` card
- Add `scroll-behavior: smooth` on `html`
- Add CSS film grain overlay (SVG noise filter at ~4% opacity)
- Add keyframes for scroll indicator pulse, timeline node pulse, and section fade-in

**2. Tailwind Config (`tailwind.config.ts`)**
- Add font families: `playfair`, `sourceSerif`, `spaceMono`
- Add gold/kagnew color tokens
- Add custom keyframes for fade-up-in, pulse-line animations

**3. `index.html`**
- Update Google Fonts link to load Playfair Display (700), Source Serif 4 (400, 400i), Space Mono (400)
- Update title/meta to "KAGNEW — A Documentary Film"

**4. `src/App.tsx`**
- Single file with all sections inline (or thin component wrappers) — 5 sections + nav + footer
- Uses `useEffect` + `IntersectionObserver` for scroll-triggered fade-ins on each section
- Uses `useState` for nav scroll state and mobile menu toggle

**5. New Components (keeping it modular)**

- **`src/components/Navigation.tsx`** — Fixed top nav with KAGNEW logo (left), section links + "Stay Informed" CTA (right). Transparent → dark on scroll. Mobile hamburger → full-screen overlay.

- **`src/components/HeroSection.tsx`** — Full viewport. Film grain overlay via CSS pseudo-element. Eyebrow text, massive KAGNEW headline, sub-headline, deck paragraph, two CTA buttons, animated scroll indicator (thin gold pulsing line).

- **`src/components/StorySection.tsx`** — `#111109` bg. Three stat cards (gold number, label, gold top border). Two-column text layout. Blockquote with gold left border.

- **`src/components/WhyNowSection.tsx`** — `#161410` bg. Centered copy (max-w 680px). CSS-only horizontal timeline with three nodes (1951, 1953, 2025), third node pulsing.

- **`src/components/FilmmakersSection.tsx`** — `#0C0A07` bg. Two cards side-by-side with initials avatars (gold circle), name, title, bio. Responsive stack on mobile.

- **`src/components/ContactSection.tsx`** — `#080806` bg. Email signup form (static UI only — dark input, gold border, gold submit button). Footer text with copyright.

- **`src/hooks/useScrollFadeIn.ts`** — Custom hook wrapping IntersectionObserver to add a `.visible` class (opacity 0→1, translateY) when elements enter viewport.

### Technical Details

- **Film grain**: CSS `::after` pseudo-element on hero with an inline SVG `url("data:image/svg+xml,...")` noise pattern at 4% opacity, `pointer-events: none`
- **Nav scroll detection**: `window.scrollY > 50` toggles `bg-transparent` → `rgba(8,8,6,0.92)` with `backdrop-blur`
- **Scroll indicator**: A 40px tall, 1px wide gold div with a repeating translateY animation
- **Timeline**: Flexbox row, `::before` pseudo-element for the connecting gold line, three positioned dots, last dot with `animate-pulse`
- **Responsive**: Tailwind breakpoints — stat cards `grid-cols-1 md:grid-cols-3`, filmmaker cards `grid-cols-1 md:grid-cols-2`, text columns `flex-col md:flex-row`
- **No framer-motion needed** — pure CSS animations + IntersectionObserver for simplicity
- **Smooth scroll**: `html { scroll-behavior: smooth }` + anchor `href="#section-id"` links

### Color & Typography Summary

```text
Colors:
  #0C0A07  Deep background
  #111109  Story section bg
  #161410  Why Now section bg
  #1A1712  Card surfaces
  #080806  Contact section bg
  #C9A84C  Gold accent
  #FFFFFF  Primary text
  #8A8070  Muted text

Fonts:
  Playfair Display 700    → Headings, logo
  Source Serif 4 400/400i  → Body copy
  Space Mono 400           → Labels, nav, eyebrows
```

### Files Modified
| File | Action |
|------|--------|
| `index.html` | Update fonts, title, meta |
| `src/index.css` | Full rewrite — new palette, grain, animations |
| `tailwind.config.ts` | Add fonts, colors, keyframes |
| `src/App.tsx` | Rewrite — render new sections |
| `src/App.css` | Delete or empty |
| `src/components/Navigation.tsx` | New |
| `src/components/HeroSection.tsx` | New |
| `src/components/StorySection.tsx` | New |
| `src/components/WhyNowSection.tsx` | New |
| `src/components/FilmmakersSection.tsx` | New |
| `src/components/ContactSection.tsx` | New |
| `src/hooks/useScrollFadeIn.ts` | New |
| Old components (`Hero.tsx`, `Portfolio.tsx`, etc.) | Delete |


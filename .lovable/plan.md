

## Plan: Privacy Policy Page + Footer Link

### 1. Create `/src/pages/PrivacyPolicy.tsx`
- Full privacy policy page with the exact legal text provided
- Hero section: "KAGNEW" in large gold text, "Privacy Policy" subtitle, effective date in muted text
- Content column: max-width 760px, centered, with all 13 sections
- Gold section headings, white sub-headings, off-white body text (#EEEEEE), line-height 1.7
- Gold horizontal rules (1px, 30% opacity) between numbered sections
- Gold bullet styling for lists
- Mobile: 24px horizontal padding
- Navigation component included at top
- Link back to home at bottom

### 2. Add route in `src/main.tsx`
- Register `/privacy` route pointing to the new page

### 3. Add footer to `src/App.tsx`
- Add a simple footer below `<main>` with a link to `/privacy`
- Styled to match the site aesthetic (dark bg, gold accents, Space Mono for text)
- Include copyright line and privacy policy link

### 4. Add footer to `src/pages/DonatePage.tsx`
- Same footer component or inline footer with privacy link for consistency

### Approach
- Create a shared `Footer` component at `src/components/Footer.tsx` to avoid duplication
- Footer will contain: copyright text, privacy policy link, and site name
- Include footer in App.tsx and DonatePage.tsx (and PrivacyPolicy page itself)


import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.VITE_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Publish Date", required: true },
          { type: "string", name: "author", label: "Author" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "image", name: "heroImage", label: "Hero Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      {
        name: "siteContent",
        label: "Site Content",
        path: "content/site",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          // ─── HERO ───────────────────────────────────────────────
          { type: "string", name: "heroTagline", label: "Hero — Tagline" },
          { type: "string", name: "heroSubtitle", label: "Hero — Subtitle", ui: { component: "textarea" } },
          { type: "string", name: "heroDescription", label: "Hero — Description", ui: { component: "textarea" } },
          {
            type: "string",
            name: "heroVideoUrl",
            label: "Hero — Background Video (Vimeo embed URL)",
            description: "e.g. https://player.vimeo.com/video/123456?background=1&autoplay=1&loop=1&muted=1",
          },
          { type: "image", name: "heroFallbackImage", label: "Hero — Fallback Image" },

          // ─── STORY ──────────────────────────────────────────────
          {
            type: "object",
            name: "stats",
            label: "Story — Stats",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.number }) },
            fields: [
              { type: "string", name: "number", label: "Number (e.g. 6,037)", required: true },
              { type: "string", name: "label", label: "Label", required: true },
            ],
          },
          { type: "string", name: "storyHeading", label: "Story — Section Heading (e.g. The Kagnew Battalion)" },
          { type: "string", name: "storyParagraph1", label: "Story — Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph2", label: "Story — Paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph3", label: "Story — Paragraph 3", ui: { component: "textarea" } },
          {
            type: "object",
            name: "timelineItems",
            label: "Story — Timeline Items",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Title (e.g. Conflict Begins)", required: true },
              { type: "string", name: "date", label: "Date (e.g. June 25, 1950)", required: true },
              { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "blockquoteText", label: "Story — Blockquote Text", ui: { component: "textarea" } },
          { type: "string", name: "blockquoteCitation", label: "Story — Blockquote Citation" },

          // ─── WHY NOW ────────────────────────────────────────────
          { type: "string", name: "whyNowTagline", label: "Why Now — Tagline" },
          { type: "string", name: "whyNowHeading", label: "Why Now — Heading" },
          { type: "string", name: "whyNowParagraph1", label: "Why Now — Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "whyNowParagraph2", label: "Why Now — Paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "whyNowParagraph3", label: "Why Now — Paragraph 3", ui: { component: "textarea" } },

          // ─── FILMMAKERS ─────────────────────────────────────────
          {
            type: "object",
            name: "filmmakers",
            label: "Filmmakers",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: "image", name: "photo", label: "Photo" },
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "title", label: "Role / Title", required: true },
              { type: "string", name: "bio", label: "Bio", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email (optional)" },
            ],
          },

          // ─── CONTACT ────────────────────────────────────────────
          { type: "string", name: "contactTagline", label: "Contact — Tagline" },
          { type: "string", name: "contactHeading", label: "Contact — Heading" },
          { type: "string", name: "contactDescription", label: "Contact — Description", ui: { component: "textarea" } },

          // ─── DONATE PAGE ────────────────────────────────────────
          { type: "string", name: "donateTagline", label: "Donate — Tagline" },
          { type: "string", name: "donateHeading", label: "Donate — Heading" },
          { type: "string", name: "donateHeadingItalic", label: "Donate — Heading Italic Part" },
          { type: "string", name: "donateDescription", label: "Donate — Description", ui: { component: "textarea" } },
          {
            type: "object",
            name: "tiers",
            label: "Donate — Tiers",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.name} — $${item?.amount}` }) },
            fields: [
              { type: "string", name: "id", label: "ID (do not change)", required: true },
              { type: "string", name: "name", label: "Tier Name", required: true },
              { type: "number", name: "amount", label: "Amount ($)", required: true },
              { type: "string", name: "description", label: "Description" },
            ],
          },
        ],
      },
    ],
  },
});

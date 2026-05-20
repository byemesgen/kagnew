// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.VITE_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Publish Date", required: true },
          { type: "string", name: "author", label: "Author" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "image", name: "heroImage", label: "Hero Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      {
        name: "siteContent",
        label: "Site Content",
        path: "content/site",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          // ─── HERO ───────────────────────────────────────────────
          { type: "string", name: "heroTagline", label: "Hero \u2014 Tagline" },
          { type: "string", name: "heroSubtitle", label: "Hero \u2014 Subtitle", ui: { component: "textarea" } },
          { type: "string", name: "heroDescription", label: "Hero \u2014 Description", ui: { component: "textarea" } },
          {
            type: "string",
            name: "heroVideoUrl",
            label: "Hero \u2014 Background Video (Vimeo embed URL)",
            description: "e.g. https://player.vimeo.com/video/123456?background=1&autoplay=1&loop=1&muted=1"
          },
          { type: "image", name: "heroFallbackImage", label: "Hero \u2014 Fallback Image" },
          // ─── STORY ──────────────────────────────────────────────
          {
            type: "object",
            name: "stats",
            label: "Story \u2014 Stats",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.number }) },
            fields: [
              { type: "string", name: "number", label: "Number (e.g. 6,037)", required: true },
              { type: "string", name: "label", label: "Label", required: true }
            ]
          },
          { type: "string", name: "storyHeading", label: "Story \u2014 Section Heading (e.g. The Kagnew Battalion)" },
          { type: "string", name: "storyParagraph1", label: "Story \u2014 Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph2", label: "Story \u2014 Paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "storyParagraph3", label: "Story \u2014 Paragraph 3", ui: { component: "textarea" } },
          {
            type: "object",
            name: "timelineItems",
            label: "Story \u2014 Timeline Items",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Title (e.g. Conflict Begins)", required: true },
              { type: "string", name: "date", label: "Date (e.g. June 25, 1950)", required: true },
              { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "blockquoteText", label: "Story \u2014 Blockquote Text", ui: { component: "textarea" } },
          { type: "string", name: "blockquoteCitation", label: "Story \u2014 Blockquote Citation" },
          // ─── WHY NOW ────────────────────────────────────────────
          { type: "string", name: "whyNowTagline", label: "Why Now \u2014 Tagline" },
          { type: "string", name: "whyNowHeading", label: "Why Now \u2014 Heading" },
          { type: "string", name: "whyNowParagraph1", label: "Why Now \u2014 Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "whyNowParagraph2", label: "Why Now \u2014 Paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "whyNowParagraph3", label: "Why Now \u2014 Paragraph 3", ui: { component: "textarea" } },
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
              { type: "string", name: "email", label: "Email (optional)" }
            ]
          },
          // ─── CONTACT ────────────────────────────────────────────
          { type: "string", name: "contactTagline", label: "Contact \u2014 Tagline" },
          { type: "string", name: "contactHeading", label: "Contact \u2014 Heading" },
          { type: "string", name: "contactDescription", label: "Contact \u2014 Description", ui: { component: "textarea" } },
          // ─── DONATE PAGE ────────────────────────────────────────
          { type: "string", name: "donateTagline", label: "Donate \u2014 Tagline" },
          { type: "string", name: "donateHeading", label: "Donate \u2014 Heading" },
          { type: "string", name: "donateHeadingItalic", label: "Donate \u2014 Heading Italic Part" },
          { type: "string", name: "donateDescription", label: "Donate \u2014 Description", ui: { component: "textarea" } },
          {
            type: "object",
            name: "tiers",
            label: "Donate \u2014 Tiers",
            list: true,
            ui: { itemProps: (item) => ({ label: `${item?.name} \u2014 $${item?.amount}` }) },
            fields: [
              { type: "string", name: "id", label: "ID (do not change)", required: true },
              { type: "string", name: "name", label: "Tier Name", required: true },
              { type: "number", name: "amount", label: "Amount ($)", required: true },
              { type: "string", name: "description", label: "Description" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

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
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
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
          {
            type: "string",
            name: "heroTagline",
            label: "Hero Tagline"
          },
          {
            type: "string",
            name: "heroSubtitle",
            label: "Hero Subtitle",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "heroDescription",
            label: "Hero Description",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "storyParagraph1",
            label: "Story Paragraph 1",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "storyParagraph2",
            label: "Story Paragraph 2",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "storyParagraph3",
            label: "Story Paragraph 3",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "heroVideoUrl",
            label: "Hero Background Video (Vimeo embed URL)",
            description: "Paste the full Vimeo player embed URL, e.g. https://player.vimeo.com/video/123456?background=1&autoplay=1&loop=1&muted=1"
          },
          {
            type: "image",
            name: "heroFallbackImage",
            label: "Hero Fallback Image",
            description: "Shown if the video fails to load"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

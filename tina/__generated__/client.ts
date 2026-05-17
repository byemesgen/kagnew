import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({
  url: 'https://content.tinajs.io/2.4/content/d61bf053-244c-4ef8-8ee9-6fa6175fa836/github/main',
  token: '761a857b34dad1296432c653da5ae35e840a515f',
  queries,
});
export default client;

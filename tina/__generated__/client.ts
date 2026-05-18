import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '761a857b34dad1296432c653da5ae35e840a515f', queries,  });
export default client;
  
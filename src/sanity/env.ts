// Sanity connection settings. Defaults to the Footworx project; can be overridden in Netlify
// and in a local .env.local file. Both are safe to be public.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "m1ozb6xb";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

export const sanityConfigured = projectId.length > 0;

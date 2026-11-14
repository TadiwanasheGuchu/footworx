// Sanity connection settings. Set these in Netlify (Site configuration > Environment variables)
// and in a local .env.local file. Both are safe to be public.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";

export const sanityConfigured = projectId.length > 0;

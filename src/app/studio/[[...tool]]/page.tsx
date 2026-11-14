import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { sanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <div style={{ padding: 32, fontFamily: "system-ui", maxWidth: 560 }}>
        <h1>Studio not connected yet</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID in Netlify&apos;s environment variables, then redeploy.</p>
      </div>
    );
  }
  return <NextStudio config={config} />;
}

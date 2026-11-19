import type { Metadata } from "next";

// Canonical production host. The live site serves lutonminicab.com; www and the vercel.app
// address redirect to it (set in Vercel, and www also in next.config.ts). Keep these in step.
export const siteOrigin = "https://lutonminicab.com";
export const siteName = "Luton Minicab";
// The homepage's title in search results and link previews (owner approved, 19 November 2026).
export const homeTitle = "Luton Minicab | Taxis & Airport Transfers in Luton";

// Indexable only on the production deployment, or when SITE_INDEXABLE=true is set. Don't use
// NODE_ENV here: every `next build` (including Vercel previews) runs with NODE_ENV=production.
export const isSiteIndexable =
  process.env.SITE_INDEXABLE === "true" || process.env.VERCEL_ENV === "production";

// The sitemap's lastmod. Bump this when page content changes (not on every build: Google
// ignores lastmod values that change without real edits). Not `new Date()`.
export const contentUpdated = "2026-11-19";

// Search Console ownership code (the content value of the meta tag Google gives you).
export const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

// One place for a page's title, description, canonical and link-preview (Open Graph / Twitter)
// tags. `path` starts with "/" ("/" for the homepage). The shared image is app/opengraph-image.png.
export function pageMetadata({ title, description, path }: { title?: string; description: string; path: string }): Metadata {
  const shareTitle = title ? `${title} | ${siteName}` : homeTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_GB", siteName, url: path, title: shareTitle, description },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

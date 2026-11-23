import type { Metadata } from "next";

// Canonical production host. The live site serves lutonminicab.com; www and the vercel.app
// address redirect to it (set in Vercel, and www also in next.config.ts). Keep these in step.
export const siteOrigin = "https://lutonminicab.com";
export const siteName = "Luton Minicab";
// The homepage's title in search results and link previews (owner approved, 23 November 2026:
// lead with proven benefits, never "cheap" or other price claims the site can't back up).
export const homeTitle = "Luton Minicab | Taxis & Airport Transfers, Fixed Fares 24/7";

// Search titles: the page's keyword plus the proven selling points (owner's choice, 23 November
// 2026). The layout adds " | Luton Minicab", so the part here stays within 44 characters (about
// 60 in all, what Google shows); ", 24/7" is dropped when the keyword is long.
export function sellTitle(keyword: string) {
  const full = `${keyword} | Fixed Fares, 24/7`;
  return full.length <= 44 ? full : `${keyword} | Fixed Fares`;
}

// Indexable only on the production deployment, or when SITE_INDEXABLE=true is set. Don't use
// NODE_ENV here: every `next build` (including Vercel previews) runs with NODE_ENV=production.
export const isSiteIndexable =
  process.env.SITE_INDEXABLE === "true" || process.env.VERCEL_ENV === "production";

// The sitemap's lastmod. Bump this when page content changes (not on every build: Google
// ignores lastmod values that change without real edits). Not `new Date()`.
export const contentUpdated = "2026-11-23";

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

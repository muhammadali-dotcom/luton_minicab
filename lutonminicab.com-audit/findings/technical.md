# Technical SEO findings: lutonminicab.com (audited 20 Nov 2026)

**Technical score: 86 / 100**

| Category | Status |
|---|---|
| Crawlability (robots, sitemap) | Pass |
| Indexability (canonicals, noindex, titles) | Pass |
| Security headers | Partial (only HSTS) |
| URL structure and redirects | Pass |
| Mobile | Pass (viewport set, lang en-GB) |
| JS rendering | Pass with caveat (heading animation) |
| Structured data | Pass (JSON-LD on all sampled pages) |
| IndexNow | Not implemented |

## What works
- robots.txt: `Allow: /`, `Disallow: /api/`, Host and Sitemap lines. Helper confirms /sitemap.xml is a valid urlset (HTTP 200). No sitemap index needed.
- Sitemap: 37 URLs, all 200 with no redirects, every canonical is self-referencing and matches the sitemap URL exactly (apex, https, no trailing slash). No noindex URLs in the sitemap.
- Redirects: http://www.lutonminicab.com/about goes https://www then apex in 2 hops, both 308. http apex goes to https apex 308. Trailing slash goes to the slashless URL (308). Query strings return 200 (canonical handles them).
- noindex: pickup area (/areas/caddington) returns 200 with `noindex, follow`. Unknown slugs (/zzz-nope and /areas/zzz-nope) return a real HTTP 404 with `noindex`. All 37 sitemap pages carry `index, follow`.
- Internal links: 59 unique internal link targets found across the 37 pages, all return 200 (no broken links, no redirect links).
- Metadata: all 37 titles unique and 23-64 characters. All meta descriptions 94-160 characters, none missing or over 160. Exactly one h1 per page. Open Graph complete (title, description, url, locale en_GB, 1200x630 image). `<html lang="en-GB">`, viewport `width=device-width, initial-scale=1`.
- JSON-LD present (homepage 4 blocks, /fleet 6). Manifest 200. Server HTML is fully prerendered (120-290 KB), TTFB roughly 0.2-0.3 s from CDN cache (a few pages 0.65-0.73 s, likely cache-miss samples).
- hreflang: none, correct for en-GB only.

## Findings

### Medium
**M1. Missing security headers** 
Evidence: `curl -I` shows only `strict-transport-security: max-age=63072000`. No Content-Security-Policy, X-Content-Type-Options, X-Frame-Options (or frame-ancestors), Referrer-Policy or Permissions-Policy. HSTS lacks `includeSubDomains; preload`.
Recommendation: add a `headers()` block in `next.config.ts` for `/:path*`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, a `Permissions-Policy` (camera, microphone, geolocation off), and HSTS `max-age=63072000; includeSubDomains; preload` (only if all subdomains are HTTPS). Add a CSP in report-only mode first (needs allowances for inline Next scripts and the external booker). Not a ranking factor, but part of a clean technical baseline.

**M2. Heading animation: server HTML ships h1/h2 at `opacity:0` and words as `aria-hidden` spans at `opacity:0`**
Evidence: homepage h1 is `<h1 aria-label="Luton Minicab: Wherever you're going..." style="opacity:0">` with each word in `<span aria-hidden="true" style="opacity:0;transform:translateY(20px)">`. A `<noscript>` rule forces opacity 1.
Assessment: this is not a cloaking or hidden-text risk. The words are real text in the DOM, the h1 carries the same text in `aria-label`, the animation is a standard entrance effect that ends visible, and the intent is not deceptive. Google renders JS and indexes the text. The residual risks are: (a) Google can treat initially `opacity:0` content as lower priority if rendering is delayed or fails, (b) the h1 is not visible until hydration, which delays LCP/visual completeness if the h1 is ever the LCP element (on mobile the heading sits above the photo, so it may be), and (c) non-JS crawlers and some AI crawlers read word-split spans, which usually extract fine but concatenate unpredictably.
Recommendation: (1) Verify in Search Console URL Inspection > Rendered HTML and screenshot that headings show; (2) check field LCP element on mobile via PageSpeed/CrUX, and if the h1 is LCP, render the h1 visible in server HTML (animate only from a client-side trigger after hydration, or limit the effect to h2s); (3) keep the existing `<noscript>` rule. Treat as monitor, not fix-now, unless LCP data shows a problem.

### Low
**L1. IndexNow not implemented.** `/indexnow.txt` returns 404 and no key file exists. Bing, Yandex and Naver benefit from push notification, though it is optional for a 37-page site. Recommendation: generate a key, host `/<key>.txt`, and submit changed URLs to `https://api.indexnow.org/indexnow` on deploy (a Vercel deploy hook or script). Google ignores IndexNow, so submit the sitemap in Search Console as already planned.

**L2. Identical `lastmod` on all 37 sitemap URLs (2026-11-20).** Driven by the single `contentUpdated` constant. Google may discount lastmod when every URL shares it. Recommendation: use per-page dates (for example legal pages keep `legalUpdated`, airport guide its checked date), changed only when that page's content changes.

**L3. Redirect chain of 2 hops for http://www.** (http www to https www to apex). Acceptable (both 308), but could be one hop if Vercel redirects http www straight to the apex. Low priority; HSTS already covers browsers.

**L4. Pickup noindex pages are linked sitewide (59 internal link targets include them).** Fine by design (`noindex, follow`). Just confirm they stay out of the sitemap (confirmed) and that nothing links them with misleading anchor text.

**L5. No llms.txt (404).** Optional; low value for ranking. Only add if you want AI-crawler guidance.

**L6. Caching:** HTML is `cache-control: public, max-age=0, must-revalidate` with `x-vercel-cache: HIT` (fine on Vercel). No issue, noted for completeness.

## Not found (no Critical or High issues)
No 4xx or 5xx in the sitemap or internal links, no canonical mismatches, no duplicate titles, no redirect loops, no mixed noindex/sitemap conflicts.

## Scope notes
Core Web Vitals were not measured (no lab run). Only source and header checks were done. Checked with curl against production on 20 Nov 2026.

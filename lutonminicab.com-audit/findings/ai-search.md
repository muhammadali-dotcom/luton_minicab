# AI Search Readiness (GEO): lutonminicab.com

Audited live on 20 November 2026 (37 sitemap URLs fetched raw, plus render_page.py extraction on six key pages and Mozilla Readability run on raw HTML).

## AI Search Readiness score: 52 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 62 | 15.5 |
| Structural readability | 20% | 45 | 9.0 |
| Multi-modal content | 15% | 60 | 9.0 |
| Authority and brand signals | 20% | 35 | 7.0 |
| Technical accessibility | 20% | 60 | 12.0 |
| **Total** | | | **52** |

Platform estimates (indicative, not measured visibility): Google AI Overviews 60, ChatGPT Search 45, Perplexity 42, Bing Copilot 50. Google renders JavaScript, so it is least affected by the streaming issue (H1); ChatGPT, Perplexity and Claude fetchers mostly read raw HTML.

## AI crawler access (robots.txt)

robots.txt: `User-Agent: * / Allow: / / Disallow: /api/`, plus `Sitemap:`. No bot-specific groups, so every crawler below is allowed. All tested user agents got HTTP 200 on a route page.

| Crawler | Governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| PerplexityBot | Perplexity search | Allowed |
| Googlebot | Google Search and AI Overviews | Allowed |
| Bingbot | Bing and Copilot grounding | Allowed |
| GPTBot | OpenAI model training (not ChatGPT Search) | Allowed |
| ClaudeBot | Anthropic model training (not Claude search) | Allowed |
| Google-Extended | Gemini/Vertex training and grounding; never AI Overviews inclusion | Allowed |
| Applebot-Extended | Apple Intelligence training only | Allowed |
| CCBot, cohere-ai | Training datasets | Allowed |

This is a sensible default for a local business that wants to be cited. Blocking the training crawlers is optional and would not affect search citations.

## Discovery files

| File | Status |
|---|---|
| /robots.txt | Present, valid |
| /sitemap.xml | Present, 37 URLs, matches the indexable set |
| /manifest.webmanifest | Present |
| /llms.txt, /llms-full.txt | Missing (404) |
| RSL 1.0 licence (/license.xml, robots `License:`) | Missing |
| /.well-known/security.txt, /ai.txt | Missing |

## What works

- Pages are server-rendered (`is_spa: false`); all copy, FAQs and JSON-LD are present in the raw HTML. Vercel serves it from the edge cache (`x-vercel-cache: HIT`).
- No bot is blocked; sitemap, canonicals and `index, follow` are all in place on the 37 pages.
- Strong structured data: one `TaxiService` entity (`@id` `#business`) with `parentOrganization` A2B Radio Cars, `identifier` TfL licence 6973, 24/7 `openingHoursSpecification`, 27 `areaServed` places; `WebSite`; `BreadcrumbList`; one `FAQPage` per page (checked: no duplicates); `ItemList` of vehicles on /fleet.
- FAQ answers are direct and quotable, for example "Your driver waits free for 15 minutes once they reach your pickup point at the agreed time. After that, waiting charges apply." and "It's usually about 50 minutes to 1 hour 10 minutes, depending on traffic and the time of day."
- Key facts are consistent across the site: operator line "Operated by A2B Radio Cars, TfL private hire operator licence 6973" appears on all 37 pages; "24/7" and "DBS-checked" appear on every page; 15 free minutes appears on the airport, route (Heathrow), guide, contact and terms pages.
- Route and guide pages contain genuinely specific, citable facts (journey times, Heathrow terminals 2 to 5, Luton Pick Up Zone about a 5-minute walk, with "Checked on london-luton.co.uk on 6 November 2026").
- The Terms carry a clean entity sentence: "Luton Minicab ... is operated by A2B Radio Cars, a TfL-licensed private hire operator (licence 6973). Bookings are handled by our booking team in Hounslow, West London (TW3)."
- The /luton-airport-guide answers a real comparison question in one passage: "A pre-booked journey with us has a fixed fare agreed when you book".

## Findings

### H1. Main content of 25 of 37 pages is streamed into a `hidden` div after the footer (Critical)

**Evidence.** On every `/services/[slug]`, `/airports/[slug]`, `/routes/[slug]` and `/areas/[slug]` page (25 pages, all in the sitemap), the raw HTML contains the `PageFallback` `<main>` in document order, then the footer, then the real content inside `<div hidden id="S:0">`, which React's inline script swaps in on load. On /routes/luton-to-heathrow the footer "Explore" heading is at byte 55,373 and the `<h1>` at byte 71,863. Every crawler UA tested (GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Googlebot, Bingbot) receives this same cached HTML.

Mozilla Readability (the extractor behind many "read this URL" AI pipelines) skips any node with the `hidden` attribute (`_isProbablyVisible`). Running it on the raw HTML:

| Page | Readability output |
|---|---|
| /airports/luton | 16 words: "© 2026 Luton Minicab Operated by A2B Radio Cars, TfL private hire operator licence 6973 Powered by MyCabify" |
| /routes/luton-to-heathrow | the same 16 words |
| /areas/luton | the same 16 words |
| /contact (no streaming) | 410 words, real content |

Trafilatura did recover the content, so the impact depends on each AI platform's extractor, but these 25 pages are exactly the airport, route and area pages most likely to be cited for "taxi Luton to Heathrow" style questions. Raw HTML also contains two `<main>` elements on these pages.

**Recommendation.** Make the prerendered HTML contain the page content in document order. The slugs are already listed by `generateStaticParams`, so investigate (per `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` and `02-guides/streaming.md`) whether the content can resolve inside the static shell rather than as a late boundary: for example reading `params` without the page-level `<Suspense>` (with `dynamicParams = false`, since unknown slugs should 404 anyway), or moving the boundary so only a small part suspends. Keep the "pages open at the top" behaviour the `PageFallback` protects. Acceptance test: `curl -s https://lutonminicab.com/routes/luton-to-heathrow | grep -c 'div hidden id="S:'` returns 0 and the `<h1>` comes before the footer. Effort: medium (0.5 to 1 day including browser checks).

### H2. Heading text exists only inside `aria-hidden` word spans (High)

**Evidence.** Every animated h1 and h2 is rendered as `<h1 aria-label="Luton to Heathrow, door to terminal." style="opacity:0"><span aria-hidden="true" style="opacity:0;transform:translateY(20px)">Luton</span> ...`. The accessibility tree is fine (the heading takes its name from `aria-label`), but extractors that drop `aria-hidden` content lose every section heading: trafilatura's output for the homepage, /airports/luton and the Heathrow route page contains no h1 or h2 text at all, and Readability leaves the headings empty. Headings such as "Luton to Heathrow: what to expect." and "Luton to Heathrow taxi: your questions." are the context that makes the passages under them citable.

**Recommendation.** In `SectionHeading` / `split-words`, render the plain heading text once as a real text node that is not `aria-hidden` (a visually hidden `sr-only` span), keep the animated word spans `aria-hidden`, and drop the `aria-label` (it then becomes redundant). Layout and animation stay identical. Effort: low (1 to 2 hours plus a hydration check).

### H3. About 78 content blocks per page ship with inline `opacity:0` (Medium)

**Evidence.** /routes/luton-to-heathrow raw HTML has 78 `style="opacity:0..."` occurrences (headings, hero line, fact cards, FAQ blocks). The `<noscript>` style only helps browsers with JavaScript disabled; a renderer or agent that loads HTML and CSS but does not run (or waits too little for) the motion scripts, including screenshot-based agents, sees blank sections. Text remains in the DOM, so text crawlers are unaffected.

**Recommendation.** Start revealed content visible in server HTML and only apply the hidden starting state after hydration (for example a `js-ready` class on `<html>` set by a tiny inline script, with the initial opacity applied through that class rather than inline styles). Effort: medium.

### H4. Entity description is weak and partly ambiguous (High)

**Evidence.**
- About page: "Luton Minicab is a separate business providing local journeys, school runs, airport transfers and longer trips. It is operated by A2B Radio Cars". "Separate business" (separate from what?) and "operated by" in adjacent sentences reads as contradictory to a model; the TfL licence is not in this passage.
- `parentOrganization` is `{"@type":"Organization","name":"A2B Radio Cars"}` with no `url`, `@id` or `sameAs`, so A2B is not linkable to heathrowminicab.com or to TfL's licence register.
- `identifier` is a free-text string, not a `PropertyValue`.
- `sameAs` is absent because all `site.profiles` are `null`; the public email is a gmail address (`a2bradiocarss@gmail.com`).
- The five route pages' `TaxiService` uses `"provider":{"@type":"LocalBusiness","name":"Luton Minicab"}` instead of `{"@id":"https://lutonminicab.com/#business"}` (area pages already do it correctly).
- No Wikipedia/Wikidata result for "Luton Minicab" or "A2B Radio Cars" (0 hits on the Wikipedia API). Reddit, YouTube and search-engine checks were blocked from this environment, so off-site mentions could not be verified; with no profiles in schema, assume little or no third-party presence.

**Recommendation.**
1. Replace the About sentence with one self-contained entity line, e.g. "Luton Minicab is a private hire taxi service for Luton and nearby towns. It is run by A2B Radio Cars, a TfL-licensed private hire operator (licence 6973), and bookings are handled by our team in Hounslow, West London." (owner to approve the wording; drop "separate business" unless it has a specific legal purpose).
2. Give `parentOrganization` an `@id`, `url` (heathrowminicab.com, if the owner agrees) and the licence as `"identifier": {"@type":"PropertyValue","propertyID":"TfL private hire operator licence","value":"6973"}`.
3. Point route-page `provider` at `#business`.
4. Fill `site.profiles` as soon as a Google Business Profile, Facebook, Trustpilot or Yell listing exists; these become `sameAs`.
5. Off-site: YouTube mentions correlate most strongly with AI citations (about 0.74), followed by Reddit and Wikipedia; backlinks alone correlate weakly (about 0.27). A short YouTube video (meeting your driver at Luton Airport, for example) and genuine local listings or directory mentions will do more than link building. A brand-domain email would also help trust.

Effort: low for 1 to 3 (an hour), ongoing for 4 and 5.

### M1. "Fixed fares" is phrased inconsistently, and the external booker may contradict it (Medium)

**Evidence.** Meta descriptions and route/airport pages say "Fixed fares" / "You'll know your fare when you book", but the homepage benefit is "Clear fares: You'll know the price before you go", and the route booking block says "We'll confirm the journey details and fare with you." requirement.md records that the external booker at heathrowminicabbooking.com still says the price can follow distance driven. An AI model reading both domains may report the fare policy as unclear.

**Recommendation.** Use one canonical sentence everywhere, e.g. "Your fare is fixed when you book, so it won't change with traffic or delays." Put it in a homepage FAQ ("Are your fares fixed?") so it lands in `FAQPage` schema. Close the booker-wording open item. Effort: low.

### M2. Passages are short and few headings are questions (Medium)

**Evidence.** Most answer blocks are 15 to 40 words; there are almost no self-contained 100 to 170 word passages. Outside the FAQ blocks, H2s are mostly slogans ("Small things that make a big difference.", "Close to home, wherever that is.", "Holidays start at your front door."). Route pages are the exception ("Luton to Heathrow: what to expect."). No prices are published (owner's policy), so "how much is a taxi from Luton to Heathrow" queries will be answered from competitors.

**Recommendation.** Keep the voice, but on the 5 route pages, the airport guide and the 6 airport pages add one short "In short" passage near the top that answers the page's main question in full sentences (who, what, how long, how the fare works, waiting time, 24/7, licence). Add FAQ items that match real queries, such as "How much is a taxi from Luton to Heathrow?" answered without a number ("Your fare is fixed when you book and depends on the vehicle and pickup address; book online or call for a quote"). Google states content does not need to be chunked for AI, so treat this as clarity work, not a formula. Effort: medium (copy needs owner approval).

### M3. No `llms.txt` (Low to Medium)

**Evidence.** /llms.txt and /llms-full.txt return 404.

**Recommendation.** Add a short `public/llms.txt`: one-paragraph entity summary (name, operator, licence, base, 24/7, fixed fares, 15 free minutes, DBS-checked drivers, areas), then links to the key pages grouped as Services, Airports, Routes, Areas, Guides. No major AI search engine has confirmed it uses llms.txt, so treat it as cheap insurance, not a ranking lever; it also partly mitigates H1 for agents that read it. Effort: under an hour.

### M4. No visible or structured page dates (Low)

**Evidence.** No `<time>` elements or `dateModified` on any page; only the airport facts carry a "Checked on ... 6 November 2026" note. render_page.py inferred `2026-01-01` for several pages.

**Recommendation.** Add `dateModified` (from `contentUpdated` in `seo.ts`) to a `WebPage` node, and keep the "checked on" notes on factual guides. Effort: low.

### L1. Multi-modal content (Low)

Good: many original illustrations with alt text, a real comparison table on /fleet, `Vehicle` `ItemList`. Missing: any video (the strongest-correlating brand signal is YouTube) and `ImageObject`/`VideoObject` markup. Recommendation: one or two short videos on YouTube embedded on /airports/luton and /luton-airport-guide. Effort: medium.

### L2. No RSL licence or AI usage policy (Low)

No RSL 1.0 `License:` line in robots.txt. Not needed for a business that wants to be cited; mention only if the owner wants to state reuse terms.

## Agent readiness basics

- Accessibility tree: one h1 per page, headings named via `aria-label`, landmarks (`aside` top bar, `main`, footer), 44px targets, visible focus. Good once hydrated. In raw HTML, the 25 streamed pages have two `<main>` elements and the content after the footer (H1).
- Actions: booking is a plain link to an external booker (`heathrowminicabbooking.com/booking?site=luton`), same tab; `tel:`, `wa.me` and `mailto:` links are clearly labelled. An agent can find "Book Online" easily.
- Discovery: robots and sitemap fine; no llms.txt.

## Top 5 changes by impact

| # | Change | Impact | Effort |
|---|---|---|---|
| 1 | Stop streaming the 25 slug pages into a hidden div (H1) | Very high | Medium, 0.5 to 1 day |
| 2 | Real (non aria-hidden) heading text (H2) | High | Low, 1 to 2 hours |
| 3 | Entity line, A2B `@id`/`url`/licence `PropertyValue`, route `provider` `@id`, `sameAs` profiles (H4) | High | Low, plus ongoing profile work |
| 4 | One canonical fixed-fare sentence plus "Are your fares fixed?" FAQ; fix booker wording (M1) | Medium | Low |
| 5 | llms.txt and short "In short" answer passages on route/airport pages (M3, M2) | Medium | Low to medium |

## Structured data for audit-data.json (AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 52,
  "dimensions": {"citability": 62, "structural_readability": 45, "multi_modal": 60, "authority_brand": 35, "technical_accessibility": 60},
  "platform_scores": {"google_aio": 60, "chatgpt": 45, "perplexity": 42, "bing_copilot": 50},
  "crawlers": {"OAI-SearchBot": "allowed", "Claude-SearchBot": "allowed", "PerplexityBot": "allowed", "Googlebot": "allowed", "Bingbot": "allowed", "GPTBot": "allowed", "ClaudeBot": "allowed", "Google-Extended": "allowed", "Applebot-Extended": "allowed", "CCBot": "allowed", "cohere-ai": "allowed"},
  "llms_txt": "missing",
  "rsl": "missing",
  "findings": [
    {"id": "H1", "severity": "critical", "title": "Main content of 25 slug pages streamed into hidden div after footer", "evidence": "div hidden id=S:0 on all services/airports/routes/areas slug pages; Readability returns 16 footer words"},
    {"id": "H2", "severity": "high", "title": "Heading text only in aria-hidden spans", "evidence": "trafilatura output has no h1/h2 text"},
    {"id": "H4", "severity": "high", "title": "Weak entity linking: ambiguous About sentence, parentOrganization without url/@id, no sameAs, route provider not linked", "evidence": "About: 'a separate business ... operated by A2B Radio Cars'"},
    {"id": "H3", "severity": "medium", "title": "78 inline opacity:0 blocks per page", "evidence": "routes/luton-to-heathrow raw HTML"},
    {"id": "M1", "severity": "medium", "title": "Inconsistent fixed-fare phrasing; booker may contradict", "evidence": "'Clear fares' on homepage vs 'Fixed fares' elsewhere"},
    {"id": "M2", "severity": "medium", "title": "Short passages, slogan headings, no price answers", "evidence": "FAQ answers 15-40 words"},
    {"id": "M3", "severity": "low", "title": "llms.txt missing", "evidence": "404"},
    {"id": "M4", "severity": "low", "title": "No dateModified or visible dates", "evidence": "no time elements"},
    {"id": "L1", "severity": "low", "title": "No video content", "evidence": "no VideoObject or embeds"}
  ]
}
```

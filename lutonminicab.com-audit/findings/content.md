# Content Quality and On-Page SEO: lutonminicab.com

Audited 20 November 2026. All 37 URLs from `https://lutonminicab.com/sitemap.xml` were fetched live (raw HTML, no JavaScript), parsed for title, description, canonical, robots, headings, `<main>` text, links, images and JSON-LD, and run through the bundled `render_page.py` (trafilatura `extracted_text`) and `metadata_template.py` (site-wide pairs file). Near-duplication was measured as 5-word shingle overlap of `<main>` text within each template group.

## Scores

| Score | Value |
|---|---|
| **Content Quality** | **58 / 100** |
| **On-Page SEO** | **71 / 100** |
| E-E-A-T (weighted) | 44 / 100 |
| AI citation readiness | 50 / 100 |
| Templated metadata site risk (tool) | low (templated_ratio 0.0), but see C-4: a manual check finds a templated airport set and a shared closing phrase |

### E-E-A-T breakdown (this skill's internal weights, not Google's)

| Factor | Weight | Score | Evidence |
|---|---|---|---|
| Experience | 20% | 35 | Some real local detail (The Quadrant, Grove Theatre, Wardown Park, The Hat Factory, "pickup point, not the taxi rank", M25 timing advice). No reviews, case studies, real staff, real vehicles or first-hand photos; all imagery is AI illustration (honestly labelled "Illustration" on 13 pages). |
| Expertise | 25% | 55 | Airport facts cite the source and a check date (5 pages: "Checked on heathrow.com on 16 November 2026"). Route pages give journey-time ranges and practical tips. Terms are clear and specific. No named people, no years trading, no fleet or driver numbers. |
| Authoritativeness | 25% | 20 | No reviews or ratings, no Google Business Profile, Trustpilot or Yell links (`sameAs` empty), no press, no external citations. Brand-new domain. |
| Trustworthiness | 30% | 62 | TfL operator licence 6973 and "operated by A2B Radio Cars" on all 37 pages; phone, WhatsApp and email on all pages; Privacy, Terms (dated 20 November 2026) and Cookies pages; no fake reviews or invented claims. Weakened by: no street address, a free-mail address (`a2bradiocarss@gmail.com`), London 020 numbers for a Luton brand, the "separate business" wording on /about, the "assisted travel" and "all UK airports with flight tracking and meet and greet" claims (C-3, C-5), and the open fixed-fare vs booker pricing mismatch noted in the project brief. |

Weighted: 0.20 x 35 + 0.25 x 55 + 0.25 x 20 + 0.30 x 62 = 44.

## What works

- **Every page has a unique title and a unique meta description**; all descriptions are 88 to 160 characters, all titles 23 to 64 characters. Canonicals are self-referencing and absolute on all 37 pages; all are `index, follow`.
- **Exactly one h1 per page** on all 37 pages; h2/h3 nesting is logical.
- **Readability is excellent for the audience**: Flesch Reading Ease 56 to 84 (most pages 72 to 83), average sentence length 10 to 13 words. Plain British English, warm and calm, no hype or superlatives.
- **Honesty about imagery and facts**: AI images carry an "Illustration" tag and neutral alt text; airport facts are sourced and dated; no fake reviews, prices or promises such as "never late".
- **Route pages are genuinely differentiated** (mean 5-word overlap 0.27): each has its own journey-time range, its own three tips (terminals, M25, North/South Terminal, one-terminal Stansted) and route FAQs. The doorway-page risk was handled deliberately (18 pickup pages are `noindex, follow` and out of the sitemap).
- **Service pages are well differentiated** from each other (mean overlap 0.11): each has its own second section and wording.
- **Strong internal linking**: every indexable page receives in-content links (except legal pages and hubs, which are reached via nav and footer); airport pages link to their matching route page; area pages link to all five routes and the Luton Airport guide; anchors are descriptive ("Luton to Heathrow taxi", "Taxis in Leagrave").
- **Rich, consistent structured data**: TaxiService + WebSite on every page, FAQPage on 23 pages, BreadcrumbList on service, area, airport and route pages, ItemList of Vehicle on /fleet.
- **Natural keyword use**: no stuffing anywhere; "Luton" appears naturally (27 times on /areas/luton within ~490 words).

## Findings

Severity: Critical / High / Medium / Low.

### C-1 (High) Animated h1 and h2 text is dropped by text extractors used for AI answers

- **Evidence:** every `SectionHeading` renders the heading as one `aria-hidden="true"` span per word plus an `aria-label` on the heading, with inline `opacity:0`. In the trafilatura `extracted_text` for every page, the h1 and section h2s are missing: e.g. /areas/dunstable keeps "TAXIS IN DUNSTABLE" (eyebrow) but loses "No station in Dunstable? We'll get you to one.", "Places we take you from Dunstable." and "Taxis in Dunstable: your questions."; /routes/luton-to-heathrow loses "Luton to Heathrow, door to terminal." and "Luton to Heathrow: what to expect."; the homepage loses "Luton Minicab: Wherever you're going, we'll get you there." Area pages lose about 45% of their main text in extraction (Dunstable 3,096 chars in `<main>`, 1,661 extracted). Google renders the DOM and should still see the words, but non-rendering AI crawlers and passage chunkers lose the headings that frame each section.
- **Recommendation:** keep the animation but give extractors a plain copy of the text: add a visually hidden `<span class="sr-only">{plainText}</span>` inside each animated heading (and drop the heading's `aria-label`, which then becomes redundant), keeping the word spans `aria-hidden`. Re-test with `render_page.py --json` that h1/h2 text appears in `extracted_text`.

### C-2 (High) Airport pages are mostly shared template text

- **Evidence:** 5-word shingle overlap with sibling airport pages: Stansted 76%, London City 75%, London Southend 75%, Luton 70%, Gatwick 64%, Heathrow 55%. Shared verbatim blocks: "Which way are you travelling?", the three meeting steps ("Go through passport control and collect your luggage..."), "Room for everyone, and every bag." with the same three fleet cards, "Why travel with us", and 4 of 5 FAQs. Stansted, London City and Southend have roughly 130 to 150 words of their own (hero, two journey lines, a 4-sentence "Good to know" block, the airport-charges answer).
- **Recommendation:** add one airport-specific section per page (Heathrow and Gatwick already have the terminal guide, which is why they score better): for Stansted, London City and Southend write the real pickup arrangement (where pre-booked cars wait, walking time from arrivals, typical journey from Luton, best pickup time for early departures, one local tip), and replace 2 of the 4 generic FAQs with airport-specific questions ("Where do pre-booked cars pick up at Stansted?", "How long from Luton to London City in the rush hour?"). Link each to its /routes page in the hero copy, not only lower down.

### C-3 (High) /services meta description promises "assisted travel", which the site does not offer

- **Evidence:** /services description: "Local journeys, airport transfers, school runs, assisted travel, business and long-distance trips from Luton." No page lists an assisted-travel service, and the project rules exclude wheelchair access, escorts and medical care. This is the snippet searchers see.
- **Recommendation:** replace with confirmed services only, and add the keyword the page lacks, e.g. "Taxi and minicab services in Luton: local journeys, school runs, business, station and long-distance trips, plus airport transfers. Fixed fares, 24/7." (about 150 characters).

### C-4 (Medium) Templated metadata in the airport set and a shared closing phrase

- **Evidence:** `metadata_template.py` (37 pairs) returned `site_risk: low`, `templated_ratio: 0.0`, no `shared_cta_phrases`; secondary flag `brand_suffix_in_description` on /contact, /privacy, /terms, /services/corporate-travel, /services/long-distance-travel. A manual check finds what the heuristic missed: all six airport descriptions are one sentence with only the airport name changed ("Taxis to and from {X} Airport with flight tracking, meet and greet and fixed fares. Book online or call, day or night."), and 10 descriptions end with the identical "Fixed fares, DBS-checked drivers, available 24/7." (all 9 area pages plus Local Journeys, and two more with "Luton Minicab:" before it).
- **Recommendation:** give each airport description one fact unique to that airport (Heathrow: "Terminals 2 to 5"; Gatwick: "North or South Terminal"; Luton: "from Stopsley, Leagrave or anywhere in Luton"). Vary or drop the closing phrase on area pages and use the space for a local hook already on the page (Dunstable: "no station, we'll get you to one").

### C-5 (Medium) Coverage claim on the homepage contradicts the cautious short airport pages

- **Evidence:** homepage FAQ: "Transfers to and from all UK airports ... with flight tracking and meet and greet." /areas description: "with transfers to all UK airports". The nine short airport pages (some with no regular passenger flights, e.g. Aberporth, Pembrey) deliberately avoid flight tracking and meet and greet.
- **Recommendation:** "Transfers to and from UK airports, including Luton, Heathrow, Gatwick, Stansted, London City and London Southend. We track flights and offer meet and greet at these six." Accuracy is a trust factor per the QRG.

### C-6 (Medium) Thin commercial pages against topical-coverage floors

| Page | Main words | Floor (page type) |
|---|---|---|
| /services/local-journeys | 174 | 800 (service) |
| /about | 221 | n/a, but thin for the main trust page |
| /services/school-runs | 301 | 800 |
| /services/corporate-travel | 336 | 800 |
| /services/station-hotel-transfers | 385 | 800 |
| /services/long-distance-travel | 417 | 800 |
| /luton-station-transfers | 382 | guide |
| /routes/* | 393 to 437 | 500 to 600 (location-style) |
| /areas/* | 492 to 511, of which ~40 to 55% unique | 500 to 600 |

Word count is not a ranking factor; the issue is missing coverage. Local Journeys answers no questions (no FAQ, no "how it works", no booking-details block), and the service pages say nothing about who drives (licensing, how drivers are vetted beyond "DBS-checked"), how fares are set, or what happens if a car is late.
- **Recommendation:** add, per service page, 150 to 300 words of confirmed specifics: a short "How it works" (book, confirmation, driver details, pickup), 3 to 4 service-specific FAQs (the School Runs questions already exist in `serviceDetails.ts` but are not rendered), and the licence line. Give Local Journeys the `BookingDetails` block and an FAQ.

### C-7 (Medium) Area pages: unique content is about half the page

- **Evidence:** mean pairwise overlap 0.29; share of each page's text also found on sibling area pages: Luton 64%, Stopsley 63%, Dunstable 61%, Harpenden 61%, Houghton Regis 58%, Leagrave 58%, Mill Hill 52%, Hounslow 49%, Heathrow 45%. Shared blocks: six identical service cards, six identical airport cards with the same descriptions, the four-item "Let's plan your {area} journey" block, and the nearby-areas row. Each page does have a distinct hero, places list and four local FAQs, so this is not a doorway problem, but the unique share is modest.
- **Recommendation:** shorten the shared blocks on area pages (e.g. service cards as one line of links, airport cards without their repeated descriptions) and add one local paragraph per area (typical journey to Luton Airport and Luton station from there, the local pickup quirks, the nearest hospital or school-gate practicalities). Aim for over 60% unique text.

### C-8 (Medium) Weak keyword targeting in service titles, H1s and the Luton Airport page

- **Evidence:**
  - Service titles carry no location or service noun: "Local Journeys | Luton Minicab", "School Runs | Luton Minicab", "Corporate Travel | Luton Minicab", "Long-Distance Travel | Luton Minicab" (27 to 36 characters, about half the usable width).
  - Service H1s are emotive with no topic words: "Arrive ready, not rushed.", "Going further? Sit back and relax.", "Life's little trips, without the fuss.", "Make your train, without the dash."
  - /airports/luton title "Luton Airport Transfers | Luton Minicab": no "taxi", and the page body uses "taxi" 0 times. The homepage body also uses "taxi" 0 times; "minicab" appears once (in the h1 eyebrow).
  - "Luton airport taxi" intent is split across /airports/luton, /luton-airport-guide ("taxi" 6 times) and /areas/stopsley.
- **Recommendation:**
  - Titles, e.g. "Local Taxis in Luton: Shops, Appointments & Visits | Luton Minicab", "School Run Taxis in Luton | Luton Minicab", "Business & Corporate Taxis in Luton | Luton Minicab", "Long-Distance Taxis from Luton | Luton Minicab", "Luton Airport Taxi & Transfers | Luton Minicab".
  - Keep the warm H1s but make the eyebrow, or the first sentence under it, state the topic in plain words ("Local taxis around Luton").
  - Use "taxi" naturally once or twice in the homepage and /airports/luton body copy.
  - Make /airports/luton the "Luton airport taxi" target and have /luton-airport-guide link to it with that anchor; the guide stays informational.

### C-9 (Medium) Section headings rarely match search or question phrasing

- **Evidence:** most h2s are mood lines: "Small things that make a big difference.", "Holidays start at your front door.", "A real person. A simpler journey.", "Here for every part of your day.", "The things that matter on a busy day." The best-structured pages for AI answers are the route pages, whose h2s state the topic ("Luton to Heathrow: what to expect.").
- **Recommendation:** on each page keep one or two warm h2s but phrase the information sections as the question or topic they answer, e.g. "Why choose Luton Minicab" in place of "Small things that make a big difference", "How school run bookings work", "Meeting your driver at Stansted".

### C-10 (Medium) Main content on dynamic routes is streamed after the footer in raw HTML

- **Evidence:** on all area, service, airport and route pages the initial HTML contains an empty `<main id="main" aria-busy="true">` fallback, then the footer, then the real `<main>` inside `<div hidden id="S:0">` (Dunstable: footer at byte ~50,900, real h1 at ~71,800). In raw source order, the booking banner h2 "Wherever you're heading next..." comes before the page h1. Google renders and reorders, but non-rendering crawlers see the main content as a hidden block after the footer. (Overlaps with technical.md.)
- **Recommendation:** read `params` outside the Suspense boundary for the statically generated slugs (`generateStaticParams`), or prerender those pages fully, so the content ships in place; keep `PageFallback` only for unknown slugs.

### C-11 (Medium) Authority and experience signals are absent

- **Evidence:** no reviews, ratings, testimonials, named staff, years in operation, real vehicle or driver photos, Google Business Profile or other profiles (`sameAs` empty). /about is 221 words and opens "Luton Minicab is a separate business providing...", which raises "separate from what?" without answering it.
- **Recommendation:** once real, add (in this order): the Google Business Profile and other profile URLs (`site.profiles`); a reviews link (Google or Trustpilot) with no review schema unless reviews are first-party and genuine; on /about, plain facts the owner can confirm (how long A2B Radio Cars has operated, how drivers are licensed and vetted, how the booking team works, one real photo of a vehicle or the team). Reword "a separate business" to "Luton Minicab is a service operated by A2B Radio Cars, a TfL-licensed private hire operator (licence 6973)."

### C-12 (Low) Contact trust details

- **Evidence:** email is a Gmail address with an unusual spelling (`a2bradiocarss@gmail.com`); both numbers are London 020 numbers; no street address (by design).
- **Recommendation:** use a domain email (e.g. bookings@lutonminicab.com) and, if available, a local 01582 number forwarding to the team; keep the Hounslow base statement as it is.

### C-13 (Low) Freshness signals only on some pages

- **Evidence:** visible check dates on the 5 airport pages and the Luton Airport guide; "Last updated: 20 November 2026" on Privacy and Terms. Route, area and service pages have no visible or structured date, and route journey times are still owner drafts. No `dateModified` anywhere.
- **Recommendation:** after the owner confirms the route times, show "Journey times checked {month year}" on each route page and refresh quarterly; add `dateModified` via WebPage schema on route and guide pages.

### C-14 (Low) Heading and copy polish

- "Taxis in Heathrow: your questions." (title says "Taxis at Heathrow"); use "at".
- Route title casing "Luton to central London Taxi": use "Luton to Central London Taxi" in the title only.
- Gatwick and Heathrow terminal h3s are uppercase in the source ("NORTH TERMINAL", "TERMINAL 2"); write them in normal case and uppercase with CSS.
- Legal pages use "ON THIS PAGE" as an h2 (navigation, not content); make it a `<p>` or `nav` label.
- /services/corporate-travel and /services/long-distance-travel descriptions lead with mood lines ("Use the journey to prepare, make a call or simply breathe.") and end with "Luton Minicab:", spending the snippet on brand and mood rather than the query.

## AI citation readiness (50 / 100)

Strengths: FAQPage on 23 pages with short self-contained answers; route pages state quotable facts ("Usually about 50 minutes to 1 hour 10 minutes, depending on traffic"); airport facts are sourced and dated; consistent entity data (operator, licence, base) on every page.

Gaps: headings lost in extraction (C-1); main content after the footer in raw HTML (C-10); headings phrased as moods, not questions (C-9); few hard facts (no prices by design, but also no fleet size, years trading, coverage radius or booking lead times beyond "call for journeys in the next 12 hours").

## Per-page metrics

| URL | Main words | Flesch | Title len | Desc len |
|---|---|---|---|---|
| / | 605 | 80.8 | 50 | 151 |
| /about | 221 | 72.7 | 24 | 136 |
| /services | 380 | 83.6 | 39 | 138 |
| /services/local-journeys | 174 | 69.6 | 30 | 124 |
| /services/school-runs | 301 | 80.4 | 27 | 133 |
| /services/corporate-travel | 336 | 75.2 | 32 | 149 |
| /services/long-distance-travel | 417 | 79.7 | 36 | 151 |
| /services/station-hotel-transfers | 385 | 77.3 | 41 | 132 |
| /airports | 189 | 58.7 | 33 | 91 |
| /airports/luton | 526 | 78.0 | 39 | 120 |
| /airports/heathrow | 772 | 75.9 | 42 | 123 |
| /airports/gatwick | 688 | 79.9 | 41 | 122 |
| /airports/stansted | 514 | 80.6 | 42 | 123 |
| /airports/london-city | 525 | 74.9 | 45 | 126 |
| /airports/southend | 527 | 76.1 | 49 | 130 |
| /areas | 208 | 56.2 | 30 | 154 |
| /areas/* (9) | 492 to 511 | 72.1 to 78.3 | 30 to 39 | 118 to 160 |
| /routes/* (5) | 393 to 437 | 77.8 to 82.2 | 37 to 44 | 129 to 142 |
| /luton-airport-guide | 554 | 82.2 | 63 | 146 |
| /luton-station-transfers | 382 | 77.6 | 64 | 156 |
| /fleet | 484 | 83.6 | 58 | 142 |
| /contact | 514 | 76.5 | 23 | 114 |
| /privacy, /terms, /cookies | 574, 989, 133 | 68.5 to 76.1 | 23 to 34 | 88 to 110 |

Main words = text inside the rendered `<main>` (excludes header, footer and the shared booking banner).

## Structured findings (audit-data.json, Content Quality category)

```json
{
  "category": "Content Quality",
  "scores": {"content_quality": 58, "on_page_seo": 71, "eeat": 44, "ai_citation_readiness": 50,
             "eeat_breakdown": {"experience": 35, "expertise": 55, "authoritativeness": 20, "trustworthiness": 62}},
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {},
                        "manual_override": "6 airport descriptions templated; 10 descriptions share closing phrase"},
  "findings": [
    {"id": "C-1", "severity": "high", "title": "Animated h1/h2 text dropped by text extractors (aria-hidden word spans)", "pages": "all 37"},
    {"id": "C-2", "severity": "high", "title": "Airport pages 55-76% shared template text", "pages": "/airports/*"},
    {"id": "C-3", "severity": "high", "title": "/services description promises 'assisted travel' not offered", "pages": "/services"},
    {"id": "C-4", "severity": "medium", "title": "Templated airport meta descriptions; shared closing phrase on 10 descriptions", "pages": "/airports/*, /areas/*"},
    {"id": "C-5", "severity": "medium", "title": "'All UK airports with flight tracking and meet and greet' overclaim", "pages": "/, /areas"},
    {"id": "C-6", "severity": "medium", "title": "Thin service pages (174-417 words) and /about (221)", "pages": "/services/*, /about"},
    {"id": "C-7", "severity": "medium", "title": "Area pages 45-64% shared with siblings", "pages": "/areas/*"},
    {"id": "C-8", "severity": "medium", "title": "Service titles/H1s lack 'taxi' and 'Luton'; Luton airport taxi intent split", "pages": "/services/*, /airports/luton, /"},
    {"id": "C-9", "severity": "medium", "title": "Mood-style headings, few question/topic headings", "pages": "most"},
    {"id": "C-10", "severity": "medium", "title": "Dynamic-route main content streamed after footer in raw HTML", "pages": "/areas/*, /services/*, /airports/*, /routes/*"},
    {"id": "C-11", "severity": "medium", "title": "No reviews, profiles, named people or real photos; vague /about", "pages": "site"},
    {"id": "C-12", "severity": "low", "title": "Gmail address and London-only numbers", "pages": "site"},
    {"id": "C-13", "severity": "low", "title": "No freshness dates on route/area/service pages; draft route times", "pages": "/routes/*"},
    {"id": "C-14", "severity": "low", "title": "Heading and copy polish", "pages": "various"}
  ]
}
```

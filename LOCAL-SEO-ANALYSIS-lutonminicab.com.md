# Local SEO Analysis: lutonminicab.com

Date: 19 November 2026. Source: the site's code (`main` at a0d69e8). The live site could not be fetched from the audit machine (DNS failure), so live rendering, Search Console, Google Business Profile (GBP) data and citations were not checked directly.

## Local SEO Score: 35/100

| Dimension | Weight | Score | Weighted | Summary |
|---|---|---|---|---|
| GBP signals | 25% | 25 | 6.3 | Hours (24/7) clear; no GBP link, no `sameAs`, no map, and the address is 25 miles from the brand town |
| Reviews & reputation | 20% | 5 | 1.0 | No reviews anywhere on or linked from the site (owner's rule) |
| Local on-page SEO | 20% | 70 | 14.0 | Strong service, area, airport and route pages; 18 thin pickup pages are a doorway risk |
| NAP consistency & citations | 15% | 35 | 5.3 | Phone and email belong to another business (Bittacy Cars); no address in the footer |
| Local schema | 10% | 70 | 7.0 | Correct `TaxiService` type, hours, address, areaServed; missing `geo`, `sameAs`, `hasMap`; area-page provider not linked |
| Local links & authority | 10% | 10 | 1.0 | No detectable local links, memberships, press or directory profiles |
| **Total** | | | **34.6** | |

The website itself scores well. The low total comes from everything off the site: no GBP, no reviews, borrowed contact details and no citations.

## Business type: Service Area Business (with a booking office)

- Pickups are offered across Luton, Bedfordshire, Hertfordshire, north and west London. Customers never visit an office.
- The only address is the booking office at **2 Bittacy Hill, Mill Hill, London NW7 1LB**, shown on /contact and in the schema.
- **Vertical:** taxi / private hire (closest playbook: Home Services style SAB, 24/7, service area).

### The core local problem

Google ranks the local pack (map results) mainly by proximity to a verified business location. Luton Minicab's only verified location would be in Mill Hill, roughly 25 miles from Luton. So:

- A GBP at Mill Hill will rank for Mill Hill and nearby, not for "taxi Luton". Setting a service area that includes Luton does not change where the pin is ranked from.
- Using a virtual office or mailbox in Luton to get a pin there breaks Google's guidelines and risks suspension. **Don't.**
- A Luton map-pack presence needs a real, staffed Luton base (a dispatch office or drivers' base the operator actually uses). That is a business decision for the owner.
- Without one, the realistic route to Luton searches is **organic results and AI answers**, where the site's content is already strong.

## Industry-specific findings (taxi / private hire)

- **Operator licence not shown** (`requirement.md` open item). A licence number and licensing authority is the strongest trust signal for a minicab firm, and GBP may ask for it when verifying a taxi business. Get it confirmed and show it in the footer and on /about.
- **Booking happens on another domain** (`heathrowminicabbooking.com`). Not a ranking factor, but brand mismatch at the point of booking can lower conversions and confuses AI answers about who the operator is.
- **Fixed-fare promise vs. booker text** (open item): the booker still says the price can follow the distance. Mismatched claims can surface in reviews.

## GBP optimisation checklist

| Signal | Status |
|---|---|
| GBP exists and is verified | Unknown, no link or reference on the site |
| Primary category | Recommend **Taxi service**; secondaries: Airport shuttle service, Chauffeur service, Taxi stand only if true |
| Business name | "Luton Minicab" is fine **only if** it is the real trading name on signage, invoices and licence. Do not add keywords |
| Address shown or hidden | Hide the address (SAB) unless customers visit Mill Hill; set service areas (Luton, Dunstable, Houghton Regis, Harpenden, Mill Hill, Hounslow, Heathrow etc., max 20) |
| Hours | 24/7 on site and in schema; match in GBP |
| Website link | Link GBP to the homepage, or test /areas/luton (Sterling Sky: avoid always linking the strongest page) |
| Photos | None on GBP yet, presumably. Use **real** car, driver and office photos; the site's AI images must not go on GBP |
| Q&A | Public Q&A is being phased out; the site's FAQs already cover this well |
| Posts | Optional; useful for airport tips and seasonal notes |
| Site to GBP link | Add `sameAs` (GBP share URL) to schema and a "Find us on Google" link once live |

## Review health snapshot

- **Count, rating, velocity:** nothing detectable. Reviews are about 20% of local pack weight, and ChatGPT pulls from review sites.
- **Recommended:** after each completed trip, send one review link (Google) by SMS or email from the booking system. Same request for every customer: asking only happy customers (review gating) breaks Google's rules.
- **Reply to every review**, short and calm, especially complaints.
- **Do not add `aggregateRating` to the site's own schema.** Google ignores self-served LocalBusiness review stars, and the owner's rule bars ratings. A link to the Google reviews is enough.
- Secondary platforms worth having: Trustpilot, Yell, Facebook.

## NAP consistency audit

| Source | Name | Address | Phone |
|---|---|---|---|
| Top bar (every page) | Luton Minicab | none | 020 8343 4444 / 020 8569 4040 |
| Footer | Luton Minicab | **none** | icon link only (no visible number) |
| /contact | Luton Minicab | 2 Bittacy Hill, Mill Hill, London, NW7 1LB | 020 8343 4444 |
| /about | Luton Minicab | "Mill Hill, north London" | via links |
| Schema (`SiteSchema.tsx`) | Luton Minicab | 2 Bittacy Hill, Mill Hill, London, NW7 1LB | +442083434444 |
| GBP | not checked | | |

**Critical discrepancy:** `src/config/site.ts` marks the phone, alternative phone and email as *"TEMPORARY: taken from bittacycars.com"*. The email is `bittacycs@hotmail.com`. If Bittacy Cars has its own GBP and directory listings with 020 8343 4444, Google sees two businesses sharing one phone number. That can merge the listings, block GBP verification, or credit Luton Minicab's signals to Bittacy Cars. It also caps how far citations can help.

Fix before any GBP or directory work:

1. A dedicated phone number for Luton Minicab. A Luton **01582** number (can forward to the Mill Hill desk) is also a small local relevance signal.
2. An own-domain email, e.g. `bookings@lutonminicab.com`.
3. Update `site.ts`, then use the same name, number and email everywhere.

## Citation presence check (UK, Tier 1)

Not checked live. Priority list once the dedicated number exists:

| Platform | Why |
|---|---|
| Google Business Profile | Local pack, Maps |
| Bing Places | Feeds Bing, Copilot and ChatGPT |
| Apple Business Connect | Apple Maps, Siri |
| Yell, Thomson Local, Scoot, FreeIndex, Cylex | UK directories AI tools read |
| Facebook page | Brand presence, reviews |
| Trustpilot | Review platform with high AI visibility |
| Luton Borough Council licensed operator list | Highest-trust local citation, if licensed there |
| Data aggregators | Foursquare, Data Axle (UK coverage is lighter than the US) |

## Local schema status: present, mostly good

`SiteSchema.tsx` outputs `TaxiService` (correct subtype) with `@id`, name, url, logo, image, telephone, email, PostalAddress, 24/7 `openingHoursSpecification` and `areaServed` for all 27 places. Area and route pages add their own `TaxiService`.

Gaps and fixes:

1. **Area pages: provider not linked.** `AreaLocalPage.tsx:86` uses `provider: { "@type": "LocalBusiness", name: site.name }`, which describes a second, unnamed-address business. Point it at the main entity:
   ```ts
   provider: { "@id": `${siteOrigin}/#business` },
   ```
2. **Add `sameAs`** with the GBP, Facebook, Trustpilot and Yell URLs once they exist.
3. **Add `hasMap`** with the GBP map URL once the GBP is live.
4. **`geo`**: add the office's coordinates (5+ decimals) only if the address stays public in GBP. Geocode the exact address; don't estimate.
5. Keep out `aggregateRating` and `priceRange` (no confirmed values).

## Location page quality

| Group | Pages | Unique content | Doorway risk |
|---|---|---|---|
| Main areas (`AreaLocalPage`) | 9 | High: own hero, angle, local places, FAQs, photo | Low |
| Routes (`RoutePage`) | 5 | High: own facts, tips, FAQs | Low (journey times still drafts) |
| **Pickup areas (`PickupAreaPage`)** | **18** | **Very low**: one sentence differs per page | **High** |

The 18 pickup pages (Caddington, Edgware, Feltham, etc.) fail the swap test: the H1, intro and booking note are identical apart from the place name, plus one journey sentence. All 18 are indexable and in the sitemap, more than the nine real area pages. Google treats this pattern as doorway pages, and it can pull down rankings for the whole site, including the strong pages. They also skip the site's page standard (no `PageHero`, `min-h-11` tap target).

Options, best first:

1. **Noindex them and remove them from the sitemap** (keep the URLs for anyone who lands there), and rely on the grouped list on /areas, which already names every place.
2. Or remove the pages and redirect each to `/areas#<group>`.
3. Only build a pickup page out when there is genuinely local content for it (its own places, station, FAQs), like the nine main areas.

The CLAUDE.md note says the sitemap lists 37 pages; it now lists 55 because of these.

## Top 10 prioritised actions

| # | Priority | Action | Where |
|---|---|---|---|
| 1 | Critical | Replace the borrowed Bittacy Cars phone numbers and Hotmail address with Luton Minicab's own (ideally an 01582 number and an @lutonminicab.com email) | `site.ts`, then everywhere |
| 2 | Critical | Noindex the 18 pickup pages and drop them from the sitemap (or redirect them to /areas) | `areas/[slug]/page.tsx`, `sitemap.ts` |
| 3 | Critical | Decide the GBP strategy: SAB with hidden Mill Hill address (realistic) or a real staffed Luton base (needed for the Luton map pack). No virtual offices | Owner decision |
| 4 | High | Create and verify the GBP: category Taxi service, service areas, 24/7 hours, real photos, homepage link | GBP |
| 5 | High | Start a steady review request after every trip, to every customer, and reply to all reviews | Booking system |
| 6 | High | Confirm and show the operator licence number and authority in the footer and /about | `site.ts`, footer |
| 7 | High | Claim Bing Places and Apple Business Connect, then Yell, Facebook, Trustpilot with identical NAP | Off-site |
| 8 | Medium | Add local intent to the homepage: title such as "Luton Minicab: Taxis and Airport Transfers in Luton", and an H1 that names Luton (the "Luton Minicab" eyebrow can become part of the H1 without a visual change) | `page.tsx`, `Hero.tsx` |
| 9 | Medium | Schema: link area-page `provider` by `@id`; add `sameAs` and `hasMap` once profiles exist | `AreaLocalPage.tsx`, `SiteSchema.tsx` |
| 10 | Low | Local authority: Luton or Bedfordshire Chamber of Commerce, school or community sponsorships, local "best taxi" round-ups, hotel and venue partner links | Off-site |

## Limitations

Not assessed: live rendering and indexing state, the GBP itself (existence, category, reviews, Insights), real local pack positions and geo-grid rankings, citation listings, backlinks and domain authority, and whether Bittacy Cars' listings already use the phone number. Tools that fill these gaps: Search Console, BrightLocal or Whitespark (citations, geo-grid), Local Falcon (map-pack grid), Ahrefs or Semrush (links), and DataForSEO business listings (`/claude-seo:seo-maps`). For AI-answer visibility, run `/claude-seo:seo-geo https://lutonminicab.com`.

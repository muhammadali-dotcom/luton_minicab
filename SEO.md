# Luton Minicab: search (SEO) plan

Goal: be found by people searching locally for a taxi or minicab in and around Luton, and for airport and school-run journeys. **Every claim on the site must match [requirement.md](requirement.md).** SEO never justifies adding unverified promises.

## 1. Principles
- **One clear purpose per page.** Each page targets one main search theme, so pages don't compete with each other.
- **Write for passengers first.** Use natural British English with keywords where they read naturally, and no keyword stuffing.
- **No thin town pages.** One "Areas We Cover" page at launch, as agreed. Separate town or postcode pages only if each has genuinely useful, unique content, and only if approved.
- **Consistent business details (NAP).** The name, phone and address must be identical on the site, in Google Business Profile and in every directory. They're blocked until the real details are supplied.

## 2. Page targets (draft)
Titles are around 60 characters or fewer, and descriptions 155 or fewer. Titles use the pattern "Topic | Luton Minicab", set by `metadata.title.template`.

| Page | Main search theme | Draft title | Draft meta description |
|---|---|---|---|
| Home `/` | Luton minicab / taxi Luton | Luton Minicab \| Local, School & Airport Journeys | From the school gates to airport goodbyes: local journeys, school runs and airport transfers from Luton and beyond. Book online or call, day or night. (live) |
| Services `/services` | Taxi services Luton | Taxi & Minicab Services | Local journeys, airport transfers, school runs, assisted travel, business and long-distance trips from Luton. Fixed fares, available 24/7. |
| Our Fleet `/fleet` | Minicab, estate, MPV and executive cars in Luton | Our Fleet: Saloon, Estate, MPV & Executive | From everyday saloons to estates, MPVs and executive cars. Choose the right vehicle for your passengers and luggage when you book. |
| `/areas/[slug]` (9) | "taxi [area]", "minicab [area]", e.g. "taxi Dunstable" | Taxis in [Area] | The area's intro line + "Book online or call, day or night." (live, indexable). Add genuinely local detail over time to avoid thin, near-duplicate pages |
| Areas `/areas` | Taxi Luton, Mill Hill, Hounslow, Heathrow | Areas We Cover | Based in Luton, with pickups across the surrounding areas, Hounslow, Mill Hill and Heathrow, and transfers to and from all UK airports. |
| About `/about` | About Luton Minicab | About Us | Luton Minicab is a local minicab service operated by A2B Radio Cars. Find out who we are and how we work. |
| Contact `/contact` | Contact Luton Minicab | Contact Us | Book online, call or message us on WhatsApp, day or night. |
| Airports `/airports` | Airport taxi Luton / airport transfers | Airport Transfers | Transfers to and from all UK airports, with flight tracking and meet and greet. (live, indexable) |
| `/airports/[slug]` (9 short pages) | None yet | [Airport] Airport Transfers | `noindex` until each has real details. No flight claims |
| `/airports/[slug]` (6) | "[Airport] taxi", "taxi to [Airport] from Luton" | [Airport] Airport Transfers | "Taxis to and from [Airport] Airport with flight tracking, meet and greet and fixed fares. Book online or call, day or night." (live, indexable). Luton and Heathrow have their own wording and arrivals sections, and Luton links its local area pages; add airport-specific detail to the others over time |
| `/services/[slug]` (5) | e.g. "school run taxi Luton", "station taxi Luton" | Service name | One per service, from the content brief |

The holding pages are currently `noindex`. **Remove `noindex` from each page once its real content is approved.**

### Search phrases to cover naturally (draft, to validate)
- **Local:** "Luton minicab", "taxi Luton", "Luton cab", "minicab near me"
- **Airport:**
  - "Luton airport taxi", "Luton airport transfer"
  - "Luton to Heathrow taxi", "Heathrow minicab", "airport transfer Luton"
- **School:** "school run taxi Luton", "SEND transport Luton". Use the approved SEND wording only.
- **Areas:** "taxi Mill Hill", "taxi Hounslow", "Heathrow taxi"
- **Vehicles:** "MPV taxi Luton", "estate car taxi", "executive car Luton"

Validate these with real search volume data (for example Google Search Console after launch, or Google Keyword Planner) before writing the inner pages.

## 3. On-page checklist (per page)
- One h1 containing the main theme, then h2s per section.
- A unique title and meta description.
- Descriptive internal links (e.g. "airport transfers", not "click here").
- Descriptive `alt` text on meaningful images; decorative illustrations stay hidden from screen readers.
- Fast, mobile-friendly and accessible. The site is static, lightweight and has no layout shift.
- A canonical URL on the final domain: `https://www.lutonminicab.com` (confirmed: www, with the bare domain redirecting to it).

## 4. Technical SEO (to add before launch)
- [ ] `metadataBase` set to the final domain in `layout.tsx`
- [ ] `src/app/sitemap.ts` listing the live (indexable) pages
- [ ] `src/app/robots.ts` allowing crawling and pointing to the sitemap
- [ ] Open Graph and Twitter sharing image (1200×630, from DESIGN.md) and favicon set
- [ ] Structured data (JSON-LD), **only once real details exist**: `LocalBusiness` / `TaxiService` with name, phone, area served (Luton, Mill Hill, Hounslow, Heathrow), opening hours (24/7) and URL. Add `FAQPage` markup for the homepage FAQs.
- [ ] Google Search Console verified, with the sitemap submitted
- [ ] Analytics, if wanted. Add a privacy/cookie notice if it sets cookies.

## 5. Local SEO (off-site)
- [ ] **Google Business Profile** for Luton Minicab: category (Taxi service), service areas, 24/7 hours, phone, website link and booking link. The address must match the operator's details.
- [ ] Consistent listings in key UK directories (e.g. Yell, Bing Places, Apple Business Connect), using identical name and phone.
- [ ] Encourage **genuine** reviews on Google after journeys. Never write or buy reviews. Show reviews on the site only once real ones exist.

## 6. Open questions
- ~~Domain format?~~ Answered: **`https://www.lutonminicab.com`** is the main domain; the bare `lutonminicab.com` redirects to it.
- ~~Own phone and profile?~~ Answered: **yes, both separate**. Luton Minicab gets its own phone number and its own Google Business Profile. Never use A2B Radio Cars' number or listing for it.
- ~~Business address?~~ Answered: **no public address**. Set up Google Business Profile as a **service-area business** (address hidden; service areas Luton, Mill Hill, Hounslow, Heathrow), and leave `address` out of the structured data.
- ~~Commercial priorities?~~ Answered: **all four matter**, in this order: business travel, school runs & SEND, local journeys, airport transfers. Business travel and school runs deserve their own strong sections on the Services page. Consider dedicated pages later, if approved.

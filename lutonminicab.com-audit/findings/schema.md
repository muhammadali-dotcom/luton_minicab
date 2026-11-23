# Schema / structured data audit: https://lutonminicab.com

Audited 20 November 2026 (server-rendered HTML, raw fetch). Pages sampled: /, /services/school-runs, /airports/luton, /areas/dunstable, /routes/luton-to-heathrow, /fleet, /contact. Spot checks: /services/local-journeys, /areas/hounslow, /airports/gatwick, /luton-airport-guide, /about.

## Score: 82 / 100

All JSON-LD is server-rendered, valid JSON, uses https://schema.org, absolute URLs, one block per type per page, no duplicates. Deductions: route page provider is not linked to #business (-6), no valid-for-rich-result type is eligible by design (n/a), missing page-level entities and some small property gaps (-12).

## What works
- Every page has a site-wide `@graph`-style array: TaxiService (`@id` https://lutonminicab.com/#business) and WebSite (`@id` /#website, publisher points at #business). Identical on all pages sampled.
- TaxiService carries name, url, logo (512x512 PNG, meets Google's 112px minimum), image, telephone (+442085694040, E.164), email, PostalAddress (only addressLocality "Hounslow, London", postalCode TW3, addressCountry GB; no street address, as intended), parentOrganization A2B Radio Cars, identifier (TfL licence 6973), 7-day OpeningHoursSpecification 00:00 to 23:59, areaServed (27 Place entries).
- NAP matches the visible page: /contact shows 020 8569 4040 (tel:02085694040), alternative 020 8343 4444, the same email, WhatsApp 447436075664, "Hounslow, West London / TW3", and licence 6973.
- BreadcrumbList present and correct (Home > section > page, absolute URLs) on service, area, airport and route pages.
- FAQPage present only where a visible FAQ exists; one per page; text matches the visible questions. /services/school-runs and /services/local-journeys correctly have none (no FAQ on page).
- Area page /areas/dunstable adds a TaxiService with areaServed and `provider` -> `{"@id": ".../#business"}`.
- /fleet ItemList of 6 Vehicle items, with vehicleSeatingCapacity; no prices, ratings or reviews (by design).
- No review, AggregateRating or Offer markup, so no risk of self-serving review penalties.

## Findings

### 1. Medium: route page TaxiService provider is a new LocalBusiness, not #business
Evidence (/routes/luton-to-heathrow):
`"provider": {"@type": "LocalBusiness", "name": "Luton Minicab"}` (no @id, no url). Area pages do this correctly. This creates an unlinked, duplicate "Luton Minicab" entity of a different type, which conflicts with the TaxiService entity. Check the other four route pages for the same pattern.
Fix:
```json
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": "https://lutonminicab.com/routes/luton-to-heathrow#service",
  "name": "Luton to Heathrow taxi",
  "url": "https://lutonminicab.com/routes/luton-to-heathrow",
  "provider": { "@id": "https://lutonminicab.com/#business" },
  "areaServed": [
    { "@type": "Place", "name": "Luton" },
    { "@type": "Place", "name": "Heathrow Airport" }
  ]
}
```

### 2. Low: area/route TaxiService blocks lack @id and url
Dunstable block: `{"@type":"TaxiService","name":"Taxis in Dunstable","provider":{"@id":".../#business"},"areaServed":{...}}`. Valid, but without `@id`/`url` it cannot be referenced and is an anonymous entity. Add `"url": "https://lutonminicab.com/areas/dunstable"` and a page-scoped `@id`. Consider `"@type": "Service"` with `serviceType: "Taxi service"` (TaxiService is a subtype of Service, so both are fine).

### 3. Low: areaServed is a flat list of 27 Place names with no type context
Valid but weak. Improve with `AdministrativeArea`/`City` types where accurate (Luton, Dunstable, Harpenden, Hounslow are all cities/towns) and optionally `containedInPlace`. Keep "Harlington, west London" clarified, e.g. `{"@type":"Place","name":"Harlington","containedInPlace":{"@type":"AdministrativeArea","name":"London Borough of Hillingdon"}}` (confirm borough with owner before publishing).

### 4. Low: addressLocality "Hounslow, London"
Valid and matches the visible "Hounslow, West London". Schema.org expects the locality alone; consider `"addressLocality": "Hounslow"`, `"addressRegion": "London"`. Only change if the visible text and any Google Business Profile are aligned, and keep the street address omitted.

### 5. Low: telephone only lists the primary number
The page shows Bookings 020 8569 4040 and Alternative 020 8343 4444. Add as `contactPoint`:
```json
"contactPoint": [
  { "@type": "ContactPoint", "contactType": "reservations", "telephone": "+442085694040", "areaServed": "GB", "availableLanguage": "en", "hoursAvailable": {"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"00:00","closes":"23:59"} },
  { "@type": "ContactPoint", "contactType": "customer service", "telephone": "+442083434444", "areaServed": "GB", "availableLanguage": "en" }
]
```
The alt number 020 8343 4444 should be confirmed with the owner as belonging to the same business.

### 6. Low: identifier is free text
`"identifier": "TfL private hire operator licence 6973"` is accepted but not machine-readable. Use PropertyValue:
```json
"identifier": { "@type": "PropertyValue", "name": "TfL private hire operator licence", "propertyID": "TfL PHV operator licence", "value": "6973" }
```
(Optionally `hasCredential` with an `EducationalOccupationalCredential`/`Certification`; not needed for Google.)

### 7. Info: FAQPage markup
Present on /, /contact, area, airport, route, fleet and /luton-airport-guide pages. Google retired FAQ rich results for all sites on 7 May 2026, so there is no SERP benefit; any AI/GEO benefit is unconfirmed. Harmless, keep or drop at your discretion. Do not treat as an error. (Contact FAQ is not a genuine user Q&A, so QAPage is not appropriate.)

### 8. Info: content accuracy inside schema text
The homepage FAQ answer says "Transfers to and from all UK airports ... with flight tracking and meet and greet." The project notes say the nine short airport pages must not claim flight tracking or meet and greet. The visible homepage FAQ matches the schema, so there is no mismatch, but confirm the claim is intended for all UK airports.

### 9. Info: Vehicle items on /fleet are thin
Each Vehicle has name, description, vehicleSeatingCapacity only. Vehicle is not a Google rich result type, so this is cosmetic. Optional: add `image` (the fleet cut-out URL) and `url` (`/fleet#saloon`) per item, and give the ItemList a `url`. Do not add brand or prices.

## Missing opportunities (all optional, none produce rich results for this business type)
- `WebPage`/`AboutPage`/`ContactPage` on /about and /contact with `isPartOf` -> #website, `about`/`mainEntity` -> #business, and `primaryImageOfPage`. /about and /contact currently have only the site-wide blocks.
- `BreadcrumbList` is missing from /luton-airport-guide, /luton-station-transfers, /about, /contact, /fleet, /areas, /airports, /services (overview pages). Add for consistency (Google shows breadcrumbs for these).
- `sameAs` is absent until the owner supplies profiles (Google Business Profile, Facebook, Trustpilot, Yell). Adding these (and `hasMap`) is the biggest remaining entity signal. Do not add review or rating markup until genuine, on-page, third-party-eligible reviews exist.
- `Service` entities per service page (e.g. School Runs) linked to #business via `provider`, with `areaServed` and `serviceType`, no `offers`/prices. Each of the six services currently has only a BreadcrumbList.
- `Organization` for A2B Radio Cars as a full node (`@id` .../#operator, name, `identifier` licence) referenced from `parentOrganization`, rather than an inline name-only object.
- `potentialAction` ReserveAction on the TaxiService pointing at the booking URL (not a rich result, but useful for entity understanding):
```json
"potentialAction": { "@type": "ReserveAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://<booking-url>", "actionPlatform": ["http://schema.org/DesktopWebPlatform","http://schema.org/MobileWebPlatform"] }, "result": { "@type": "Reservation", "name": "Book a taxi" } }
```
- Checks not possible from raw fetch: Rich Results Test / Schema Markup Validator runs. Recommend running both on the pages above after changes.

## Summary table (sampled pages)

| Page | TaxiService+WebSite | Breadcrumb | FAQPage | Extra | Status |
|---|---|---|---|---|---|
| / | yes | n/a | yes | | Pass |
| /services/school-runs | yes | yes | none (no FAQ) | | Pass |
| /airports/luton | yes | yes | yes | | Pass |
| /areas/dunstable | yes | yes | yes | TaxiService (provider #business) | Pass (minor) |
| /routes/luton-to-heathrow | yes | yes | yes | TaxiService, provider LocalBusiness | Fix (finding 1) |
| /fleet | yes | no | yes | ItemList of Vehicle | Pass |
| /contact | yes | no | yes | | Pass |

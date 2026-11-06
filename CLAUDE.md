@AGENTS.md

# Luton Minicab website: notes for Claude

Marketing site for **Luton Minicab** (operated by A2B Radio Cars). Business rules, approved content and open items live in [requirement.md](requirement.md). Read it before changing copy, adding sections or making claims.

## Stack
- Next.js 16.4 (App Router, `src/app`), React 19, TypeScript, Turbopack.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Read the guides in `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md).
- Tailwind CSS v4 through **`@tailwindcss/postcss`** (`postcss.config.mjs`). Do **not** reintroduce the `@tailwindcss/turbopack` loader. With it, only the first `globals.css` edit after each dev-server start was applied (tested and confirmed).
- Fonts: Inter for body (`--font-inter`), Fraunces for headings (`--font-display`), both via `next/font/google` in `layout.tsx`.
- Icons: `lucide-react`.

## Commands
- `npm run dev`: dev server on port 3000.
- `npm run lint` and `npx tsc --noEmit`: run both after every change.
- `npm run build`: **never run while a dev server is running in this folder.** It rewrites `.next` and has left the dev server serving stale CSS. Either stop the dev server first, or build an isolated copy elsewhere.
- If `LayoutProps` "cannot be found" after clearing `.next`, start the dev server once; it regenerates the types.

## Structure
- `src/config/site.ts`: the single source for the booking URL (`NEXT_PUBLIC_BOOKING_URL` overrides it), nav items and contact details. Phone, WhatsApp, email and operator licence are `null` placeholders.
- `src/app/page.tsx`: the homepage, in this order: Hero, ServiceStrip, Services, WhyTravel, Vehicles, Areas, Faq, FinalCta.
- **Holding pages** (`HoldingPage`, set to `noindex`):
  - `src/app/{services,fleet,about,contact}/page.tsx`
  - `src/app/services/[slug]`, which uses `generateStaticParams` from `services` in `site.ts` and calls `notFound()` for unknown slugs
- `not-found.tsx` is the branded 404.
- **Navigation:**
  - `site.nav` mixes `NavLink` and `NavGroup` (dropdown) items; use `isNavGroup()`.
  - `SiteNav` shows the desktop menu with click-to-open dropdowns from `xl` (1280px), and a menu button with accordions below that.
- `src/components/`: one component per section. Shared pieces are:
  - `BookOnlineLink` (`variant="button" | "link"`)
  - `CallToBook`
  - `HeaderShell` (sticky header that turns solid on scroll)
  - `Logo` (the supplied logo, via `next/image`; pass `eager` above the fold)
- **Brand assets:**
  - `public/brand/logo.png`: the supplied logo, with a transparent background, trimmed, original colours.
  - `src/app/icon.png`, `apple-icon.png`, `favicon.ico`: the emblem only (houses, car and road, no lettering).
  - `src/app/opengraph-image.png` (+ `.alt.txt`): the link-sharing image.
  - `assets/brand/luton-minicab-logo-original.png`: the untouched original, not served.

  Regenerate the derived files from the original if the logo changes. Never edit the logo artwork itself.
- **Airports section** (`Airports.tsx`): a featured Luton card plus a list of the other airports from `airports` in `site.ts`. Photo: `public/brand/airport-luton.png` (original in `assets/brand/airport-luton-original.png`).
- **Airport photo heroes:** every airport page uses `PageHero`, with its heading and text from `hero` in `airportDetails.ts`, and all six airports have their own photo, set in `heroPhotos` in `AirportPage.tsx` (image, alt, optional `fade`). Luton has an outside view using `photoRight` (uncropped on the right at desktop, its left edge blended into the page by a mask); the back-seat `airport-luton-hero` stays on /airports and the short pages, as it has no sign. The others share `photoFade`, which ends before the terminal signs. Keep alt text neutral, because these are AI images. Measure contrast behind every hero text line (4.5:1 or better) when you change a photo or fade.
- **Airport pages:** `AirportPage.tsx` renders /airports/[slug] (indexable) for the six in `airports`. Each needs a photo in `heroPhotos` and an entry in `airportDetails`. The vehicle images are shared as `fleet` in `site.ts`, used by `Vehicles.tsx` and `AirportFleet`.
- **Airport layout:** all six airports have entries in `src/config/airportDetails.ts` (hero, journeys, three meeting steps, questions), which `AirportPage.tsx` renders with `AirportJourneys`, `AirportMeetDriver`, `AirportFleet` and the homepage `Faq` (with `items`, `band`, and other-airport links as `children`). Stansted, London City and London Southend use the `oneTerminal` helper. Use "London Southend Airport", not "Southend", except as a short label where space is limited (the small journey illustrations); the slug stays `southend`. To add one, add an entry and its illustrations, and only state what the owner has confirmed. The 15 free minutes and name board or agreed point are confirmed for all six; airport charges vary, so don't state them.
  - The journey illustrations must stay on plain cream, so `AirportJourneys` isn't `band-alt`; the sections after it swap tone. Luton's are cropped from `assets/brand/luton-journeys-reference.png`. The other airports' are copies of those with only the label re-lettered (Avenir Next Demi Bold).
  - `AirportMeetDriver` icons (`public/brand/luton-step-*.png`) are transparent cut-outs from `assets/brand/luton-meet-driver-reference.png`, shared by all airports, and the rings are CSS.
  - `AirportGuide.tsx` is an optional green board with terminal tabs, shown when an entry has `guide` (Heathrow's numbered terminals, Gatwick's named ones), followed by the "Before you head outside" box. All panels stay in the HTML. Facts come from the airports' own sites: recheck them regularly and update the date in `note`.
  - `DriverHelp.tsx` is the shared "Can't find your driver?" row, used by `AirportGuide` and `AirportArrival`.
  - `AirportArrival.tsx` is the alternative for one-terminal airports with `arrival`: the box, illustration and `DriverHelp`, rendered inside `AirportMeetDriver`. Luton's illustration (`public/brand/luton-arrival.png`) is a transparent cut-out from `assets/brand/luton-arrival-reference.png`, and the others re-letter it. 
  - `AirportLocalAreas.tsx` links the six local area pages, shown when an entry sets `localAreas` (Luton), on `band-alt`. All airports keep sections alternating to the FAQ; check the `band` props in `AirportPage.tsx` when adding a section.
  - `AirportDetails.tsx` sits above the FAQ on every airport: `facts` and `factsNote` from `airportDetails.ts`, plus the "Why travel with us" list. Recheck the facts on each airport's site and update the date.
  - `AirportFleet` shows three travel choices from the `fleet` images, with no capacities or slider.
- **All Airports page:** `src/app/airports/page.tsx` has a compact hero (`PageHero` `compact`, for this page only), the six as photo cards (`AirportCards.tsx`, using `cardImage` and `cardText` from `airportDetails.ts`; photos are `public/brand/airport-<slug>-card.png`, originals in `assets/brand/`, AI images, so keep the alt text neutral. Five are retouched copies with the invented logos removed, keeping the names; Heathrow never had one), then `regionalAirports` from `site.ts` by region, and one "Ask about another airport" button (calls for now: point it at /contact once that page is real).
- **Short airport pages:** those nine use `AirportShortPage.tsx` through the same /airports/[slug] route. They're `noindex`, use `trustLocal`, and must not mention flight tracking, meet and greet or landing, because some may not have regular passenger flights. To upgrade one, move it into `airports`, but only with real details for its page: that list drives the full page, menu, footer and homepage.
- **Area pages:**
  - `areas` in `site.ts` (slug, name, heading, intro) drives the nav dropdown, the homepage list, `/areas` (overview) and `/areas/[slug]` (`AreaPage.tsx`). They're indexable.
  - Dynamic `[slug]` pages read `params` inside `<Suspense>` (required under Cache Components). Unknown slugs therefore stream the 404 page with `noindex` and HTTP 200, which is documented behaviour.
- **Areas section** (`Areas.tsx`): nine areas, each linking to its own page, and an illustration at `public/brand/areas-illustration.png`, whose background is matched to the band-alt cream (original in `assets/brand/areas-illustration-original.png`).
- **Booking banner** (`FinalCta.tsx`): rendered once in `layout.tsx` above the footer, so it's on every page. Don't add it to individual pages.
- **Footer** (`SiteFooter.tsx`; street art is `public/brand/footer-street.png`, cropped from the owner's reference `assets/brand/footer-reference.png`; the earlier SVG version is in `assets/legacy/FooterStreet.tsx`):
  - Five link columns built from `site.ts`. The contact icons become `tel:`/`wa.me`/`mailto:` links only once their values are set.
  - "Powered by MyCabify" links to https://mycabify.com.
  - The copyright year is **hard-coded**, because `new Date()` breaks prerendering; update it each January.
  - /privacy, /terms and /cookies are `noindex` holding pages.
- **Page standard (mandatory):**
  - Every page starts with `PageHero` and uses `ui.ts` (`container`, `section`, `eyebrow`, `h1`, `h2`, `lead`). Never hand-write heading sizes, eyebrow styles or hero heights. See DESIGN.md §4h.
  - `PageHero` `tone` is "light" for light photos and "dark" for dark ones.
  - The trust rows `trustLocal` and `trustAirport` live in `PageHero.tsx`.
- **Global scale:** on mouse and trackpad devices from 1024px up, `body { zoom: 0.8 }` in `globals.css` scales everything to look like 80% browser zoom. To change the desktop size, change that one value rather than individual components. Phones and touch tablets aren't affected. The root font size is 87.5% (14px), and sizes stay in rem so they follow it. Contrast and tap sizes must be measured with the zoom on: a light label can fall below 4.5:1 once it's smaller. Use `min-h-[44px]` for tap targets, not `min-h-11` or `min-h-12`, which are only 38.5px and 42px at this root size. Before the desktop zoom, body text and buttons stay at 14px or more; only uppercase eyebrow labels are smaller.
- **Type scale:** section h2s use `clamp(1.875rem,3.2vw,2.75rem)` and section padding is `py-16 sm:py-20` (see DESIGN.md §4d).
- **Section tones** after the change: services dark, airports light, why dark, vehicles light, areas dark, FAQs light, the booking banner deep green (`bg-foreground`), footer dark.
- **Services section** (`Services.tsx`):
  - Six cards from a `cards` array, each with an optional `image`. Until a photo is added it shows a deeper-cream panel with an icon.
  - Cards sit on `bg-paper`, a fixed cream token that `band-alt` doesn't override, inside the dark band.
  - Photos live in `public/brand/services/` (e.g. `school-runs.png`), imported into the array with alt text. The untouched originals are in `assets/brand/services-original/`.
  - The old line-art service rows (`illustrations/`, `RouteConnector.tsx`) are kept, unused, in `assets/legacy/`.
- **Hero image:**
  - `public/brand/hero-photo.png`: a full-width photo with a green fade, rendered with `next/image fill` (`loading="eager"`, `fetchPriority="high"`).
  - The untouched source is `assets/brand/hero-photo-original.png`.
  - Earlier hero artwork (`hero-storybook.png`, `HeroIllustration.tsx`) is kept, unused, in `assets/legacy/`.
  - The hero text sits on green, so its focus ring is overridden to gold (`[--color-ring:var(--color-primary)]`), and `CallToBook` has an `onDark` variant.

## Theme (Cream & Forest). Change colours only in `globals.css` `@theme`
- Background `#faf7ef` (cream, dominant). Deeper cream `#f3eee2` is used for `alt`, `surface` and `card`.
- `foreground` `#244638` (deep green, used for headings and body text). `muted` `#536d60`.
- `primary` `#e8c76a` (soft gold), **reserved for booking buttons and small highlights**. Buttons use green text (`primary-foreground`).
- `accent` `#846614` (deep gold) is used only for small uppercase eyebrow labels. `ring` is green.
- `road` `#3a6150` is for the illustration road and route line. `illustration` (= gold) is for small line-art details.
- `radius-control` is 12px (buttons).
- `--color-*: initial` removes Tailwind's default palette, so only these tokens exist. Don't use hex values in components.
- Alternating sections: add the `band-alt` class to a dark (deeper-cream) block. It also redefines `--color-background`, so illustration fills match the band. The homepage strictly alternates light and dark; keep it that way when adding sections.

## Conventions and gotchas
- The booker is external. Use a plain `<a href={site.bookingUrl}>`, opened in the **same tab** with no `target`. Never build a booking form.
- No `tel:` or `wa.me` links until real numbers are in `site.ts`. `CallToBook` renders an inactive button plus a visible placeholder note while `site.phone` is `null`.
- `cacheComponents` keeps visited pages in the DOM with `display: none`. Selectors like `:has(main…)` will match hidden pages.
- Don't call `new Date()` in server components; it breaks prerendering under `cacheComponents`. The footer shows "© Luton Minicab" with no year for this reason.
- Hooks: avoid `setState` inside effects, which the lint rule `react-hooks/set-state-in-effect` flags. Use `useSyncExternalStore` for browser state, as `HeaderShell` does.
- Accessibility:
  - visible focus (`:focus-visible` uses `--color-ring`)
  - one h1 per page, h2 per section, h3/h4 inside
  - `aria-label`s on icon buttons; decorative SVGs `aria-hidden`
  - tap targets of 44px or more
- Copy: simple British English, short and warm, with no superlatives or unverified claims. See requirement.md.
- Verify UI changes in a real browser (Playwright, or Chrome DevTools) at 1440, 1024, 768 and 375 widths, with no horizontal overflow.

## Vehicles carousel
- `Vehicles.tsx` is a client component with six illustrative cutouts from `public/brand/Charcoal*.png`, in Saloon, Estate, MPV6, MPV Plus, MPV7, Executive order.
- Five-second rotation, 450ms transitions, desktop side previews, mobile swipe, arrows, dots, category selectors and pause/play. Hover, off-screen and hidden tabs suspend rotation; focus pauses until explicit restart. Reduced motion defaults to no autoplay and disables transitions.
- No capacity figures or prices. Book Online opens the general external booker without vehicle preselection; `/fleet` remains a holding page.

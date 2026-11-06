# Luton Minicab: brand and design guide

Use this guide when designing the logo and final illustrations, or extending the site. The live implementation is in `src/app/globals.css` (tokens) and `src/components/`.

## 1. Brand idea
**"One road, everyday moments."** One continuous road links the places people need to be: home, school, the town and the airport. The brand should feel **calm, premium and approachable**: a dependable local service, not a flashy luxury one.

- **Personality:** warm, reassuring, quietly confident, local.
- **Not:** loud, corporate, "luxury chauffeur", or taxi-yellow-and-black.
- **References** (for feel only; never copy): addisonlee.com and blacklane.com, for their restraint, generous space and few, large sections.
- **Avoid looking like:** Addison Lee (black and bright yellow), or generic blue taxi sites.

## 2. Colour: Cream & Forest (final)
| Role | Token | Hex | Use |
|---|---|---|---|
| Page background | `background` | `#faf7ef` | Cream. The dominant colour everywhere |
| Alternate sections | `alt` / `surface` / `card` | `#f3eee2` | Deeper cream for every other section, the footer and the scrolled header |
| Borders, dividers | `border` | `#e4ddcd` | Fine hairline rules |
| Headings and text | `foreground` | `#244638` | Deep green |
| Secondary text | `muted` | `#536d60` | Green-grey |
| Booking buttons | `primary` | `#e8c76a` | Soft gold, **only** for booking buttons and small highlights |
| Button hover | `primary-hover` | `#d0b864` | |
| Text on gold | `primary-foreground` | `#244638` | Green text on gold buttons (6.4:1) |
| Small labels | `accent` | `#846614` | Deep gold, for uppercase eyebrow labels only |
| Focus outline | `ring` | `#244638` | Green, 2px, offset 3px |
| Outline button border | `input` | `#536d60` | e.g. "Call to Book" |
| Soft tint | `tint` | `#eef0e6` | Hover and current menu item |
| Illustration road | `road` | `#3a6150` | Road and route line |
| Illustration details | `illustration` | = `primary` | Doors, roof signs, clock hands |
| WhatsApp (reserved) | `whatsapp` | `#25d366` | Only once a real number exists |

**Rules:**
- Cream dominates.
- Gold is a spice, not a base: never use it for large areas, backgrounds or headings.
- No gradients, glows, shadows, metallic effects, blue, purple or neon.
- All text meets WCAG AA. Small text is 4.5:1 or higher, and large text and UI elements are 3:1 or higher.

## 3. Typography
| Use | Font | Style |
|---|---|---|
| Headings | **Fraunces** (serif) | Regular weight, sentence case, tight leading (about 1.05), slight negative tracking. Italic for emphasis, e.g. "*need to be.*" |
| Body and UI | **Inter** (sans) | 16–18px body, relaxed line height |
| Eyebrow labels | Inter | 12px, semibold, uppercase, wide tracking (0.22em), deep gold |

Approximate sizes:
- Hero h1: 44–76px.
- Section h2: 36–52px.
- Service-row h3: 32–44px.

Keep headings short; one or two lines is ideal.

## 4. Layout and components
- **Rhythm:** sections strictly alternate light cream and deeper cream (`band-alt`). Never put two blocks of the same tone next to each other.
- **Airport journeys:** `AirportJourneys.tsx` follows the owner's reference (`assets/brand/luton-journeys-reference.png`): centred, two columns with a thin divider, illustrations cropped from the reference on plain cream. Labels use `accent`, not the reference's lighter gold, for contrast. The sections after it swap tone to keep the rhythm. Used by Luton and Heathrow.
- **Meeting your driver:** `AirportMeetDriver.tsx` follows the owner's reference (`assets/brand/luton-meet-driver-reference.png`), on `band-alt` for the rhythm. Icons are transparent cut-outs inside CSS rings, joined by a 3px `primary` line at `lg` and up; numbers use `accent` for contrast. Below `lg` the steps stack with no line.
- **Terminal board:** `AirportGuide.tsx` is a `bg-foreground` panel on plain cream, with gold numeral tabs (left at `lg`, a row above below that), cream text and a gold focus ring, followed by a gold-edged box and the shared `DriverHelp` row. It deliberately doesn't follow other sites' layouts.
- **Arrival help:** `AirportArrival.tsx` sits inside the meeting section on one-terminal airports, following the owner's reference (`assets/brand/luton-arrival-reference.png`): a gold-edged box and transparent illustration, then a gold rule and "Can't find your driver?" with Call and WhatsApp.
- **Airport details:** `AirportDetails.tsx` has a divided fact list on the left and a `bg-paper` benefits card on the right, stacking below `lg`. Its tone depends on the airport, to keep the rhythm.
- **Airport cards:** `AirportCards.tsx` shows the six airports on /airports as `bg-paper` cards with a 16:9 terminal exterior photo (`airport-<slug>-card.png`), three columns at `lg`, two at `sm`, one on phones.
- **Travel choices:** `AirportFleet.tsx` follows the owner's reference on plain cream: centred, three columns from `md`, existing `fleet` cut-outs (category illustrations only), thin `primary` rules.
- **Spacing:** generous. Sections use about 80–112px vertical padding; content width is up to 1280px with 16–40px side gutters.
- **Separation:** use fine 1px rules and space, not heavy cards. Avoid card grids and decorative icons in circles.
- **Buttons:**
  - Primary (gold, green text, 12px radius, 48px tall): **Book Online** only.
  - Secondary (cream with green outline): **Call to Book**.
  - Text links (green, gold underline on hover): "Book this journey →".
- **Header:** the logo on the left (64px tall on mobile, 80px on desktop; the header is 80px or 96px tall so the stacked lettering stays legible) and the nav plus Book Online on the right. It's transparent at the top and turns deeper cream with a hairline once scrolled. On mobile, a menu button opens a full-width panel.
- **Motion:** none beyond small hover and colour transitions. Respect reduced-motion settings.
- **Mobile:**
  - stack everything
  - tap targets of 44px or more
  - no horizontal scrolling
  - illustrations scale down without cropping their key scenes

## 4b. Service cards (homepage)
- **Card:** a 12px rounded card with a fine border, on the lighter cream (`paper`), set inside a deeper-cream band.
- **Photo slot:** 3:2, at the top.
- **Body:**
  - a Fraunces title (about 28px)
  - a 40px gold rule
  - one line of Inter text (17px)
  - a "Find out more →" link
- **Section heading:** centred, with the label "OUR SERVICES" in spaced deep-green capitals between two 48px gold rules.
- **Photos:** supplied (November 2026), stored in `public/brand/services/`. They must be clearly illustrative, never presented as the real team or fleet, and they should share one style and lighting.

## 4c. Airport section (homepage)
- A centred heading block, matching the Services one.
- **Left:** a featured Luton card (2:1 photo, then a deeper-cream panel with "CLOSE TO HOME", a serif title, one line of text and a gold button).
- **Right:** "Travelling from another airport?" and the five other airports. Each row has a thin gold plane, a serif name and a gold arrow, with gold hairline dividers between rows.
- **Closing line:** centred italic serif, between gold rules.

## 4e. Benefits grid (homepage)
- A 3×2 grid with hairline dividers between cells (no outer frame).
- Each cell is centred: a 96px soft-gold circle with a deep-green outline icon, a Fraunces title and a short muted line.
- Header left-aligned, with a 64px gold rule beside the intro.

## 4f. Booking banner (every page)
- A deep-green band with a small gold arc and dots above a letter-spaced cream eyebrow, a two-line cream Fraunces headline, one cream line and two large buttons.
- Thin cream route lines (30% opacity) with gold dots sit in the corners; they're hidden below `md`.

## 4g. Footer
- Light cream, with gold hairlines between the bands.
- **Top row:** logo, tagline and contact items, each an icon over a label, separated by gold dividers.
- **Columns:** five, with letter-spaced bold headings and a short gold underline.
- **Street scene:** the owner's reference line-art street (`public/brand/footer-street.png`), with its background matched to the page cream. A designer SVG would render even sharper.
- **Bottom bar:** copyright and "Powered by MyCabify" on the left; legal links and a circular back-to-top on the right.

## 4h. Page standard (all pages)
Every page uses **`PageHero`** (`src/components/PageHero.tsx`) and the class constants in **`src/components/ui.ts`**.

- **Hero order:** EYEBROW (where or what) → emotional headline → one plain sentence → **Book Online →** + **Call to Book** (large) → trust row.
  - Holding pages and the 404 use one button instead.
- **Hero size:** desktop height `clamp(35rem,38vw,40rem)`, the same on every photo page. Below `lg`, the photo is 16:9 above a solid text panel.
- **Tone:**
  - Light photos get a cream fade with green text and a deep-gold eyebrow.
  - Dark photos get a green fade with cream text and a cream eyebrow.
  - Both fades are measured to keep every text line at **4.5:1 or better**. Re-measure if a photo changes.
- **Type:**

  | Element | Size |
  |---|---|
  | h1 | `clamp(2.25rem,4vw,3.5rem)`, semibold |
  | Section h2 | `clamp(1.875rem,3.2vw,2.75rem)`, semibold |
  | Eyebrow | 0.875rem, semibold, 0.2em tracking, capitals |
  | Lead | 1.125rem |
- **Spacing:** sections use `py-16 sm:py-20`, inside the `max-w-7xl` container.
- **Hero photos:**

  | Pages | Photo |
  |---|---|
  | Homepage, areas, /areas | `hero-photo` (dark) |
  | Luton Airport | `airport-luton-terminal-hero` (light, `photoRight`, number plate blanked) |
  | /airports, short airport pages | `airport-luton-hero` (light, default fade; also the fallback) |
  | Other airports | `airport-<slug>-hero` (light, shared `photoFade` in `AirportPage.tsx`) |
- **Ending:** every page ends with the green booking banner, then the footer (both in the layout).

## 4d. Type scale (reduced November 2026)
The whole site runs at a **14px root** (`html { font-size: 87.5% }` in `globals.css`), so every rem-based size below renders 12.5% smaller than its nominal value. On mouse and trackpad devices from 1024px up, `body { zoom: 0.8 }` then scales everything to 80%, so body text renders at about 12px and eyebrow labels at about 10px. Phones and touch tablets stay at full size.
| Element | Size |
|---|---|
| Hero h1 | `clamp(2rem,3.4vw,3rem)` |
| Section h2 | `clamp(1.875rem,3.2vw,2.75rem)` |
| Booking banner h2 | `clamp(2rem,3.6vw,3rem)` |
| Card and airport titles | 1.5rem |
| Intros | 1.125rem |
| Section padding | `py-16 sm:py-20` |

Keep new sections on this scale.

## 5. Illustration style
The current illustrations are **provisional** and drawn in code. Final artwork should keep the same language.

- **Line art:** thin, even strokes (about 1.5px at display size) in deep green `#244638`, with fills in the background cream so shapes sit on the page.
- **Accents:** small soft-gold details only, such as doors, a minicab's roof sign, clock hands, a lamp or an awning.
- **The road:** a continuous deep-green `#3a6150` band with a dashed cream centre line, carrying a small minicab. Between sections, a dotted green route line links scene to scene.
- **Architecture:** recognisably British. Terraced or semi-detached houses with chimneys, a Victorian board school with a clock gable, a high-street terrace with shopfronts, an airport terminal with a control tower.
- **No text** inside illustrations (no signs with words, no logos). All copy stays as real website text.
- **No people** drawn as if they were real staff, and no photorealistic vehicles presented as the real fleet.
- **Format:** SVG, editable, with a transparent or cream background, scalable from 340px to 700px wide.

### Scenes needed
| Scene | Where | Contents |
|---|---|---|
| Hero | Homepage top | **Photo** (November 2026): a photo-realistic image of a driver opening a dark saloon's door for a passenger outside a brick house. It's full width, with a deep-green (`#244638`) left-to-right fade (85% to 70% to transparent by 70% width: the lightest that keeps every text line at 4.5:1 or better). Headline Fraunces 500 at about 55px, with 19px body and 52px buttons behind cream text; on mobile the photo stacks above a solid green panel. It's an AI image, so never present it as the real team or fleet. The earlier storybook illustration and the line-art hero are kept in `assets/legacy/` |
| Local journeys | Services row 1 | Offices giving way to open countryside, with a larger car or MPV on the road |
| Airport transfers | Services row 2 | Terminal, control tower, a departing plane, a minicab at the kerb with a suitcase |
| School runs | Services row 3 | A terraced street and a school gate with railings, with a minicab outside |

## 6. Logo
**Supplied** (November 2026): a stacked logo. Above, an emblem of a row of British houses, a dark green saloon on a winding road, a gold swoosh and a gold plane, framed by a green arc. Below, a serif "Luton" with "MINICAB" in spaced capitals between two gold rules. Its colours are close to the theme: green about `#0b4d2c` and gold about `#e1ac48`.

| File | Use |
|---|---|
| `assets/brand/luton-minicab-logo-original.png` | The original as supplied (1536×1024, cream background). Source for everything below; not served |
| `public/brand/logo.png` | Full logo with a transparent background, trimmed (966×927). Used in the header (64–80px tall) and footer (112px tall) |
| `src/app/icon.png` (512), `apple-icon.png` (180), `favicon.ico` (16/32/48) | **Emblem only** (no lettering) on cream, because the words are unreadable at icon sizes |
| `src/app/opengraph-image.png` (1200×630) | Link-sharing preview: the full logo centred on cream |

**Usage rules:**
- Don't recolour, stretch, crop the lettering, or place the logo on busy or dark backgrounds.
- Leave clear space around it of at least the height of the "MINICAB" line.
- Minimum size: 64px tall for the full logo. Below that, use the emblem only.

**Still worth asking the designer for:**
1. Vector artwork (SVG) for sharper rendering.
2. A **horizontal lock-up** (emblem beside the words) for slimmer headers.
3. A **simplified icon** for favicons. The detailed emblem becomes muddy at 16–32px.
4. A one-colour version.

### Original logo brief (for the designer's follow-up work)
The logo must:
- work in deep green on cream, in gold on green, and in one colour (black or white)
- stay legible at small sizes (a 32px favicon, and the mobile header at about 24px tall)
- come as a horizontal lock-up (for the header) and as a compact mark (favicon, app icon, social avatar)
- fit the "one road" idea. A road, route or journey motif is welcome, but not required
- sit comfortably next to Fraunces and Inter

Avoid:
- taxi chequerboards
- black-and-yellow taxi clichés
- steering wheels or car silhouettes as the whole idea
- gradients
- anything resembling Addison Lee or Blacklane

**Deliverables:** SVG plus PNG (transparent), in full-colour, one-colour and reversed versions. Also a favicon set (`favicon.ico`, a 512px PNG, and an Apple touch icon) and a social sharing image template (1200×630).

## 7. Accessibility checklist
- Text contrast meets AA. Gold is never used for body text.
- Visible keyboard focus on every interactive element.
- One h1 per page, h2 per section, and headings in order.
- Icon-only buttons have labels; decorative graphics are hidden from screen readers.
- Content works at 320px wide and at 200% zoom.

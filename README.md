# Luton Minicab website

Marketing website for **Luton Minicab**, operated by A2B Radio Cars. It covers local journeys, school runs and airport transfers from Luton and beyond, available 24/7.

Bookings are made on the existing web booker (<https://www.heathrowminicabbooking.com/>). This site links to it and does not take bookings itself.

## Documents
| File | What it's for |
|---|---|
| [requirement.md](requirement.md) | Business brief: approved services, claims, content rules and open items |
| [DESIGN.md](DESIGN.md) | Brand and design guide: colours, type, illustration style, logo brief |
| [SEO.md](SEO.md) | Search plan: target searches, page titles and descriptions, local SEO |
| [CONTENT-BRIEFS.md](CONTENT-BRIEFS.md) | Briefs for the inner pages that still need content |
| [CLAUDE.md](CLAUDE.md) | Working notes for Claude Code and developers |

## Getting started
Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # type check
npm run build      # production build (stop the dev server first)
npm start          # serve the production build
```

> Don't run `npm run build` while `npm run dev` is running in the same folder. It rewrites `.next` and can leave the dev server serving stale styles.

## Configuration
| Setting | Where | Notes |
|---|---|---|
| Booking URL | `NEXT_PUBLIC_BOOKING_URL` env var, falling back to `src/config/site.ts` | Defaults to the live booker. Opens in the same tab |
| Phone, WhatsApp, email, operator licence | `src/config/site.ts` | Currently `null` placeholders. Once a value is set, the matching link or text appears automatically |
| Navigation | `src/config/site.ts` (`nav`) | Header, mobile menu and footer all read from here |
| Colours, fonts, radius | `src/app/globals.css` (`@theme`) | The Cream & Forest theme. Don't put hex values in components |

## Tech stack
- **Next.js 16.4** (App Router, `cacheComponents`) with **React 19** and **TypeScript**
- **Tailwind CSS v4** through `@tailwindcss/postcss`
- Fonts: **Fraunces** (headings) and **Inter** (body), via `next/font`
- Icons: `lucide-react`

## Project structure
```
src/
  app/            routes: homepage, holding pages, 404, global styles
  components/     one component per section, plus shared pieces
    illustrations/  provisional line-art scenes
  config/site.ts  booking URL, contact details, navigation
```

## Status
- **Homepage:** built. Hero, services, why travel with us, vehicles, areas, FAQs, booking banner.
- **Services, Our Fleet, Areas, About, Contact:** holding pages only, with content still to be approved (see [CONTENT-BRIEFS.md](CONTENT-BRIEFS.md)).
- **Logo:** in place (header, footer, icons, sharing image).
- **Still needed:** final illustrations, real contact and licence details, and verified vehicle capacities. See *Open items* in [requirement.md](requirement.md).

## Deployment
- **Host:** Vercel (confirmed), not yet set up.
- **Domain:** `https://www.lutonminicab.com` is the main address; `lutonminicab.com` redirects to it.
- **Setup steps:**
  1. Push the repo to GitHub.
  2. Import it in Vercel. It detects Next.js automatically.
  3. Set `NEXT_PUBLIC_BOOKING_URL` if it differs from the default.
  4. Add both domains in Vercel, with `www` as primary.
  5. Point DNS at Vercel.

  Pushes to `main` then deploy automatically.

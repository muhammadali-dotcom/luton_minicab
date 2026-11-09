# Luton Minicab website requirements

Business brief, approved decisions and open items for **lutonminicab.com**. Keep this file up to date when anything is confirmed or changed.

## 1. Business
- **Brand:** Luton Minicab
- **Operating company:** A2B Radio Cars
- **Relationship (confirmed):** Luton Minicab is its **own, separate business**. A2B Radio Cars provides the dispatch and drivers. Explain this on the About page. The site's current footer line ("Luton Minicab is operated by A2B Radio Cars") needs rewording to match.
- **Availability:** 24/7
- **Logo:** supplied by the owner (stacked emblem plus "Luton Minicab" lettering). It's used in the header, footer, favicon and app icons (emblem only), and the link-sharing image. See DESIGN.md §6. Don't alter the artwork.

## 2. Booking
- An existing web booker is used: <https://www.heathrowminicabbooking.com/>. It's configurable through `NEXT_PUBLIC_BOOKING_URL` or `src/config/site.ts`.
- **Book Online opens the booker in the same tab.** Don't build a booking engine or a booking form on the site.
- Customers can also book by phone and WhatsApp. School runs and SEND/assisted transport use the same booking channels.

## 3. Contact details: placeholders until supplied
| Detail | Status |
|---|---|
| Phone | Placeholder; no working `tel:` link until supplied |
| WhatsApp | Placeholder; no working link until supplied (the colour `#25d366` is reserved) |
| Email | Placeholder |
| Operator / licence details | Placeholder |

**Temporary exception (November 2026, owner's request):** phone 020 8343 4444, WhatsApp +44 7983 527104 and email bittacycs@hotmail.com, taken from bittacycars.com. Replace them with Luton Minicab's own details before launch. Otherwise, don't guess contact details.

## 4. Services
**Confirmed:**
- Local taxi and minicab journeys
- Airport transfers (to and from all UK airports)
- School runs
- SEND and assisted transport
- Corporate and business travel
- Long-distance journeys
- Group journeys using available cars/MPVs
- Station & hotel transfers (confirmed November 2026)

**Don't advertise:** minibus travel, or wheelchair-accessible vehicles.

**SEND/assisted transport:** don't imply it includes wheelchair accessibility, passenger escorts or medical care. The approved wording is: "For passengers who need a little extra support. Tell us about any needs when you book."

## 5. Coverage
- **Main focus:** Luton and the surrounding areas.
- **Additional pickup areas:** Hounslow, Mill Hill and Heathrow.
- **Confirmed pickup coverage** (updated November 2026): Luton (including Leagrave and Stopsley), Dunstable, Houghton Regis, Harpenden, Mill Hill, Hounslow and Heathrow, each with its own page at /areas/[slug].
- **Airports:** transfers to and from all UK airports. The menu names six (Luton, Heathrow, Gatwick, Stansted, London City, London Southend), each with its own page, plus "View All Airports". This replaces the earlier "don't list airports individually" decision (owner's request, November 2026). Nine more are listed on /airports with short pages (see below). Other UK airports are still covered.
- **Hero standard** (November 2026): all pages follow EYEBROW → headline → sentence → buttons → trust.
  - Home: "Your everyday journeys. Taken care of."
  - Airports: "{NAME} AIRPORT TRANSFERS", with heading and text chosen per airport (see Airport heroes below).
  - Areas: "TAXIS IN {NAME}" / "Your local ride, close to home." / the area intro.
  - /areas: "Your local ride. Wherever life takes you."
  - Page titles keep the location for search (e.g. "Heathrow Airport Transfers", "Taxis in Dunstable").
- **Airport heroes** (November 2026): each airport has its own photo (`public/brand/airport-<slug>-hero.png`; Luton uses `airport-luton-terminal-hero.png`, an outside view with the number plate blanked) and owner-chosen wording, under the eyebrow "[AIRPORT] AIRPORT TRANSFERS", with Book Online and Call to Book. Luton: "Your local ride to Luton Airport." / "Sit back and relax. We'll take care of the road." Heathrow: "Landing at Heathrow? We'll take you home." / "After a long flight, all you need to do is sit back." Gatwick: "Back at Gatwick? Let's get you home." / "You've done the flying. We'll do the driving." Stansted: "Your holiday starts at your front door." / "We'll drive you to Stansted, so you can start relaxing early." London City: "Quick flight. Easy ride." / "To or from London City Airport, we'll keep it simple." London Southend: "Small airport. Simple ride." / "A calm journey to or from London Southend Airport." These are AI images and must not be presented as real photos of the airport or our cars.
- **Airport pages approved** (November 2026): /airports/[slug] for the six airports, indexable. All six now use the layout described in the airport notes below. Rules: no specific meeting point ("your driver meets you at the airport; we'll share your driver's details before you travel"), no free-waiting or delay-charge promises (flight tracking only), and no luggage or passenger numbers.
- **Luton Airport page** (November 2026): /airports/luton has its own sections: Luton Airport journeys (eyebrow "LUTON AIRPORT JOURNEYS", heading "Flying out or heading home?", sub-line "A simple journey, whichever way you're going.", then "To Luton Airport" and "From Luton Airport" with Book Online, taken from the owner's reference), Meeting your driver (eyebrow "MEETING YOUR DRIVER", heading "Landed? Here's what happens next.", sub-line "Three simple steps from arrivals to your next stop.", then 01 Collect your bags, 02 Check your pickup details, 03 Meet your driver, wording from the owner's reference), Travel your way (eyebrow "TRAVEL YOUR WAY", heading "A car for every kind of journey.", sub-line "A trip for one, a family holiday or a day of meetings. Find your fit.", three choices: Just you, or two (Saloon · Estate), Bringing everyone? (MPV6 · MPV Plus · MPV7), Travelling for work? (Executive), then View Our Fleet and "Choose your vehicle when booking."), and an FAQ styled like the homepage ("FAQS", "Got a question?", "Here are a few helpful answers.", "Need more help? Contact us") with four Luton questions (meeting your driver, flight delays, waiting time, child seats). The meeting section (merged, November 2026, to avoid repetition) also has "Before you head outside" and "Can't find your driver?", and no pickup location is named; owner to confirm whether the airport's charge is added to the quote. The page also has "Picking you up across Luton" (six local area links). No airport prices are shown, as the airport's own pages differ. The section promises "meeting instructions" and an "agreed meeting point", so booking confirmations must include them. Owner confirmed (November 2026): passengers meet the driver at the agreed point or where the driver tells them, and the driver waits free for 15 minutes, starting once they reach the pickup point at the agreed time. After that, waiting charges apply, and these are discussed with the customer before the booking is confirmed. The rate isn't stated on the site. This page shows no capacities. The other airports keep the shared wording.
- **Heathrow Airport page** (November 2026): /airports/heathrow uses the Luton layout, with "To Heathrow Airport" and "From Heathrow Airport", "Landed at Heathrow? Here's what happens next.", a terminal board for T2 to T5, "Before you head outside", "Can't find your driver?", and its own questions. Meeting points and pickup rules were checked on heathrow.com on 5 November 2026 and must be rechecked regularly, because Heathrow's arrangements change. No Heathrow prices appear. Taken from heathrowminicab.com on the assumption it's the same business (owner to confirm): Terminals 2 to 5 covered, name board or agreed pickup point, 15 free minutes, drop-off charge added to the quote. Booking confirmations must match this page, including the T4 pickup and the T5 meeting point.
- **Gatwick Airport page** (November 2026): /airports/gatwick uses the same layout, with "Landed at Gatwick? Here's what happens next." and a terminal board for North and South. Gatwick names no public meeting point, so the board points to the booking confirmation. Express pick-up bays (North: Car Park 6, Level 4; South: Car Park 3, ground floor) were checked on gatwickairport.com on 6 November 2026 and must be rechecked regularly. No prices appear. Owner to confirm: both terminals are served, where drivers actually meet passengers, whether the 15 free minutes applies (the page says to ask), and whether airport charges go on the quote. Booking confirmations must include the meeting details for each terminal.
- **All six airports** (owner confirmed, November 2026): drivers wait free for 15 minutes once they reach the pickup point at the agreed time, and passengers meet them inside arrivals with a name board or at an agreed pickup point. Airport charges vary by airport, so pages say to ask when booking and state no amounts (Heathrow's drop-off charge is added to the quote). Each page has "Good to know about [Airport] Airport" (three facts from the airport's own site, checked 6 November 2026; recheck regularly) and "Why travel with us" (the confirmed benefits). London City's facts come from its site as shown in search results, because automated reading is blocked, and need a manual check.
- **Airport name** (owner's decision, November 2026): use "London Southend Airport" everywhere. "Southend" is only a short label where space is limited, such as the small journey illustrations. The URL stays /airports/southend.
- **Stansted, London City and London Southend pages** (November 2026): all use the one-terminal layout, with a "Good to know" pickup line and their own charges answer. Stansted and Southend were checked on the airports' sites on 6 November 2026. London City blocks automated reading, so its line comes from its FAQ as shown in search results and should be checked by hand. No prices appear. The waiting and charges answers say to ask, because the owner hasn't confirmed them for these airports. Owner to confirm: where drivers actually meet passengers, whether the 15 free minutes applies, whether airport charges go on the quote.
- **All Airports page approved** (November 2026): /airports is indexable, with a compact hero (heading "Which airport are you travelling to or from?", line "Pick your airport, and leave the road to us."), the Available 24/7, Fixed fares and DBS-checked drivers trust row (flight tracking and meet and greet aren't promised here, as the page also lists airports that may have no regular flights), then six photo cards for the main airports with practical lines, then "Other UK airports" by region (Midlands: Birmingham, East Midlands; North of England: Manchester; Scotland: Edinburgh, Inverness; Wales: Aberporth, Cardiff, Pembrey, Swansea). Aberporth, Pembrey and Swansea stay listed (owner confirmed, November 2026: they're in the booking system's airport list), even though they may have no regular passenger flights.
- **Short airport pages** (November 2026): each of those nine links to a short page at /airports/[slug] (hero, How to book, links to other airports), set to `noindex`. They use Book Online and Call to Book, on the assumption that the booker can price them (they're in the airport API; owner to confirm). They make no flight tracking, meet and greet, landing, price or journey-time claims. Only give an airport a full, indexable page once there are real details for it, not just a changed name.
- **Area pages approved** (November 2026): /areas (overview) plus one page per area at /areas/[slug] (Luton, Leagrave, Stopsley, Dunstable, Houghton Regis, Harpenden, Mill Hill, Hounslow, Heathrow). They're indexable, built from confirmed services and benefits plus a short factual location line, with no journey times, prices or local claims unless supplied.

## 6. Fleet
- Six categories: **Saloon, Estate, MPV6, MPV Plus, MPV7 and Executive**. The names match the booker.
- **Capacities are not shown until verified.** The owner will send the confirmed passenger, suitcase and hand-luggage limits for all six vehicles. The homepage shows names with plain-English guidance and the note "Exact passenger and luggage limits are shown when you book."
- A screenshot in Downloads ("Taxi booking vehicle selection screen.png") lists these capacities (passengers / suitcases / hand luggage). They're **unverified**, and MPV7 = 6 passengers looks inconsistent:
  - Saloon 4/2/2
  - Estate 4/3/3
  - MPV6 6/4/3
  - MPV Plus 8/8/6
  - MPV7 6/4/4
  - Executive 3/2/2
- Don't invent capacities, luggage limits or vehicle availability.
- **No car brands** (owner's decision, November 2026): vehicle pictures show no maker badges or names. Category names (Saloon, Estate, MPV6, MPV Plus, MPV7, Executive) stay, as they match the booker.
- **Service pages approved** (November 2026): /services and the five /services/[slug] pages are indexable, with owner-chosen hero wording: Our Services "Here for every part of your day." / "From school runs to airport trips, pick the journey you need."; School Runs "A calm start to the school day." / "Friendly, DBS-checked drivers for the journey to school and home again."; Corporate Travel "Arrive ready for business." / "Comfortable rides to meetings, offices and events, booked one journey at a time."; Long-Distance Travel "Further afield? Sit back." / "A comfortable ride for longer journeys, from your door to theirs."; Station & Hotel Transfers "Smooth connections, door to door." / "Rides to and from stations and hotels, with time to spare."; Local Journeys "Your everyday plans. A ride away." / "Trips to the shops, appointments or someone special. We’ll help you get there." (owner’s street photo from their reference, full width with the text on the cream wall;'s own structure: Everyday journeys as the owner's street illustration with Shopping & errands "Room for your bags. A ride there and back.", Appointments "One less thing to plan for your appointment.", Family & friends "More time with the people you love." and Evenings out "Enjoy your evening. Plan your ride home."; Local areas we cover, the six local areas as cards with location lines (Luton "Across the town, day or night", Leagrave "North-west Luton", Stopsley "North-east Luton", Dunstable "Just west of Luton", Houghton Regis "Just north of Dunstable", Harpenden "South of Luton, in Hertfordshire"), "Don’t see your area? Just ask." with an Ask about your area button, plus View All Areas; Need help with your journey? "Travelling with extra bags or need a return pickup? Tell us what you need." with Call and WhatsApp) School runs are booked per journey (owner confirmed); the SEND point uses the approved wording.
- **Fleet page approved** (November 2026): /fleet is indexable. Hero (owner's reference, November 2026) "Your plans. Your people. Your kind of car." / "From everyday trips to family holidays and business travel, find a car that suits your journey.", Explore Our Cars and Call to Book, and Everyday journeys, Family & group trips, Business travel; then "Find your fit" section (owner's reference): heading "Six ways to make it your journey.", a Need help choosing button, six numbered vehicles each with a tagline, Book Online and "Example vehicle", and "Passenger and luggage limits are shown when booking. Vehicle models may vary.", "Not sure which car?" (owner's reference: illustration, "Tell us who's coming and what you're bringing.", three tips, Call us and WhatsApp us, "You can also compare vehicle limits when booking online.") and three questions. No capacities until verified.

## 7. Confirmed benefits (the only claims allowed)
- Fixed fares
- Flight tracking
- Meet and greet
- Child seats on request
- DBS-checked drivers
- Available 24/7

**Don't add unconfirmed promises**, including:
- free waiting time, except the confirmed 15 minutes on the Luton Airport page
- cancellation terms
- child-seat guarantees
- delay charges or refunds
- "no hidden charges", "5-star", "licensed & insured" or "largest"

## 8. Payments
- Cash, or online payment through a payment link.
- **Don't advertise card payment in the vehicle.**
- **No corporate accounts or monthly invoicing** (decided). Business customers book and pay per journey like everyone else (cash or online payment link). Don't advertise accounts or invoicing.

## 9. Content style
- Simple British English. Short, clear, warm and reassuring.
- Connect with everyday passenger needs without exaggerated claims.
- Avoid jargon, generic luxury language and unsupported superlatives.

## 10. About page (planned)
- A short, separate About Us page explaining Luton Minicab and its relationship with A2B Radio Cars.
- Don't invent company history, years of experience, fleet size or achievements.

## 11. Images and reviews
- AI-generated illustrations and images may be used. Never present generated people or vehicles as photos of the real team or fleet.
- The current illustrations are **provisional line art**, to be replaced or refined by a designer.
- **Leave reviews out until genuine reviews are supplied.**

## 12. Design direction (approved)
- **References:** addisonlee.com and blacklane.com, for their simplicity, restraint and premium feel. The identity and layout are original; nothing is copied.
- **Concept:** "One road, everyday moments." One continuous road links a British home, a school, a town streetscape and an airport, with a small minicab on the road. Website text stays as real HTML, never baked into images.
- **Style:** calm, premium and approachable. Generous spacing, fine rules instead of heavy cards, no gradients, glows or unnecessary animation.
- **Type:** Fraunces (serif) for headings, Inter for body text.
- **Colour theme: Cream & Forest (final)**
  - Cream `#faf7ef` is dominant, with deeper cream `#f3eee2` for alternating sections.
  - Deep green `#244638` for headings and text.
  - Soft gold `#e8c76a` **only for booking buttons and small highlights**. Deep gold `#846614` for small labels.
  - The illustration road and route line are deep green `#3a6150`.
  - Buttons have 12px rounded corners.
- **Section rhythm:** the homepage strictly alternates light (cream) and dark (deeper cream) blocks.
- **Responsive:** desktop, tablet and mobile with no horizontal overflow. Readable contrast (WCAG AA), visible keyboard focus, and accessible navigation and labels.

## 13. Site structure
**Navigation** (November 2026):
- Home
- **Airports** ▾: Luton, Heathrow, Gatwick, Stansted, London City, London Southend, plus "View All Airports"
- **Our Services** ▾: Local Journeys, School Runs, Corporate Travel, Long-Distance Travel, Station & Hotel Transfers, plus "All services"
- Our Fleet
- **Areas We Cover** ▾: the nine areas, plus "All areas"
- About Us, Contact
- a Book Online button

The dropdown labels open their menu only; they don't link anywhere themselves. SEND & assisted transport isn't in the menu, but it's still a confirmed service on the homepage.

**Homepage order:**

| # | Section | Tone |
|---|---|---|
| 1 | Hero (full-width photo): eyebrow "LUTON & BEYOND"; headline "Your everyday journeys. *Taken care of.*" (cream Fraunces 600 over a deep-green fade on the left of the photo); text "School runs, airport trips and everyday journeys. Wherever you're heading, we're here to help."; buttons **Book Online →** and **Call to Book** (cream outline, phone icon); trust row (Available 24/7 · DBS-checked drivers). On mobile the photo stacks above a solid green text panel | photo / green |
| 2 | Service strip: sans-serif semibold labels with large outline icons (car, graduation cap, plane): Local journeys · School runs · Airport transfers | light |
| 3 | Our services: label "OUR SERVICES" between gold rules; heading "Here for every part of your day."; intro "From everyday errands to journeys further afield, we're here to help."; six photo cards (Local Journeys, School Runs, Corporate Travel, Long-Distance Travel, Station Transfers, Hotel Transfers), each with a serif title, a gold rule, one line of text and "Find out more →"; closing line "Not sure which service you need? Talk to our team." (links to /contact). Station and Hotel cards both link to /services/station-hotel-transfers. Card photos supplied (November 2026; AI images, never presented as the real team or fleet) | dark |
| 3b | Airport journeys: label "AIRPORT JOURNEYS" between gold rules; heading "From your doorstep to your departure."; intro "Flying away or coming home? We'll take care of the drive."; a featured Luton card ("CLOSE TO HOME", "Luton Airport", "Your local airport. Your ride, taken care of.", button **Explore Luton Airport →** to /airports/luton); on the right, "Travelling from another airport?" with the other five airports linking to their pages; closing line "*Pickups and drop-offs, day and night.*" between gold rules. Luton photo supplied (AI image; not presented as the real fleet) | light |
| 4 | Why travel with us?: heading "A little less worry. A better journey."; intro "It's the little things that help you feel looked after."; six items with icons in soft-gold circles (Clear fares, Flight tracking, A friendly welcome, Little ones welcome, DBS-checked drivers, Here day and night), all from confirmed benefits; bottom row "A real person when you need a hand." with **Talk to our team →** (to /contact until a phone number exists) | dark |
| 5 | Our fleet: centred automatic image carousel, six categories with guidance, booking link and no capacities | light |
| 6 | Areas we cover: heading "Your local ride. Wherever life takes you."; intro "From your front door to your next stop, we're here for journeys across Luton and nearby towns."; nine areas with pins (Luton, Harpenden, Dunstable, Leagrave, Houghton Regis, Stopsley, Mill Hill, Hounslow, Heathrow), all linking to /areas; button **View All Areas →**; "Not sure we cover your pickup? Ask us." (to /contact); neighbourhood illustration on the right with the caption *"Around the corner. A little further. We're here."* | dark |
| 7 | FAQs: "FAQs" / "Got a question?" / "Here are a few helpful answers."; six questions (How do I book? (open by default), Which airports do you cover?, How can I pay?, Can I change my booking?, Can I ask for a child seat?, Can I book at any time?); "Need more help? Contact us". The change-booking answer ("Get in touch as soon as you can and we'll help you update your journey.") deliberately states no change or cancellation terms | light |
| 8 | Booking banner (**on every page**, rendered in the layout above the footer): deep green with decorative gold route lines; eyebrow "WHEREVER LIFE TAKES YOU"; heading "You make the plans. We'll take you there."; text "A trip across town or a journey further afield. Book your ride with us."; **Book Online →** and **Call to Book** | green |
| 9 | Footer (every page): top row with logo, tagline "Local rides, school runs and airport journeys. Here for your everyday plans.", Call Us / WhatsApp / Email Us (become links once the details are supplied) and "Available 24/7"; five columns (Explore, Airports, Our Services, Areas We Cover, Our Fleet); line-art street scene; bottom bar "© 2026 Luton Minicab", "**Powered by MyCabify**" (links to https://mycabify.com), Privacy Policy, Terms & Conditions, Cookies and back to top. "Operated by A2B Radio Cars" no longer appears in the footer | light |

**Inner pages:** /areas, the nine /areas/[slug] pages, /airports, the six main /airports/[slug] pages, /fleet, /services and the five /services/[slug] pages are real, indexable pages. The nine short airport pages are real but `noindex`. /about and /contact exist only as minimal holding pages ("This page is being prepared."), set to `noindex`, so the nav has no broken links. Their content is **not yet approved**.

## 14. Confirmed decisions (Q&A)
| Topic | Decision |
|---|---|
| A2B relationship | Luton Minicab is a separate business; A2B Radio Cars provides dispatch and drivers |
| Operator licence holder | **Not confirmed yet**; the placeholder stays |
| Pickup coverage | Luton (incl. Leagrave, Stopsley), Dunstable, Houghton Regis, Harpenden, Mill Hill, Hounslow, Heathrow (updated November 2026) |
| Airports | Six named airports in the menu, each with its own page, and nine more with short pages, listed on /airports (replaced the earlier "all UK airports only" decision); all UK airports are still covered |
| Business address | No public address (service-area business) |
| Domain | `https://www.lutonminicab.com`; the bare domain redirects to it |
| Hosting | Vercel |
| Commercial priorities | Business travel, school runs & SEND, local journeys, airport transfers. All important, in that order |
| Phone and Google profile | Luton Minicab gets its **own** phone number and its own Google Business Profile, separate from A2B |
| Corporate accounts | None. Businesses book and pay per journey |
| Vehicle capacities | The owner will send verified figures |

## 15. Open items
- [x] Logo (supplied). Still wanted from the designer: an SVG version, a horizontal lock-up and a simplified favicon
- [ ] Final hero and section illustrations (designer pass on the provisional line art)
- [ ] Replace the temporary Bittacy phone, WhatsApp and email with Luton Minicab's own details before launch
- [ ] Who holds the operator licence, plus the licensing authority and licence number
- [ ] Verified vehicle capacities (the owner will send them)
- [ ] Genuine reviews, if a reviews section is wanted
- [ ] Approved content for the Services, Our Fleet, Areas, About and Contact pages
- [ ] Site copy to update to match the confirmed decisions:
  - Footer: "operated by A2B Radio Cars" should reflect the separate-business relationship.
  - Homepage airports row: "Heathrow, Luton and every airport beyond." becomes "all UK airports" wording.
  - Areas wording: "Luton & surrounding areas" should be reviewed against "all over Luton".
- [ ] Set up Vercel, domains and DNS, then Google Business Profile and Search Console
- [x] **Hero image:** a full-width photo-realistic image of a driver opening a car door for a passenger outside a brick house (supplied November 2026; replaced the storybook illustration). Approved exceptions to the original brief:
  - It's a **photo-realistic AI image** of people and a car. The copy and alt text must never present them as the real team or fleet.
  - A **green fade** sits over the photo so the cream text stays readable. Measured contrast is at least 6.7:1 behind every text line.
- [ ] **Optional, for consistency:** redo the three service-row scenes (still line art) in the same full-colour style.
- [ ] **Legal pages (must-have before launch):** real Privacy Policy, Terms & Conditions and Cookies text for /privacy, /terms and /cookies (holding pages for now). Don't write legal wording without the owner's approved text.
- [ ] Update the footer copyright year each January (it's fixed in `SiteFooter.tsx`).
- [ ] Optional later ideas: a "How it works" section, a designed social sharing image and favicon, and day/night hero variants

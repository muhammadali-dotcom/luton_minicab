// Route pages at /routes/[slug] (RoutePage.tsx). A small set of strong Luton routes, each with
// its own wording, tips and questions (owner's choice, 17 November 2026). Do not add a
// mass-produced grid of near-identical "X to Y" pages: Google treats those as doorway pages.
// Typical journey times are drafts from usual road times: OWNER TO CONFIRM each one
// (requirement.md). No prices or distances.

export type RouteDetail = {
  slug: string;
  // Short name used in links and titles, e.g. "Luton to Heathrow".
  name: string;
  // The airport page this route ends at, for meeting-point and terminal help (none for London).
  airportSlug?: string;
  hero: { heading: string; text: string };
  metaDescription: string;
  typicalTime: string;
  // What the journey usually involves: one sentence.
  journeyNote: string;
  tips: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

const bookAhead = {
  q: "How far ahead should I book?",
  a: "As early as you can, especially for early-morning flights. We’re available 24/7, and for journeys in the next 12 hours, please call us to confirm.",
};

export const routes: RouteDetail[] = [
  {
    slug: "luton-to-heathrow",
    name: "Luton to Heathrow",
    airportSlug: "heathrow",
    hero: {
      heading: "Luton to Heathrow, door to terminal.",
      text: "A direct ride from your door in Luton to your Heathrow terminal, with a fixed fare agreed when you book.",
    },
    metaDescription:
      "Taxis from Luton to Heathrow Airport, door to terminal. Fixed fares, flight tracking for your return, DBS-checked drivers, available 24/7.",
    typicalTime: "usually about 50 minutes to 1 hour 10 minutes",
    journeyNote: "Most journeys follow the M1 and M25 round to Heathrow, so the time of day makes the biggest difference.",
    tips: [
      {
        title: "Tell us your terminal",
        text: "Heathrow has four terminals: 2, 3, 4 and 5. Share yours when you book, and we’ll take you to the right one.",
      },
      {
        title: "Leave room for the M25",
        text: "Morning and evening traffic on the M25 can add time. For an early flight, we’ll suggest a pickup time that leaves room for it.",
      },
      {
        title: "Coming home too?",
        text: "Book your return at the same time. We track your flight and meet you at your terminal’s agreed meeting point.",
      },
    ],
    faqs: [
      {
        q: "How long does a taxi from Luton to Heathrow take?",
        a: "It’s usually about 50 minutes to 1 hour 10 minutes, depending on traffic and the time of day. Allow extra time at busy times on the M25.",
      },
      {
        q: "Can you take me to any Heathrow terminal?",
        a: "Yes, Terminals 2, 3, 4 and 5. Tell us your terminal when you book.",
      },
      {
        q: "Can you collect me from Heathrow and bring me back to Luton?",
        a: "Yes. Share your flight details when you book. We track your flight, and your driver waits free for 15 minutes from when they reach the pickup point at the agreed time.",
      },
      bookAhead,
    ],
  },
  {
    slug: "luton-to-gatwick",
    name: "Luton to Gatwick",
    airportSlug: "gatwick",
    hero: {
      heading: "Luton to Gatwick, without the changes.",
      text: "Skip the train changes across London. We’ll take you straight from Luton to the North or South Terminal.",
    },
    metaDescription:
      "Taxis from Luton to Gatwick Airport, North or South Terminal. A direct ride with a fixed fare, flight tracking on returns, available 24/7.",
    typicalTime: "usually about 1 hour 30 minutes to 1 hour 50 minutes",
    journeyNote: "It’s one of the longer airport runs from Luton, usually right round the M25, so it pays to plan your pickup time carefully.",
    tips: [
      {
        title: "North or South Terminal?",
        text: "Gatwick has two terminals. Check which one your airline uses, and tell us when you book.",
      },
      {
        title: "Plan for the longer run",
        text: "This is a longer journey, so we’ll agree a pickup time that leaves plenty of room before your check-in closes.",
      },
      {
        title: "Room for holiday luggage",
        text: "Travelling with family or lots of cases? Choose an estate or MPV so everything fits.",
      },
    ],
    faqs: [
      {
        q: "How long does a taxi from Luton to Gatwick take?",
        a: "It’s usually about 1 hour 30 minutes to 1 hour 50 minutes, depending on traffic on the M25 and the time of day.",
      },
      {
        q: "Is a taxi easier than the train from Luton to Gatwick?",
        a: "A taxi takes you door to terminal with no changes and no carrying bags across London, which many families and travellers with luggage prefer.",
      },
      {
        q: "Which car should I book for a family holiday?",
        a: "For four people with large cases, an estate or MPV gives you more room. Our fleet page shows what each car can take.",
      },
      bookAhead,
    ],
  },
  {
    slug: "luton-to-stansted",
    name: "Luton to Stansted",
    airportSlug: "stansted",
    hero: {
      heading: "Luton to Stansted, the simple way.",
      text: "There’s no direct train between the two, so a taxi is often the easiest way from Luton to Stansted.",
    },
    metaDescription:
      "Taxis from Luton to Stansted Airport. A direct ride with no train changes, fixed fares, flight tracking on returns, available 24/7.",
    typicalTime: "usually about 50 minutes to 1 hour 10 minutes",
    journeyNote: "The route crosses Hertfordshire to the M11, so it avoids central London altogether.",
    tips: [
      {
        title: "One terminal",
        text: "Stansted has one terminal, so there’s no terminal to choose. Just share your flight time when you book.",
      },
      {
        title: "Changing flights between airports?",
        text: "Flying into Luton and out of Stansted, or the other way round? We can take you straight between the two.",
      },
      {
        title: "Early flights",
        text: "Many Stansted flights leave early in the morning. We’re available 24/7, so a very early pickup is no problem.",
      },
    ],
    faqs: [
      {
        q: "How long does a taxi from Luton to Stansted take?",
        a: "It’s usually about 50 minutes to 1 hour 10 minutes, depending on traffic and the time of day.",
      },
      {
        q: "Can you take me straight from Luton Airport to Stansted Airport?",
        a: "Yes. Share both flight details when you book, and we’ll arrange your pickup at Luton Airport.",
      },
      {
        q: "Can I book a pickup in the middle of the night?",
        a: "Yes. We’re available 24/7, day or night.",
      },
      bookAhead,
    ],
  },
  {
    slug: "luton-to-london-city",
    name: "Luton to London City",
    airportSlug: "london-city",
    hero: {
      heading: "Luton to London City, ready for your flight.",
      text: "A direct ride across London to City Airport in the Docklands, ideal for business trips and short breaks.",
    },
    metaDescription:
      "Taxis from Luton to London City Airport. Door to terminal across London, fixed fares, flight tracking on returns, available 24/7.",
    typicalTime: "usually about 1 hour to 1 hour 30 minutes",
    journeyNote: "The journey crosses north and east London, so rush hour makes a real difference to the time.",
    tips: [
      {
        title: "Travelling for work?",
        text: "Ask for an executive car when you book. Each journey is booked and paid on its own.",
      },
      {
        title: "Allow for London traffic",
        text: "Weekday rush hours can slow the route through east London. We’ll agree a pickup time that allows for it.",
      },
      {
        title: "Small, quick airport",
        text: "London City has one terminal close to the drop-off, which suits travellers with light luggage.",
      },
    ],
    faqs: [
      {
        q: "How long does a taxi from Luton to London City Airport take?",
        a: "It’s usually about 1 hour to 1 hour 30 minutes, depending on London traffic and the time of day.",
      },
      {
        q: "Can I book an executive car?",
        a: "Yes. Ask for an executive car when you book.",
      },
      {
        q: "Can you collect me from London City on my way back?",
        a: "Yes. Share your flight details when you book. We track your flight and meet you at the agreed meeting point.",
      },
      bookAhead,
    ],
  },
  {
    slug: "luton-to-central-london",
    name: "Luton to central London",
    hero: {
      heading: "Luton to central London, door to door.",
      text: "To a hotel, a meeting, a show or a station. We’ll take you from Luton to wherever you’re going in London.",
    },
    metaDescription:
      "Taxis from Luton to central London: hotels, stations, offices and venues. Door to door with a fixed fare, DBS-checked drivers, available 24/7.",
    typicalTime: "usually about 1 hour to 1 hour 20 minutes",
    journeyNote: "Most journeys head down the M1, then into London, so the exact address and time of day matter most.",
    tips: [
      {
        title: "Give us the full address",
        text: "Central London streets can be busy and some have restrictions. The full address helps us plan the best drop-off point.",
      },
      {
        title: "Catching a train?",
        text: "We can take you to St Pancras, Euston, King’s Cross and other London stations. Share your train time when you book.",
      },
      {
        title: "Plan the ride home",
        text: "Going to a show or an evening event? Book your return at the same time, and we’ll agree where to meet you.",
      },
    ],
    faqs: [
      {
        q: "How long does a taxi from Luton to central London take?",
        a: "It’s usually about 1 hour to 1 hour 20 minutes, depending on where you’re going and the time of day.",
      },
      {
        q: "Can you drop me at a London station?",
        a: "Yes, including St Pancras, Euston and King’s Cross. Share your train time when you book.",
      },
      {
        q: "What if my drop-off has restricted access?",
        a: "If the driver can’t reach an address, for example because of a bus lane or a pedestrian area, they’ll stop at the nearest safe point.",
      },
      bookAhead,
    ],
  },
];

export const findRoute = (slug: string) => routes.find((r) => r.slug === slug);

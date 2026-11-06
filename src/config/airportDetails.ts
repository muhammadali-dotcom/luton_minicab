import type { StaticImageData } from "next/image";
import gatwickCard from "../../public/brand/airport-gatwick-card.png";
import heathrowCard from "../../public/brand/airport-heathrow-card.png";
import londonCityCard from "../../public/brand/airport-london-city-card.png";
import lutonCard from "../../public/brand/airport-luton-card.png";
import southendCard from "../../public/brand/airport-southend-card.png";
import stanstedCard from "../../public/brand/airport-stansted-card.png";
import gatwickFrom from "../../public/brand/gatwick-journey-from.png";
import gatwickTo from "../../public/brand/gatwick-journey-to.png";
import heathrowFrom from "../../public/brand/heathrow-journey-from.png";
import heathrowTo from "../../public/brand/heathrow-journey-to.png";
import londonCityArrival from "../../public/brand/london-city-arrival.png";
import londonCityFrom from "../../public/brand/london-city-journey-from.png";
import londonCityTo from "../../public/brand/london-city-journey-to.png";
import southendArrival from "../../public/brand/southend-arrival.png";
import southendFrom from "../../public/brand/southend-journey-from.png";
import southendTo from "../../public/brand/southend-journey-to.png";
import stanstedArrival from "../../public/brand/stansted-arrival.png";
import stanstedFrom from "../../public/brand/stansted-journey-from.png";
import stanstedTo from "../../public/brand/stansted-journey-to.png";
import lutonArrival from "../../public/brand/luton-arrival.png";
import lutonFrom from "../../public/brand/luton-journey-from.png";
import lutonTo from "../../public/brand/luton-journey-to.png";

type Journey = {
  image: StaticImageData;
  alt: string;
  start: string;
  end: string;
  title: string;
  text: string;
};

export type AirportDetail = {
  hero: { heading: string; text: string };
  // Photo and practical line for this airport's card on /airports.
  cardImage: StaticImageData;
  cardText: string;
  journeys: { eyebrow: string; subline: string; items: Journey[] };
  // Three steps, in the order of the icons in AirportMeetDriver.
  meetDriver: { heading: string; subline: string; steps: { title: string; text: string }[] };
  faqs: { q: string; a: string }[];
  // Terminal board with tabs, for airports with several terminals.
  guide?: {
    eyebrow: string;
    heading: string;
    subline: string;
    note: string;
    calloutTitle: string;
    calloutText: string;
    items: { number?: string; label?: string; headFor: string; goodToKnow: string }[];
  };
  // Three short facts from the airport's own site, with where and when they were checked.
  facts: string[];
  factsNote: string;
  // Extra arrivals help inside the meeting section, for airports without a board.
  arrival?: {
    calloutTitle: string;
    calloutText: string;
    image: StaticImageData;
    alt: string;
  };
  // Adds links to the local area pages.
  localAreas?: boolean;
};

const flightDelay = {
  q: "What if my flight is delayed?",
  a: "We track your flight, so your pickup follows your actual landing time.",
};
const meetDriver = {
  q: "Where do I meet my driver?",
  a: "Inside arrivals with a name board, or at the pickup point agreed for your booking. Your booking confirmation will tell you which.",
};
const childSeat = {
  q: "Can I ask for a child seat?",
  a: "Yes, child seats are available on request. Just mention it when you book.",
};
const driverWait = {
  q: "How long will my driver wait?",
  a: "Your driver waits free for 15 minutes once they reach your pickup point at the agreed time. After that, waiting charges apply. We’ll discuss these with you before you confirm your booking.",
};
const calloutTitle = "Before you head outside";
const calloutText = "Keep your booking details handy and check any messages about your pickup.";
const collectBags = { title: "Collect your bags", text: "Go through passport control and collect your luggage." };

// One-terminal airports share the Luton layout. Check `goodToKnow` on the airport's
// own site, and keep waiting and charges wording general until the owner confirms it.
function oneTerminal(
  name: string,
  hero: AirportDetail["hero"],
  cardImage: StaticImageData,
  cardText: string,
  images: { to: StaticImageData; from: StaticImageData; arrival: StaticImageData },
  facts: string[],
  factsNote: string,
  charges: string,
): AirportDetail {
  const upper = `${name.toUpperCase()} AIRPORT`;
  return {
    hero,
    cardImage,
    cardText,
    facts,
    factsNote,
    journeys: {
      eyebrow: `${upper} JOURNEYS`,
      subline: "A simple journey, whichever way you’re going.",
      items: [
        {
          image: images.to,
          alt: `Illustration: a car on a road leading from a house to ${name} Airport.`,
          start: "YOUR DOOR",
          end: upper,
          title: `To ${name} Airport`,
          text: "We’ll collect you from your chosen address and take you to the airport.",
        },
        {
          image: images.from,
          alt: `Illustration: a car on a road leading from ${name} Airport to a house.`,
          start: upper,
          end: "YOUR NEXT STOP",
          title: `From ${name} Airport`,
          text: "Share your flight details when booking. We’ll arrange your pickup and take you to your next stop.",
        },
      ],
    },
    meetDriver: {
      heading: `Landed at ${name}? Here’s what happens next.`,
      subline: "Three simple steps from arrivals to your next stop.",
      steps: [
        collectBags,
        {
          title: "Check your meeting point",
          text: "Follow the pickup instructions in your booking confirmation. Your meeting point may depend on the service you have booked.",
        },
        { title: "Meet your driver", text: "Head to the agreed meeting point for your journey." },
      ],
    },
    arrival: {
      calloutTitle,
      calloutText,
      image: images.arrival,
      alt: `Illustration: a car waiting outside ${name} Airport, with a map pin marking the meeting point.`,
    },
    faqs: [
      meetDriver,
      flightDelay,
      driverWait,
      { q: "Are there airport charges?", a: `${charges} Ask when you book, and we’ll confirm what’s in your quote.` },
      childSeat,
    ],
  };
}

// One entry for each airport in `airports`, keyed by slug. Only state what the owner
// has confirmed for that airport. The 15 free minutes and meeting wording are confirmed
// for all six; airport charges vary, so don't state them without asking.
export const airportDetails: Record<string, AirportDetail> = {
  luton: {
    hero: {
      heading: "Your local ride to Luton Airport.",
      text: "Sit back and relax. We’ll take care of the road.",
    },
    cardImage: lutonCard,
    facts: [
      "The airport’s guidance sends pre-booked passengers to the Pick Up Zone or an agreed meeting area.",
      "The Pick Up Zone is about a 5-minute walk from the terminal entrance, through a tunnel under the road.",
      "Time in the Pick Up Zone is limited, so keep your phone switched on when you land.",
    ],
    factsNote: "Your booking confirmation is always your final instruction. Checked on london-luton.co.uk on 6 November 2026.",
    cardText: "Pickup guidance and transfers to and from your local airport.",
    journeys: {
      eyebrow: "LUTON AIRPORT JOURNEYS",
      subline: "A simple journey, whichever way you’re going.",
      items: [
        {
          image: lutonTo,
          alt: "Illustration: a car on a road leading from a house to Luton Airport.",
          start: "YOUR DOOR",
          end: "LUTON AIRPORT",
          title: "To Luton Airport",
          text: "We’ll collect you from your chosen address and take you to the airport.",
        },
        {
          image: lutonFrom,
          alt: "Illustration: a car on a road leading from Luton Airport to a house.",
          start: "LUTON AIRPORT",
          end: "YOUR NEXT STOP",
          title: "From Luton Airport",
          text: "Share your flight details when booking. We’ll arrange your pickup and take you to your next stop.",
        },
      ],
    },
    meetDriver: {
      heading: "Landed? Here’s what happens next.",
      subline: "Three simple steps from arrivals to your next stop.",
      steps: [
        collectBags,
        {
          title: "Check your meeting point",
          text: "Follow the pickup instructions in your booking confirmation. Your meeting point may depend on the service you have booked.",
        },
        { title: "Meet your driver", text: "Head to the agreed meeting point for your journey." },
      ],
    },
    faqs: [
      meetDriver,
      flightDelay,
      driverWait,
      childSeat,
    ],
    arrival: {
      calloutTitle,
      calloutText,
      image: lutonArrival,
      alt: "Illustration: a car waiting outside Luton Airport, with a map pin marking the meeting point.",
    },
    localAreas: true,
  },
  heathrow: {
    hero: {
      heading: "Landing at Heathrow? We’ll take you home.",
      text: "After a long flight, all you need to do is sit back.",
    },
    cardImage: heathrowCard,
    facts: [
      "Heathrow has four passenger terminals: 2, 3, 4 and 5.",
      "Cars can’t collect passengers on the terminal forecourts, so pickups happen away from the kerb.",
      "At Terminals 2, 3 and 5, Terminal Parking is about a 2-minute walk from the terminal doors.",
    ],
    factsNote: "Your booking confirmation is always your final instruction. Checked on heathrow.com on 6 November 2026.",
    cardText: "Pickup guidance and transfers to and from Terminals 2, 3, 4 and 5.",
    journeys: {
      eyebrow: "HEATHROW AIRPORT JOURNEYS",
      subline: "A simple journey, whichever way you’re going.",
      items: [
        {
          image: heathrowTo,
          alt: "Illustration: a car on a road leading from a house to Heathrow Airport.",
          start: "YOUR DOOR",
          end: "HEATHROW AIRPORT",
          title: "To Heathrow Airport",
          text: "Tell us your terminal when you book. We’ll collect you from your chosen address and take you to the airport.",
        },
        {
          image: heathrowFrom,
          alt: "Illustration: a car on a road leading from Heathrow Airport to a house.",
          start: "HEATHROW AIRPORT",
          end: "YOUR NEXT STOP",
          title: "From Heathrow Airport",
          text: "Share your flight and terminal details when booking. We’ll arrange your pickup and take you to your next stop.",
        },
      ],
    },
    meetDriver: {
      heading: "Landed at Heathrow? Here’s what happens next.",
      subline: "Three simple steps from arrivals to your next stop.",
      steps: [
        collectBags,
        {
          title: "Check your meeting point",
          text: "Check your booked terminal, then follow the meeting instructions provided for your booking.",
        },
        { title: "Meet your driver", text: "Head to the agreed meeting point for your terminal." },
      ],
    },
    // Recheck regularly and update the date in `note`: Heathrow's arrangements change
    // (T4 did in June 2026).
    guide: {
      eyebrow: "TERMINAL BY TERMINAL",
      heading: "Which terminal are you landing at?",
      subline: "Pick yours, and we’ll show you where to head.",
      note: "These are Heathrow’s public meeting points. Your booking confirmation is always your final instruction. Last checked on heathrow.com on 5 November 2026.",
      calloutTitle,
      calloutText,
      items: [
      {
        number: "2",
        headFor: "Across from the international arrivals exit.",
        goodToKnow: "Drivers can’t wait outside the terminal here, so your car will be in Terminal Parking nearby.",
      },
      {
        number: "3",
        headFor: "The ground-floor seating area in Arrivals.",
        goodToKnow: "Drivers can’t wait outside the terminal here, so your car will be in Terminal Parking nearby.",
      },
      {
        number: "4",
        headFor: "Beside WHSmith, on the ground floor of Arrivals.",
        goodToKnow:
          "T4’s car park closed in June 2026, so your pickup may use Priority Pick-Up outside the terminal or Park & Ride Zone A by shuttle bus. Your booking confirmation will say which.",
      },
      {
        number: "5",
        headFor: "Two points in Arrivals: north, opposite Travelex, or south, near Costa Coffee.",
        goodToKnow: "Your booking confirmation will say which one to use. Your car will be in Terminal Parking nearby.",
      },
      ],
    },
    faqs: [
      { q: "Which terminals do you cover?", a: "All four: Terminals 2, 3, 4 and 5, whether you’re flying out or landing." },
      {
        q: "Do I need to tell you my terminal?",
        a: "Yes. Share your terminal and flight details when you book, so we can arrange your pickup.",
      },
      { q: "My terminal has changed. What should I do?", a: "Tell us as soon as you know, and we’ll update your booking." },
      meetDriver,
      flightDelay,
      driverWait,
      { q: "Do I pay the Heathrow drop-off charge?", a: "Yes. It’s added to your quote, so you’ll see the full cost before you book." },
      childSeat,
    ],
  },
  gatwick: {
    hero: {
      heading: "Back at Gatwick? Let’s get you home.",
      text: "You’ve done the flying. We’ll do the driving.",
    },
    cardImage: gatwickCard,
    facts: [
      "Gatwick has two terminals, North and South, so check yours before you travel.",
      "Express pick-up bays are inside the Short Stay car parks at both terminals.",
      "An inter-terminal shuttle links North and South, if you land at one and need the other.",
    ],
    factsNote: "Your booking confirmation is always your final instruction. Checked on gatwickairport.com on 6 November 2026.",
    cardText: "Pickup guidance and transfers to and from North and South Terminals.",
    journeys: {
      eyebrow: "GATWICK AIRPORT JOURNEYS",
      subline: "A simple journey, whichever way you’re going.",
      items: [
        {
          image: gatwickTo,
          alt: "Illustration: a car on a road leading from a house to Gatwick Airport.",
          start: "YOUR DOOR",
          end: "GATWICK AIRPORT",
          title: "To Gatwick Airport",
          text: "North or South Terminal? Tell us which when you book. We’ll collect you from your chosen address and take you to the airport.",
        },
        {
          image: gatwickFrom,
          alt: "Illustration: a car on a road leading from Gatwick Airport to a house.",
          start: "GATWICK AIRPORT",
          end: "YOUR NEXT STOP",
          title: "From Gatwick Airport",
          text: "Share your flight and terminal when booking. We’ll arrange your pickup and take you to your next stop.",
        },
      ],
    },
    meetDriver: {
      heading: "Landed at Gatwick? Here’s what happens next.",
      subline: "Three simple steps from arrivals to your next stop.",
      steps: [
        collectBags,
        {
          title: "Check your meeting point",
          text: "Check whether you’ve landed at North or South Terminal, then follow the meeting instructions for your booking.",
        },
        { title: "Meet your driver", text: "Head to the agreed meeting point for your terminal." },
      ],
    },
    // Recheck regularly and update the date in `note`. Gatwick names no public meeting
    // point, and whether drivers use these bays is for the owner to confirm.
    guide: {
      eyebrow: "NORTH OR SOUTH",
      heading: "Which terminal are you landing at?",
      subline: "Pick yours, and we’ll show you where to head.",
      note: "Your booking confirmation is always your final instruction. Last checked on gatwickairport.com on 6 November 2026.",
      calloutTitle,
      calloutText,
      items: [
        {
          label: "North",
          headFor: "The meeting point in your booking confirmation.",
          goodToKnow:
            "Gatwick’s pickups use its Short Stay car parks. At North Terminal, the express pick-up bays are on Level 4 of Car Park 6.",
        },
        {
          label: "South",
          headFor: "The meeting point in your booking confirmation.",
          goodToKnow:
            "Gatwick’s pickups use its Short Stay car parks. At South Terminal, the express pick-up bays are on the ground floor of Car Park 3.",
        },
      ],
    },
    faqs: [
      { q: "Which terminals do you cover?", a: "Both: North Terminal and South Terminal, whether you’re flying out or landing." },
      {
        q: "Do I need to tell you my terminal?",
        a: "Yes. Share your terminal and flight details when you book, so we can arrange your pickup.",
      },
      { q: "What if my airline changes terminal?", a: "Tell us as soon as you know, and we’ll update your booking." },
      meetDriver,
      flightDelay,
      driverWait,
      {
        q: "Are there airport charges?",
        a: "Gatwick charges for its drop-off zones and pick-up car parks. Ask when you book, and we’ll confirm what’s in your quote.",
      },
      childSeat,
    ],
  },
  stansted: oneTerminal(
    "Stansted",
    {
      heading: "Your holiday starts at your front door.",
      text: "We’ll drive you to Stansted, so you can start relaxing early.",
    },
    stanstedCard,
    "Guidance on Stansted’s pick-up areas, with transfers both ways.",
    { to: stanstedTo, from: stanstedFrom, arrival: stanstedArrival },
    [
      "Stansted’s pick-up and drop-off areas are just outside Departures.",
      "The Express Set Down area has no barriers, so cars can drive straight through.",
      "The Mid Stay car park is a short shuttle bus ride from the terminal.",
    ],
    "Your booking confirmation is always your final instruction. Checked on stanstedairport.com on 6 November 2026.",
    "Stansted charges for its Express Set Down area and Short Stay car parks.",
  ),
  "london-city": oneTerminal(
    "London City",
    { heading: "Quick flight. Easy ride.", text: "To or from London City Airport, we’ll keep it simple." },
    londonCityCard,
    "Transfers to and from London City, for work trips and weekends away.",
    { to: londonCityTo, from: londonCityFrom, arrival: londonCityArrival },
    [
      "Pre-booked minicabs collect from the pick-up area in the Short Stay car park.",
      "Time in the drop-off zone is limited to 10 minutes.",
      "Cars reach the airport from the west over Connaught Bridge, and from the east over Redgrave Bridge.",
    ],
    "Your booking confirmation is always your final instruction. Based on londoncityairport.com, November 2026.",
    "London City charges for its drop-off zone.",
  ),
  southend: oneTerminal(
    "London Southend",
    { heading: "Small airport. Simple ride.", text: "A calm journey to or from London Southend Airport." },
    southendCard,
    "Guidance on the Express Pick-up area, with transfers both ways.",
    { to: southendTo, from: southendFrom, arrival: southendArrival },
    [
      "Pickups use the Express Pick-up and Drop-off area or the Superior car park.",
      "Charges apply in both, so ask about them when you book.",
      "The airport has its own railway station, linked to the terminal by a pedestrian tunnel.",
    ],
    "Your booking confirmation is always your final instruction. Checked on southendairport.com on 6 November 2026.",
    "London Southend charges for its Express Pick-up and Drop-off area and Superior car park.",
  ),
};

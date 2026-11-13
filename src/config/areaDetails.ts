// Content for the upgraded area pages (/areas/[slug], `AreaLocalPage.tsx`). Areas without an
// entry keep the older `AreaPage.tsx` until their content is approved.
// Places are plain public destinations: no partnerships, journey times, distances or prices.
// Owner to confirm the place names (requirement.md).
export type AreaDetail = {
  hero: { heading: string; text: string };
  // Four groups of local places, one line each.
  places: { title: string; line: string; icon: "shopping" | "health" | "train" | "park" | "plane" | "bed" | "landmark" | "work" }[];
  faqs: { q: string; a: string }[];
  // Optional overrides, so each page reads differently (defaults are Luton's wording).
  journeysText?: string;
  placesHeading?: string;
  placesText?: string;
  placesNote?: string;
  airportsHeading?: string;
  airportsText?: string;
  // Airport slug listed first (Heathrow for the London-side areas).
  airportFirst?: string;
  // The London-side areas list each other plus Luton, not the six around Luton.
  nearby?: { heading: string; text: string; slugs: string[] };
};

const childSeat = { q: "Can I ask for a child seat?", a: "Yes, child seats are available on request. Just mention it when you book." };
const pay = { q: "How do I pay?", a: "In cash, or online through a payment link." };
const fixedFare = { q: "Is the fare fixed?", a: "Yes. You’ll know your fare when you book." };

export const areaDetails: Record<string, AreaDetail> = {
  luton: {
    hero: {
      heading: "Your Luton taxi, day or night.",
      text: "Local trips, school runs and airport transfers across Luton. Book online, or speak to our team.",
    },
    places: [
      { title: "Shops & town centre", line: "Luton town centre · The Mall Luton", icon: "shopping" },
      { title: "Appointments", line: "Luton and Dunstable Hospital · your GP or dentist", icon: "health" },
      { title: "Stations", line: "Luton · Leagrave · Luton Airport Parkway", icon: "train" },
      { title: "Days out", line: "Wardown Park · Stockwood Discovery Centre · The Hat Factory", icon: "park" },
    ],
    faqs: [
      {
        q: "Do you pick up across Luton?",
        a: "Yes. We pick up from homes, hotels, stations and workplaces across Luton. Tell us your address when you book.",
      },
      {
        q: "Can I book a taxi from Luton to the airport?",
        a: "Yes. We take you to Luton Airport and other UK airports. Book online or call us, and share your flight details.",
      },
      {
        q: "Do you do school runs in Luton?",
        a: "Yes. School runs are booked one journey at a time. Share the pickup address, the school and the times when you book.",
      },
      { q: "Is the fare fixed?", a: "Yes. You’ll know your fare when you book." },
    ],
  },

  leagrave: {
    hero: {
      heading: "Leagrave rides, door to door.",
      text: "Rides from Leagrave in north-west Luton, to the station, the shops, school or the airport.",
    },
    journeysText: "Trains, school, work or a flight: tell us where you need to be.",
    placesText: "Where Leagrave people often ask us to go.",
    airportsText: "From north-west Luton to Luton Airport and beyond, with flight tracking on pickups.",
    places: [
      { title: "Leagrave station", line: "Early trains and late arrivals", icon: "train" },
      { title: "Shops", line: "Leagrave High Street · Luton town centre", icon: "shopping" },
      { title: "Hospital visits", line: "Luton and Dunstable Hospital, close to Leagrave", icon: "health" },
      { title: "Parks", line: "Leagrave Park · Lewsey Park", icon: "park" },
    ],
    placesNote: "Heading somewhere not listed? Just tell us the address.",
    faqs: [
      {
        q: "Can you take me to Leagrave station?",
        a: "Yes, for early trains and late arrivals too. We’re available 24/7, so share your train time when you book.",
      },
      {
        q: "Do you pick up in Lewsey and Marsh Farm?",
        a: "Yes. We pick up across Leagrave and the neighbourhoods around it, including Lewsey and Marsh Farm.",
      },
      {
        q: "Can I book a ride to the hospital and back?",
        a: "Yes. Tell us the entrance you need when you book, and add the journey home if you’d like one.",
      },
      childSeat,
    ],
  },
  stopsley: {
    hero: {
      heading: "Stopsley pickups, any time.",
      text: "Rides from Stopsley in north-east Luton, close to Luton Airport, for everyday trips, school runs and flights.",
    },
    journeysText: "Everyday trips, school mornings and flights from Luton Airport nearby.",
    placesText: "Popular trips from this side of town.",
    airportsText: "Luton Airport is the closest, and we cover the others too, with flight tracking on pickups.",
    places: [
      { title: "Luton Airport", line: "Luton Airport · Luton Airport Parkway station", icon: "plane" },
      { title: "Shops", line: "Stopsley’s local shops · Luton town centre", icon: "shopping" },
      { title: "Appointments", line: "Your GP, dentist or Luton and Dunstable Hospital", icon: "health" },
      { title: "Days out", line: "Stockwood Discovery Centre · Warden Hills", icon: "park" },
    ],
    placesNote: "Going somewhere else from Stopsley? Share the address when you book.",
    faqs: [
      {
        q: "Can you take me to Luton Airport from Stopsley?",
        a: "Yes. Book online or call us, and share your flight details. We’ll agree the pickup time with you.",
      },
      {
        q: "Do you do school runs in Stopsley?",
        a: "Yes. Each school run is booked on its own. Share the pickup address, the school and the times.",
      },
      {
        q: "Can I book a taxi in the middle of the night?",
        a: "Yes. We’re available 24/7, so an early flight or a late return is no problem.",
      },
      pay,
    ],
  },
  dunstable: {
    hero: {
      heading: "Your Dunstable taxi, near and far.",
      text: "Rides from Dunstable, just west of Luton, to the station, the hospital, the airport or further afield.",
    },
    journeysText: "No train station in town? We’ll take you to one.",
    placesText: "Regular trips from Dunstable and the Downs.",
    airportsText: "From Dunstable to the airports, with flight tracking on pickups.",
    places: [
      { title: "Town centre", line: "Dunstable town centre · The Quadrant", icon: "shopping" },
      { title: "Hospital", line: "Luton and Dunstable Hospital, on the Dunstable side", icon: "health" },
      { title: "Nearest stations", line: "Luton · Leagrave · Luton Airport Parkway", icon: "train" },
      { title: "Days out", line: "Dunstable Downs · Grove Theatre", icon: "landmark" },
    ],
    placesNote: "Somewhere else in mind? Tell us when you book.",
    faqs: [
      {
        q: "Dunstable has no train station. Can you take me to one?",
        a: "Yes. We take you to Luton, Leagrave or Luton Airport Parkway station, or further afield if your train leaves from somewhere else.",
      },
      {
        q: "Can I book a taxi from Dunstable to Luton Airport?",
        a: "Yes, and to other UK airports too. Book online or call us, and share your flight details.",
      },
      {
        q: "Do you pick up from Dunstable town centre?",
        a: "Yes. We pick up from homes, shops and workplaces across Dunstable. Share the exact address when you book.",
      },
      fixedFare,
    ],
  },
  "houghton-regis": {
    hero: {
      heading: "Houghton Regis rides, made simple.",
      text: "Rides from Houghton Regis, just north of Dunstable, for everyday trips, school runs and the station.",
    },
    journeysText: "From the school gate to the station platform.",
    placesText: "Everyday trips from Houghton Regis.",
    airportsText: "Flying out? We’ll collect you from home, with flight tracking on your return.",
    places: [
      { title: "Shops", line: "Houghton Regis town centre · Dunstable", icon: "shopping" },
      { title: "Stations", line: "Leagrave · Luton · Harlington", icon: "train" },
      { title: "Check-ups", line: "Local surgeries · Luton and Dunstable Hospital", icon: "health" },
      { title: "Outdoors", line: "Houghton Hall Park · Dunstable Downs", icon: "park" },
    ],
    placesNote: "Need to go somewhere else? We’ll take you there.",
    faqs: [
      {
        q: "Which station can you take me to?",
        a: "Leagrave, Luton or Harlington are the usual choices. Tell us your train, and we’ll take you to the station you need.",
      },
      {
        q: "Can you take my children to school in Houghton Regis?",
        a: "Yes. School runs are booked one journey at a time. Share the pickup address, the school and the times.",
      },
      {
        q: "Can I book a return journey?",
        a: "Yes. Share the pickup time and address for the way back when you book.",
      },
      { q: "Can I book at any time?", a: "Yes. We’re available 24/7, day or night." },
    ],
  },
  harpenden: {
    hero: {
      heading: "Harpenden journeys, planned your way.",
      text: "Rides from Harpenden, south of Luton in Hertfordshire, for the station, business trips and airport transfers.",
    },
    journeysText: "Early trains, working days and flights, arranged around your plans.",
    placesText: "From the station to the common.",
    airportsText: "For work trips and holidays alike, with flight tracking on pickups.",
    places: [
      { title: "Harpenden station", line: "For early trains and the ride home", icon: "train" },
      { title: "Shops", line: "Harpenden High Street · St Albans", icon: "shopping" },
      { title: "Work and meetings", line: "Offices and venues in and around Harpenden", icon: "work" },
      { title: "Outdoors", line: "Rothamsted Park · Harpenden Common", icon: "park" },
    ],
    placesNote: "Travelling somewhere else? Share the address when you book.",
    faqs: [
      {
        q: "Can you take me to Harpenden station for an early train?",
        a: "Yes. We’re available 24/7. Share your train time when you book, and we’ll agree a pickup time with you.",
      },
      {
        q: "Do you offer business travel from Harpenden?",
        a: "Yes. Each journey is booked and paid on its own, so there’s nothing to set up first. Ask for an executive car when you book.",
      },
      {
        q: "Can you take me to Luton Airport from Harpenden?",
        a: "Yes, and to other UK airports too. Share your flight details when you book.",
      },
      pay,
    ],
  },
  "mill-hill": {
    hero: {
      heading: "Mill Hill rides, from our home base.",
      text: "Bookings are handled by our team at Bittacy Cars in Mill Hill. Local trips, longer journeys and airport transfers, day or night.",
    },
    journeysText: "Around north London, up to Luton, or out to the airports.",
    placesText: "Around our part of north London.",
    airportsText: "Heathrow, Luton or further: we track your flight on pickups.",
    places: [
      { title: "Stations", line: "Mill Hill Broadway · Mill Hill East", icon: "train" },
      { title: "Shops", line: "The Broadway · Brent Cross", icon: "shopping" },
      { title: "Appointments", line: "Finchley Memorial Hospital · Barnet Hospital", icon: "health" },
      { title: "Outdoors", line: "Mill Hill Park · Arrandene Open Space", icon: "park" },
    ],
    placesNote: "Further across London, or out of town? Just ask.",
    airportFirst: "heathrow",
    nearby: {
      heading: "Other areas we cover.",
      text: "From north London to west London and Luton.",
      slugs: ["hounslow", "heathrow", "luton"],
    },
    faqs: [
      {
        q: "Are you based in Mill Hill?",
        a: "Yes. Bookings are handled by our team at Bittacy Cars in Mill Hill, north London.",
      },
      {
        q: "Can you take me from Mill Hill to the airport?",
        a: "Yes, to Heathrow, Luton and other UK airports. Share your flight details when you book.",
      },
      {
        q: "Do you do longer journeys from Mill Hill?",
        a: "Yes. From your door to your destination, with a return journey if you need one.",
      },
      childSeat,
    ],
  },
  hounslow: {
    hero: {
      heading: "Hounslow to Heathrow, and beyond.",
      text: "Rides from Hounslow in west London, close to Heathrow, for airport transfers, local trips and longer journeys.",
    },
    journeysText: "Heathrow close by, and longer trips when you need them.",
    placesText: "Local trips around Hounslow, and the airport next door.",
    airportsText: "Heathrow first, and the other airports when you need them.",
    places: [
      { title: "Heathrow", line: "Terminals 2, 3, 4 and 5", icon: "plane" },
      { title: "Stations", line: "Hounslow · Hounslow Central · Hounslow East", icon: "train" },
      { title: "Shops and appointments", line: "Hounslow High Street · West Middlesex University Hospital", icon: "shopping" },
      { title: "Outdoors", line: "Osterley Park · Hounslow Heath", icon: "park" },
    ],
    placesNote: "Going somewhere else? We’ll take you there.",
    airportFirst: "heathrow",
    nearby: {
      heading: "Other areas we cover.",
      text: "Around Heathrow, in north London and around Luton.",
      slugs: ["heathrow", "mill-hill", "luton"],
    },
    faqs: [
      {
        q: "Can you take me from Hounslow to Heathrow?",
        a: "Yes. We pick you up from your door and take you to your terminal. Share your terminal and flight time when you book.",
      },
      {
        q: "Can you bring me home to Hounslow from Heathrow?",
        a: "Yes. We track your flight, and your driver meets you at the agreed point.",
      },
      {
        q: "Do you do local trips in Hounslow too?",
        a: "Yes. Shops, appointments, the station or visiting family. Book online or call us.",
      },
      fixedFare,
    ],
  },
  heathrow: {
    hero: {
      heading: "Landed at Heathrow? We’ll take it from here.",
      text: "Pickups at Heathrow’s terminals and nearby hotels, for the journey home or onward.",
    },
    journeysText: "Home, a hotel, a meeting or another airport.",
    placesHeading: "Getting around Heathrow.",
    placesText: "Pickups and drop-offs at and around the airport.",
    places: [
      { title: "The terminals", line: "Terminals 2, 3, 4 and 5", icon: "plane" },
      { title: "Airport hotels", line: "Share the hotel name when you book", icon: "bed" },
      { title: "Into London", line: "Central London · Mill Hill · Hounslow", icon: "landmark" },
      { title: "Further afield", line: "Luton · other UK airports · your front door", icon: "work" },
    ],
    placesNote: "Not sure where to meet? Your booking includes meeting instructions.",
    airportsHeading: "Your Heathrow transfer.",
    airportsText: "Start with Heathrow’s pickup guidance, or see our other airports.",
    airportFirst: "heathrow",
    nearby: {
      heading: "Other areas we cover.",
      text: "Near Heathrow, in north London and around Luton.",
      slugs: ["hounslow", "mill-hill", "luton"],
    },
    faqs: [
      {
        q: "Where will my driver meet me at Heathrow?",
        a: "At the agreed meeting point, or where your driver tells you. Your booking includes meeting instructions.",
      },
      {
        q: "What if my flight is delayed?",
        a: "We track your flight, so we know when you land.",
      },
      {
        q: "How long will my driver wait?",
        a: "Your driver waits free for 15 minutes, starting once they reach the pickup point at the agreed time. After that, waiting charges apply, and we discuss these with you before your booking is confirmed.",
      },
      {
        q: "Can you pick me up from a Heathrow hotel?",
        a: "Yes. Share the hotel name and the time you’d like to travel when you book.",
      },
    ],
  },
};

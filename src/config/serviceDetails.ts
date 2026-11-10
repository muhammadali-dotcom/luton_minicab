import type { StaticImageData } from "next/image";
import { CalendarCheck, CalendarDays, Car, Clock, DoorOpen, PoundSterling, Wallet, type LucideIcon } from "lucide-react";
import corporateTravel from "../../public/brand/services/corporate-travel.png";
import localJourneys from "../../public/brand/services/local-journeys.png";
import localJourneysHero from "../../public/brand/services/local-journeys-hero.png";
import longDistanceTravel from "../../public/brand/services/long-distance-travel.png";
import schoolRuns from "../../public/brand/services/school-runs.png";
import schoolRunsHero from "../../public/brand/services/school-runs-hero.png";
import stationTransfers from "../../public/brand/services/station-transfers.png";

export type ServiceDetail = {
  hero: { heading: string; text: string };
  // The hero's trust row, picked by the owner for each service (confirmed facts only).
  trust: { label: string; Icon: LucideIcon }[];
  // Wall-style hero photo (cream wall on the left, scene on the right), used full width by
  // ServiceHero. Without one, the hero shows `image` on the right until the photo arrives.
  // `fade` covers only the text column: tune it so every hero text line stays at 4.5:1.
  heroPhoto?: { image: StaticImageData; alt: string; fade: string };
  // School Runs: the hero's second button is "Discuss on WhatsApp" instead of Call to Book.
  whatsappSecond?: boolean;
  // Card photo on /services, and the hero photo until `heroPhoto` is set.
  image: StaticImageData;
  alt: string;
  // Line for this service's card on /services.
  cardText: string;
  forWho: { heading: string; points: { title: string; text: string }[] };
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

const fixedFares = { label: "Fixed fares", Icon: PoundSterling };
const allHours = { label: "Available 24/7", Icon: Clock };
const doorToDoor = { label: "Door to door", Icon: DoorOpen };
const planAhead = { label: "Plan ahead", Icon: CalendarCheck };

// Only confirmed facts (requirement.md): no prices, distances, contracts, accounts,
// minibuses, wheelchair access, escorts or medical care.
const childSeat = {
  q: "Can I ask for a child seat?",
  a: "Yes, child seats are available on request. Just mention it when you book.",
};
const pay = { q: "How do I pay?", a: "In cash, or online through a payment link." };
const fixedFare = { q: "Is the fare fixed?", a: "Yes. You’ll know your fare when you book." };
const bookAnyTime = { q: "Can I book at any time?", a: "Yes. We’re available 24/7, day or night." };
const steps = [
  { title: "Book your journey", text: "Book online, or call or WhatsApp us, day or night." },
  { title: "Share your details", text: "Tell us your pickup, where you’re going and when." },
  { title: "Meet your driver", text: "Your driver collects you at the agreed time and place." },
];

export const serviceDetails: Record<string, ServiceDetail> = {
  "school-runs": {
    hero: {
      heading: "A little less rush. Every school day.",
      text: "Plan the journey to school and home again. Book each school run online, or speak to us first.",
    },
    trust: [{ label: "Morning runs", Icon: CalendarDays }, { label: "Home time pickups", Icon: Car }, planAhead],
    heroPhoto: {
      image: schoolRunsHero,
      alt: "A dark estate car parked outside a school gate on a sunny, tree-lined street.",
      fade: "from-background/82 via-background/60 via-40% to-transparent to-55%",
    },
    whatsappSecond: true,
    image: schoolRuns,
    alt: "A driver opens the car door for a smiling mother and her son in school uniform.",
    cardText: "Rides to school and home again, with DBS-checked drivers.",
    forWho: {
      heading: "Made for the school day.",
      points: [
        { title: "The morning run", text: "From your front door to the school gate, at the time you book." },
        { title: "The journey home", text: "Book the ride home too, so the end of the day is just as easy." },
        {
          title: "A little extra support",
          text: "For passengers who need a little extra support. Tell us about any needs when you book.",
        },
      ],
    },
    steps: [
      { title: "Book the journey", text: "Book online or call us. Each school journey is booked on its own." },
      { title: "Share the details", text: "Tell us the pickup, the school, the time and anything we should know." },
      { title: "Meet your driver", text: "A DBS-checked driver collects you at the agreed time and place." },
    ],
    faqs: [
      { q: "Are your drivers DBS-checked?", a: "Yes. Our drivers are DBS-checked." },
      {
        q: "Can I book a regular school run?",
        a: "Each school journey is booked separately, online or by phone, just like any other trip.",
      },
      childSeat,
      {
        q: "Can you help passengers who need extra support?",
        a: "For passengers who need a little extra support. Tell us about any needs when you book.",
      },
      pay,
    ],
  },
  "corporate-travel": {
    hero: {
      heading: "Arrive ready for business.",
      text: "Comfortable rides to meetings, offices and events, booked one journey at a time.",
    },
    trust: [fixedFares, allHours, { label: "Pay per journey", Icon: Wallet }],
    image: corporateTravel,
    alt: "A driver opens the car door for a businessman outside an office building.",
    cardText: "Rides to meetings, offices and events, paid per journey.",
    forWho: {
      heading: "For the working day.",
      points: [
        { title: "Meetings and offices", text: "Get to client meetings, offices and events without the parking." },
        { title: "Clients and colleagues", text: "Book a car for someone visiting your team." },
        { title: "Simple to pay", text: "Each journey is paid on its own, in cash or through an online payment link." },
      ],
    },
    steps,
    faqs: [
      {
        q: "How do businesses pay?",
        a: "Each journey is paid separately, in cash or online through a payment link.",
      },
      { q: "Can I book an executive car?", a: "Yes. Choose Executive when you book." },
      fixedFare,
      bookAnyTime,
    ],
  },
  "long-distance-travel": {
    hero: {
      heading: "Further afield? Sit back.",
      text: "A comfortable ride for longer journeys, from your door to theirs.",
    },
    trust: [doorToDoor, fixedFares, planAhead],
    image: longDistanceTravel,
    alt: "A couple with a suitcase beside a dark saloon on a country road, with green hills behind.",
    cardText: "Longer journeys beyond Luton, from door to door.",
    forWho: {
      heading: "When the journey is longer.",
      points: [
        { title: "Visiting family and friends", text: "Arrive at their door, not a station car park." },
        { title: "Events and days out", text: "Relax on the way there, and on the way home." },
        { title: "Plenty of luggage", text: "Choose an estate or MPV when you’re carrying more." },
      ],
    },
    steps,
    faqs: [
      {
        q: "How far will you go?",
        a: "Tell us where you’re heading when you book, and we’ll confirm your journey.",
      },
      fixedFare,
      {
        q: "Will my luggage fit?",
        a: "Choose a car with room for your bags. Passenger and luggage limits are shown when you book.",
      },
      pay,
    ],
  },
  "station-hotel-transfers": {
    hero: {
      heading: "Smooth connections, door to door.",
      text: "Rides to and from stations and hotels, with time to spare.",
    },
    trust: [doorToDoor, fixedFares, allHours],
    image: stationTransfers,
    alt: "A passenger with a suitcase walks towards a waiting car outside a railway station.",
    cardText: "Rides to and from stations and hotels, with time to spare.",
    forWho: {
      heading: "For the start and end of your trip.",
      points: [
        { title: "Train stations", text: "Get to your train on time, or get home after it." },
        { title: "Hotels", text: "Rides between your hotel, the station and wherever you’re heading." },
        { title: "Room for bags", text: "Choose an estate or MPV if you’re carrying more." },
      ],
    },
    steps,
    faqs: [
      {
        q: "Which stations do you cover?",
        a: "We pick up across Luton and nearby towns. Tell us the station when you book.",
      },
      fixedFare,
      childSeat,
      pay,
    ],
  },
  "local-journeys": {
    hero: {
      heading: "Your everyday plans. A ride away.",
      text: "Trips to the shops, appointments or someone special. We’ll help you get there.",
    },
    trust: [doorToDoor, fixedFares, allHours],
    heroPhoto: {
      image: localJourneysHero,
      alt: "A dark estate car parked on a sunny high street, beside a cream wall, shopfronts and hanging flowers.",
      fade: "from-background/70 via-background/45 via-40% to-transparent to-55%",
    },
    image: localJourneys,
    alt: "A dark saloon parked on a British high street lined with shops and hanging flowers.",
    cardText: "Everyday rides around Luton and nearby towns.",
    forWho: {
      heading: "For the trips that fill your day.",
      points: [
        { title: "Shopping and errands", text: "Get there and back with your bags, without the bus." },
        { title: "Appointments", text: "Arrive on time for the doctor, the dentist or the bank." },
        { title: "Seeing the people you love", text: "Visit family and friends, then get home easily." },
      ],
    },
    steps,
    faqs: [
      {
        q: "Which areas do you cover?",
        a: "Luton, including Leagrave and Stopsley, plus Dunstable, Houghton Regis, Harpenden, Mill Hill, Hounslow and Heathrow.",
      },
      fixedFare,
      childSeat,
      bookAnyTime,
    ],
  },
};

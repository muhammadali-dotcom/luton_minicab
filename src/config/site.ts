// Central site settings. Contact values are deliberately null until the
// business supplies real details — components render visible placeholders
// instead of working links while a value is missing.

export type NavLink = {
  label: string;
  href: string;
};

// A top-level menu item that opens a dropdown instead of linking directly.
export type NavGroup = {
  id: string;
  label: string;
  overview: NavLink;
  children: NavLink[];
};

export type NavItem = NavLink | NavGroup;

export const isNavGroup = (item: NavItem): item is NavGroup => "children" in item;

type PageEntry = { slug: string; name: string };
type AirportEntry = PageEntry & { code: string };

// The main airports: each has its own page at /airports/[slug].
export const airports: AirportEntry[] = [
  { slug: "luton", name: "Luton", code: "LTN" },
  { slug: "heathrow", name: "Heathrow", code: "LHR" },
  { slug: "gatwick", name: "Gatwick", code: "LGW" },
  { slug: "stansted", name: "Stansted", code: "STN" },
  { slug: "london-city", name: "London City", code: "LCY" },
  { slug: "southend", name: "London Southend", code: "SEN" },
];

// Grouped on /airports, each with a short page at /airports/[slug] (noindex, and
// no flight wording). Move an airport into `airports` only once there are real
// details for its full page: that also adds it to the menu, footer and homepage.
export const regionalAirports: { region: string; airports: PageEntry[] }[] = [
  {
    region: "Midlands",
    airports: [
      { slug: "birmingham", name: "Birmingham" },
      { slug: "east-midlands", name: "East Midlands" },
    ],
  },
  { region: "North of England", airports: [{ slug: "manchester", name: "Manchester" }] },
  {
    region: "Scotland",
    airports: [
      { slug: "edinburgh", name: "Edinburgh" },
      { slug: "inverness", name: "Inverness" },
    ],
  },
  {
    region: "Wales",
    airports: [
      { slug: "aberporth", name: "Aberporth" },
      { slug: "cardiff", name: "Cardiff" },
      { slug: "pembrey", name: "Pembrey" },
      { slug: "swansea", name: "Swansea" },
    ],
  },
];

export const shortPageAirports = regionalAirports.flatMap((r) => r.airports);

type AreaEntry = PageEntry & { heading: string; intro: string };

// Each entry has its own page at /areas/[slug]. Intros stick to confirmed
// services and plain geography; no journey times, prices or promises.
export const areas: AreaEntry[] = [
  {
    slug: "luton",
    name: "Luton",
    heading: "Taxis in Luton",
    intro: "Local journeys, school runs and airport transfers across Luton, day or night.",
  },
  {
    slug: "leagrave",
    name: "Leagrave",
    heading: "Taxis in Leagrave",
    intro: "Rides from Leagrave in north-west Luton, to the shops, the station, school or the airport.",
  },
  {
    slug: "stopsley",
    name: "Stopsley",
    heading: "Taxis in Stopsley",
    intro: "Rides from Stopsley in north-east Luton, for everyday trips, school runs and airport transfers.",
  },
  {
    slug: "dunstable",
    name: "Dunstable",
    heading: "Taxis in Dunstable",
    intro: "Rides from Dunstable, just west of Luton, for local trips, school runs and airport transfers.",
  },
  {
    slug: "houghton-regis",
    name: "Houghton Regis",
    heading: "Taxis in Houghton Regis",
    intro: "Rides from Houghton Regis, just north of Dunstable, for everyday journeys and airport transfers.",
  },
  {
    slug: "harpenden",
    name: "Harpenden",
    heading: "Taxis in Harpenden",
    intro: "Rides from Harpenden, south of Luton in Hertfordshire, for local trips, business travel and airport transfers.",
  },
  {
    slug: "mill-hill",
    name: "Mill Hill",
    heading: "Taxis in Mill Hill",
    intro: "Pickups in Mill Hill, north London, for local journeys, longer trips and airport transfers.",
  },
  {
    slug: "hounslow",
    name: "Hounslow",
    heading: "Taxis in Hounslow",
    intro: "Pickups in Hounslow, west London, close to Heathrow, for local trips and airport transfers.",
  },
  {
    slug: "heathrow",
    name: "Heathrow",
    heading: "Taxis at Heathrow",
    intro: "Pickups at and around Heathrow, for the journey home, a hotel transfer or an onward trip.",
  },
];

// One short location line per area, from the geography in each intro. Used by the
// Local Journeys / School Runs area cards and the Areas We Cover dropdown.
export const areaPlaces: Record<string, string> = {
  luton: "Across the town, day or night",
  leagrave: "North-west Luton",
  stopsley: "North-east Luton",
  dunstable: "Just west of Luton",
  "houghton-regis": "Just north of Dunstable",
  harpenden: "South of Luton, in Hertfordshire",
  "mill-hill": "North London",
  hounslow: "West London, near Heathrow",
  heathrow: "At and around the airport",
};

// Vehicle categories, matching the web booker. Images (in public/brand) illustrate
// categories, not guaranteed models. `capacity` (passengers, large cases, hand luggage) was
// confirmed by the owner in November 2026 and is shown as "up to" on /fleet.
// `id` is the vehicle's anchor on /fleet, used by the footer links. `tagline` is its
// line on /fleet; `text` is used by the homepage carousel.
export const fleet = [
  { id: "saloon", name: "Saloon", tagline: "Everyday comfort.", text: "Everyday local trips and airport runs.", capacity: { passengers: 4, cases: 2, hand: 2 }, image: "fleet-saloon.png" },
  { id: "estate", name: "Estate", tagline: "A little more room for luggage.", text: "Extra boot space for luggage.", capacity: { passengers: 4, cases: 3, hand: 3 }, image: "fleet-estate.png" },
  { id: "mpv6", name: "MPV6", tagline: "For family trips and small groups.", text: "More seats for families and small groups.", capacity: { passengers: 6, cases: 3, hand: 4 }, image: "fleet-mpv6.png" },
  { id: "mpv-plus", name: "MPV Plus", tagline: "Extra space for people and bags.", text: "Extra space for bigger groups and luggage.", capacity: { passengers: 6, cases: 5, hand: 6 }, image: "fleet-mpv-plus.png" },
  { id: "mpv7", name: "MPV7", tagline: "Bring the group together.", text: "Room for families and groups.", capacity: { passengers: 7, cases: 2, hand: 4 }, image: "fleet-mpv7.png" },
  { id: "executive", name: "Executive", tagline: "Travel with a touch of refinement.", text: "A more refined car for business travel.", capacity: { passengers: 4, cases: 2, hand: 2 }, image: "fleet-executive.png" },
];

// Each entry has a holding page at /services/[slug] until content is approved.
export const services: PageEntry[] = [
  { slug: "local-journeys", name: "Local Journeys" },
  { slug: "school-runs", name: "School Runs" },
  { slug: "corporate-travel", name: "Corporate Travel" },
  { slug: "long-distance-travel", name: "Long-Distance Travel" },
  { slug: "station-hotel-transfers", name: "Station & Hotel Transfers" },
];

export const site = {
  name: "Luton Minicab",
  operator: "A2B Radio Cars",

  // Existing web booker. Override per environment with NEXT_PUBLIC_BOOKING_URL.
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://www.heathrowminicabbooking.com/",

  // TEMPORARY: taken from bittacycars.com at the owner's request. Replace with
  // Luton Minicab's own details before launch.
  phone: "020 8343 4444" as string | null,
  // International format, digits only.
  whatsapp: "447983527104" as string | null,
  email: "bittacycs@hotmail.com" as string | null,
  // PLACEHOLDER: operator licence details.
  operatorLicence: null as string | null,

  nav: [
    { label: "Home", href: "/" },
    {
      id: "airports",
      label: "Airports",
      overview: { label: "View All Airports", href: "/airports" },
      children: airports.map((a) => ({ label: a.name, href: `/airports/${a.slug}` })),
    },
    {
      id: "services",
      label: "Our Services",
      overview: { label: "View All Services", href: "/services" },
      children: services.map((sv) => ({ label: sv.name, href: `/services/${sv.slug}` })),
    },
    { label: "Our Fleet", href: "/fleet" },
    {
      id: "areas",
      label: "Areas We Cover",
      overview: { label: "View All Areas", href: "/areas" },
      children: areas.map((a) => ({ label: a.name, href: `/areas/${a.slug}` })),
    },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[] as NavItem[],
};

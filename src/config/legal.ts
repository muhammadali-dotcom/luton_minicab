// Content for /privacy, /terms and /cookies (rendered by LegalPage.tsx).
// Adapted from Bittacy Cars' own privacy and terms pages (bittacycars.com) at the owner's
// request, November 2026. Owner's choices: same rules, but no £ amounts (other charges are
// confirmed before booking); airports keep the confirmed 15 free minutes; Luton Minicab is
// named, with bookings handled by our team at Bittacy Cars in Mill Hill.
// Left out on purpose: coach bookings, Eurostar meet and greet, wheelchair wording,
// London-only law references and every fee amount. Have the terms reviewed before launch.

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  // Paragraphs shown after the list.
  after?: string[];
  links?: { label: string; href: string }[];
};

export const legalUpdated = "13 November 2026";

export const bittacyAddress = "2 Bittacy Hill, Mill Hill, London, NW7 1LB";

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    paragraphs: [
      `Luton Minicab provides local journeys, airport transfers and longer trips. Bookings are handled by our team at Bittacy Cars, ${bittacyAddress}.`,
      "We are responsible for the personal information you share with us, and this policy explains how we look after it.",
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    paragraphs: ["We only collect what we need to arrange your journey and help you. This can include:"],
    bullets: [
      "Your name, phone number and email address.",
      "Pickup and drop-off addresses, dates and times.",
      "Flight or train details, so we can plan your pickup.",
      "The number of passengers and bags, and any requests such as a child seat.",
      "Messages you send us by phone, WhatsApp or email. Some calls are recorded for training and to check booking details.",
      "Basic technical details recorded when you visit our website, such as your IP address and browser type.",
    ],
  },
  {
    id: "contact-form",
    heading: "Our contact form",
    paragraphs: [
      "The form on our Contact page doesn’t store anything on our website. When you press the button, it opens WhatsApp with your message written out, and you choose whether to send it.",
    ],
  },
  {
    id: "how-we-use-it",
    heading: "How we use your information",
    paragraphs: ["We use your information:"],
    bullets: [
      "to arrange and carry out your journey",
      "to send booking confirmations and updates about your journey",
      "to take payment and keep proper records",
      "to answer your questions and deal with any concerns",
      "to meet our legal and licensing duties.",
    ],
    after: [
      "We use your information because we need it to provide the journey you’ve asked for, because we have a legitimate interest in running and improving our service, or because the law requires it.",
    ],
  },
  {
    id: "who-we-share-it-with",
    heading: "Who we share it with",
    paragraphs: [
      "We only share what’s needed, and we never sell your information or pass it on for marketing.",
    ],
    bullets: [
      "Your driver, who receives only the details needed to carry out your journey.",
      "Our online booking system, which receives the details you enter when you book online.",
      "Our payment provider, when you pay by card. Card payments are processed by Stripe, and we don’t see or store your full card details.",
      "Authorities such as the police or a licensing authority, but only where the law requires it.",
    ],
    links: [{ label: "Stripe’s privacy policy", href: "https://stripe.com/gb/privacy" }],
  },
  {
    id: "keeping-it-safe",
    heading: "Keeping it safe",
    paragraphs: [
      "Our website uses a secure, encrypted connection. Our team can only see the information they need to do their job.",
    ],
  },
  {
    id: "how-long",
    heading: "How long we keep it",
    paragraphs: [
      "We keep your information only for as long as we need it: to provide your journey, answer questions about it, keep our accounts and meet legal requirements. After that, it’s deleted.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    paragraphs: ["You can ask us to:"],
    bullets: [
      "Tell you what information we hold about you, and give you a copy.",
      "Correct anything that’s wrong.",
      "Delete your information, where we don’t need to keep it.",
      "Limit how we use it, or stop using it.",
      "Send it to you, or to another company, in a common format.",
    ],
  },
  {
    id: "complaints",
    heading: "Questions and complaints",
    paragraphs: [
      "If you have a question or concern about how we use your information, please contact us first and we’ll do our best to help.",
      "You can also complain to the Information Commissioner’s Office, the UK’s data protection regulator.",
    ],
    links: [{ label: "Information Commissioner’s Office", href: "https://ico.org.uk/make-a-complaint/" }],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    paragraphs: ["We may update this policy from time to time. The date at the top shows when it last changed."],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "booking",
    heading: "Booking with us",
    bullets: [
      "You can book online, by phone or on WhatsApp. All bookings depend on availability.",
      "When you book online, you’ll receive a confirmation once your booking is accepted. Please check the details are correct.",
      "If your confirmation hasn’t arrived, check your junk or spam folder, then call us.",
      "For journeys within the next 12 hours, please call us to confirm the booking.",
      "Phone bookings are taken with care. Some calls are recorded for training and to check booking details. We can’t be responsible for wrong information given when booking.",
    ],
  },
  {
    id: "fares",
    heading: "Fares",
    bullets: [
      "Fares are fixed when you book, quoted per vehicle and in pounds sterling.",
      "Fares are based on passengers being ready to travel at the booked time, and on the most suitable route.",
      "If you ask for a different route, extra stops or changes on the day, extra charges may apply. We’ll confirm these with you.",
    ],
  },
  {
    id: "vehicle",
    heading: "Choosing your vehicle",
    bullets: [
      "Please book a vehicle with room for everyone travelling and all your luggage. Our fleet page shows what each car can take.",
      "If the vehicle booked is too small for the passengers or luggage, the driver may not be able to carry everyone, and the fare may still be charged.",
      "If the vehicle you booked isn’t available, we may send a larger one.",
      "Tell us about extra passengers or bags as early as you can, ideally at least 12 hours before your journey. A larger vehicle may cost more.",
    ],
  },
  {
    id: "paying",
    heading: "Paying",
    bullets: [
      "Pay in cash to the driver (in pounds sterling), or online through a secure payment link.",
      "Card payments may be checked to prevent fraud.",
      "Tips are up to you, and can be given to the driver in cash.",
    ],
  },
  {
    id: "waiting",
    heading: "Waiting time",
    bullets: [
      "Airport pickups: your driver waits free for 15 minutes, starting once they reach the pickup point at the agreed time.",
      "Other pickups, such as homes, hotels, offices and stations: a short free wait from the booked time.",
      "After the free waiting time, waiting charges apply. We discuss these with you before your booking is confirmed.",
      "If you’re running late or your train is delayed, please tell us as soon as you can.",
    ],
  },
  {
    id: "meeting",
    heading: "Meeting your driver",
    bullets: [
      "Your booking includes meeting instructions. Your driver meets you at the agreed point, or where they tell you.",
      "At stations, pickups are from the designated pickup point, not the taxi rank. Please call us when you arrive.",
      "If you can’t find your driver, call us. Please don’t leave the pickup point or take other transport without telling us, as the journey will then count as a no-show.",
    ],
  },
  {
    id: "cancellations",
    heading: "Cancellations and refunds",
    bullets: [
      "To cancel a prepaid journey and get a refund, tell us at least 12 hours before the pickup time. Bank charges may be taken from the refund.",
      "We can’t refund cancellations made less than 12 hours before pickup, bookings made with the wrong date or flight details, or journeys where the passenger leaves the pickup point without telling us.",
      "Missed your flight? Call us straight away, before the driver goes into the airport. We can move your pickup to a later flight.",
    ],
  },
  {
    id: "no-show",
    heading: "No-shows",
    paragraphs: [
      "A journey counts as a no-show if the passenger doesn’t meet the driver at the booked time and place, and hasn’t contacted us. This applies at airports, stations, hotels and homes. The full fare is charged for a no-show, and prepaid fares aren’t refunded.",
    ],
  },
  {
    id: "stops-and-access",
    heading: "Extra stops and restricted access",
    bullets: [
      "Extra stops can be added to a journey for an extra charge, based on the distance. We’ll confirm it with you.",
      "If the driver can’t reach an address, for example because of a bus lane or a pedestrian area, they’ll stop at the nearest safe point.",
      "If your pickup point has restricted access, please tell us when you book so we can agree where to meet.",
    ],
  },
  {
    id: "delays",
    heading: "Delays outside our control",
    paragraphs: [
      "Sometimes journeys are delayed by bad weather, traffic, accidents, road closures or a breakdown. If this happens, we’ll let you know as soon as we can, so you can decide whether to wait or make other plans. We can’t be responsible for missed flights, trains or appointments caused by things outside our control.",
    ],
  },
  {
    id: "in-the-car",
    heading: "In the car",
    bullets: [
      "All our vehicles are non-smoking.",
      "Food and drink are only allowed if your driver agrees.",
      "A cleaning charge applies if the vehicle is soiled or needs cleaning after the journey.",
      "Drivers can refuse to carry anyone who is abusive, threatening or behaving in a disorderly way. The full fare is then charged.",
      "On longer journeys, drivers may take short rest breaks.",
    ],
  },
  {
    id: "pets",
    heading: "Pets",
    bullets: [
      "Please tell us when you book if you’re travelling with a pet.",
      "Assistance dogs are welcome and should be on a secure lead or harness.",
      "Other pets must travel in a secure carrier.",
      "A cleaning charge applies for any mess or damage caused by a pet.",
    ],
  },
  {
    id: "luggage",
    heading: "Luggage and getting in and out",
    paragraphs: [
      "Please bring your luggage to the vehicle and load and unload it yourself. Your driver may help if you ask, but can’t leave the vehicle unattended. Please take care getting in and out of the vehicle.",
    ],
  },
  {
    id: "lost-property",
    heading: "Lost property",
    paragraphs: [
      "Please check you have all your belongings before leaving the vehicle. If you leave something behind, contact us and we’ll gladly help return it. Delivery or postage costs are paid by you.",
    ],
  },
  {
    id: "book-through-us",
    heading: "Always book through us",
    paragraphs: [
      "All journeys must be booked through us, not directly with a driver. This keeps your journey covered by the correct licence and insurance. To book a return or another journey, use our website, call us or send us a WhatsApp message.",
    ],
  },
];

export const cookiesSections: LegalSection[] = [
  {
    id: "our-website",
    heading: "Our website",
    paragraphs: [
      "Our website doesn’t use cookies, and we don’t use analytics or advertising tools that track you. Our fonts are served from our own website, so no font service sees your visit.",
    ],
  },
  {
    id: "other-providers",
    heading: "Booking and payment pages",
    paragraphs: [
      "When you book online or pay by card, you use pages run by our booking system and our payment provider. Those pages may set their own cookies, for example to keep your booking secure. Their own policies explain how.",
    ],
    links: [{ label: "Stripe’s cookie policy", href: "https://stripe.com/gb/legal/cookies-policy" }],
  },
  {
    id: "changes",
    heading: "If this changes",
    paragraphs: [
      "If we ever add cookies to our website, we’ll update this page first, and ask for your permission before setting any cookies that aren’t essential.",
    ],
  },
];

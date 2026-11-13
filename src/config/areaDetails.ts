// Content for the upgraded area pages (/areas/[slug], `AreaLocalPage.tsx`). Areas without an
// entry keep the older `AreaPage.tsx` until their content is approved.
// Places are plain public destinations: no partnerships, journey times, distances or prices.
// Owner to confirm the place names (requirement.md).
export type AreaDetail = {
  hero: { heading: string; text: string };
  // Four groups of local places, one line each.
  places: { title: string; line: string; icon: "shopping" | "health" | "train" | "park" }[];
  faqs: { q: string; a: string }[];
};

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
};

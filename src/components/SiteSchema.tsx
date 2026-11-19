import { areas, pickupAreas, site } from "@/config/site";
import { siteName, siteOrigin } from "@/config/seo";

// Site-wide structured data on every page: the business (TaxiService, a kind of LocalBusiness)
// and the website. Confirmed facts only: no reviews, ratings or prices. The address is the
// booking office in Mill Hill (owner's choice, 18 November 2026).
const intl = (uk: string) => `+44${uk.replace(/\s+/g, "").replace(/^0/, "")}`;

export function SiteSchema() {
  // Only profiles the owner has set (see `profiles` in site.ts).
  const sameAs = Object.values(site.profiles).filter((url): url is string => Boolean(url));
  const business = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${siteOrigin}/#business`,
    name: siteName,
    url: siteOrigin,
    logo: `${siteOrigin}/icon.png`,
    image: `${siteOrigin}/opengraph-image.png`,
    ...(site.phone ? { telephone: intl(site.phone) } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(site.profiles.google ? { hasMap: site.profiles.google } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Bittacy Hill",
      addressLocality: "Mill Hill, London",
      postalCode: "NW7 1LB",
      addressCountry: "GB",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: [
      ...areas.map((a) => ({ "@type": "Place", name: a.name })),
      ...pickupAreas.map(({ name }) => ({ "@type": "Place", name })),
    ],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteOrigin}/#website`,
    name: siteName,
    url: siteOrigin,
    inLanguage: "en-GB",
    publisher: { "@id": `${siteOrigin}/#business` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([business, website]) }} />;
}

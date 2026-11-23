import { areas, pickupAreas, site } from "@/config/site";
import { siteName, siteOrigin } from "@/config/seo";

// Site-wide structured data on every page: the business (TaxiService, a kind of LocalBusiness)
// and the website. Confirmed facts only: no reviews, ratings or prices. The address is the
// booking team's base as A2B Radio Cars publishes it: Hounslow, TW3, with no street address
// (owner's choice, 20 November 2026).
const intl = (uk: string) => `+44${uk.replace(/\s+/g, "").replace(/^0/, "")}`;

const allWeek = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: "00:00",
  closes: "23:59",
};

// The operator licence as a machine-readable value (not free text).
const licence = site.operatorLicence
  ? { "@type": "PropertyValue", propertyID: `${site.licensingAuthority} private hire operator licence`, value: site.operatorLicence }
  : null;

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
    // Both published numbers, so search and AI tools see one business with two lines.
    contactPoint: [
      ...(site.phone
        ? [{ "@type": "ContactPoint", contactType: "reservations", telephone: intl(site.phone), areaServed: "GB", availableLanguage: "en", hoursAvailable: allWeek }]
        : []),
      ...(site.phoneAlt
        ? [{ "@type": "ContactPoint", contactType: "customer service", telephone: intl(site.phoneAlt), areaServed: "GB", availableLanguage: "en" }]
        : []),
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hounslow",
      addressRegion: "London",
      postalCode: site.base.postcode,
      addressCountry: "GB",
    },
    // A2B Radio Cars as its own entity (with the licence), so it can be referenced by @id.
    parentOrganization: {
      "@type": "Organization",
      "@id": `${siteOrigin}/#operator`,
      name: site.operator,
      ...(licence ? { identifier: licence } : {}),
    },
    ...(licence ? { identifier: licence } : {}),
    openingHoursSpecification: allWeek,
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

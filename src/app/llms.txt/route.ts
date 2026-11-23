import { additionalAreas, airports, areas, services, site } from "@/config/site";
import { routes } from "@/config/routeDetails";
import { siteName, siteOrigin } from "@/config/seo";

// /llms.txt: a plain-text summary of the business and its key pages for AI tools (audit,
// 23 November 2026). Built from the same config as the site, so it stays in step. Google
// ignores it; other AI tools may read it. Confirmed facts only: no prices or promises.
const url = (path: string) => `${siteOrigin}${path}`;
const airportName = (name: string) => (name === "London Southend" ? "London Southend Airport" : `${name} Airport`);

export function GET() {
  const contact = [
    site.phone && `- Bookings: ${site.phone}`,
    site.phoneAlt && `- Alternative: ${site.phoneAlt}`,
    site.whatsapp && `- WhatsApp: +${site.whatsapp}`,
    site.email && `- Email: ${site.email}`,
    `- Book online: ${site.bookingUrl}`,
  ].filter(Boolean);

  const text = [
    `# ${siteName}`,
    "",
    `> ${siteName} is a private hire taxi service for Luton and nearby towns, operated by ${site.operator}` +
      (site.operatorLicence ? `, a ${site.licensingAuthority}-licensed private hire operator (licence ${site.operatorLicence})` : "") +
      `. Bookings are handled by our team based in ${site.base.area} (${site.base.postcode}). Available 24 hours a day, 7 days a week.`,
    "",
    "## Key facts",
    "",
    "- Fixed fares: you know your fare when you book.",
    "- DBS-checked drivers.",
    "- Your driver waits free for 15 minutes once they reach the pickup point at the agreed time. After that, waiting charges apply, and these are discussed before you confirm.",
    `- Flight tracking and a name board or agreed meeting point for pickups at ${airports.map((a) => airportName(a.name)).join("; ")}.`,
    "- Child seats on request.",
    "",
    "## Contact",
    "",
    ...contact,
    "",
    "## Areas we cover",
    "",
    `- Main areas: ${areas.map((a) => a.name).join(", ")}.`,
    ...additionalAreas.map((g) => `- ${g.heading}: ${g.places.map((p) => p.name).join("; ")}.`),
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${url(`/services/${s.slug}`)})`),
    `- [All services](${url("/services")})`,
    "",
    "## Airports",
    "",
    ...airports.map((a) => `- [${airportName(a.name)} transfers](${url(`/airports/${a.slug}`)})`),
    `- [All airports](${url("/airports")})`,
    "",
    "## Popular routes",
    "",
    ...routes.map((r) => `- [${r.name} taxi](${url(`/routes/${r.slug}`)})`),
    "",
    "## Areas",
    "",
    ...areas.map((a) => `- [${a.heading}](${url(`/areas/${a.slug}`)})`),
    `- [All areas](${url("/areas")})`,
    "",
    "## Guides and information",
    "",
    `- [Luton Airport drop-off and pickup guide](${url("/luton-airport-guide")})`,
    `- [Luton station transfers](${url("/luton-station-transfers")})`,
    `- [Our fleet](${url("/fleet")})`,
    `- [About us](${url("/about")})`,
    `- [Contact](${url("/contact")})`,
    `- [Terms and conditions](${url("/terms")})`,
    "",
  ].join("\n");

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

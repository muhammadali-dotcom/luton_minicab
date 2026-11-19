import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { FinalCta } from "@/components/FinalCta";
import { HideOnPaths } from "@/components/HideOnPaths";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteSchema } from "@/components/SiteSchema";
import { TopBar } from "@/components/TopBar";
import { googleVerification, homeTitle, isSiteIndexable, siteName, siteOrigin } from "@/config/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Site-wide defaults. Every page sets its own title, description, canonical and link
// preview through pageMetadata() in config/seo.ts; there is no inherited canonical, so
// the 404 page never claims one.
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: siteName,
  title: {
    default: homeTitle,
    template: "%s | Luton Minicab",
  },
  description:
    "School runs, airport trips and everyday journeys from Luton and beyond. Book online or call, day or night.",
  openGraph: { type: "website", locale: "en_GB", siteName },
  twitter: { card: "summary_large_image" },
  robots: {
    index: isSiteIndexable,
    follow: isSiteIndexable,
    googleBot: {
      index: isSiteIndexable,
      follow: isSiteIndexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteSchema />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <TopBar />
        <SiteHeader />
        {children}
        {/* Every page ends with the booking banner except Contact (owner's rule). */}
        <HideOnPaths paths={["/contact"]}>
          <FinalCta />
        </HideOnPaths>
        <SiteFooter />
      </body>
    </html>
  );
}

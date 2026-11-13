import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { FinalCta } from "@/components/FinalCta";
import { HideOnPaths } from "@/components/HideOnPaths";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lutonminicab.com"),
  title: {
    default: "Luton Minicab | Local, School & Airport Journeys",
    template: "%s | Luton Minicab",
  },
  description:
    "School runs, airport trips and everyday journeys from Luton and beyond. Book online or call, day or night.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ScrollToTop />
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

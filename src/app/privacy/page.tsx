import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/config/seo";
import { privacySections } from "@/config/legal";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Luton Minicab collects, uses and protects your information when you book a journey, and your rights.",
  path: "/privacy",
});

export default function Page() {
  return <LegalPage path="/privacy" title="Privacy Policy" intro="How we look after your information." sections={privacySections} />;
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacySections } from "@/config/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Luton Minicab collects, uses and protects your information when you book a journey, and your rights.",
};

export default function Page() {
  return <LegalPage title="Privacy Policy" intro="How we look after your information." sections={privacySections} />;
}

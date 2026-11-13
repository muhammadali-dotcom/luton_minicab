import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { cookiesSections } from "@/config/legal";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Luton Minicab’s website doesn’t use cookies or tracking. Here’s what that means for you.",
};

export default function Page() {
  return <LegalPage title="Cookies" intro="Short and simple: our website doesn’t use cookies." sections={cookiesSections} />;
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { termsSections } from "@/config/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for booking and travelling with Luton Minicab: fares, payment, waiting time, cancellations and more.",
};

export default function Page() {
  return <LegalPage title="Terms & Conditions" intro="The simple rules for booking and travelling with us." sections={termsSections} />;
}

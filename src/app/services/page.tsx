import type { Metadata } from "next";
import { HoldingPage } from "@/components/HoldingPage";

export const metadata: Metadata = {
  title: "Services",
  robots: { index: false },
};

export default function Page() {
  return <HoldingPage title="Services" />;
}

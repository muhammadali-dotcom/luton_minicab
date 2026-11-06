import type { Metadata } from "next";
import { HoldingPage } from "@/components/HoldingPage";

export const metadata: Metadata = {
  title: "About Us",
  robots: { index: false },
};

export default function Page() {
  return <HoldingPage title="About Us" />;
}

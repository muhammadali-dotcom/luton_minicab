import type { Metadata } from "next";
import { HoldingPage } from "@/components/HoldingPage";

export const metadata: Metadata = {
  title: "Our Fleet",
  robots: { index: false },
};

export default function Page() {
  return <HoldingPage title="Our Fleet" />;
}

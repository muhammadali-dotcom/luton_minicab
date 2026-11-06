import { site } from "@/config/site";
import { PageHero } from "./PageHero";

type Props = {
  title: string;
  eyebrow?: string;
};

// Temporary page for routes whose content has not been approved yet.
export function HoldingPage({ title, eyebrow }: Props) {
  return (
    <main id="main" className="flex-1">
      <PageHero
        eyebrow={eyebrow ?? title.toUpperCase()}
        heading={title}
        text="This page is being prepared."
        action={{ label: "Book Online", href: site.bookingUrl }}
      />
    </main>
  );
}

import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        eyebrow="PAGE NOT FOUND"
        heading="Page not found"
        text="We couldn’t find the page you were looking for."
        action={{ label: "Back to home", href: "/" }}
      />
    </main>
  );
}

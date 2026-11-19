import heroPhoto from "../../public/brand/home-hero.png";
import { PageHero } from "./PageHero";

// From the owner's reference: centred text in the sky of the town panorama (original in
// assets/brand/home-hero-panorama-original.png; the cars' bonnet badges retouched out).
// Gold Book Online, green eyebrow, no trust row (owner's choices, November 2026).
export function Hero() {
  return (
    <PageHero
      image={heroPhoto}
      alt="Three dark cars parked in front of a town hall clock tower and a glass terminal building at sunset."
      centeredPhoto={{ ratio: 1836 / 857 }}
      // In the h1 (shown in capitals by CSS), so search reads "Luton Minicab: Wherever you're going…".
      eyebrow="Luton Minicab"
      eyebrowInHeading
      heading={
        <>
          {/* The space keeps the h1's text "going, we'll" for search and screen readers. */}
          <span className="block">Wherever you&rsquo;re going,</span>{" "}
          <span className="block">we&rsquo;ll get you there.</span>
        </>
      }
      text="Early flights, school mornings, late trains home. Book in a few minutes, or talk to our team, day or night."
    />
  );
}

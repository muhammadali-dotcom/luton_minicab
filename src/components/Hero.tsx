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
      eyebrow="LUTON MINICAB"
      heading={
        <>
          <span className="block">Your Luton ride,</span>
          <span className="block">wherever life takes you.</span>
        </>
      }
      text="Local trips, airport transfers and journeys further afield. Book online or call our team."
    />
  );
}

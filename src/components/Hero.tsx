import heroPhoto from "../../public/brand/hero-photo.png";
import { PageHero, trustLocal } from "./PageHero";

export function Hero() {
  return (
    <PageHero
      tone="dark"
      image={heroPhoto}
      alt="A driver opens the car door for a smiling passenger outside a brick house."
      eyebrow="LUTON & BEYOND"
      heading={
        <>
          <span className="block">Your everyday journeys.</span>
          <em className="block">Taken care of.</em>
        </>
      }
      text="School runs, airport trips and everyday journeys. Wherever you’re heading, we’re here to help."
      trust={trustLocal}
    />
  );
}

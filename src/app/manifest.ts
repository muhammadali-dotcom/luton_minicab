import type { MetadataRoute } from "next";

// Web app manifest: name, colours (forest green and cream from the theme) and the existing icons.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luton Minicab",
    short_name: "Luton Minicab",
    description: "Local journeys, school runs and airport transfers from Luton. Book online or call, day or night.",
    start_url: "/",
    display: "browser",
    background_color: "#faf7ef",
    theme_color: "#244638",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

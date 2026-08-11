import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fynd - Discover places you'll actually love",
    short_name: "Fynd",
    description:
      "Fynd learns your interests, preferences, and location to uncover experiences, neighborhoods, and hidden gems tailored to you in seconds.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf9f6",
    theme_color: "#e8503a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

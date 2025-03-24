import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sistema Integrado de Ensino à Histologia e Patologia",
    short_name: "SIEHP",
    description:
      "SIEHP - Sistema Integrado de Ensino à Histologia e Patologia.",
    theme_color: "#7C7C7C",
    background_color: "#F9F9F9",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "/favicon/maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

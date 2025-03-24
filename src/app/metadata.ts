import { SIEHPConfig } from "@/shared/config/siehpConfig";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#7C7C7C",
};

export const metadata: Metadata = {
  title: {
    template: "SIEHP | %s",
    default: "SIEHP",
  },
  description: "Sistema Integrado de Ensino à Histologia e Patologia.",
  metadataBase: new URL(SIEHPConfig.BASE_URL),
  applicationName: "SIEHP",
  robots: { index: true, follow: true },
  keywords: [
    "SIEHP",
    "Sistema Integrado de Ensino à Histologia e Patologia",
    "Histologia",
    "Patologia",
    "Ensino",
    "Educação",
    "Universidade",
    "UFS",
    "Universidade Federal de Sergipe",
    "Medicina",
    "Biologia",
  ],
  creator: "SIEHP Team",
  authors: [
    { name: "Adriel Santana", url: "https://adrielsan.pro" },
    { name: "Vitor Manoel", url: "https://vitorspace.vercel.app/" },
    { name: "Jairo Santana" },
    { name: "Cauan Santos" },
  ],
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "SIEHP",
    images: ["/og/opengraph-image.png"],
    description: "Sistema Integrado de Ensino à Histologia e Patologia",
    type: "website",
    locale: "pt_BR",
    countryName: "Brazil",
  },
  twitter: {
    title: "SIEHP",
    images: ["/og/twitter-image.png"],
    description: "Sistema Integrado de Ensino à Histologia e Patologia",
  },
};

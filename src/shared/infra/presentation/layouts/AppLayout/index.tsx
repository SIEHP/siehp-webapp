import { AppLayoutProps } from "./types";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ErrorAlert from "../../components/ErrorAlert";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  style: ["italic", "normal"],
  preload: true,
  adjustFontFallback: true,
  display: "swap",
  variable: "--font-roboto",
});

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <html lang="pt-br" data-theme="normal">
      <body className={`[&>*::-webkit-scrollbar]:w-3 min-h-dvh relative ${roboto.className}`}>
        {children}
        <ErrorAlert />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default AppLayout;

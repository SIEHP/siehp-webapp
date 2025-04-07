import MakeLandingPageLayout from "@/shared/infra/factories/layouts/MakeLandingPageLayout";
import React, { ReactNode } from "react";

export const metadata = { title: "SIEHP | Ajuda" };

export default function HelpLayout({ children }: { children: ReactNode }) {
  return <MakeLandingPageLayout>{children}</MakeLandingPageLayout>;
} 
import MakeLandingPageLayout from "@/shared/infra/factories/layouts/MakeLandingPageLayout";
import { ReactNode } from "react";

export default function ExampleLayout({ children }: { children: ReactNode }) {
  return <MakeLandingPageLayout>{children}</MakeLandingPageLayout>;
}

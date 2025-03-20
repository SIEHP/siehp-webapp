import MakeLandingPageLayout from "@/shared/infra/factories/layouts/MakeLandingPageLayout";
import MakeLoginPage from "@/modules/user/infra/factories/pages/MakeLoginPage";

export const metadata = { title: "SIEHP | Em Construção" };

export default function Home() {
  return (
    <MakeLandingPageLayout>
      <MakeLoginPage />
    </MakeLandingPageLayout>
  );
}

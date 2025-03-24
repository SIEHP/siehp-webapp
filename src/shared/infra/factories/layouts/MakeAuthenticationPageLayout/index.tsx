import TokenValidationPageLayout from "@/shared/infra/presentation/layouts/TokenValidationLayout";
import { MakeTokenValidationPageLayoutProps } from "./types";

const MakeTokenValidationPageLayout = ({ children }: MakeTokenValidationPageLayoutProps) => {
  return (
      <TokenValidationPageLayout>{children}</TokenValidationPageLayout>
  );
};

export default MakeTokenValidationPageLayout;

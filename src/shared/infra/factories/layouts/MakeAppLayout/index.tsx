import AppLayout from "@/shared/infra/presentation/layouts/AppLayout";
import { MakeAppLayoutProps } from "./types";

const MakeAppLayout = ({ children }: MakeAppLayoutProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default MakeAppLayout;

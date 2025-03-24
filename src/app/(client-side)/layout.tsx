import MakeAuthenticatedLayout from "@/shared/infra/factories/layouts/MakeAuthenticatedLayout";
import { ReactNode } from "react";

export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return<MakeAuthenticatedLayout>
    {children}
  </MakeAuthenticatedLayout>;
}
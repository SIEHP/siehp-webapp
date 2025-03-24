"use client";
import AppLayout from "@/shared/infra/presentation/layouts/AppLayout";
import { MakeAppLayoutProps } from "./types";
import ReactQueryProvider from "@/shared/config/libs/react-query";
import AuthProvider from "@/modules/user/infra/services/contexts/AuthProvider";

const MakeAppLayout = ({ children }: MakeAppLayoutProps) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <AppLayout>{children}</AppLayout>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default MakeAppLayout;

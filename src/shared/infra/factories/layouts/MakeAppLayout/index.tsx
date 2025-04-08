"use client";
import AppLayout from "@/shared/infra/presentation/layouts/AppLayout";
import { MakeAppLayoutProps } from "./types";
import ReactQueryProvider from "@/shared/config/libs/react-query";
import AuthProvider from "@/modules/user/infra/services/contexts/AuthProvider";
import { ToastProvider } from "@/shared/infra/presentation/components/Toast";

const MakeAppLayout = ({ children }: MakeAppLayoutProps) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ToastProvider>
          <AppLayout>{children}</AppLayout>
        </ToastProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default MakeAppLayout;

"use client";

export * from "./metadata";
import ReactQueryProvider from "@/shared/config/libs/react-query";
import "./global.css";
import MakeAppLayout from "@/shared/infra/factories/layouts/MakeAppLayout";
import { useAuthStore } from "@/modules/user/infra/services/stores/auth-store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuthStore()
  console.log(auth);
  return <ReactQueryProvider>
            <MakeAppLayout>
              {children}
            </MakeAppLayout>
          </ReactQueryProvider>;
}

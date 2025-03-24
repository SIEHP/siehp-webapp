export * from "./metadata";
import "./global.css";
import MakeAppLayout from "@/shared/infra/factories/layouts/MakeAppLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MakeAppLayout>{children}</MakeAppLayout>;
}

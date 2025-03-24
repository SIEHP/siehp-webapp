"use client";
import ExampleProvider from "@/shared/infra/services/contexts/ExampleProvider";
import ExampleLayout from "@/shared/infra/presentation/layouts/ExampleLayout";
import { MakeExampleLayoutProps } from "./types";

const MakeExampleLayout = ({ children }: MakeExampleLayoutProps) => {
  return (
    <ExampleProvider>
      <ExampleLayout>{children}</ExampleLayout>
    </ExampleProvider>
  );
};

export default MakeExampleLayout;

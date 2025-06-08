import { ReactNode } from "react";

export interface ExampleContextData {
  example: string;
  userName?: string;
  isLoading: boolean;
}

export interface ExampleProviderProps {
  children: ReactNode;
}

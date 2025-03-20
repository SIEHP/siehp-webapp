import { ReactNode } from "react";

export interface ExampleContextData {
  example: string;
}

export interface ExampleProviderProps {
  children: ReactNode;
}

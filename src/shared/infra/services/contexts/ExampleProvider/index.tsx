"use client";

import { createContext, useEffect, useState } from "react";
import { ExampleContextData, ExampleProviderProps } from "./types";
import { RemoteExample } from "@/shared/infra/services/data/usecases";
import { exampleAdapter } from "@/shared/infra/services/data/adapters";

export const ExampleContext = createContext<ExampleContextData>(
  {} as ExampleContextData,
);

const ExampleProvider = ({ children }: ExampleProviderProps) => {
  const [example, setExample] = useState<string>("");

  useEffect(() => {
    const remoteExample = new RemoteExample();
    const getExample = async () => {
      const exampleData = await remoteExample.getExample({
        example: "example",
      });
      const exampleAdapted = exampleAdapter(exampleData);
      setExample(exampleAdapted.example.exampleModelAttribute);
    };

    getExample();
  }, []);


  return (
    <ExampleContext.Provider
      value={{
        example,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
};

export default ExampleProvider;

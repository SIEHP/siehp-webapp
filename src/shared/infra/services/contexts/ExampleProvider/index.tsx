"use client";

import { createContext, useEffect, useState } from "react";
import { ExampleContextData, ExampleProviderProps } from "./types";
import { RemoteExample } from "@/shared/infra/services/data/usecases";
import { exampleAdapter } from "@/shared/infra/services/data/adapters";
import { useAuthStore } from "@/modules/user/infra/services/stores/auth-store";
import { RemoteAuth } from "@/modules/user/infra/services/data/usecases";
import { useQuery } from "@tanstack/react-query";

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

  const { setAuth } = useAuthStore();

  const { isPending, error, data } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const userAuth = await new RemoteAuth().authUser({
        email: "sadas",
        password: "asdas",
      });

      setAuth(userAuth);

      return userAuth;
    },
  });

  return (
    <ExampleContext.Provider
      value={{
        example,
        userName: data?.user.name,
        isLoading: isPending,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
};

export default ExampleProvider;

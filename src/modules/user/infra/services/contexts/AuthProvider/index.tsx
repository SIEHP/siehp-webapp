"use client";

import { createContext } from "react";
import { AuthContextData } from "./types";
import { useAuthStore } from "@/modules/user/infra/services/stores/auth-store";
import { RemoteAuth } from "@/modules/user/infra/services/data/usecases";
import { useMutation } from "@tanstack/react-query";
import { AuthProviderProps } from "./types";
import { Auth } from "@/modules/user/domain/models";
import { LoginFormData } from "@/modules/user/infra/factories/presentation/pages/LoginPage/validation";
import { RemoteError } from "@/shared/domain/errors/remote-error";
import { useRouter } from "next/navigation";
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const { setAuth, auth } = useAuthStore();

  const { mutateAsync: login, isPending, error, data } = useMutation<Auth, RemoteError, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      const userAuth = await new RemoteAuth().login({
        email: data.email,
        password: data.password,
      });

      setAuth(userAuth);

      return userAuth;
    },
  });



  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data);
  };

  const handleLogout = async () => {
    setAuth(null);
    router.push('/');
  };

  const handleRefreshAccessToken = async () => {
    try {
      const userAuth = await new RemoteAuth().refreshAccessToken(); 
      setAuth(userAuth);
    } catch (error) {
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{login: {handleLogin, isPending, error: error?.response?.data?.message, data}, auth, logout: {handleLogout}, refreshAccessToken: {handleRefreshAccessToken}}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

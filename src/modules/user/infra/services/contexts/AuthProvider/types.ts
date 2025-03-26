import { ReactNode } from "react";
import { Auth } from "@/modules/user/domain/models";

export interface AuthContextData {
  login: {
    handleLogin: (data: { email: string; password: string }) => Promise<void>;
    isPending: boolean;
    error: string | undefined;
    data: any;
  };
  auth: Auth | null;
  logout: {
    handleLogout: () => Promise<void>;
  };
  refreshAccessToken: {
    handleRefreshAccessToken: () => Promise<void>;
  };
}

export interface AuthProviderProps {
  children: ReactNode;
}

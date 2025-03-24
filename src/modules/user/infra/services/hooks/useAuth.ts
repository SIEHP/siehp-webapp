import { useContext } from "react";
import { AuthContext } from "@/modules/user/infra/services/contexts/AuthProvider";
import { AuthContextData } from "@/modules/user/infra/services/contexts/AuthProvider/types";
import { OutOfContextError } from "@/shared/domain/errors";

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (Object.keys(context).length <= 0) {
    throw new OutOfContextError("AuthContext");
  }

  return context;
}

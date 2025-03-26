import { ForgotPasswordResponseDTO } from "@/modules/user/domain/dtos/forgort-password";
import { ForgotPasswordParamsDTO } from "@/modules/user/domain/dtos/forgort-password";
import { ForgotPassword } from "../data/usecases/forgort-password";
import { useMutation } from "@tanstack/react-query";
import { RemoteError } from "@/shared/domain/errors/remote-error";



const useForgotPassword = () => {
  const { mutateAsync: forgotPassword, isPending, error, data } = useMutation<ForgotPasswordResponseDTO, RemoteError, ForgotPasswordParamsDTO>({
    mutationFn: async (data: ForgotPasswordParamsDTO) => {
      const response = await new ForgotPassword().forgotPassword(data);
      return response;
    },
  });

  const handleForgotPassword = async (data: ForgotPasswordParamsDTO) => {
    await forgotPassword(data);
  };
  
  return {
    forgotPassword: {
      handleForgotPassword,
      isPending,
      error: error?.response?.data?.message,
      data,
    },
  };
};

export default useForgotPassword;
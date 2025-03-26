import { ResetPasswordResponseDTO } from "@/modules/user/domain/dtos/reset-password";
import { ResetPasswordParamsDTO } from "@/modules/user/domain/dtos/reset-password";
import { ResetPassword } from "../data/usecases/reset-password";
import { useMutation } from "@tanstack/react-query";
import { RemoteError } from "@/shared/domain/errors/remote-error";



const useResetPassword = () => {
  const { mutateAsync: resetPassword, isPending, error, data } = useMutation<ResetPasswordResponseDTO, RemoteError, ResetPasswordParamsDTO>({
    mutationFn: async (data: ResetPasswordParamsDTO) => {
      const response = await new ResetPassword().resetPassword(data);
      return response;
    },
  });

  const handleResetPassword = async (data: ResetPasswordParamsDTO) => {
    await resetPassword(data);
  };
  
  return {
    resetPassword: {
      handleResetPassword,
      isPending,
      error: error?.response?.data?.message,
      data,
    },
  };
};

export default useResetPassword;
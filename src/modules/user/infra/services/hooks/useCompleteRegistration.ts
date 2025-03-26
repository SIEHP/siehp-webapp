import { CompleteRegistrationResponseDTO } from "@/modules/user/domain/dtos/complete-registration";
import { CompleteRegistrationParamsDTO } from "@/modules/user/domain/dtos/complete-registration";
import { RemoteAuth } from "../data/usecases/remote-auth";
import { RemoteError } from "@/shared/domain/errors/remote-error";
import { useMutation } from "@tanstack/react-query";


const useCompleteRegistration = () => {
  const { mutateAsync: completeRegistration, isPending, error, data } = useMutation<CompleteRegistrationResponseDTO, RemoteError, CompleteRegistrationParamsDTO>({
    mutationFn: async (data: CompleteRegistrationParamsDTO) => {
      const response = await new RemoteAuth().completeRegistration(data);
      return response;
    },
  });

  const handleCompleteRegistration = async (data: CompleteRegistrationParamsDTO) => {
    await completeRegistration(data);
  };

  return {
    completeRegistration: {
      handleCompleteRegistration,
      isPending,
      error: error?.response?.data?.message,
      data,
    },
  };
};

export default useCompleteRegistration;
import { useMutation } from "@tanstack/react-query";
import { InviteTeacher } from "../../data/usecases/invite-teacher";
import { InviteProfessorParamsDTO, InviteProfessorResponseDTO } from "@/modules/user/domain/dtos/invite-professor";
import { RemoteError } from "@/shared/domain/errors/remote-error";
import { GetProfessors } from "../../data/usecases/get-professors";
import { GetProfessorsParamsDTO } from "@/modules/user/domain/dtos/get-professors";
const useAdmin = () => {
  const { mutateAsync: inviteTeacher, isPending, error, data } = useMutation<InviteProfessorResponseDTO, RemoteError, InviteProfessorParamsDTO>({
    mutationFn: async (data: InviteProfessorParamsDTO) => {
      const response = await new InviteTeacher().inviteTeacher(data);
      return response;
    },
  });

  const handleInviteTeacher = async (data: InviteProfessorParamsDTO) => {
    await inviteTeacher(data);
  };
  
  const handleGetProfessors = async () => {
    const response = await new GetProfessors().getProfessors();
    return response;
  };

  return {
    inviteTeacher: {
      handleInviteTeacher,
      isPending,
      error: error?.response?.data?.message,
      data,
    },
    getProfessors: {
      handleGetProfessors,
      isPending,
      error: error?.response?.data?.message,
      data,
    },
  };
};

export default useAdmin;
import { useMutation } from "@tanstack/react-query";
import { InviteTeacher } from "../../data/usecases/invite-teacher";
import { InviteProfessorParamsDTO, InviteProfessorResponseDTO } from "@/modules/user/domain/dtos/invite-professor";
import { RemoteError } from "@/shared/domain/errors/remote-error";

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

  return {
    inviteTeacher: {
      handleInviteTeacher,
      isPending,
      error: error?.response?.data?.message,
      data,
    },
  };
};

export default useAdmin;
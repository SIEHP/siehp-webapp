import { useMutation } from "@tanstack/react-query";
import { InviteTeacher } from "../../data/usecases/invite-teacher";
import {
  InviteProfessorParamsDTO,
  InviteProfessorResponseDTO,
} from "@/modules/user/domain/dtos/invite-professor";
import { RemoteError } from "@/shared/domain/errors/remote-error";
import { GetProfessors } from "../../data/usecases/get-professors";
import { ChangeUserStatus } from "../../data/usecases/change-user-status";
import {
  ChangeUserStatusParamsDTO,
  ChangeUserStatusResponseDTO,
} from "@/modules/user/domain/dtos/change-user-status";

const useAdmin = () => {
  const {
    mutateAsync: inviteTeacher,
    isPending: isInvitePending,
    error: inviteError,
    data: inviteData,
  } = useMutation<
    InviteProfessorResponseDTO,
    RemoteError,
    InviteProfessorParamsDTO
  >({
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

  const {
    mutateAsync: changeUserStatus,
    isPending: isStatusChangePending,
    error: statusChangeError,
    data: statusChangeData,
  } = useMutation<
    ChangeUserStatusResponseDTO,
    RemoteError,
    ChangeUserStatusParamsDTO
  >({
    mutationFn: async (data: ChangeUserStatusParamsDTO) => {
      const response = await new ChangeUserStatus().changeUserStatus(data);
      return response;
    },
  });

  const handleChangeUserStatus = async (data: ChangeUserStatusParamsDTO) => {
    const result = await changeUserStatus(data);
    return result;
  };

  return {
    inviteTeacher: {
      handleInviteTeacher,
      isPending: isInvitePending,
      error: inviteError?.response?.data?.message,
      data: inviteData,
    },
    getProfessors: {
      handleGetProfessors,
      isPending: false,
      error: null,
      data: null,
    },
    changeUserStatus: {
      handleChangeUserStatus,
      isPending: isStatusChangePending,
      error: statusChangeError?.response?.data?.message,
      data: statusChangeData,
    },
  };
};

export default useAdmin;

import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { ApiError } from "@/shared/domain/models/error";
import { InviteProfessorParamsDTO, InviteProfessorResponseDTO, InviteProfessorResponseSchema } from "@/modules/user/domain/dtos/invite-professor";

export class InviteTeacher {
  async inviteTeacher({
    email,
  }: InviteProfessorParamsDTO): Promise<InviteProfessorResponseDTO> {
    const httpResponse = await api.post<InviteProfessorResponseDTO | ApiError>(
      `/user/invite/professor`,
      {
        email,
      },
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: InviteProfessorResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data as InviteProfessorResponseDTO;
  }
}

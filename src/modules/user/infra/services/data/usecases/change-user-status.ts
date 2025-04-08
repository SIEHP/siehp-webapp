import {
  ChangeUserStatusParamsDTO,
  ChangeUserStatusParamsSchema,
  ChangeUserStatusResponseDTO,
  ChangeUserStatusResponseSchema,
} from "@/modules/user/domain/dtos/change-user-status";
import { ApiError } from "@/shared/domain/models";
import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class ChangeUserStatus {
  async changeUserStatus({
    userId,
  }: ChangeUserStatusParamsDTO): Promise<ChangeUserStatusResponseDTO> {
    const httpResponse = await api.put<ChangeUserStatusResponseDTO | ApiError>(
      "user/change-user-status",
      {
        userId,
      },
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: ChangeUserStatusResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data as ChangeUserStatusResponseDTO;
  }
}

import { ResetPasswordResponseDTO, ResetPasswordParamsDTO, ResetPasswordResponseSchema } from "@/modules/user/domain/dtos/reset-password";
import { ApiError } from "@/shared/domain/models/error";
import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class ResetPassword {
  async resetPassword({ token, password, confirmPassword }: ResetPasswordParamsDTO): Promise<ResetPasswordResponseDTO> {
    const httpResponse = await api.post<ResetPasswordResponseDTO | ApiError>(
      `/user/reset-password`,
      {
        token,
        password,
        confirmPassword 
      },
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: ResetPasswordResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data;
  }
}

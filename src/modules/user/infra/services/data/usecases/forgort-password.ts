import api from "@/shared/infra/services/api";
import { ApiError } from "@/shared/domain/models/error";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { ForgotPasswordParamsDTO, ForgotPasswordResponseDTO, ForgotPasswordResponseSchema } from "@/modules/user/domain/dtos/forgort-password";

export class ForgotPassword {
  async forgotPassword({ email }: ForgotPasswordParamsDTO): Promise<ForgotPasswordResponseDTO> {
    const httpResponse = await api.post<ForgotPasswordResponseDTO | ApiError>(
      `/user/forgot-password`,
      {
        email,
      },
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: ForgotPasswordResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data as ForgotPasswordResponseDTO;
  }
}
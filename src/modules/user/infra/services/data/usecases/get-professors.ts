import { ApiError } from "@/shared/domain/models/error";
import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { GetProfessorsParamsDTO, GetProfessorsResponseDTO, GetProfessorsResponseSchema } from "@/modules/user/domain/dtos/get-professors";

export class GetProfessors {
  async getProfessors() {
    const httpResponse = await api.get<GetProfessorsResponseDTO | ApiError>(
      `/user/professors`,
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: GetProfessorsResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data as GetProfessorsResponseDTO;
  }
}

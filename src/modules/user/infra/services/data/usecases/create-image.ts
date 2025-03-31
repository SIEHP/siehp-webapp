import { CreateImageParamsDTO, CreateImageResponseSchema, CreateImageResponseDTO } from "@/modules/user/domain/dtos/create-image";
import { ApiError } from "@/shared/domain/models/error";
import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class CreateImage {
  async createImage(data: CreateImageParamsDTO) {
    const httpResponse = await api.post<CreateImageResponseDTO | ApiError>(
      `/user/create-image`,
      {
        file_id: data.file_id,
        title: data.title,
        url: data.url,
        user_email: data.user_email,
        tags: data.tags,
      },
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: CreateImageResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data as CreateImageResponseDTO;
  }
}
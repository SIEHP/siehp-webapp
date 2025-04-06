import { UpdateImageParamsDTO, UpdateImageResponseDTO, UpdateImageResponseSchema } from "@/modules/image/domain/dtos/update-image";
import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class UpdateImage {
  async updateImage(data: UpdateImageParamsDTO): Promise<UpdateImageResponseDTO> {
    const httpResponse = await api.put<UpdateImageResponseDTO>(
      `/image/update-image`,
      data,
    );

    const error = checkApiError({
      data: httpResponse.data,
      schema: UpdateImageResponseSchema,
    });

    if (error) {
      throw new Error(error);
    }

    return httpResponse.data as UpdateImageResponseDTO;
  }
}

import api from "@/shared/infra/services/api";
import { CreateImageParamsDTO, CreateImageResponseDTO, CreateImageResponseSchema } from "@/modules/image/domain/dtos/create-image";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class CreateImage {
  async createImage({
    title,
    url,
    tags,
  }: CreateImageParamsDTO): Promise<CreateImageResponseDTO> {
  

    const httpResponse = await api.post<CreateImageResponseDTO>(`/image/create`, {
      title,
      url,
      tags,
    });

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
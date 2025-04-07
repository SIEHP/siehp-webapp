import api from "@/shared/infra/services/api";
import { ListTagsResponseDTO, ListTagsResponseSchema } from "@/modules/image/domain/dtos/list-tags";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class ListTags {
  async listTags(): Promise<ListTagsResponseDTO> {
    try {
      const httpResponse = await api.get<ListTagsResponseDTO>(`/tag`);

      const error = checkApiError({
        data: httpResponse.data,
        schema: ListTagsResponseSchema,
      });

      if (error) {
        throw new Error(error);
      }

      return httpResponse.data;
    } catch (error) {
      console.error("Erro ao buscar as tags:", error);
      throw error;
    }
  }
} 
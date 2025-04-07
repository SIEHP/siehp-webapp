import api from "@/shared/infra/services/api";
import { DeleteImageResponseDTO, DeleteImageResponseSchema } from "@/modules/image/domain/dtos/delete-image";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class DeleteImage {
  async deleteImage(id: number): Promise<DeleteImageResponseDTO> {
    try {
      const httpResponse = await api.delete<DeleteImageResponseDTO>(`/image/${id}`);

      const error = checkApiError({
        data: httpResponse.data,
        schema: DeleteImageResponseSchema,
      });

      if (error) {
        throw new Error(error);
      }

      return httpResponse.data;
    } catch (error: any) {
      console.error("Erro durante a exclusão da imagem:", error);
      if (error.response?.data?.message) {
        throw new Error(`Erro do servidor: ${error.response.data.message}`);
      }
      throw error;
    }
  }
} 
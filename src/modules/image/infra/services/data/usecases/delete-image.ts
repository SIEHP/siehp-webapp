import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { DeleteImageParamsDTO, DeleteImageResponseDTO, DeleteImageResponseSchema } from "@/modules/image/domain/dtos/delete-image";
import { ApiError } from "@/shared/domain/models/error";
export class DeleteImage {
    async deleteImage({ id }: DeleteImageParamsDTO): Promise<DeleteImageResponseDTO> {
        
        const httpResponse = await api.delete<DeleteImageResponseDTO | ApiError>(`/image/${id}`);

        const error = checkApiError({
            data: httpResponse.data,
            schema: DeleteImageResponseSchema,
        });

        if (error) {
            throw new Error(error);
        }

        return httpResponse.data as DeleteImageResponseDTO;
    }


}
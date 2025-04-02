import api from "@/shared/infra/services/api";
import { ListImageResponseDTO, ListImageResponseSchema } from "@/modules/image/domain/dtos/list-image";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";
import { ApiError } from "@/shared/domain/models/error";
export class ListImage {
    async listImage(): Promise<ListImageResponseDTO> {
        const httpResponse = await api.get<ListImageResponseDTO | ApiError>(`/image`);


        const error = checkApiError({
            data: httpResponse.data,
            schema: ListImageResponseSchema,
        });

        if (error) {
            throw new Error(error);
        }

        return httpResponse.data as ListImageResponseDTO;
    }
}
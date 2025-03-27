import api from "@/shared/infra/services/api";
import { ListImageResponseDTO, ListImageResponseSchema } from "@/modules/image/domain/dtos/list-image";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class ListImage {
    async listImage(): Promise<ListImageResponseDTO> {
        const httpResponse = await api.get<ListImageResponseDTO>(`/image`);


        const error = checkApiError({
            data: httpResponse.data,
            schema: ListImageResponseSchema,
        });

        if (error) {
            throw new Error(error);
        }

        return httpResponse.data;
    }
}
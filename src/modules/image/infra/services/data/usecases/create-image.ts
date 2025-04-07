import api from "@/shared/infra/services/api";
import { CreateImageParamsDTO, CreateImageResponseDTO, CreateImageResponseSchema } from "@/modules/image/domain/dtos/create-image";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class CreateImage {
  async createImage({
    title,
    url,
    piece_state,
    pick_date,
    tissue,
    copyright,
    description,
    tags,
  }: CreateImageParamsDTO): Promise<CreateImageResponseDTO> {
    try {
      // Processa a data no formato correto
      let formattedPickDate = pick_date;
      
      if (pick_date) {
        if (pick_date instanceof Date) {
          // Se já for uma instância de Date, converter para ISO string
          formattedPickDate = pick_date.toISOString();
        } else if (typeof pick_date === 'string') {
          try {
            // Converte string para Date e depois para ISO string
            const dateObj = new Date(pick_date);
            if (!isNaN(dateObj.getTime())) {
              formattedPickDate = dateObj.toISOString();
            } else {
              console.warn("Data inválida, enviando como string:", pick_date);
            }
          } catch (e) {
            console.error("Erro ao processar data:", e);
          }
        }
      }
      
      // Certifica-se de que tags é um array
      const processedTags = Array.isArray(tags) ? tags : [];
      
      console.log("Dados sendo enviados para criação:", {
        title,
        url,
        piece_state,
        pick_date: formattedPickDate,
        tissue,
        copyright,
        description,
        tags: processedTags
      });

      const httpResponse = await api.post<CreateImageResponseDTO>(`/image/create`, {
        title,
        url,
        piece_state,
        pick_date: formattedPickDate,
        tissue,
        copyright,
        description,
        tags: processedTags,
      });

      const error = checkApiError({
        data: httpResponse.data,
        schema: CreateImageResponseSchema,
      });

      if (error) {
        throw new Error(error);
      }

      return httpResponse.data as CreateImageResponseDTO;
    } catch (error) {
      console.error("Erro durante a criação da imagem:", error);
      throw error;
    }
  }
}
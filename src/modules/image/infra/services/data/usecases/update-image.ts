import { UpdateImageParamsDTO, UpdateImageResponseDTO, UpdateImageResponseSchema } from "@/modules/image/domain/dtos/update-image";
import api from "@/shared/infra/services/api";
import { checkApiError } from "@/shared/infra/utils/functions/check-api-error";

export class UpdateImage {
  async updateImage(data: UpdateImageParamsDTO): Promise<UpdateImageResponseDTO> {
    // Verificação de campos obrigatórios
    if (!data.user_email) {
      throw new Error("Campo obrigatório: user_email não está presente na requisição");
    }
    
    if (!data.id) {
      throw new Error("Campo obrigatório: id da imagem não está presente na requisição");
    }
  
    try {
      // Buscar a imagem atual para obter dados originais
      const imageResponse = await api.get<UpdateImageResponseDTO>(`/image/${data.id}`);
      const originalImage = imageResponse.data;
      
      // Garantir que url e title estejam presentes
      const updatedData = {
        ...data,
        url: data.url || originalImage.url,
        title: data.title || originalImage.title
      };
      
      // Verificar se pick_date está definido e garantir que está em formato válido
      if (updatedData.pick_date) {
        if (updatedData.pick_date instanceof Date) {
          // Se já for uma instância de Date, converter para ISO string
          updatedData.pick_date = updatedData.pick_date.toISOString();
        } else if (typeof updatedData.pick_date === 'string' && updatedData.pick_date.trim() !== '') {
          try {
            // Se for string, tentar converter para Date e depois para ISO string
            const dateObj = new Date(updatedData.pick_date);
            if (!isNaN(dateObj.getTime())) {
              updatedData.pick_date = dateObj.toISOString();
            }
          } catch (e) {
            console.error("Erro ao processar data:", e);
            delete updatedData.pick_date; // Remove se inválida
          }
        }
      }
      
      // Tratar as tags para evitar duplicações e problemas de unicidade
      if (data.tags !== undefined) {
        // Remover duplicações nas tags
        updatedData.tags = Array.from(new Set(data.tags || []));
        
        // Log de comparação para debug
        console.log("Tags a serem atualizadas:", {
          originais: originalImage.tags?.map(tag => tag.name),
          novas: updatedData.tags
        });
      }
      
      console.log("Dados finais enviados para atualização:", updatedData);
      
      const httpResponse = await api.put<UpdateImageResponseDTO>(
        `/image/${data.id}`,
        updatedData,
      );

      const error = checkApiError({
        data: httpResponse.data,
        schema: UpdateImageResponseSchema,
      });

      if (error) {
        throw new Error(error);
      }

      return httpResponse.data as UpdateImageResponseDTO;
    } catch (error: any) {
      console.error("Erro durante a atualização da imagem:", error);
      if (error.response?.data?.message) {
        throw new Error(`Erro do servidor: ${error.response.data.message}`);
      }
      throw error;
    }
  }
}

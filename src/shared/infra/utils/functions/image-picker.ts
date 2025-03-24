import { Dispatch, SetStateAction } from "react";
import { Path, UseFormSetValue } from "react-hook-form";

/**
 * Função para manipular a seleção de imagens
 * @param file Arquivo de imagem selecionado ou null se nenhum arquivo
 * @param setValue Função para definir o valor no formulário
 * @param setImagePreviewUrl Função para definir a URL de visualização da imagem
 * @param fieldName Nome do campo para armazenar o arquivo de imagem
 */
export const handleImageSelect = <T extends Record<string, any>>(
  file: File | null,
  setValue: UseFormSetValue<T>,
  setImagePreviewUrl: Dispatch<SetStateAction<string | null>>,
  fieldName: Path<T>,
) => {
  setValue(fieldName, file as any);

  if (file) {
    // Converter a imagem para base64 para exibição
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = reader.result as string;
      setImagePreviewUrl(base64data);
    };
  } else {
    // Se o arquivo for null, limpa o preview
    setImagePreviewUrl(null);
  }
};

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";

export interface ReceivedImageData {
  copyright?: string;
  tissue?: string;
  piece_state?: string;
  pick_date?: string;
  title?: string;
  description?: string;
  tags?: {id: number, name: string, status: string}[];
}

export interface UpdatedImageData {
  copyright?: string;
  tissue?: string;
  piece_state?: string;
  pick_date?: string;
  title?: string;
  description?: string;
  tags?: string[];
}

interface IEditImageFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedData: UpdatedImageData) => void;
  imagePreviewUrl?: string | null;
  imageData: ReceivedImageData;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function EditImageFieldsModal({
  isOpen,
  onClose,
  onConfirm,
  imageData,
  imagePreviewUrl,
  isLoading = false,
  errorMessage = null,
}: IEditImageFieldsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // Extrair os dados da imagem do prop imageData
  const { copyright = '', tissue = '', piece_state = '', pick_date = '', title = '', description = '', tags = [] } = imageData;
  
  // Processa tags para obter apenas os nomes em um array
  const tagNames = React.useMemo(() => {
    if (!tags) return [];
    // Verifica se as tags são objetos ou strings
    return Array.isArray(tags) 
      ? tags.map(tag => typeof tag === 'string' ? tag : tag.name) 
      : [];
  }, [tags]);

  // Estados para os campos modificáveis
  const [updatedCopyright, setUpdatedCopyright] = useState(copyright);
  const [updatedTissue, setUpdatedTissue] = useState(tissue);
  const [updatedPieceState, setUpdatedPieceState] = useState(piece_state);
  const [updatedPickDate, setUpdatedPickDate] = useState(pick_date);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedTags, setUpdatedTags] = useState<string[]>(tagNames);

  // Função para formatar data no formato YYYY-MM-DD para input type="date"
  const formatDateForInput = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0]; // Retorna no formato YYYY-MM-DD
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return '';
    }
  };

  // Atualiza os estados quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setUpdatedCopyright(copyright);
      setUpdatedTissue(tissue);
      setUpdatedPieceState(piece_state);
      setUpdatedPickDate(formatDateForInput(pick_date));
      setUpdatedTitle(title);
      setUpdatedDescription(description);
      
      // Garante que as tags estejam corretamente formatadas
      setUpdatedTags(tagNames);
    }
  }, [isOpen, copyright, tissue, piece_state, pick_date, title, description, tagNames]);

  // Handlers para os inputs
  const handleCopyrightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedCopyright(e.target.value);
  };

  const handleTissueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedTissue(e.target.value);
  };

  const handlePieceStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedPieceState(e.target.value);
  };

  const handlePickDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedPickDate(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedDescription(e.target.value);
  };

  const handleImageTagsChange = (newTags: string[]) => {
    setUpdatedTags(newTags);
  };

  const handleConfirm = () => {
    // Passa os dados editados para o onConfirm
    const updatedData: UpdatedImageData = {
      copyright: updatedCopyright,
      tissue: updatedTissue,
      piece_state: updatedPieceState,
      pick_date: updatedPickDate,
      title: updatedTitle,
      description: updatedDescription,
      tags: updatedTags,
    };
    
    // Chama a função de confirmação com os dados atualizados
    onConfirm(updatedData);
    
    // Fecha o modal imediatamente após enviar os dados
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Fecha o modal se clicar fora
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 p-1 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-[812px] overflow-y-auto rounded-lg bg-[#474747] px-[32px] pb-[52px] pt-[38px]"
      >
        <div className="flex flex-col flex-wrap items-center justify-between gap-1">
          <h2 className="font-semibold text-lg text-gray-900-tk">
            Editar dados da imagem
          </h2>

          {imagePreviewUrl && (
            <div className="flex w-full justify-center">
              <Image
                src={imagePreviewUrl}
                alt="Preview"
                width={400}
                height={200}
                className="max-h-[200px] max-w-full rounded-md object-contain"
              />
            </div>
          )}

          <div className="w-full">
            <div className="flex w-full flex-wrap justify-between gap-1">
              <CustomDataField.Root className="md:w-[300px]">
                <CustomDataField.Title className="text-gray-900-tk">
                  Direitos de imagem:{" "}
                </CustomDataField.Title>
                <CustomDataField.Content className="text-md">
                  <CustomDataField.Text
                    className="sm:w-[260px] md:w-[300px]"
                    defaultValue={updatedCopyright}
                    onChange={handleCopyrightChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>

              <CustomDataField.Root className="md:w-[300px]">
                <CustomDataField.Title className="text-gray-900-tk">
                  Tecido/Orgão:{" "}
                </CustomDataField.Title>
                <CustomDataField.Content className="text-md">
                  <CustomDataField.Text
                    className="sm:w-[260px] md:w-[300px]"
                    defaultValue={updatedTissue}
                    onChange={handleTissueChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>

              <CustomDataField.Root className="md:w-[300px]">
                <CustomDataField.Title className="text-gray-900-tk">
                  Estado da Peça:{" "}
                </CustomDataField.Title>
                <CustomDataField.Content className="text-md">
                  <CustomDataField.Text
                    className="sm:w-[260px] md:w-[300px]"
                    defaultValue={updatedPieceState}
                    onChange={handlePieceStateChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>

              <CustomDataField.Root className="md:w-[300px]">
                <CustomDataField.Title className="text-gray-900-tk">
                  Data de cadastro:
                </CustomDataField.Title>
                <CustomDataField.Content className="text-md">
                  <CustomDataField.Date
                    className="sm:w-[260px] md:w-[300px]"
                    defaultValue={updatedPickDate}
                    onChange={handlePickDateChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>

              <CustomDataField.Root className="md:w-[300px]">
                <CustomDataField.Title className="text-gray-900-tk">
                  Título da imagem:
                </CustomDataField.Title>
                <CustomDataField.Content className="text-md">
                  <CustomDataField.Text
                    className="sm:w-[260px] md:w-[300px]"
                    defaultValue={updatedTitle}
                    onChange={handleTitleChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>

              <CustomDataField.Root className="md:w-[300px]">
                <CustomDataField.Title className="text-gray-900-tk">
                  Descrição da imagem:
                </CustomDataField.Title>
                <CustomDataField.Content className="text-md">
                  <CustomDataField.Text
                    className="sm:w-[260px] md:w-[300px]"
                    defaultValue={updatedDescription}
                    onChange={handleDescriptionChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>

              <CustomDataField.Root className="w-full">
                <CustomDataField.Title className="text-gray-900-tk">
                  Tags:
                </CustomDataField.Title>
                <CustomDataField.Content className="text-md">
                  <CustomDataField.Tag
                    className="w-full"
                    initialTags={tagNames}
                    onTagsChange={handleImageTagsChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-1 text-md md:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
            <button onClick={onClose} className="bg-fail">
              Cancelar
            </button>
            <button 
              onClick={handleConfirm} 
              className="bg-sucess"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

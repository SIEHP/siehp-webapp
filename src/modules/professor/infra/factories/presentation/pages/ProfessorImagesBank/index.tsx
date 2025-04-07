"use client";

import { useEffect, useState } from "react";
import { ProfessorPagesHeader } from "@/shared/infra/presentation/components/ProfessorPagesHeader";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";
import { ImageBankItem } from "@/shared/infra/presentation/components/ImageBankIten";
import {
  EditImageFieldsModal,
  ReceivedImageData,
  UpdatedImageData,
} from "@/shared/infra/presentation/components/EditImageFieldsModal";
import { ViewImageModal } from "@/shared/infra/presentation/components/ViewImageModal";
import useImage from "@/modules/image/infra/services/hooks/useImage";
import { useAuth } from "@/modules/user/infra/services/hooks/useAuth";

const ProfessorImagesBankPage = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ReceivedImageData>({});
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { listImage, updateImage } = useImage();
  const { auth } = useAuth();
  const [images, setImages] = useState<any[]>([]);
  const [currentImageId, setCurrentImageId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const handleOpenViewModal = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmEdit = () => {
    setIsModalOpen(false);
    // Aqui poderia ter um feedback visual de sucesso
  };

  // Função para obter o email do usuário (temporária)
  const getUserEmail = (): string => {
    if (!auth || !auth.user || !auth.user.name) {
      return "user@example.com"; // Email padrão para testes
    }
    return `${auth.user.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
  };

  // Função para atualizar os dados da imagem quando editados no modal
  const handleUpdateImageData = async (updatedData: UpdatedImageData) => {
    if (!currentImageId) {
      console.error("ID da imagem não encontrado");
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateError(null);
      
      // Prepara os dados para a API no formato esperado pelo backend
      const updateImageData: any = {
        id: currentImageId,
        // Sempre incluir a URL existente
        url: currentImageUrl,
        // Sempre incluir o título (atual ou existente)
        title: (updatedData.title && updatedData.title.trim() !== "") 
          ? updatedData.title.trim() 
          : (selectedImage.title || ""),
        // Sempre incluir o email do usuário
        user_email: getUserEmail()
      };
      
      // Adiciona apenas outros campos que não estão vazios
      if (updatedData.piece_state && updatedData.piece_state.trim() !== "") {
        updateImageData.piece_state = updatedData.piece_state.trim();
      }
      
      if (updatedData.pick_date && updatedData.pick_date.trim() !== "") {
        try {
          // Assegurar que a data está no formato ISO completo para o backend
          const dateObj = new Date(updatedData.pick_date);
          
          // Verificar se a data é válida
          if (!isNaN(dateObj.getTime())) {
            // Usar formato ISO string que o backend espera
            updateImageData.pick_date = dateObj.toISOString();
            console.log("Data formatada para envio:", updateImageData.pick_date);
          } else {
            console.warn("Data inválida, não incluindo no payload:", updatedData.pick_date);
          }
        } catch (error) {
          console.error("Erro ao processar data:", error);
        }
      } else {
        // Enviar null explicitamente para remover a data se o campo estiver vazio
        updateImageData.pick_date = null;
      }
      
      if (updatedData.tissue && updatedData.tissue.trim() !== "") {
        updateImageData.tissue = updatedData.tissue.trim();
      }
      
      if (updatedData.copyright && updatedData.copyright.trim() !== "") {
        updateImageData.copyright = updatedData.copyright.trim();
      }
      
      if (updatedData.description && updatedData.description.trim() !== "") {
        updateImageData.description = updatedData.description.trim();
      }
      
      // SEMPRE enviar as tags, independentemente de terem sido alteradas ou não
      // Usar as tags do formulário se existirem, senão, usar as tags originais da imagem
      const tagsToSend = updatedData.tags || [];
      
      // Remover duplicatas para evitar o erro de unicidade
      const uniqueTags = Array.from(new Set(tagsToSend));
      
      // Garantir que tags seja enviado mesmo que vazio
      updateImageData.tags = uniqueTags;
      
      console.log("Dados sendo enviados para atualização:", updateImageData);
      
      // Chama a API para atualizar a imagem
      const result = await updateImage.handleUpdateImage(updateImageData);
      
      // Atualiza a lista de imagens com a imagem atualizada
      setImages(prevImages => 
        prevImages.map(img => 
          img.id === currentImageId ? result : img
        )
      );

      // Converter o updatedData para o formato esperado por ReceivedImageData
      const convertedData: ReceivedImageData = {
        ...updatedData,
        // Converte as tags de string[] para { id, name, status }[]
        tags: result.tags || []
      };
      
      setSelectedImage(convertedData);
      handleCloseModal();
      
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
      setUpdateError(typeof error === 'string' ? error : 'Erro ao atualizar imagem');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await listImage.handleListImage();
        console.log("Imagens carregadas:", images);
        // Log detalhado da primeira imagem se existir
        if (images && images.length > 0) {
          console.log("Exemplo da primeira imagem:", JSON.stringify(images[0]));
          console.log("Tags da primeira imagem:", images[0].tags);
        }
        setImages(images);
      } catch (error) {
        console.error("Erro ao carregar imagens:", error);
      }
    };
    
    fetchImages();
  }, []);

  /**
   * Função para formatar a data corretamente, independente do formato recebido
   */
  const formatDate = (dateValue: string | Date | null | undefined): string => {
    if (!dateValue) return '';
    
    try {
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      
      // Para exibição na interface (formato local)
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('pt-BR');
      }
      
      return typeof dateValue === 'string' ? dateValue : '';
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return typeof dateValue === 'string' ? dateValue : '';
    }
  };
  
  /**
   * Função para formatar a data no formato YYYY-MM-DD para input type="date"
   */
  const formatDateForInput = (dateValue: string | Date | null | undefined): string => {
    if (!dateValue) return '';
    
    try {
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      
      // Para uso em inputs do tipo date (formato ISO)
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0]; // Retorna no formato YYYY-MM-DD
      }
      
      return '';
    } catch (error) {
      console.error("Erro ao formatar data para input:", error);
      return '';
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-1 overflow-y-auto p-4">
      <ProfessorPagesHeader.Root>
        <ProfessorPagesHeader.Title>Filtros:</ProfessorPagesHeader.Title>
        <ProfessorPagesHeader.Body className="w-full justify-start xl:justify-end">
          <ProfessorPagesHeader.Filter />
        </ProfessorPagesHeader.Body>
      </ProfessorPagesHeader.Root>
      <div className="flex w-full flex-wrap justify-between gap-1">
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Direitos de imagem: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Tecido/Orgão: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Estado da Peça: </CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Text className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Data de cadastro:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Date className="sm:w-[260px] md:w-[300px]" />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Tags:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Tag className="w-full" />
          </CustomDataField.Content>
        </CustomDataField.Root>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-1 sm:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
        <button className="bg-fail">Limpar filtros</button>
        <button className="bg-sucess">Filtrar imagens</button>
      </div>
      
      <hr className="w-full rounded-full border-[1px] border-[#7C7C7C]" />

      <div className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.length > 0 ? (
          images.map((image) => (
            <ImageBankItem
              key={image.id}
              imageUrl={image.url}
              title={image.title}
              onEdit={() => {
                const imageDataToSend = {
                  copyright: image.copyright,
                  tissue: image.tissue,
                  piece_state: image.piece_state,
                  pick_date: image.pick_date ? formatDateForInput(image.pick_date) : formatDateForInput(image.created_at),
                  title: image.title,
                  description: image.description,
                  tags: image.tags || [],
                };
                setSelectedImage(imageDataToSend);
                setCurrentImageUrl(image.url);
                setCurrentImageId(image.id);
                handleOpenEditModal();
              }}
              onView={() => {
                const imageDataToSend = {
                  copyright: image.copyright,
                  tissue: image.tissue,
                  piece_state: image.piece_state,
                  pick_date: image.pick_date ? formatDateForInput(image.pick_date) : formatDateForInput(image.created_at),
                  title: image.title,
                  description: image.description,
                  tags: image.tags || [],
                };
                setSelectedImage(imageDataToSend);
                setCurrentImageUrl(image.url);
                handleOpenViewModal();
              }}
              onMore={() => {
                console.log("Mais opções para imagem:", image.id);
              }}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Nenhuma imagem encontrada</p>
        )}
      </div>

      <EditImageFieldsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleUpdateImageData}
        imagePreviewUrl={currentImageUrl}
        imageData={selectedImage}
        isLoading={isUpdating}
        errorMessage={updateError}
      />

      <ViewImageModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        imageUrl={currentImageUrl}
      />
    </div>
  );
};

export default ProfessorImagesBankPage;
"use client";

import { useEffect, useState, useCallback } from "react";
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
  const { listImage, updateImage, deleteImage } = useImage();
  const { auth } = useAuth();
  const [images, setImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [currentImageId, setCurrentImageId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  
  // Estados para filtros
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterCopyright, setFilterCopyright] = useState("");
  const [filterTissue, setFilterTissue] = useState("");
  const [filterPieceState, setFilterPieceState] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");

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
      
      // Também atualiza a lista filtrada se necessário
      setFilteredImages(prevFiltered => 
        prevFiltered.map(img => 
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

  const fetchImages = useCallback(async () => {
    try {
      const response = await listImage.handleListImage();
      setImages(response);
      setFilteredImages(response); // Inicialmente, todas as imagens são mostradas
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }, [listImage]);

  // Fetch images on component mount and when auth changes
  useEffect(() => {
    if (auth?.token) {
      fetchImages();
    }
  }, [auth, fetchImages, listImage]);

  const handleImageDeleted = async (imageId: number) => {
    // Refresh the image list after deletion
    await fetchImages();
    // Show success message or notification here if needed
  };

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

  // Handlers para campos de filtro
  const handleCopyrightChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterCopyright(e.currentTarget.value);
  };
  
  const handleTissueChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterTissue(e.currentTarget.value);
  };
  
  const handlePieceStateChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterPieceState(e.currentTarget.value);
  };
  
  const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFilterDate(e.currentTarget.value);
  };

  // Handler for filter tags
  const handleFilterTagsChange = (newTags: string[]) => {
    setFilterTags(newTags);
  };
  
  // Handler para a pesquisa global
  const handleGlobalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setGlobalSearchTerm(searchTerm);
    
    if (searchTerm.trim() === "") {
      // Se a pesquisa estiver vazia, mostre todas as imagens ou aplique os outros filtros
      applyFilters();
      return;
    }
    
    // Aplica a pesquisa global
    applyGlobalSearch(searchTerm);
  };
  
  // Função para aplicar a pesquisa global em todos os campos das imagens
  const applyGlobalSearch = (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === "") {
      setFilteredImages(images);
      return;
    }
    
    const term = searchTerm.toLowerCase().trim();
    
    const filtered = images.filter(img => {
      // Verifica todos os campos relevantes da imagem
      const titleMatch = img.title && img.title.toLowerCase().includes(term);
      const copyrightMatch = img.copyright && img.copyright.toLowerCase().includes(term);
      const tissueMatch = img.tissue && img.tissue.toLowerCase().includes(term);
      const pieceStateMatch = img.piece_state && img.piece_state.toLowerCase().includes(term);
      const descriptionMatch = img.description && img.description.toLowerCase().includes(term);
      
      // Verifica as tags
      let tagsMatch = false;
      if (img.tags && Array.isArray(img.tags)) {
        tagsMatch = img.tags.some((tag: any) => {
          const tagName = typeof tag === 'string' ? tag : tag.name;
          return tagName.toLowerCase().includes(term);
        });
      }
      
      // Se qualquer um dos campos contiver o termo de pesquisa, inclua a imagem
      return titleMatch || copyrightMatch || tissueMatch || pieceStateMatch || descriptionMatch || tagsMatch;
    });
    
    setFilteredImages(filtered);
  };
  
  // Função para aplicar filtros nas imagens
  const applyFilters = () => {
    // Começa com todas as imagens
    let filtered = [...images];
    
    // Se houver um termo de pesquisa global, aplique-o primeiro
    if (globalSearchTerm.trim() !== "") {
      const term = globalSearchTerm.toLowerCase().trim();
      
      filtered = filtered.filter(img => {
        // Verifica todos os campos relevantes da imagem
        const titleMatch = img.title && img.title.toLowerCase().includes(term);
        const copyrightMatch = img.copyright && img.copyright.toLowerCase().includes(term);
        const tissueMatch = img.tissue && img.tissue.toLowerCase().includes(term);
        const pieceStateMatch = img.piece_state && img.piece_state.toLowerCase().includes(term);
        const descriptionMatch = img.description && img.description.toLowerCase().includes(term);
        
        // Verifica as tags
        let tagsMatch = false;
        if (img.tags && Array.isArray(img.tags)) {
          tagsMatch = img.tags.some((tag: any) => {
            const tagName = typeof tag === 'string' ? tag : tag.name;
            return tagName.toLowerCase().includes(term);
          });
        }
        
        // Se qualquer um dos campos contiver o termo de pesquisa, inclua a imagem
        return titleMatch || copyrightMatch || tissueMatch || pieceStateMatch || descriptionMatch || tagsMatch;
      });
    }
    
    // Filtrar por copyright (direitos de imagem)
    if (filterCopyright.trim() !== "") {
      filtered = filtered.filter(img => 
        img.copyright && 
        img.copyright.toLowerCase().includes(filterCopyright.toLowerCase())
      );
    }
    
    // Filtrar por tecido/órgão
    if (filterTissue.trim() !== "") {
      filtered = filtered.filter(img => 
        img.tissue && 
        img.tissue.toLowerCase().includes(filterTissue.toLowerCase())
      );
    }
    
    // Filtrar por estado da peça
    if (filterPieceState.trim() !== "") {
      filtered = filtered.filter(img => 
        img.piece_state && 
        img.piece_state.toLowerCase().includes(filterPieceState.toLowerCase())
      );
    }
    
    // Filtrar por data de cadastro
    if (filterDate !== "") {
      const filterDateObj = new Date(filterDate);
      filtered = filtered.filter(img => {
        // Primeiro tenta pick_date, depois created_at
        const dateToCompare = img.pick_date || img.created_at;
        if (!dateToCompare) return false;
        
        try {
          const imgDate = new Date(dateToCompare);
          return imgDate.toISOString().split('T')[0] === filterDateObj.toISOString().split('T')[0];
        } catch (e) {
          return false;
        }
      });
    }
    
    // Filtrar por tags (interseção - a imagem deve conter TODAS as tags)
    if (filterTags.length > 0) {
      filtered = filtered.filter(img => {
        if (!img.tags || !Array.isArray(img.tags)) return false;
        
        return filterTags.every(filterTag => {
          return img.tags.some((imgTag: any) => {
            // Compatibilidade com diferentes formatos de tags
            const tagName = typeof imgTag === 'string' ? imgTag : imgTag.name;
            return tagName.toLowerCase() === filterTag.toLowerCase();
          });
        });
      });
    }
    
    // Atualizar o estado com as imagens filtradas
    setFilteredImages(filtered);
  };
  
  // Função para limpar todos os filtros
  const clearFilters = () => {
    // Limpar os estados de filtro
    setFilterCopyright("");
    setFilterTissue("");
    setFilterPieceState("");
    setFilterDate("");
    setFilterTags([]);
    setGlobalSearchTerm("");
    
    // Restaurar as imagens originais
    setFilteredImages(images);
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-1 overflow-y-auto p-4">
      <ProfessorPagesHeader.Root>
        <ProfessorPagesHeader.Title>Filtros:</ProfessorPagesHeader.Title>
        <ProfessorPagesHeader.Body className="w-full justify-start xl:justify-end">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar"
              className="h-2.5 w-[250px] appearance-none rounded-[4rem] border-none bg-gray-300-tk py-[10px] pl-1 pr-[45px] text-md font-regular text-gray-900-tk placeholder-gray-900-tk"
              value={globalSearchTerm}
              onChange={handleGlobalSearch}
            />
            <button 
              className="absolute right-[15px] top-[7px]"
              onClick={() => applyGlobalSearch(globalSearchTerm)}
            >
              <svg width="24" height="24" viewBox="0 0 30 24" className="[&>path]:fill-gray-300-tk">
                <path d="M19.5 10.5C19.5 13.3281 18.3844 15.9139 16.5398 17.7398C14.6951 19.5656 12.1424 20.7152 9.32695 20.7656C6.51154 20.8161 3.90797 19.7672 1.9793 17.9883C0.0506253 16.2094 -0.497185 13.6545 0.42586 11.2992C1.3489 8.94375 3.24328 7.06445 5.69633 6.18282C8.14937 5.30117 10.8754 5.51016 13.1602 6.75C15.445 7.98984 17.0537 10.1556 17.5602 12.7031" stroke="#7C7C7C" strokeWidth="2" strokeMiterlimit="10" />
                <path d="M12.878 3.9375C13.3656 3.64922 13.9141 3.5 14.4762 3.5C15.0384 3.5 15.5869 3.64922 16.0744 3.9375C16.562 4.22578 16.9718 4.64375 17.2631 5.14726C17.5543 5.65078 17.7166 6.22266 17.7342 6.80859C17.7517 7.39453 17.6239 7.97656 17.3633 8.4974" stroke="#7C7C7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.625 17L23.75 24" stroke="#7C7C7C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </ProfessorPagesHeader.Body>
      </ProfessorPagesHeader.Root>
      <div className="flex w-full flex-wrap justify-between gap-1">
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Direitos de imagem: </CustomDataField.Title>
          <CustomDataField.Content>
            <input
              type="text"
              className="min-h-[50px] w-full rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk sm:w-[260px] md:w-[300px]"
              placeholder="Digite aqui..."
              value={filterCopyright}
              onChange={handleCopyrightChange}
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Tecido/Orgão: </CustomDataField.Title>
          <CustomDataField.Content>
            <input
              type="text"
              className="min-h-[50px] w-full rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk sm:w-[260px] md:w-[300px]"
              placeholder="Digite aqui..."
              value={filterTissue}
              onChange={handleTissueChange}
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Estado da Peça: </CustomDataField.Title>
          <CustomDataField.Content>
            <input
              type="text"
              className="min-h-[50px] w-full rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk sm:w-[260px] md:w-[300px]"
              placeholder="Digite aqui..."
              value={filterPieceState}
              onChange={handlePieceStateChange}
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="md:w-[300px]">
          <CustomDataField.Title>Data de cadastro:</CustomDataField.Title>
          <CustomDataField.Content>
            <input
              type="date"
              className="min-h-[50px] w-full rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk sm:w-[260px] md:w-[300px]"
              value={filterDate}
              onChange={handleDateChange}
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
        <CustomDataField.Root className="w-full">
          <CustomDataField.Title>Tags:</CustomDataField.Title>
          <CustomDataField.Content>
            <CustomDataField.Tag 
              className="w-full" 
              initialTags={filterTags}
              onTagsChange={handleFilterTagsChange}
            />
          </CustomDataField.Content>
        </CustomDataField.Root>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-1 sm:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
        <button 
          className="bg-fail"
          onClick={clearFilters}
        >
          Limpar filtros
        </button>
        <button 
          className="bg-sucess"
          onClick={applyFilters}
        >
          Filtrar imagens
        </button>
      </div>
      
      <hr className="w-full rounded-full border-[1px] border-[#7C7C7C]" />

      <div className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <ImageBankItem
              key={image.id}
              imageUrl={image.url}
              imageId={image.id}
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
              onDelete={handleImageDeleted}
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
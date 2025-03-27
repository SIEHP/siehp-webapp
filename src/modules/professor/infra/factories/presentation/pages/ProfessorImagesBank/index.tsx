"use client";

import { useEffect, useState } from "react";
import { ProfessorPagesHeader } from "@/shared/infra/presentation/components/ProfessorPagesHeader";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";
import { ImageBankItem } from "@/shared/infra/presentation/components/ImageBankIten";
import {
  EditImageFieldsModal,
  ImageData,
} from "@/shared/infra/presentation/components/EditImageFieldsModal";
import gettyimages1333715238612x612 from "@/shared/infra/presentation/components/ImageBankIten/gettyimages-1333715238-612x612.jpg";
import { ViewImageModal } from "@/shared/infra/presentation/components/ViewImageModal";
import useImage from "@/modules/image/infra/services/hooks/useImage";

const ProfessorImagesBankPage = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData>({
    // Dados da imagem que serão editados
    direitosImagem: "Licença CC",
    tecidoOrgao: "Epitélio",
    estadoPeca: "Conservada",
    dataCadastro: "01/01/2023",
    tituloImagem: "Lâmina de Exemplo 1",
    descricaoImagem: "Lâmina de epitélio utilizada para estudo",
    tags: ["epitélio", "lâmina", "microscópio"],
  });
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { listImage } = useImage();
  const [images, setImages] = useState<any[]>([]);

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
    // Aqui seria implementada a lógica para salvar as alterações no backend
    console.log("Dados confirmados:", selectedImage);
    setIsModalOpen(false);
    // Aqui poderia ter um feedback visual de sucesso
  };

  // Função para atualizar os dados da imagem quando editados no modal
  const handleUpdateImageData = (updatedData: ImageData) => {
    setSelectedImage(updatedData);
    console.log("Imagem atualizada:", updatedData);
    handleConfirmEdit();
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await listImage.handleListImage();
        console.log("Imagens carregadas:", images);
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
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return typeof dateValue === 'string' ? dateValue : '';
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
      <hr className="w-full rounded-full border-[2px] border-[#7C7C7C]" />

      <div className="w-full border-[2px] border-[#7C7C7C]" />

      <div className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.length > 0 ? (
          images.map((image) => (
            <ImageBankItem
              key={image.id}
              imageUrl={image.url}
              title={image.title}
              onEdit={() => {
                setSelectedImage({
                  direitosImagem: "Licença CC",
                  tecidoOrgao: "Epitélio",
                  estadoPeca: "Conservada",
                  dataCadastro: formatDate(image.created_at),
                  tituloImagem: image.title,
                  descricaoImagem: "Descrição da imagem",
                  tags: image.tags ? image.tags.map((tag: { name: string }) => tag.name) : [],
                });
                setCurrentImageUrl(image.url);
                handleOpenEditModal();
              }}
              onView={() => {
                setSelectedImage({
                  direitosImagem: "Licença CC",
                  tecidoOrgao: "Epitélio",
                  estadoPeca: "Conservada",
                  dataCadastro: formatDate(image.created_at),
                  tituloImagem: image.title,
                  descricaoImagem: "Descrição da imagem",
                  tags: image.tags ? image.tags.map((tag: { name: string }) => tag.name) : [],
                });
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
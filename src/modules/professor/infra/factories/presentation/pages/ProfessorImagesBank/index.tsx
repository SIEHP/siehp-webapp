"use client";

import { useState } from "react";
import { AdminPagesHeader } from "@/shared/infra/presentation/components/AdminPagesHeader";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";
import { ImageBankItem } from "@/shared/infra/presentation/components/ImageBankIten";
import {
  EditImageFieldsModal,
  ImageData,
} from "@/shared/infra/presentation/components/EditImageFieldsModal";
import gettyimages1333715238612x612 from "@/shared/infra/presentation/components/ImageBankIten/gettyimages-1333715238-612x612.jpg";
import { ViewImageModal } from "@/shared/infra/presentation/components/ViewImageModal";

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

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

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

  return (
    <div className="flex h-full w-full flex-col items-center gap-1 overflow-y-auto p-4">
      <AdminPagesHeader.Root className="w-full">
        <AdminPagesHeader.Title>Filtros:</AdminPagesHeader.Title>
        <AdminPagesHeader.Body>
          <AdminPagesHeader.Filter />
        </AdminPagesHeader.Body>
      </AdminPagesHeader.Root>
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

      <div>
        <ImageBankItem
          imageUrl={gettyimages1333715238612x612.src}
          title={selectedImage.tituloImagem || ""}
          onEdit={handleOpenEditModal}
          onView={handleOpenViewModal}
          onMore={() => {}}
        />
      </div>

      <EditImageFieldsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleUpdateImageData}
        imagePreviewUrl={gettyimages1333715238612x612.src}
        imageData={selectedImage}
      />

      <ViewImageModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        imageUrl={gettyimages1333715238612x612.src}
      />
    </div>
  );
};

export default ProfessorImagesBankPage;

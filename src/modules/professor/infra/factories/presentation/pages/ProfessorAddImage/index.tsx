"use client";

import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";
import { useState } from "react";
import { ImageCreateValidationModal } from "@/shared/infra/presentation/components/ImageCreateValidationModal";
import { ImageFileSelector } from "@/shared/infra/presentation/components/ImageFileSelector";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfessorAddImageFormData,
  professorAddImageSchema,
} from "./validation";
import { handleImageSelect as imageSelectHandler } from "@/shared/infra/utils/functions/image-picker";
import useImage from "@/modules/image/infra/services/hooks/useImage";

const ProfessorAddImagePage = () => {
  const [openValidationModal, setOpenValidationModal] =
    useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { createImage } = useImage();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfessorAddImageFormData>({
    resolver: zodResolver(professorAddImageSchema),
    defaultValues: {
      direitosImagem: "",
      tecidoOrgao: "",
      estadoPeca: "",
      dataCadastro: "",
      tituloImagem: "",
      descricaoImagem: "",
      tags: [],
      imageFile: null,
    },
  });

  const handleOpenValidationModal = () => {
    setOpenValidationModal(true);
  };

  const handleCloseValidationModal = () => {
    setOpenValidationModal(false);
  };

  const handleConfirmValidation = async () => {
    setOpenValidationModal(false);
    
    if (formData.imageFile) {
      try {
        // Criar um FormData para enviar o arquivo
        const fileData = new FormData();
        fileData.append('file', formData.imageFile);
        
        // Gerar um nome de arquivo único baseado no timestamp e título
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}-${formData.tituloImagem.replace(/\s+/g, '-').toLowerCase()}`;
        const fileExtension = formData.imageFile.name.split('.').pop();
        const fullFileName = `${fileName}.${fileExtension}`;
        
        // Enviar a imagem para o servidor
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: fileData,
          headers: {
            'x-file-name': fullFileName,
          },
        });
        
        if (!response.ok) {
          throw new Error('Falha ao enviar a imagem');
        }
        
        // Obter a URL da imagem retornada pela API
        const data = await response.json();
        const imageUrl = data.url;
        
        // Processar a data para garantir que seja uma string ISO
        let formattedDate = "";
        if (formData.dataCadastro) {
          try {
            const dateObj = new Date(formData.dataCadastro);
            if (!isNaN(dateObj.getTime())) {
              formattedDate = dateObj.toISOString();
            }
          } catch (error) {
            console.error("Erro ao converter data:", error);
            formattedDate = formData.dataCadastro; // Manter como string se falhar
          }
        }
        
        console.log("Enviando dados para criar imagem:", {
          title: formData.tituloImagem,
          url: imageUrl,
          piece_state: formData.estadoPeca,
          pick_date: formattedDate,
          tissue: formData.tecidoOrgao,
          copyright: formData.direitosImagem,
          description: formData.descricaoImagem,
          tags: formData.tags
        });
        
        // Agora usamos a URL gerada no createImage com data formatada
        createImage.handleCreateImage({ 
          title: formData.tituloImagem, 
          url: imageUrl, 
          piece_state: formData.estadoPeca,
          pick_date: formattedDate, // Enviamos a string ISO ao invés do objeto Date
          tissue: formData.tecidoOrgao,
          copyright: formData.direitosImagem,
          description: formData.descricaoImagem,
          tags: formData.tags
        });
        
      } catch (error) {
        console.error('Erro ao salvar a imagem:', error);
        // Aqui você pode adicionar algum feedback visual para o usuário
      }
    }
  };

  const handleImageSelect = (file: File | null) => {
    imageSelectHandler(file, setValue, setImagePreviewUrl, "imageFile");
  };

  const handleLimparDados = () => {
    // Limpar os campos do formulário
    reset({
      direitosImagem: "",
      tecidoOrgao: "",
      estadoPeca: "",
      dataCadastro: "",
      tituloImagem: "",
      descricaoImagem: "",
      tags: [],
      imageFile: null,
    });

    // Limpar a imagem
    setImagePreviewUrl(null);
  };

  const onSubmit = (data: ProfessorAddImageFormData) => {
    // Abre o modal de validação para confirmar os dados
    handleOpenValidationModal();
  };

  // Observar os valores do formulário para o modal de confirmação
  const formData = watch();

  return (
    <>
      <ImageCreateValidationModal
        isOpen={openValidationModal}
        onClose={handleCloseValidationModal}
        onConfirm={handleConfirmValidation}
        imagePreviewUrl={imagePreviewUrl}
        imageData={{
          direitosImagem: formData.direitosImagem,
          tecidoOrgao: formData.tecidoOrgao,
          estadoPeca: formData.estadoPeca,
          dataCadastro: formData.dataCadastro,
          tituloImagem: formData.tituloImagem,
          descricaoImagem: formData.descricaoImagem,
          tags: formData.tags,
        }}
      />
      <div className="flex h-full w-full flex-col items-center gap-1 p-4 text-lg">
        <div className="h-[250px] w-full rounded-lg">
          <ImageFileSelector
            onFileSelect={handleImageSelect}
            initialPreviewUrl={imagePreviewUrl}
            className="h-full"
          />
        </div>
        <h1 className="text-md font-semi-bold text-gray-100-tk md:text-lg">
          Insira os dados da imagem
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-1"
        >
          <div className="flex w-full flex-wrap justify-between gap-0.75">
            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Direitos de imagem:</CustomDataField.Title>
              <CustomDataField.Content>
                <Controller
                  name="direitosImagem"
                  control={control}
                  render={({ field }) => (
                    <CustomDataField.Text
                      className="sm:w-[260px] md:w-[300px]"
                      {...field}
                    />
                  )}
                />
              </CustomDataField.Content>
              {errors.direitosImagem && (
                <p className="text-sm text-fail">
                  {errors.direitosImagem.message}
                </p>
              )}
            </CustomDataField.Root>

            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Tecido/Orgão: </CustomDataField.Title>
              <CustomDataField.Content>
                <Controller
                  name="tecidoOrgao"
                  control={control}
                  render={({ field }) => (
                    <CustomDataField.Text
                      className="sm:w-[260px] md:w-[300px]"
                      {...field}
                    />
                  )}
                />
              </CustomDataField.Content>
              {errors.tecidoOrgao && (
                <p className="text-sm text-fail">
                  {errors.tecidoOrgao.message}
                </p>
              )}
            </CustomDataField.Root>

            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Estado da Peça: </CustomDataField.Title>
              <CustomDataField.Content>
                <Controller
                  name="estadoPeca"
                  control={control}
                  render={({ field }) => (
                    <CustomDataField.Text
                      className="sm:w-[260px] md:w-[300px]"
                      {...field}
                    />
                  )}
                />
              </CustomDataField.Content>
              {errors.estadoPeca && (
                <p className="text-sm text-fail">{errors.estadoPeca.message}</p>
              )}
            </CustomDataField.Root>

            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Data de cadastro:</CustomDataField.Title>
              <CustomDataField.Content>
                <Controller
                  name="dataCadastro"
                  control={control}
                  render={({ field }) => (
                    <CustomDataField.Date
                      className="sm:w-[260px] md:w-[300px]"
                      {...field}
                    />
                  )}
                />
              </CustomDataField.Content>
              {errors.dataCadastro && (
                <p className="text-sm text-fail">
                  {errors.dataCadastro.message}
                </p>
              )}
            </CustomDataField.Root>

            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Título da imagem:</CustomDataField.Title>
              <CustomDataField.Content>
                <Controller
                  name="tituloImagem"
                  control={control}
                  render={({ field }) => (
                    <CustomDataField.Text
                      className="sm:w-[260px] md:w-[300px]"
                      {...field}
                    />
                  )}
                />
              </CustomDataField.Content>
              {errors.tituloImagem && (
                <p className="text-sm text-fail">
                  {errors.tituloImagem.message}
                </p>
              )}
            </CustomDataField.Root>

            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>
                Descrição da imagem:
              </CustomDataField.Title>
              <CustomDataField.Content>
                <Controller
                  name="descricaoImagem"
                  control={control}
                  render={({ field }) => (
                    <CustomDataField.Text
                      className="sm:w-[260px] md:w-[300px]"
                      {...field}
                    />
                  )}
                />
              </CustomDataField.Content>
              {errors.descricaoImagem && (
                <p className="text-sm text-fail">
                  {errors.descricaoImagem.message}
                </p>
              )}
            </CustomDataField.Root>

            <CustomDataField.Root className="w-full">
              <CustomDataField.Title>Tags:</CustomDataField.Title>
              <CustomDataField.Content>
                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <CustomDataField.Tag
                      className="w-full"
                      initialTags={field.value}
                      onTagsChange={(newTags) => field.onChange(newTags)}
                    />
                  )}
                />
              </CustomDataField.Content>
              {errors.tags && (
                <p className="text-sm text-fail">{errors.tags.message}</p>
              )}
            </CustomDataField.Root>
          </div>

          <div className="flex w-full flex-col items-center justify-between text-md md:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
            <button
              type="button"
              className="bg-fail"
              onClick={handleLimparDados}
            >
              Limpar dados
            </button>
            <button type="submit" className="bg-sucess">
              Concluir cadastro
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfessorAddImagePage;

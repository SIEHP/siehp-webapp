"use client";

import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";
import { useState, useEffect, ChangeEvent } from "react";
import { ImageCreateValidationModal } from "@/shared/infra/presentation/components/ImageCreateValidationModal";
import { ImageFileSelector } from "@/shared/infra/presentation/components/ImageFileSelector";
import { clearProfessorImageFields } from "@/shared/infra/utils/functions/clear-fields";

// Função para carregar dados do localStorage
const loadFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const cachedData = localStorage.getItem('professorAddImageData');
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return parsedData[key] || defaultValue;
    }
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:', error);
  }
  
  return defaultValue;
};

const ProfessorAddImagePage = ({}) => {
  const [openValidationModal, setOpenValidationModal] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  
  // Estados para armazenar os valores dos campos, inicializados com dados do localStorage
  const [direitosImagem, setDireitosImagem] = useState<string>(() => loadFromLocalStorage('direitosImagem', ''));
  const [tecidoOrgao, setTecidoOrgao] = useState<string>(() => loadFromLocalStorage('tecidoOrgao', ''));
  const [estadoPeca, setEstadoPeca] = useState<string>(() => loadFromLocalStorage('estadoPeca', ''));
  const [dataCadastro, setDataCadastro] = useState<string>(() => loadFromLocalStorage('dataCadastro', ''));
  const [tituloImagem, setTituloImagem] = useState<string>(() => loadFromLocalStorage('tituloImagem', ''));
  const [descricaoImagem, setDescricaoImagem] = useState<string>(() => loadFromLocalStorage('descricaoImagem', ''));
  const [tags, setTags] = useState<string[]>(() => loadFromLocalStorage('tags', []));

  // Carrega a imagem do localStorage
  useEffect(() => {
    const cachedImageBase64 = localStorage.getItem('professorAddImageBase64');
    if (cachedImageBase64) {
      setImagePreviewUrl(cachedImageBase64);
    }
    setDataLoaded(true);
  }, []);

  // Salva os dados no localStorage sempre que algum campo mudar
  useEffect(() => {
    if (dataLoaded) {
      const formData = {
        direitosImagem,
        tecidoOrgao,
        estadoPeca,
        dataCadastro,
        tituloImagem,
        descricaoImagem,
        tags
      };
      localStorage.setItem('professorAddImageData', JSON.stringify(formData));
    }
  }, [direitosImagem, tecidoOrgao, estadoPeca, dataCadastro, tituloImagem, descricaoImagem, tags, dataLoaded]);

  const handleOpenValidationModal = () => {
    setOpenValidationModal(true);
  };

  const handleCloseValidationModal = () => {
    setOpenValidationModal(false);
  };

  const handleConfirmValidation = () => {
    // Por enquanto não faz nada, conforme solicitado
    setOpenValidationModal(false);
  };

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    
    if (file) {
      // Converter a imagem para base64 e salvar no localStorage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        setImagePreviewUrl(base64data);
        localStorage.setItem('professorAddImageBase64', base64data);
      };
    } else {
      // Se o arquivo for null, limpa o preview
      setImagePreviewUrl(null);
      localStorage.removeItem('professorAddImageBase64');
    }
  };

  const handleLimparDados = () => {
    const initialValues = clearProfessorImageFields();
    
    // Definir os estados com os valores iniciais
    setDireitosImagem(initialValues.direitosImagem);
    setTecidoOrgao(initialValues.tecidoOrgao);
    setEstadoPeca(initialValues.estadoPeca);
    setDataCadastro(initialValues.dataCadastro);
    setTituloImagem(initialValues.tituloImagem);
    setDescricaoImagem(initialValues.descricaoImagem);
    setTags(initialValues.tags);
    setSelectedImage(initialValues.selectedImage);
    setImagePreviewUrl(initialValues.imagePreviewUrl);
    
    // Forçar atualização dos componentes controlados resetando os inputs
    const inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => {
      if (input.type !== 'file') {
        input.value = '';
      }
    });
    
    // Redefinir o estado carregado para forçar uma re-renderização
    setDataLoaded(false);
    setTimeout(() => setDataLoaded(true), 50);
  };

  // Manipuladores para os inputs de texto
  const handleDireitosImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDireitosImagem(e.target.value);
  };

  const handleTecidoOrgaoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTecidoOrgao(e.target.value);
  };

  const handleEstadoPecaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEstadoPeca(e.target.value);
  };

  const handleDataCadastroChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataCadastro(e.target.value);
  };

  const handleTituloImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTituloImagem(e.target.value);
  };

  const handleDescricaoImagemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescricaoImagem(e.target.value);
  };

  // Manipulador para as tags
  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  return (
    <>
      <ImageCreateValidationModal 
        isOpen={openValidationModal} 
        onClose={handleCloseValidationModal}
        onConfirm={handleConfirmValidation}
        imagePreviewUrl={imagePreviewUrl}
        imageData={{
          direitosImagem,
          tecidoOrgao,
          estadoPeca,
          dataCadastro,
          tituloImagem,
          descricaoImagem,
          tags
        }}
      />
      {dataLoaded ? (
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
          <div className="flex w-full flex-wrap justify-between gap-1">
            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Direitos de imagem: </CustomDataField.Title>
              <CustomDataField.Content>
                <CustomDataField.Text 
                  className="sm:w-[260px] md:w-[300px]"
                  defaultValue={direitosImagem}
                  onChange={handleDireitosImagemChange}
                />
              </CustomDataField.Content>
            </CustomDataField.Root>
            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Tecido/Orgão: </CustomDataField.Title>
              <CustomDataField.Content>
                <CustomDataField.Text 
                  className="sm:w-[260px] md:w-[300px]"
                  defaultValue={tecidoOrgao}
                  onChange={handleTecidoOrgaoChange}
                />
              </CustomDataField.Content>
            </CustomDataField.Root>
            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Estado da Peça: </CustomDataField.Title>
              <CustomDataField.Content>
                <CustomDataField.Text 
                  className="sm:w-[260px] md:w-[300px]"
                  defaultValue={estadoPeca}
                  onChange={handleEstadoPecaChange}
                />
              </CustomDataField.Content>
            </CustomDataField.Root>
            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Data de cadastro:</CustomDataField.Title>
              <CustomDataField.Content>
                <CustomDataField.Date 
                  className="sm:w-[260px] md:w-[300px]"
                  defaultValue={dataCadastro}
                  onChange={handleDataCadastroChange}
                />
              </CustomDataField.Content>
            </CustomDataField.Root>
            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Título da imagem:</CustomDataField.Title>
              <CustomDataField.Content>
                <CustomDataField.Text 
                  className="sm:w-[260px] md:w-[300px]"
                  defaultValue={tituloImagem}
                  onChange={handleTituloImagemChange}
                />
              </CustomDataField.Content>
            </CustomDataField.Root>
            <CustomDataField.Root className="md:w-[300px]">
              <CustomDataField.Title>Descrição da imagem:</CustomDataField.Title>
              <CustomDataField.Content>
                <CustomDataField.Text 
                  className="sm:w-[260px] md:w-[300px]"
                  defaultValue={descricaoImagem}
                  onChange={handleDescricaoImagemChange}
                />
              </CustomDataField.Content>
            </CustomDataField.Root>
            <CustomDataField.Root className="w-full">
              <CustomDataField.Title>Tags:</CustomDataField.Title>
              <CustomDataField.Content>
                <CustomDataField.Tag 
                  className="w-full"
                  initialTags={tags}
                  onTagsChange={handleTagsChange}
                />
              </CustomDataField.Content>
            </CustomDataField.Root>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-1 md:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk text-md">
            <button className="bg-fail" onClick={handleLimparDados}>Limpar dados</button>
            <button className="bg-sucess" onClick={handleOpenValidationModal}>Concluir cadastro</button>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-lg text-gray-100-tk">Carregando...</p>
        </div>
      )}
    </>
  );
};

export default ProfessorAddImagePage;

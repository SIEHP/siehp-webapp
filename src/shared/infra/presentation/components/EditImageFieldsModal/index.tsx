import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";

export interface ImageData {
  direitosImagem?: string;
  tecidoOrgao?: string;
  estadoPeca?: string;
  dataCadastro?: string;
  tituloImagem?: string;
  descricaoImagem?: string;
  tags?: string[];
}

interface IEditImageFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedData: ImageData) => void;
  imagePreviewUrl?: string | null;
  imageData: ImageData;
}

export function EditImageFieldsModal({
  isOpen,
  onClose,
  onConfirm,
  imageData,
  imagePreviewUrl,
}: IEditImageFieldsModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Estados para campos editáveis
  const [direitosImagem, setDireitosImagem] = useState(
    imageData.direitosImagem || "",
  );
  const [tecidoOrgao, setTecidoOrgao] = useState(imageData.tecidoOrgao || "");
  const [estadoPeca, setEstadoPeca] = useState(imageData.estadoPeca || "");
  const [dataCadastro, setDataCadastro] = useState(
    imageData.dataCadastro || "",
  );
  const [tituloImagem, setTituloImagem] = useState(
    imageData.tituloImagem || "",
  );
  const [descricaoImagem, setDescricaoImagem] = useState(
    imageData.descricaoImagem || "",
  );
  const [tags, setTags] = useState<string[]>(imageData.tags || []);

  // Atualiza os estados quando os props mudam
  useEffect(() => {
    if (isOpen) {
      setDireitosImagem(imageData.direitosImagem || "");
      setTecidoOrgao(imageData.tecidoOrgao || "");
      setEstadoPeca(imageData.estadoPeca || "");
      setDataCadastro(imageData.dataCadastro || "");
      setTituloImagem(imageData.tituloImagem || "");
      setDescricaoImagem(imageData.descricaoImagem || "");
      setTags(imageData.tags || []);
    }
  }, [isOpen, imageData]);

  // Handlers para os inputs
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

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleConfirm = () => {
    // Passa os dados editados para o onConfirm
    const updatedData: ImageData = {
      direitosImagem,
      tecidoOrgao,
      estadoPeca,
      dataCadastro,
      tituloImagem,
      descricaoImagem,
      tags,
    };
    console.log("Dados atualizados:", updatedData);
    onConfirm(updatedData);
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
                    defaultValue={direitosImagem}
                    onChange={handleDireitosImagemChange}
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
                    defaultValue={tecidoOrgao}
                    onChange={handleTecidoOrgaoChange}
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
                    defaultValue={estadoPeca}
                    onChange={handleEstadoPecaChange}
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
                    defaultValue={dataCadastro}
                    onChange={handleDataCadastroChange}
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
                    defaultValue={tituloImagem}
                    onChange={handleTituloImagemChange}
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
                    defaultValue={descricaoImagem}
                    onChange={handleDescricaoImagemChange}
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
                    initialTags={tags}
                    onTagsChange={handleTagsChange}
                  />
                </CustomDataField.Content>
              </CustomDataField.Root>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-1 text-md md:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
            <button onClick={onClose} className="bg-fail">
              Cancelar
            </button>
            <button onClick={handleConfirm} className="bg-sucess">
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

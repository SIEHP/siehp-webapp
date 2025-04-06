import React, { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { CustomDataField } from "@/shared/infra/presentation/components/CustomDataField";

export interface ReceivedImageData {
  copyright?: string;
  tissue?: string;
  piece_state?: string;
  pick_date?: string;
  title?: string;
  description?: string;
  image_tags?: {id: number, name: string, status: string}[];
}

export interface UpdatedImageData {
  copyright?: string;
  tissue?: string;
  piece_state?: string;
  pick_date?: string;
  title?: string;
  description?: string;
  image_tags?: string[];
}

interface IEditImageFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedData: UpdatedImageData) => void;
  imagePreviewUrl?: string | null;
  imageData: ReceivedImageData;
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
  const [copyright, setCopyright] = useState(
    imageData.copyright || "",
  );
  const [tissue, setTissue] = useState(imageData.tissue || "");
  const [piece_state, setPieceState] = useState(imageData.piece_state || "");
  const [pick_date, setPickDate] = useState(
    imageData.pick_date || "",
  );
  const [title, setTitle] = useState(imageData.title || "");
  const [description, setDescription] = useState(imageData.description || "");
  const [image_tags, setImageTags] = useState<string[]>(imageData.image_tags?.map(tag => tag.name) || []);

  // Atualiza os estados quando os props mudam
  useEffect(() => {
    if (isOpen) {
      setCopyright(imageData.copyright || "");
      setTissue(imageData.tissue || "");
      setPieceState(imageData.piece_state || "");
      setPickDate(imageData.pick_date || "");
      setTitle(imageData.title || "");
      setDescription(imageData.description || "");
      setImageTags(imageData.image_tags?.map(tag => tag.name) || []);
    }
  }, [isOpen, imageData]);

  // Handlers para os inputs
  const handleCopyrightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCopyright(e.target.value);
  };

  const handleTissueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTissue(e.target.value);
  };

  const handlePieceStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPieceState(e.target.value);
  };

  const handlePickDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPickDate(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleImageTagsChange = (newTags: string[]) => {
    setImageTags(newTags);
  };

  const handleConfirm = () => {
    // Passa os dados editados para o onConfirm
    const updatedData: UpdatedImageData = {
      copyright,
      tissue,
      piece_state,
      pick_date,
      title,
      description,
      image_tags,
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
                    defaultValue={copyright}
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
                    defaultValue={tissue}
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
                    defaultValue={piece_state}
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
                    defaultValue={pick_date}
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
                    defaultValue={title}
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
                    defaultValue={description}
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
                    initialTags={image_tags}
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
            <button onClick={handleConfirm} className="bg-sucess">
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

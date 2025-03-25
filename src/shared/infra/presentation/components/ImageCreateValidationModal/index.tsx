import React, { useState } from "react";
import Image from "next/image";

interface IImageCreateValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imagePreviewUrl?: string | null;
  imageData: {
    direitosImagem?: string;
    tecidoOrgao?: string;
    estadoPeca?: string;
    dataCadastro?: string;
    tituloImagem?: string;
    descricaoImagem?: string;
    tags?: string[];
  };
}

export function ImageCreateValidationModal({
  isOpen,
  onClose,
  onConfirm,
  imagePreviewUrl,
  imageData,
}: IImageCreateValidationModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Fecha o modal se clicar fora dele
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
        className="relative w-full max-w-[812px] rounded-lg bg-[#474747] px-[32px] pb-[52px] pt-[38px]"
      >
        <div className="flex flex-col flex-wrap items-center justify-between gap-1.5">
          <h2 className="font-semibold text-lg text-gray-900-tk">
            Confirme os dados da imagem
          </h2>

          {/* Miniatura da imagem */}
          {imagePreviewUrl && (
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-lg">
              <Image
                src={imagePreviewUrl}
                alt="Miniatura da imagem"
                className="object-cover"
                fill
                sizes="120px"
              />
            </div>
          )}

          <div className="w-full">
            <div className="flex w-full flex-wrap justify-between gap-1">
              {imageData.direitosImagem && (
                <div className="flex w-[250px] flex-col md:w-[300px]">
                  <label className="text-lg font-semi-bold text-gray-900-tk">
                    Direitos de imagem:
                  </label>
                  <p className="text-md text-gray-900-tk">
                    {imageData.direitosImagem}
                  </p>
                </div>
              )}

              {imageData.tecidoOrgao && (
                <div className="flex w-[250px] flex-col md:w-[300px]">
                  <label className="text-lg font-semi-bold text-gray-900-tk">
                    Tecido/Orgão:
                  </label>
                  <p className="text-md text-gray-900-tk">
                    {imageData.tecidoOrgao}
                  </p>
                </div>
              )}

              {imageData.estadoPeca && (
                <div className="flex w-[250px] flex-col md:w-[300px]">
                  <label className="text-lg font-semi-bold text-gray-900-tk">
                    Estado da Peça:
                  </label>
                  <p className="text-md text-gray-900-tk">
                    {imageData.estadoPeca}
                  </p>
                </div>
              )}

              {imageData.dataCadastro && (
                <div className="flex w-[250px] flex-col md:w-[300px]">
                  <label className="text-lg font-semi-bold text-gray-900-tk">
                    Data de cadastro:
                  </label>
                  <p className="text-md text-gray-900-tk">
                    {imageData.dataCadastro}
                  </p>
                </div>
              )}

              {imageData.tituloImagem && (
                <div className="flex w-[250px] flex-col md:w-[300px]">
                  <label className="text-lg font-semi-bold text-gray-900-tk">
                    Título da imagem:
                  </label>
                  <p className="text-md text-gray-900-tk">
                    {imageData.tituloImagem}
                  </p>
                </div>
              )}

              {imageData.descricaoImagem && (
                <div className="flex w-[250px] flex-col md:w-[300px]">
                  <label className="text-lg font-semi-bold text-gray-900-tk">
                    Descrição da imagem:
                  </label>
                  <p className="text-md text-gray-900-tk">
                    {imageData.descricaoImagem}
                  </p>
                </div>
              )}

              {imageData.tags && imageData.tags.length > 0 && (
                <div className="flex flex-col">
                  <label className="text-lg font-semi-bold text-gray-900-tk">
                    Tags:
                  </label>
                  <div className="flex flex-wrap gap-0.5 py-0.5">
                    {imageData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="py-0.25 rounded-md bg-gray-900-tk px-0.5 text-md text-gray-100-tk"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-1 text-md md:flex-row [&>button]:rounded-lg [&>button]:px-2 [&>button]:py-1 [&>button]:text-gray-100-tk">
            <button onClick={onClose} className="bg-fail">
              Voltar
            </button>
            <button onClick={onConfirm} className="bg-sucess">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

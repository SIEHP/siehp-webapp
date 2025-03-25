"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { XIcon } from "../Icons";
interface IViewImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt?: string;
}

export function ViewImageModal({
  isOpen,
  onClose,
  imageUrl,
  imageAlt = "Imagem em tela cheia",
}: IViewImageModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  // Lidar com clique fora do modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // Efeito para lidar com a tecla ESC e gerenciamento de foco
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        onClose();
      }
    };

    // Salvar o elemento que tinha foco antes do modal abrir
    const previousActiveElement = document.activeElement as HTMLElement;

    // Adicionar event listener global para tecla ESC
    document.addEventListener("keydown", handleEscKey);

    // Focar o modal quando abrir
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }

    // Remover event listener e restaurar foco quando fechar
    return () => {
      document.removeEventListener("keydown", handleEscKey);

      // Ao fechar o modal, remover o foco do botão que abriu o modal
      if (isOpen && previousActiveElement) {
        previousActiveElement.blur();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      tabIndex={-1}
    >
      <div
        ref={modalRef}
        className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center justify-center"
        tabIndex={0}
        aria-modal="true"
        role="dialog"
      >
        {/* Container da imagem com controles */}
        <div className="relative inline-block">
          {/* Botão de fechar no canto superior esquerdo */}
          <button
            onClick={onClose}
            className="absolute left-0.5 top-0.5 z-10 flex h-[24px] w-[24px] items-center justify-center rounded-md bg-gray-100-tk bg-opacity-40 hover:bg-opacity-70"
            aria-label="Fechar"
          >
            <XIcon />
          </button>

          {/* Contêiner da imagem que mantém as proporções */}
          <div ref={imageContainerRef} className="relative">
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="h-auto max-h-[80vh] w-auto max-w-[85vw] object-contain"
              width={1200}
              height={900}
              priority
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

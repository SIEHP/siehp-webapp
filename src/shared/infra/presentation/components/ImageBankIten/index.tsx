import React, { useState } from "react";
import Image from "next/image";
import {
  ImageBankItemProps,
  ImageBankItemRootProps,
  ImageBankItemImageProps,
  ImageBankItemTitleProps,
  ImageBankItemActionsProps,
  ImageBankItemActionButtonProps,
} from "./types";
import {
  ImagePencilButtonIcon,
  ImageEyeButtonIcon,
  ThreeDotsIcon,
} from "../Icons";
import { ViewImageModal } from "../ViewImageModal";

export function ImageBankItem({
  imageUrl,
  title,
  className = "",
  onEdit,
  onView,
  onMore,
}: ImageBankItemProps) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewClick = () => {
    setIsViewModalOpen(true);
    if (onView) onView();
  };

  return (
    <>
      <div
        className={`flex h-[300px] w-[280px] flex-col items-center rounded-lg bg-gray-700-tk ${className}`}
      >
        <div className="flex w-full justify-center rounded-lg bg-[#7C7C7C]">
          <Image
            src={imageUrl}
            alt={title}
            width={150}
            height={160}
            className="h-[160px] w-[150px]"
          />
        </div>

        <div className="h-full w-full rounded-b-lg bg-gray-700-tk text-center">
          <p className="text-gray-800 p-1 text-md font-regular">
            {"Lâmina de Exemplo 1"}
          </p>

          <div className="flex w-full items-center justify-center gap-2 p-1">
            <button
              onClick={onEdit}
              className="flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-gray-300-tk"
              title="Editar"
            >
              <ImagePencilButtonIcon className="h-[36px] w-[36px]" />
            </button>

            <button
              onClick={onView}
              className="flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-gray-300-tk"
              title="Visualizar"
            >
              <ImageEyeButtonIcon className="h-[36px] w-[36px]" />
            </button>

            <button
              onClick={onMore}
              className="flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-gray-300-tk"
              title="Mais opções"
            >
              <ThreeDotsIcon className="h-[36px] w-[36px] fill-gray-100" />
            </button>
          </div>
        </div>
      </div>

      <ViewImageModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        imageUrl={imageUrl}
        imageAlt={title}
      />
    </>
  );
}

export default ImageBankItem;

import React, { useRef, useState, useCallback } from "react";
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
import { AlertDialog } from "../AlertDialog";
import useImage from "@/modules/image/infra/services/hooks/useImage";

export function ImageBankItem({
  imageUrl,
  title,
  imageId,
  className = "",
  onEdit,
  onView,
  onMore,
  onDelete,
}: ImageBankItemProps) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { deleteImage } = useImage();

  const handleViewClick = () => {
    setIsViewModalOpen(true);
    if (onView) onView();
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(prev => !prev);
    if (onMore) onMore();
  };

  const handleDeleteClick = () => {
    setIsDropdownOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!imageId) {
      setError("ID da imagem não encontrado");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteImage.handleDeleteImage(imageId);
      setIsDeleteDialogOpen(false);
      if (onDelete) onDelete(imageId);
    } catch (err: any) {
      setError(err?.message || "Erro ao excluir imagem. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            {title || "Sem título"}
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

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleMoreClick}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-gray-300-tk"
                title="Mais opções"
              >
                <ThreeDotsIcon className="h-[36px] w-[36px] fill-gray-900-tk" />
              </button>
              
              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 w-36 rounded-md shadow-lg bg-gray-500-tk z-10">
                  
                    <button
                      onClick={handleDeleteClick}
                      className="w-full px-1 py-0.5 text-sm text-left text-gray-900-tk hover:bg-gray-400-tk"
                    >
                      Excluir
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* View Image Modal */}
      <ViewImageModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        imageUrl={imageUrl}
        imageAlt={title}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog.Root open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay />
          <AlertDialog.Content>
            <AlertDialog.Title>Confirmar exclusão</AlertDialog.Title>
            <AlertDialog.Description className="text-gray-100-tk">
              Tem certeza que deseja excluir esta imagem? Esta ação não pode ser desfeita.
            </AlertDialog.Description>
            {error && (
              <div className="mt-1 text-red-500 text-sm">{error}</div>
            )}
            <div className="flex justify-between gap-2 mt-1">
              <AlertDialog.Cancel asChild>
                <button 
                  className="px-1 py-1 rounded-md bg-fail text-gray-100-tk hover:bg-gray-400-tk font-regular"
                  disabled={isDeleting}
                >
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button 
                  className="px-1 py-1 rounded-md bg-sucess text-gray-100-tk hover:bg-opacity-90 font-regular"
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}

export default ImageBankItem;

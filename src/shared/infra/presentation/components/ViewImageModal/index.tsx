"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const imageRef = useRef<HTMLImageElement>(null);
  
  // State for zoom levels and magnifier mode
  const [zoomLevel, setZoomLevel] = useState(1);
  const [magnifierActive, setMagnifierActive] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 }); // Default center (50%, 50%)
  const [magnifierZoom, setMagnifierZoom] = useState(12);

  // Magnifier settings
  const magnifierSize = 150;
  const magnificationLevel = magnifierZoom;

  // Lidar com clique fora do modal
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  // Toggle zoom level when clicking on the image
  const handleImageClick = (e: React.MouseEvent) => {
    if (magnifierActive) return; // Don't zoom if magnifier is active
    
    // Get image dimensions
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      
      // Calculate click position as percentage of image dimensions
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Set zoom origin to click position
      setZoomOrigin({ x, y });
    }
    
    // Update zoom level
    setZoomLevel((prev) => {
      // Cycle through zoom levels: 1 -> 1.5 -> 2 -> 1
      if (prev === 1) return 1.5;
      if (prev === 1.5) return 2;
      return 1;
    });
  };

  // Toggle magnifier mode
  const toggleMagnifier = () => {
    setMagnifierActive((prev) => !prev);
    if (zoomLevel !== 1) {
      setZoomLevel(1); // Reset zoom when activating magnifier
    }
  };

  // Handle magnifier zoom level change
  const handleMagnifierZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = Number(e.target.value);
    setMagnifierZoom(newZoom);
  };

  // Handle mouse move for magnifier position and zoom origin update
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // Get cursor position relative to the image
    const x = e.clientX - imageRect.left;
    const y = e.clientY - imageRect.top;
    
    // Update magnifier position if active
    if (magnifierActive) {
      setMagnifierPosition({
        x: Math.max(0, Math.min(x, imageRect.width)),
        y: Math.max(0, Math.min(y, imageRect.height))
      });
      
      // Update cursor position for background positioning
      setCursorPosition({
        x: x / imageRect.width,
        y: y / imageRect.height
      });
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

    // Reset zoom and magnifier when opening modal
    setZoomLevel(1);
    setMagnifierActive(false);
    setZoomOrigin({ x: 50, y: 50 }); // Reset to center

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={handleBackdropClick}
      tabIndex={-1}
    >
      <div
        ref={modalRef}
        className="relative flex max-h-[90vh] max-w-[95vw] flex-row items-center justify-center"
        tabIndex={0}
        aria-modal="true"
        role="dialog"
      >
        {/* Barra de ferramentas lateral */}
        <div className="flex flex-col items-center gap-1 bg-gray-500-tk px-0.5 py-1 lg:rounded-l-md h-max rounded-md lg:rounded-r-none">
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            className="flex h-2 w-2 items-center justify-center rounded-md bg-gray-100-tk hover:bg-opacity-70"
            aria-label="Fechar"
          >
            <XIcon className="stroke-[3]" />
          </button>
          
          {/* Botão de lupa */}
          <button
            onClick={toggleMagnifier}
            className={`flex h-2 w-2 items-center justify-center rounded-md bg-gray-100-tk hover:bg-opacity-70 ${
              magnifierActive ? "bg-gray-300-tk border border-white" : ""
            }`}
            aria-label="Ativar/Desativar lupa"
          >
            {/* Simple magnifier icon */}
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="white" strokeWidth="2.5" fill="none">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          
          {/* Slider vertical para ajuste do zoom da lupa - sempre visível */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-[120px] relative flex items-center justify-center">
              <input
                type="range"
                min="4"
                max="20"
                value={magnifierZoom}
                onChange={handleMagnifierZoomChange}
                className="h-[100px] cursor-pointer appearance-none bg-transparent"
                style={{
                  writingMode: "vertical-rl",
                  WebkitAppearance: "slider-vertical",
                  width: "8px",
                  padding: "0 5px",
                  transform: "rotate(180deg)"
                }}
                aria-label="Ajustar zoom da lupa"
              />
            </div>
            <span className="text-xs text-gray-900-tk">Lupa:</span>
            <span className="text-xs text-gray-900-tk">{magnifierZoom}x</span>
          </div>
          
          {/* Indicador de zoom */}
          <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-gray-900-tk">
            Zoom:
          </span>
          <span className="text-xs text-gray-900-tk">
              {`${zoomLevel}x`}
            </span>
          </div>
        </div>

        {/* Container da imagem */}
        <div className="bg-gray-500-tk p-0.5 rounded-md">
          {/* Contêiner da imagem que mantém as proporções */}
          <div 
            ref={imageContainerRef} 
            className="relative overflow-hidden"
            style={{ cursor: magnifierActive ? "none" : "pointer" }}
            onMouseMove={handleMouseMove}
          >
            <div 
              className="transition-transform duration-300 origin-top-left"
              style={{ 
                transform: `scale(${zoomLevel})`, 
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
              }}
            >
              <Image
                ref={imageRef as any}
                src={imageUrl}
                alt={imageAlt}
                className="h-auto max-h-[80vh] w-auto max-w-[80vw] object-contain"
                width={1200}
                height={900}
                priority
                quality={100}
                onClick={handleImageClick}
                unoptimized={true} // Helps with reference handling
              />
            </div>
            
            {/* Magnifier glass */}
            {magnifierActive && (
              <div
                className="pointer-events-none absolute border-2 border-white rounded-full shadow-lg"
                style={{
                  width: `${magnifierSize}px`,
                  height: `${magnifierSize}px`,
                  left: `${magnifierPosition.x - magnifierSize / 2}px`,
                  top: `${magnifierPosition.y - magnifierSize / 2}px`,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundPosition: `${cursorPosition.x * 100}% ${cursorPosition.y * 100}%`,
                  backgroundSize: `${100 * magnificationLevel}%`,
                  backgroundRepeat: "no-repeat",
                  zIndex: 10
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

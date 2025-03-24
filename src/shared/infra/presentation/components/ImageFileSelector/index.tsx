import React, { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";
import Image from "next/image";

interface ImageFileSelectorProps {
  onFileSelect?: (file: File | null) => void;
  className?: string;
  initialPreviewUrl?: string | null;
}

export function ImageFileSelector({ onFileSelect, className, initialPreviewUrl }: ImageFileSelectorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreviewUrl || null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPreviewUrl) {
      setPreviewUrl(initialPreviewUrl);
    }
  }, [initialPreviewUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Limpar URLs do objeto para evitar vazamentos de memória
    if (previewUrl && previewUrl !== initialPreviewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Resetar o valor do input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setSelectedFile(null);
    setPreviewUrl(null);
    
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div 
      className={`flex flex-col items-center justify-center w-full h-full ${className || ""}`}
    >
      <div
        className={`flex flex-col items-center justify-center w-full h-full md:h-[250px] border-2 border-dashed rounded-lg cursor-pointer bg-gray-300-tk 
        ${isDragging ? "border-sucess bg-gray-500-tk bg-opacity-20" : "border-gray-500-tk"} 
        hover:bg-gray-500-tk hover:bg-opacity-20 transition-all duration-200 ease-in-out relative`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative w-full h-full p-2">
            <Image
              src={previewUrl}
              alt="Preview da imagem"
              className="object-contain rounded-lg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <button 
              className="absolute bottom-1 left-1 w-3 h-3 bg-fail text-gray-100-tk rounded-full flex items-center justify-center hover:bg-red-600 z-10"
              onClick={handleRemoveImage}
              title="Remover imagem"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-2 h-2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-5 text-center">
            <svg 
              className="w-2 h-2 mb-3 text-gray-900-tk" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" 
              />
            </svg>
            <p className="text-md font-regular text-gray-700-tk">
              Clique para selecionar uma imagem ou arraste e solte aqui
            </p>
            <p className="mt-2 text-sm text-gray-700-tk">
              (SVG, PNG ou JPG)
            </p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

// Opcional: Criar componentes compostos para uso mais flexível
ImageFileSelector.Root = function ImageFileSelectorRoot({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export default ImageFileSelector;

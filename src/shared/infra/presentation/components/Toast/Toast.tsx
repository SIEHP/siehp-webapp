'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useToastStore } from '../../../services/hooks/useToast';

type ToastIconProps = {
  type: 'success' | 'error' | 'warning' | 'info';
};

const ToastIcon: React.FC<ToastIconProps> = ({ type }) => {
  switch (type) {
    case 'success':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    case 'error':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    case 'warning':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      );
    case 'info':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 text-gray-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const ToastContent: React.FC = () => {
  const { isToastOpen, message, toastType, position, direction, duration, closeToast, toastId } = useToastStore();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Auto-focus o botão de fechar para melhorar a acessibilidade
  useEffect(() => {
    if (isToastOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isToastOpen]);

  // Fechar automaticamente após duration ms
  useEffect(() => {
    if (isToastOpen) {
      const timer = setTimeout(() => {
        closeToast();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isToastOpen, duration, closeToast]);

  if (!isToastOpen) return null;

  // Classes para posicionamento do toast
  const positionClasses = {
    topCenter: 'top-1 left-1/2 transform -translate-x-1/2',
    bottomCenter: 'bottom-1 left-1/2 transform -translate-x-1/2',
    topRight: 'top-1 right-1',
    bottomRight: 'bottom-1 right-1',
  };

  // Classes para animação do toast
  const animationClasses = {
    fadeUp: 'animate-fadeUp',
    fadeLeft: 'animate-fadeLeft',
  };

  // Classes para cores baseadas no tipo de toast
  const toastClasses = {
    success: 'bg-sucess',
    error: 'bg-fail',
    warning: 'bg-warning',
    info: 'bg-gray-500',
  };

  return (
    <div
      key={toastId}
      style={{ zIndex: 9999 }}
      className={`fixed ${positionClasses[position]} ${animationClasses[direction]} flex items-center p-1 rounded-md shadow-lg min-w-[200px] ${toastClasses[toastType]} theme-normal`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="mr-1">
        <ToastIcon type={toastType} />
      </div>
      <div className="flex-1 text-gray-900 text-md">{message}</div>
    </div>
  );
};

const Toast: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Criar um elemento específico para o portal se não existir
    if (!document.getElementById('toast-portal')) {
      const portalDiv = document.createElement('div');
      portalDiv.id = 'toast-portal';
      document.body.appendChild(portalDiv);
    }
    
    return () => {
      // Limpar o portal na desmontagem
      const portalElement = document.getElementById('toast-portal');
      if (portalElement && portalElement.parentNode) {
        portalElement.parentNode.removeChild(portalElement);
      }
    };
  }, []);

  // Não renderizar nada no lado do servidor
  if (!mounted) return null;

  // Renderizar o toast no portal para evitar problemas de DOM
  return createPortal(
    <ToastContent />,
    document.getElementById('toast-portal') || document.body
  );
};

export default Toast; 
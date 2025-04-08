import { create } from 'zustand';

type Position = 'topCenter' | 'bottomCenter' | 'topRight' | 'bottomRight';
type ToastType = 'success' | 'error' | 'warning' | 'info';
type Direction = 'fadeUp' | 'fadeLeft';

interface ToastOptions {
  position?: Position;
  direction?: Direction;
  duration?: number;
}

type ToastState = {
  isToastOpen: boolean;
  closeToast: () => void;
  message: string;
  toastType: ToastType;
  position: Position;
  direction: Direction;
  duration: number;
  toastId: string;
  toast: {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
  };
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useToastStore = create<ToastState>((set) => ({
  isToastOpen: false,
  closeToast: () => set(() => ({ isToastOpen: false })),
  message: '',
  toastType: 'success',
  position: 'topRight',
  direction: 'fadeUp',
  duration: 3000,
  toastId: generateId(),
  toast: {
    success: (message, options) =>
      set((state) => ({
        isToastOpen: true,
        toastType: 'success',
        message,
        position: options?.position ?? state.position,
        direction: options?.direction ?? state.direction,
        duration: options?.duration ?? state.duration,
        toastId: generateId(),
      })),
    error: (message, options) =>
      set((state) => ({
        isToastOpen: true,
        toastType: 'error',
        message,
        position: options?.position ?? state.position,
        direction: options?.direction ?? state.direction,
        duration: options?.duration ?? state.duration,
        toastId: generateId(),
      })),
    warning: (message, options) =>
      set((state) => ({
        isToastOpen: true,
        toastType: 'warning',
        message,
        position: options?.position ?? state.position,
        direction: options?.direction ?? state.direction,
        duration: options?.duration ?? state.duration,
        toastId: generateId(),
      })),
    info: (message, options) =>
      set((state) => ({
        isToastOpen: true,
        toastType: 'info',
        message,
        position: options?.position ?? state.position,
        direction: options?.direction ?? state.direction,
        duration: options?.duration ?? state.duration,
        toastId: generateId(),
      })),
  },
})); 
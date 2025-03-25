import { HTMLAttributes, ButtonHTMLAttributes } from "react";
import { ComponentProps } from "react";
import Image from "next/image";

export interface ImageBankItemProps {
  imageUrl: string;
  title: string;
  className?: string;
  onEdit?: () => void;
  onView?: () => void;
  onMore?: () => void;
}

export interface ImageBankItemRootProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ImageBankItemImageProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
  src: string;
  alt: string;
  className?: string;
}

export interface ImageBankItemTitleProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ImageBankItemActionsProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ImageBankItemActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

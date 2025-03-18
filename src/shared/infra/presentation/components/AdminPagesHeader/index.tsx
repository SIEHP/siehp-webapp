import React from "react";
import {
  AdminPagesHeaderRootProps,
  AdminPagesHeaderTitleProps,
  AdminPagesHeaderButtonProps,
  AdminPagesHeaderFilterProps,
  AdminPagesHeaderButtonIconProps,
  AdminPagesHeaderButtonContentProps,
  AdminPagesHeaderBodyProps,
} from "./types";
import { SearchIcon } from "../Icons";

const AdminPagesHeaderRoot = ({
  children,
  className,
  ...props
}: AdminPagesHeaderRootProps) => {
  return (
    <div
      className={`w-100% flex h-2.5 flex-wrap content-center items-center ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AdminPagesHeaderTitle = ({
  children,
  className,
  ...props
}: AdminPagesHeaderTitleProps) => {
  return (
    <h1
      className={`left-0 text-lg font-semi-bold text-gray-100-tk ${className ?? ""}`}
      {...props}
    >
      {children}
    </h1>
  );
};

const AdminPagesHeaderBody = ({
  children,
  className,
  ...props
}: AdminPagesHeaderBodyProps) => {
  return (
    <div
      className={`flex flex-grow items-center justify-end ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

const AdminPagesHeaderButtonContent = ({
  children,
  className,
  ...props
}: AdminPagesHeaderButtonContentProps) => {
  return (
    <div className={`flex flex-wrap ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const AdminPagesHeaderButton = ({
  children,
  className,
  ...props
}: AdminPagesHeaderButtonProps) => {
  return (
    <button className={`mr-4 ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
};

const AdminPagesHeaderButtonIcon = ({
  children,
  className,
  ...props
}: AdminPagesHeaderButtonIconProps) => {
  return (
    <div className={`mr-1 h-[1.125rem] w-1  ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const AdminPagesHeaderFilter = ({
  className,
  ...props
}: AdminPagesHeaderFilterProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Pesquisar..."
        {...props}
        className={`h-2.5 w-[250px] appearance-none rounded-[4rem] border-none bg-gray-300-tk py-[10px] pl-1 pr-[45px] text-md font-regular text-gray-900-tk placeholder-gray-900-tk  ${className ?? ""}`}
      />
      <SearchIcon
        className="absolute right-[15px] top-[7px] [&>path]:fill-gray-300-tk"
        width={24}
        height={24}
        viewBox="0 0 30 24"
      />
    </div>
  );
};

export const AdminPagesHeader = {
  Root: AdminPagesHeaderRoot,
  Title: AdminPagesHeaderTitle,
  Body: AdminPagesHeaderBody,
  Button: AdminPagesHeaderButton,
  ButtonIcon: AdminPagesHeaderButtonIcon,
  Filter: AdminPagesHeaderFilter,
  ButtonContent: AdminPagesHeaderButtonContent,
};
